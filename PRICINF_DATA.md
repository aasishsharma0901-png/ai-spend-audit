# PRICING_DATA.md

# AI Tool Pricing Reference

All pricing information was verified during the final submission week using official vendor pricing pages.

Pricing data is used by the audit engine to:

* calculate savings opportunities
* detect downgrade recommendations
* identify overlapping subscriptions
* estimate annualized cost reductions

Verification date:

```txt
2026-05-09
```

---

# Cursor

Official pricing page:
https://cursor.com/pricing

| Plan       | Price          |
| ---------- | -------------- |
| Hobby      | $0/user/month  |
| Pro        | $20/user/month |
| Business   | $40/user/month |
| Enterprise | Custom pricing |

---

# GitHub Copilot

Official pricing page:
https://github.com/features/copilot#pricing

| Plan       | Price          |
| ---------- | -------------- |
| Individual | $10/user/month |
| Business   | $19/user/month |
| Enterprise | $39/user/month |

---

# Claude (Anthropic)

Official pricing pages:

* https://claude.ai/upgrade
* https://www.anthropic.com/claude-for-enterprise

| Plan       | Price                            |
| ---------- | -------------------------------- |
| Free       | $0                               |
| Pro        | $20/user/month                   |
| Max        | $100/user/month                  |
| Team       | $30/user/month (minimum 5 seats) |
| Enterprise | Custom pricing                   |

---

# ChatGPT (OpenAI)

Official pricing page:
https://openai.com/chatgpt/pricing

| Plan       | Price          |
| ---------- | -------------- |
| Plus       | $20/user/month |
| Team       | $30/user/month |
| Enterprise | Custom pricing |

---

# Gemini (Google)

Official pricing pages:

* https://gemini.google.com
* https://one.google.com/about/plans

| Plan  | Price                        |
| ----- | ---------------------------- |
| Pro   | Included with Google account |
| Ultra | $20/user/month               |

---

# Windsurf (Codeium)

Official pricing page:
https://windsurf.com/pricing

| Plan  | Price          |
| ----- | -------------- |
| Free  | $0             |
| Pro   | $15/user/month |
| Teams | $35/user/month |

---

# API Pricing Notes

API pricing for:

* Anthropic API
* OpenAI API

is usage-based rather than flat-rate subscription pricing.

Because API costs vary significantly by:

* token usage
* request volume
* model selection

the audit engine treats API-heavy usage as:

```txt
review
```

instead of generating deterministic savings calculations.

---

# Enterprise Pricing Notes

Enterprise pricing across vendors is generally:

* custom negotiated
* volume dependent
* contract based

Because public pricing is unavailable, Enterprise plans are intentionally flagged as:

```txt
review
```

within the audit engine rather than estimated directly.

---

# Data Accuracy Notes

Pricing information may change over time as vendors update:

* subscription tiers
* feature limits
* billing structures

The pricing dataset was intentionally designed to be:

* centralized
* easily editable
* independently maintainable from audit logic

---
