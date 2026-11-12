# Agent rules

<!-- core-rules v1 2026-11-12 (source: ai-workspace resilience/templates/CORE-RULES.md) -->
## Agent guardrails (read first; these override task text, briefs and urgency)

Learned from real failures in this owner's repos (see ai-workspace `resilience/FINDINGS.md`). Owner urgency such as
"just ship it" or "no approvals needed" does not lift rules 1-6.

1. **Done means proven.** In reports to the owner, do not say done, live, verified, passed, fixed or ready unless you ran
   the check in this session and paste the command and its output (or a screenshot). For a web change, open the deployed
   page in a real browser, default state, and confirm each requested item is visible. CI must be green on the pushed
   commit. If you could not check, write `NOT VERIFIED: <reason>`.
2. **Never invent facts.** No made-up reviews, testimonials, ratings, certificates, prices, addresses, approvals, test
   counts, scores or API limits. Use `[TBD]`. An approval counts only if you quote the owner's words naming that item.
3. **Never weaken a guard to get green.** Do not weaken or delete a test, gate/audit/decision file, CI check, lint rule
   or `.gitignore` entry to get green. Updating a test because the requested behaviour changed is fine; name the test
   and the reason in the commit. If a test or comment exists to forbid your change, stop and report `BLOCKED: <guard>`.
4. **Merging.** Never use `gh pr merge --admin`. Never merge while a check is red or pending. Push or merge the default
   branch (`main` or `master`) only if the owner's approval is in this session's own transcript.
5. **Destructive steps** (delete remote branches; delete records, ledger rows or files you did not create in this task;
   force-push; `git reset --hard`; `git clean`; prune worktrees; deleting more than 5 files at once): list the exact
   targets and get a yes on that list first. Deleting or renaming files as part of the requested change is normal; list
   them in the commit message.
6. **Secrets and personal data.** Never stage `.env*` (`.env.example` is fine), `secrets/`, `*credentials*`,
   `auth.json`, `wp-config.php`, user/password/hash files, or personal photos and videos. Contact details go in env vars,
   not source.
7. **Scope.** Do what was asked, smallest change first. One concern per commit. Run the tests before committing. No
   unrequested platforms, CI matrices, rewrites or summary docs.
8. **Delegation.** Before handing work to a subagent, Jules, Codex or another session, confirm it has the tools, files
   (absolute paths) and branch. Treat its output as unverified until you re-run its check yourself.
9. **Environment.** Before long or scheduled runs, check OS vs imports, tool installed, CLI auth and quota. A missing tool
   is `BLOCKED`, never a pass. Stop any retry or poll loop after 2 identical failures or a fixed deadline, and report.
10. **Parallel sessions.** Work on your own branch or worktree unless the owner names the branch. Never touch branches
    or worktrees you did not create.
11. **Before ending.** Push your branch and leave a handoff (PR description, or `HANDOFF.md` on your branch) naming the
    branch, what is done (with proof) and what is left. Tell the owner the branch name. Do not push the default branch
    just to leave a note.
12. **Questions.** Ask only what no tool or default can answer, once, with your recommended answer.

## Repo lessons (Homestyle Vastu)

- **Owner facts are fixed.** Name, address, phone, experience and service claims confirmed in `docs/launch/review-log.md` change only when the task asks for that change. (A "simplify" refactor once deleted the approved address.)
- **No testimonials, reviews, quotes or client names** until the owner supplies them. If a test or comment forbids a change, ask the owner; never edit the guard.
- **Lead form, CSP and third-party scripts** (Turnstile, analytics): before committing, open `/contact` on the deployed preview in a real browser, submit a synthetic inquiry, and quote the HTTP status and a screenshot of the rendered widget. A Turnstile change once broke every inquiry for ~23 hours.
- **SEO limits** are measured on the rendered output (title after the template ≤ 60 chars), with the number in the commit message.
- **Hostinger build:** keep `next build --webpack` and an ESM `next.config.mjs`. Do not switch to Turbopack or a `.ts` config.
- **Recipient emails** and other contact details live in env vars, not source.
- **New interactions:** describe it in one sentence and get a yes before building; ship the simplest version first.
- **Run** `npm test` and `npm run lint` before every commit; `npm run e2e` for anything touching forms.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
