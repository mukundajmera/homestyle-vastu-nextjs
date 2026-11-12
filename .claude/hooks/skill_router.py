#!/usr/bin/env python3
"""UserPromptSubmit hook: deterministic skill routing so the owner never has to type "use X skill".
Small models under-trigger skills when many are listed; this hook matches the prompt against keyword rules and
injects one short line naming the skill(s) to load. Silent when nothing matches. Fails open."""
import json, re, sys

ROUTES = [
    ("ship-gate", r"\b(done|ship|deploy|merge|push|pull request|\bpr\b|live|verify|verified|release|make it green|fix (the )?ci|wrap up|finish)\b"),
    ("delegate-safely", r"\b(delegate|hand ?off|jules|codex|copilot|gemini|lane|subagent|spawn|parallel session|in the background|cron|schedule|worker)\b"),
    ("site-change", r"\b(website|site|landing page|homepage|hostinger|wordpress|woocommerce|lead form|inquiry|turnstile|csp|seo|testimonials?|customer reviews?|star rating|about page)\b"),
    ("orchestrator-run", r"\b(orchestrator|wave|dispatch|backlog|ledger|auto-?merge|submit-wave|runner)\b"),
    ("stock-analysis", r"\b(stock|ticker|nse|bse|valuation|p/?e|roce|roe|ebitda|ipo|drhp|promoter|equity research)\b"),
]

def main():
    try:
        data = json.load(sys.stdin)
        prompt = (data.get("prompt") or "").lower()
        hits = [name for name, rx in ROUTES if re.search(rx, prompt)]
        if not hits:
            return 0
        msg = ("Skill routing (owner's standing rule): load and follow " + ", ".join(hits) +
               " for this request before acting. Core guardrails at the top of AGENTS.md still apply.")
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "UserPromptSubmit", "additionalContext": msg}}))
    except Exception:
        pass
    return 0

if __name__ == "__main__":
    sys.exit(main())
