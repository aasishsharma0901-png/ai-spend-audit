# METRICS.md

# Product Metrics & Success Criteria

---

# North Star Metric

## Audits Completed Per Week

Primary metric:

```txt id="jlwmm2"
completed audits per week
```

This was chosen because a completed audit represents the moment the product successfully delivers value to the user.

Everything else flows downstream from this event:

* email capture
* consultation intent
* sharing behavior
* revenue opportunities

A completed audit indicates that:

* the landing page messaging worked
* the onboarding flow was clear
* the user trusted the product enough to finish the experience

---

# Why Other Metrics Were Not Chosen

## Why DAU Was Rejected

Daily active users are not a strong fit for this product because AI spend audits are:

* infrequent
* operational
* decision-oriented

Most teams would realistically use the product:

```txt id="jlwmx7"
once every few weeks or once per quarter
```

rather than daily.

---

## Why Revenue Was Rejected

Revenue is too far downstream during the MVP phase.

Early validation should focus on:

* product usefulness
* audit completion
* recommendation quality
* consultation intent

before optimizing monetization.

---

# Primary Input Metrics

## 1. Visitor → Audit Completion Rate

Target:

```txt id="jlwmp8"
>35%
```

### Why It Matters

Measures:

* landing page clarity
* onboarding friction
* perceived value

### Failure Signal

If below:

```txt id="jlwm01"
20%
```

possible causes include:

* unclear value proposition
* overly long form
* weak CTA copy
* confusing onboarding

---

## 2. Audit → Email Capture Rate

Target:

```txt id="jlwmd9"
>30%
```

### Why It Matters

Measures whether users perceive the audit results as valuable enough to retain.

### Failure Signal

If below:

```txt id="jlwm88"
15%
```

possible causes include:

* weak results presentation
* low perceived savings value
* poor timing of email request
* insufficient recommendation quality

---

## 3. High-Savings Audit → Consultation Booking Rate

Target:

```txt id="jlwm74"
>15%
```

### Why It Matters

This is the primary revenue-driving metric for Credex.

It measures whether:

* recommendations feel credible
* savings feel meaningful
* CTA placement is effective

### Failure Signal

If below:

```txt id="jlwm66"
10%
```

likely issues include:

* weak CTA messaging
* low trust
* insufficiently compelling savings opportunities
* poor results hierarchy

---

# Initial Instrumentation Plan

The first analytics events to track would be:

| Event                    | Purpose                            |
| ------------------------ | ---------------------------------- |
| Audit completed          | Core product success metric        |
| Email captured           | Lead conversion signal             |
| Share link copied        | Viral / referral signal            |
| Consultation CTA clicked | Revenue intent signal              |
| Most selected tools      | Product and pricing prioritization |

---

# Analytics Stack Decision

Initial analytics requirements are intentionally lightweight.

Recommended setup:

* Plausible Analytics
* simple Supabase event logging

A full analytics platform was intentionally avoided during MVP development to reduce:

* implementation overhead
* tracking complexity
* maintenance burden

---

# Pivot Triggers

After approximately:

```txt id="jlwme5"
200 completed audits
```

the following conditions would trigger product reevaluation.

---

## Scenario 1 — Low Email Capture

Condition:

```txt id="jlwmz1"
<10% email capture rate
```

Interpretation:

* results page may not feel valuable enough
* audit recommendations may feel generic
* users may not trust the output

Potential response:

* improve recommendation quality
* redesign results hierarchy
* increase perceived value before email request

---

## Scenario 2 — Zero Consultation Bookings

Condition:

```txt id="jlwmu7"
0 consultation bookings
```

Possible explanations:

* audit engine too conservative
* savings opportunities too small
* CTA messaging ineffective
* low trust in Credex offer

First response:

```txt id="jlwmg4"
A/B test CTA messaging and placement
```

before changing audit logic.

---

## Scenario 3 — Low Average Savings

Condition:

```txt id="jlwmt2"
average displayed savings under $50
```

Interpretation:

* pricing data may be outdated
* recommendations too conservative
* overlap logic too weak

Potential response:

* recalibrate recommendation thresholds
* expand supported tooling
* improve overlap detection

---

# Long-Term Metrics

Potential future metrics:

* repeat audit rate
* consultation conversion rate
* share-driven acquisition
* benchmark engagement
* team expansion usage
* retained monthly active organizations

---

# Product Philosophy Behind Metrics

The metrics strategy intentionally prioritizes:

* delivered user value
* actionable behavior
* operational usefulness

over vanity metrics such as:

* page views
* raw signups
* social impressions

The product succeeds only if users genuinely feel:

```txt id="jlwmh3"
the audit helped them make a better tooling decision
```

---
