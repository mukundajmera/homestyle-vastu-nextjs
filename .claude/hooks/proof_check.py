#!/usr/bin/env python3
"""Stop hook: refuses to end a turn that claims success with no proof attached (FINDINGS R1, the #1 failure).
If the final message uses a success word (done, verified, live, fixed, passed, shipped, ready, deployed, merged)
and shows no evidence (code block, command output, NOT VERIFIED, screenshot, check-run, URL with status), it blocks
once with a reason. Never blocks twice in a row (stop_hook_active). Fails open."""
import json, re, sys

CLAIM = re.compile(r"\b(done|completed?|verified|live|fixed|passed|passing|shipped|ready|deployed|merged|all green|works now)\b", re.I)
EVIDENCE = re.compile(
    r"```|NOT VERIFIED|BLOCKED|PRE-EXISTING RED|screenshot|check[-_ ]runs?|conclusion|\b\d+ passed\b|exit (code )?0|"
    r"HTTP/\d|\bstatus[: ]+\d{3}\b|^\s*\$ |Proof:", re.I | re.M)
NEGATED = re.compile(r"\b(not|isn't|aren't|wasn't|n't) (yet )?(done|verified|live|fixed|ready|deployed|merged)\b", re.I)

def main():
    try:
        data = json.load(sys.stdin)
        if data.get("stop_hook_active"):
            return 0
        msg = data.get("last_assistant_message") or ""
        text = NEGATED.sub("", msg)
        if CLAIM.search(text) and not EVIDENCE.search(msg):
            print(json.dumps({"decision": "block", "reason":
                "Your reply claims success but shows no proof. Run the check now and paste the command and its output "
                "(or a screenshot), or rewrite the claim as 'NOT VERIFIED: <reason>'. Then end with "
                "'Confidence: N% because ...'. (ship-gate skill, core rule 1)"}))
    except Exception:
        pass
    return 0

if __name__ == "__main__":
    sys.exit(main())
