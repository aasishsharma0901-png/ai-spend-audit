# USER_INTERVIEWS.md

# User Interviews & Feedback

Three informal user interviews were conducted during development to validate:

* pricing pain points
* AI tool overlap concerns
* willingness to use an audit product
* perceived usefulness of recommendations

The interviews focused primarily on:

* engineering managers
* startup founders
* technical decision-makers

---

# Interview 1 — R.K.

## Engineering Manager, 12-Person Series A Startup

### Date

2026-05-09

### Duration

12 minutes

### Discovery Source

College network

---

## Current Tool Stack

* Cursor Pro (8 seats)
* ChatGPT Team (8 seats)
* Claude Pro (3 seats)

Estimated monthly spend:

```txt id="jlwmr8"
~$640/month
```

---

## Key Observations

The user felt confident they were likely overspending but had no structured process for reviewing AI tooling decisions.

Subscriptions had accumulated incrementally over time based on individual developer requests rather than centralized planning.

---

## Direct Quotes

> "We started getting these tools one by one whenever someone asked. Now I don't even know what everyone's using."

> "I'd love a tool that just tells me what to cut. I don't want a spreadsheet, I want a recommendation."

> "The problem is I can't tell if Cursor is actually better than Copilot for my team without running an experiment."

---

## Most Surprising Insight

The user had not realized that Claude Pro and ChatGPT Team overlapped significantly for their writing workflows.

They assumed the products were complementary rather than redundant.

---

## Product Changes Triggered

This interview directly led to:

* adding a "use case" field to the audit flow
* increasing recommendation specificity
* improving overlap detection logic

Without workflow context, recommendations felt too generic.

---

# Interview 2 — P.S.

## Founder, 3-Person Early-Stage Startup

### Date

2026-05-09

### Duration

10 minutes

### Discovery Source

Indie Hackers Slack community

---

## Current Tool Stack

* ChatGPT Plus
* Cursor Pro for contractors

Estimated monthly spend:

```txt id="jlwmc3"
~$60/month
```

---

## Key Observations

The founder did not mentally categorize AI subscriptions as a formal budget category.

Instead, they viewed the spend similarly to infrastructure utilities:

* internet
* hosting
* electricity

This changes how the product should frame savings messaging.

---

## Direct Quotes

> "I don't think of this as a budget line. It's like electricity — I just pay it."

> "I was about to upgrade to Team without knowing what it actually adds."

> "Oh wait, Team is $30 per person? I thought it was $30 flat."

---

## Most Surprising Insight

The user was close to making a recurring upgrade decision based on misunderstanding per-seat pricing.

The audit flow would likely have prevented that mistake immediately.

---

## Product Changes Triggered

This interview led to:

* clearer pricing explanations
* improved Team plan recommendation copy
* additional warnings around per-seat pricing confusion

---

# Interview 3 — A.M.

## CTO, 20-Person Series B Startup

### Date

2026-05-09

### Duration

15 minutes

### Discovery Source

X/Twitter direct outreach

---

## Current Tool Stack

* GitHub Copilot Enterprise
* Claude Enterprise
* OpenAI API usage

---

## Key Observations

This user already had structured finance oversight and initially viewed the tool skeptically.

However, the API spend visibility angle created significantly more interest than seat-based subscription recommendations.

---

## Direct Quotes

> "Enterprise contracts are negotiated, not listed — your pricing data won't be accurate for us."

> "The API spend angle is actually interesting. We have no visibility into which team is burning the most tokens."

> "If you could show me spend per developer I'd use this every month."

---

## Most Surprising Insight

Even relatively mature startups still lacked:

* per-team AI spend visibility
* API usage transparency
* developer-level cost attribution

This made the benchmark and analytics direction feel significantly more valuable.

---

## Product Changes Triggered

This interview led to:

* deprioritizing Enterprise pricing recommendations
* surfacing API spend findings more prominently
* adding benchmark mode to future roadmap ideas
* thinking more seriously about analytics workflows

---

# Overall Interview Takeaways

Across all three conversations, several consistent patterns emerged:

## 1. AI Spend Is Poorly Tracked

Most teams accumulate AI tooling incrementally without centralized review.

---

## 2. Users Want Recommendations, Not Reports

Users consistently preferred:

```txt id="jlwmx2"
clear recommendations
```

over spreadsheet-style breakdowns.

---

## 3. Pricing Confusion Is Common

Per-seat pricing misunderstandings appeared repeatedly, especially around Team plans.

---

## 4. API Spend Visibility Is a Major Opportunity

Larger teams care less about subscription pricing and more about:

* token usage
* team-level visibility
* operational AI spend analytics

---

# Product Direction Changes After Interviews

The interviews directly influenced:

* use case-aware recommendations
* pricing clarification copy
* benchmark mode ideas
* API spend prioritization
* recommendation-focused UI structure

---
