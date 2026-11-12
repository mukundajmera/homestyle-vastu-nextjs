#!/usr/bin/env python3
"""Claude Code PreToolUse guard for Bash (core-rules v2, 2026-11-12).
Also checks GitHub MCP merge/write tools. Blocks the few actions that caused the most damage in this owner's repos (resilience/FINDINGS.md R3-R5, R9),
and asks before pushing the default branch. Exit 2 = block (stderr shown to Claude).
Install: see resilience/RECOMMENDATIONS.md section 2. Fails open on any internal error."""
import json, os, re, subprocess, sys

GIT = r"\bgit\b(?:\s+(?:-C|-c)\s+\S+|\s+--?[\w-]+(?:=\S+)?)*\s+"
SECRET_PATH = re.compile(
    r"(^|/)(\.env(\.[\w-]+)*|[^/]+\.env|\.envrc|.*credentials.*\.json|\.git-credentials|auth\.json|token\.json|"
    r"service-account[^/]*\.json|secrets\.(json|ya?ml|toml)|wp-config\.php|env-keys\.sh|users\.json|\.npmrc|"
    r"id_(rsa|ed25519|ecdsa)|[^/]+\.(pem|p12|pfx)|[^/]+\.key)$|(^|/)secrets/[^/]+\.(env|json|ya?ml|txt|key)$", re.I)
ALLOWED_SECRET = re.compile(r"\.env(\.[\w-]+)*\.(example|sample|template)$", re.I)
MEDIA = re.compile(r"\.(mp4|mov|avi|mkv|psd|ai|heic)$", re.I)

RULES = [
    (r"\bgh\s+pr\s+merge\b[^|;&]*--admin", "`gh pr merge --admin` bypasses branch protection. Merge only with green checks (core rule 4)."),
    (GIT + r"push\b[^|;&]*\s(--force(?!-with-lease)|-f|--mirror|\+\S+)(\s|$)", "Force-push/mirror is blocked. Use --force-with-lease on your own branch, with owner approval (core rule 5)."),
    (GIT + r"push\b[^|;&]*\s(--delete|-d|--prune)(\s|$)", "Remote branch deletion needs the owner's yes on the exact list (core rule 5)."),
    (GIT + r"push\b[^|;&]*\s:[\w./-]+", "Remote branch deletion needs the owner's yes on the exact list (core rule 5)."),
    (GIT + r"worktree\s+prune\b", "Do not prune worktrees; other sessions may own them (core rule 10)."),
    (r"(^|[^>])>\s*\.gitignore\b", "Do not overwrite .gitignore; append with >> instead (core rule 3)."),
]
def git_dir(cmd, cwd):
    m = re.search(r"\bgit\s+-C\s+(\S+)", cmd) or re.search(r"(?:^|&&|;)\s*cd\s+(\S+)\s*&&", cmd)
    d = m.group(1).strip("'\"") if m else None
    if d and cwd and not os.path.isabs(d):
        d = os.path.join(cwd, d)
    return d or cwd or None

def git(args, d):
    return subprocess.run(["git"] + args, capture_output=True, text=True, timeout=4, cwd=d).stdout

def candidates(cmd, d):
    """Paths this command would commit (added, modified, renamed; never deletions)."""
    paths = [l for l in git(["diff", "--cached", "--name-only", "--diff-filter=d"], d).splitlines() if l.strip()]
    for m in re.finditer(r"\bgit\b[^|;&]*?\badd\s+([^|;&]+)", cmd):
        args = [a.strip("'\"") for a in m.group(1).split() if not a.startswith("-")]
        if any(a in (".", "*") for a in args) or re.search(r"\s(-A|--all)\b", m.group(0)):
            st = git(["status", "--porcelain", "--untracked-files=all"], d).splitlines()
            paths += [l[3:].strip('"') for l in st if l[:2].strip() and "D" not in l[:2]]
        else:
            paths += args
    if re.search(r"\bcommit\b[^|;&]*\s-[a-zA-Z]*a", cmd):  # commit -a: tracked modifications only
        st = git(["status", "--porcelain"], d).splitlines()
        paths += [l[3:].strip('"') for l in st if not l.startswith("??") and "D" not in l[:2]]
    return paths

def pushes_default(cmd, d):
    for m in re.finditer(GIT + r"push\b([^|;&]*)", cmd):
        if re.search(r"(\s|:)(refs/heads/)?(main|master)(\s|$)", m.group(1) + " "):
            return True
        refs = [a for a in m.group(1).split() if not a.startswith("-")]
        if len(refs) <= 1 or refs[1] == "HEAD":
            if git(["branch", "--show-current"], d).strip() in ("main", "master"):
                return True
    return False

MERGE_TOOLS = ("merge_pull_request", "enable_pr_auto_merge")
WRITE_TOOLS = ("push_files", "create_or_update_file", "delete_file")

def ask(msg):
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse",
          "permissionDecision": "ask", "permissionDecisionReason": msg}}))
    return 0

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return 0
    tool = data.get("tool_name", "")
    ti = data.get("tool_input") or {}
    if tool.startswith("mcp__") and tool.endswith(MERGE_TOOLS):
        return ask("Merging a PR needs green checks and the owner's approval in this session (core rule 4).")
    if tool.startswith("mcp__") and tool.endswith(WRITE_TOOLS) and str(ti.get("branch", "")) in ("main", "master"):
        return ask("Writing to the default branch needs the owner's approval in this session (core rule 4).")
    if tool != "Bash":
        return 0
    cmd = ti.get("command", "")
    for pat, msg in RULES:
        if re.search(pat, cmd):
            print("BLOCKED by guard hook: " + msg, file=sys.stderr)
            return 2
    if re.search(r"\bgh\s+api\b[^|;&]*/pulls/\d+/merge", cmd):
        return ask("Merging a PR needs green checks and the owner's approval in this session (core rule 4).")
    d = git_dir(cmd, data.get("cwd"))
    if re.search(GIT + r"push\b", cmd) and pushes_default(cmd, d):
        return ask("Pushing the default branch needs the owner's approval in this session (core rule 4).")
    if re.search(GIT + r"commit\b", cmd):
        bad = sorted({p for p in candidates(cmd, d)
                      if (SECRET_PATH.search(p) and not ALLOWED_SECRET.search(p)) or MEDIA.search(p)})
        if bad:
            print("BLOCKED by guard hook: files look like secrets or personal media: " + ", ".join(bad[:10])
                  + ". Unstage them (git restore --staged <file>) and append them to .gitignore (core rule 6). "
                  "Untracking a secret (git rm --cached) is allowed. If the owner explicitly named a file to "
                  "commit, ask them to commit it themselves.", file=sys.stderr)
            return 2
    return 0

if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
