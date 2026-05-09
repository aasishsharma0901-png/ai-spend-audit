const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export async function generateSummary(auditResult) {
  const { toolResults, totalMonthlySavings, totalAnnualSavings, useCase, teamSize } = auditResult

  const toolList = toolResults.map(t =>
    `${t.tool} (${t.plan}, ${t.seats} seats, $${t.currentMonthlySpend}/mo)`
  ).join(", ")

  const prompt = `You are an AI spend analyst. Write a concise 80-100 word personalized audit summary for a startup team.

Team info:
- Team size: ${teamSize}
- Primary use case: ${useCase}
- Tools being used: ${toolList}
- Total potential monthly savings: $${totalMonthlySavings}
- Total potential annual savings: $${totalAnnualSavings}

Write directly to the user (use "you/your"). Be specific about their tools. Be honest — if savings are low, say they're already optimized. If savings are high, emphasize the opportunity. Do not use bullet points. Write in plain conversational prose. No preamble, just the summary paragraph.`

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    const data = await response.json()
    return data.content[0].text

  } catch (err) {
    console.error("Anthropic API failed, using fallback:", err)
    return generateFallbackSummary(auditResult)
  }
}

function generateFallbackSummary(auditResult) {
  const { totalMonthlySavings, totalAnnualSavings, teamSize, useCase } = auditResult

  if (totalMonthlySavings === 0) {
    return `Your team of ${teamSize} is well-optimized for ${useCase} use cases. Your current AI tool selection and plans appear to be a good fit — no significant overspend detected. Keep an eye on your usage as your team grows, as plan needs can shift quickly.`
  }

  return `Based on your current AI stack, your team of ${teamSize} could save $${totalMonthlySavings}/month ($${totalAnnualSavings}/year) by making a few targeted plan adjustments. The recommendations above are based on your ${useCase} use case and current seat counts. These are not theoretical savings — they reflect real pricing differences available today.`
}