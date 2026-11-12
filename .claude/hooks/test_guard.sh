#!/usr/bin/env bash
# Usage: bash test_guard.sh   — prints FAIL lines only, then a summary.
G="$(cd "$(dirname "$0")" && pwd)/guard.py"; fail=0; n=0
run(){ python3 -c 'import json,sys;print(json.dumps({"tool_name":sys.argv[3],"cwd":sys.argv[2],"tool_input":json.loads(sys.argv[1]) if sys.argv[3]!="Bash" else {"command":sys.argv[1]}}))' "$1" "$2" "${3:-Bash}" | python3 "$G" >/tmp/g.out 2>/dev/null; rc=$?; grep -q '"ask"' /tmp/g.out && rc=ask; echo $rc; }
expect(){ n=$((n+1)); got=$(run "$2" "${3:-$PWD}" "${4:-Bash}"); [ "$got" = "$1" ] || { echo "FAIL want=$1 got=$got: $2"; fail=1; }; }
expect 2 "gh pr merge 12 --squash --admin"; expect 2 "gh pr merge --admin 5"; expect 0 "gh pr merge 12 --squash"
expect ask "gh api -X PUT repos/o/r/pulls/5/merge"
expect 2 "git push -f origin feat"; expect 2 "git -C repo push --force origin x"; expect 2 "git push origin +main"
expect 2 "git push --mirror"; expect 2 "git push --prune origin"; expect 0 "git push --force-with-lease origin feat"
expect 2 "git push origin --delete old"; expect 2 "git push origin :old"; expect 0 "git push -u origin claude/x"
expect ask "git push origin main"; expect ask "git push origin HEAD:master"; expect ask "git push origin feat:main"
expect ask "git push origin refs/heads/main"; expect 2 "git worktree prune"
expect 2 "echo > .gitignore"; expect 0 "echo .env >> .gitignore"; expect 0 "ls -la"
T=$(mktemp -d); git -C $T init -q -b main; git -C $T -c user.name=t -c user.email=t@t commit -q --allow-empty -m init
expect ask "git push" $T; expect ask "git push origin HEAD" $T
git -C $T checkout -q -b feat; expect 0 "git push" $T; expect 0 "git push -u origin feat" $T
touch $T/.env $T/.env.local.example $T/a.py $T/keyboard.py $T/clip.mov; mkdir -p $T/docs; touch $T/docs/secrets-policy.md
git -C $T add a.py .env.local.example keyboard.py docs; expect 0 "git commit -m x" $T
expect 0 "git add a.py && git commit -m x" $T; expect 2 "git add .env && git commit -m x" $T
expect 2 "cd $T && git add -A && git commit -m x" /; expect 2 "git add . && git commit -m x" $T
git -C $T -c user.name=t -c user.email=t@t commit -q -m files; echo 1 >> $T/a.py; expect 0 "git commit -am x" $T
git -C $T add .env; expect 2 "git -C $T commit -m x" /
git -C $T -c user.name=t -c user.email=t@t commit -q -m leak --no-verify; git -C $T rm -q --cached .env; expect 0 "git commit -m untrack" $T
expect ask '{"owner":"o","repo":"r","pullNumber":5}' / mcp__github__merge_pull_request
expect ask '{"owner":"o","repo":"r","branch":"main","files":[]}' / mcp__github__push_files
expect 0 '{"owner":"o","repo":"r","branch":"feat","files":[]}' / mcp__github__push_files
[ $fail = 0 ] && echo "all $n guard tests passed" || { echo "$n tests, failures above"; exit 1; }
