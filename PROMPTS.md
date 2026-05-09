# PROMPTS.md

# AI Prompt Documentation

This document contains the prompts used for AI-generated summaries inside AI Spend Audit.

The AI layer is intentionally limited to:

* summarization
* explanation
* personalization

All financial calculations and savings recommendations are generated through deterministic rule-based logic inside the audit engine.

AI is intentionally not used for pricing calculations to avoid hallucinated savings estimates and maintain deterministic outputs.

---

# AI Summary Prompt

Used in:

```txt
src/lib/summary.js
```

Purpose:

* generate a concise personalized audit summary
* explain optimization opportunities
* improve perceived product intelligence
* make audit results feel more actionable

---

## Final User Prompt

```txt
You are an AI spend analyst helping startup teams optimize AI software costs.

Write a concise 80–100 word personalized audit summary.

Team information:

- Team size: ${teamSize}
- Primary use case: ${useCase}
- Tools currently used: ${toolList}
- Total potential monthly savings: $${totalMonthlySavings}
- Total potential annual savings: $${totalAnnualSavings}

Instructions:
- Write directly to the user using "you" and "your"
- Mention relevant tools naturally where appropriate
- Be honest and realistic
- If savings are low, explain that the stack already appears relatively optimized
- If savings are high, emphasize the optimization opportunity clearly
- Do not exaggerate or invent savings
- Do not use bullet points
- Use plain conversational business language
- Output only the summary paragraph with no introduction or preamble
```

---

# Prompt Design Decisions

## Why "Write Directly to the User"

Without this instruction, the model frequently responded in third person, which felt detached and less conversational.

Using direct language improved:

* readability
* personalization
* product feel

---

## Why "Be Honest"

Without explicit honesty constraints, the model tended to frame every audit positively, even when savings opportunities were minimal.

This instruction helped produce more realistic summaries for already optimized stacks.

---

## Why "No Preamble"

The model initially added phrases such as:

```txt
Here is your summary:
```

This negatively affected the UI layout and made summaries feel less integrated into the product experience.

The explicit instruction removed unnecessary wrapper text.

---

## Why the Word Limit Exists

Constraining summaries to 80–100 words improved:

* mobile readability
* scan speed
* visual consistency

Longer outputs felt overwhelming inside the dashboard card layout.

---

# What Did Not Work Well

## Generic Prompts

Early versions of the prompt did not include:

* use case
* tool list
* savings context

This caused summaries to feel generic and repetitive.

---

## Bullet Point Output

Bullet-style summaries looked visually disconnected from the product UI and felt more like raw reports than personalized insights.

---

## Model Used

* Provider: OpenRouter
* Model: claude-haiku-4-5-20251001
* Max tokens: 200
* Temperature: default

The model was selected because it produced:

* concise outputs
* consistent formatting
* lower latency
* more controllable response length for dashboard UI constraints

---

## API Call Structure

```js
{
  model: "claude-haiku-4-5-20251001",
  max_tokens: 200,
  messages: [
    {
      role: "user",
      content: prompt
    }
  ]
}
```

The application sends the generated prompt dynamically using the current audit results and user inputs.

Fallback handling is triggered automatically if the request fails or returns invalid output.

---

## GPT-4o Testing

GPT-4o produced stronger writing quality overall, but responses were:

* longer
* harder to constrain
* less visually consistent

Claude Haiku-style outputs were more predictable for compact dashboard summaries.

---

# Fallback Handling

If the AI request fails, the application falls back to:

```txt
generateFallbackSummary()
```

which returns a deterministic templated summary using the same audit data.

Fallback behavior was intentionally implemented to:

* avoid broken UX
* preserve audit usability
* reduce dependency on external AI availability

Failure handling was tested by temporarily using invalid API credentials during development.

---

# Future Prompt Improvements

Potential future improvements:

* benchmark-aware summaries
* industry-specific recommendations
* confidence scoring
* prioritized recommendations
* multilingual support
* executive-style reporting

---
