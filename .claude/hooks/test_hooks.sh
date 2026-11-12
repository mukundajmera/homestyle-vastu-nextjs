#!/usr/bin/env bash
# Tests for skill_router.py, proof_check.py, session_start.py. Run: bash test_hooks.sh
cd "$(dirname "$0")"; fail=0; n=0
t(){ n=$((n+1)); out=$(printf '%s' "$2" | python3 -I "$1"); if printf '%s' "$out" | grep -q -- "$3"; then :; else echo "FAIL[$n] $1 :: $2 => '$out' (wanted '$3')"; fail=1; fi; }
none(){ n=$((n+1)); out=$(printf '%s' "$2" | python3 -I "$1"); if [ -n "$out" ]; then echo "FAIL[$n] expected silence: $2 => $out"; fail=1; fi; }
t skill_router.py '{"prompt":"deploy the homepage fix to Hostinger"}' 'ship-gate, site-change'
t skill_router.py '{"prompt":"send these 15 tasks to Jules"}' 'delegate-safely'
t skill_router.py '{"prompt":"restart the orchestrator wave"}' 'orchestrator-run'
t skill_router.py '{"prompt":"is Infosys stock cheap on P/E?"}' 'stock-analysis'
none skill_router.py '{"prompt":"explain how a hash map works"}'
none skill_router.py '{"prompt":"code review this function"}'
none skill_router.py 'not json'
t proof_check.py '{"last_assistant_message":"All done, the site is live and verified."}' '"block"'
none proof_check.py '{"last_assistant_message":"Done.\n```\n$ npm test\n12 passed\n```"}'
none proof_check.py '{"last_assistant_message":"Form works. NOT VERIFIED: no browser here."}'
none proof_check.py '{"last_assistant_message":"Fixed it, I am sure","stop_hook_active":true}'
none proof_check.py '{"last_assistant_message":"Here is how hash maps work."}'
none proof_check.py '{"last_assistant_message":"This is not done yet; I need your answer on the price."}'
t session_start.py '{}' 'Guardrails'
[ $fail = 0 ] && echo "all $n hook tests passed"
