# Agent hooks (from ai-workspace resilience/ and course-correct/)

These run in every Claude Code session that opens this repo, including cloud sessions, because they live in the repo.

| File | Event | What it does |
|---|---|---|
| `guard.py` | PreToolUse (Bash, GitHub MCP) | Blocks `gh pr merge --admin`, force-push, remote branch deletes, worktree prune, overwriting `.gitignore`, committing secrets or media; asks before pushing `main`/`master` |
| `session_start.py` | SessionStart | Tells the model its branch (warns on main), uncommitted files, last 5 commits and HANDOFF.md |
| `skill_router.py` | UserPromptSubmit | Names the skill to load (ship-gate, delegate-safely, site-change, orchestrator-run, stock-analysis) from keywords, so the owner never has to |
| `proof_check.py` | Stop | Sends Claude back once if it claims done/live/verified with no command output, screenshot or `NOT VERIFIED` |

All hooks fail open: an internal error never blocks work. Test: `bash .claude/hooks/test_hooks.sh && bash .claude/hooks/test_guard.sh`.
On Windows, if `python3` is the Store alias, change `python3` to the real `python.exe` path in `.claude/settings.json`.
Do not also install these hooks in `~/.claude/settings.json`, or they run twice.
