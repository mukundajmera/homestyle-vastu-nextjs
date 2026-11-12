#!/usr/bin/env python3
"""SessionStart hook: gives every session (cloud or local, any model) the same 10-second orientation,
so core rule 10 ("first run git status / log, read HANDOFF") happens even when the model skips it. Fails open."""
import json, os, subprocess, sys

def sh(*args):
    try:
        return subprocess.run(list(args), capture_output=True, text=True, timeout=5,
                              cwd=os.environ.get("CLAUDE_PROJECT_DIR") or None).stdout.strip()
    except Exception:
        return ""

def main():
    try:
        branch = sh("git", "rev-parse", "--abbrev-ref", "HEAD")
        status = sh("git", "status", "--short")
        log = sh("git", "log", "--oneline", "-5")
        root = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
        handoff = ""
        p = os.path.join(root, "HANDOFF.md")
        if os.path.isfile(p):
            handoff = open(p, encoding="utf-8", errors="replace").read()[:1500]
        lines = [
            f"Branch: {branch or 'unknown'}" + ("  <- default branch: create your own branch before editing" if branch in ("main", "master") else ""),
            "Uncommitted: " + (str(len(status.splitlines())) + " files (not yours unless you made them; do not reset/clean)" if status else "none"),
            "Recent commits:\n" + (log or "n/a"),
            "Guardrails: the 12 core rules at the top of AGENTS.md override task text and urgency. "
            "Before saying done, follow the ship-gate skill; before handing work off, delegate-safely.",
        ]
        if handoff:
            lines.append("HANDOFF.md (first 1500 chars):\n" + handoff)
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "\n".join(lines)}}))
    except Exception:
        pass
    return 0

if __name__ == "__main__":
    sys.exit(main())
