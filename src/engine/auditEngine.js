import { PRICING } from "./pricingData"

// ─── individual tool audit rules ───────────────────────────────────────────

function auditCursor(entry) {
  const { plan, seats, monthlySpend } = entry
  const results = []

  if (plan === "Business" && seats <= 3) {
    const currentCost = PRICING.cursor.Business * seats
    const suggestedCost = PRICING.cursor.Pro * seats
    const savings = currentCost - suggestedCost
    if (savings > 0) {
      results.push({
        type: "downgrade",
        recommendation: "Downgrade to Cursor Pro",
        monthlySavings: savings,
        reason: `With ${seats} seat${seats > 1 ? "s" : ""}, Pro ($20/user) covers all core features. Business adds admin controls only needed for larger teams.`,
      })
    }
  }

  if (plan === "Enterprise") {
    results.push({
      type: "review",
      recommendation: "Review Enterprise necessity",
      monthlySavings: 0,
      reason: "Enterprise pricing is custom. Verify you're using SSO, audit logs, and advanced security — otherwise Business may suffice.",
    })
  }

  return results
}

function auditGithubCopilot(entry, useCase) {
  const { plan, seats, monthlySpend } = entry
  const results = []

  if (plan === "Enterprise" && seats <= 5) {
    const savings = (PRICING.github_copilot.Enterprise - PRICING.github_copilot.Business) * seats
    results.push({
      type: "downgrade",
      recommendation: "Downgrade to GitHub Copilot Business",
      monthlySavings: savings,
      reason: `Enterprise adds Copilot Chat in GitHub.com and fine-tuning — rarely needed for teams under 10. Business saves $${savings}/mo for your team size.`,
    })
  }

  if (useCase === "coding" && plan === "Individual" && seats > 1) {
    results.push({
      type: "upgrade_warning",
      recommendation: "Switch to Business plan",
      monthlySavings: 0,
      reason: "Individual plan is per-person and doesn't include org-level policy controls. If you have multiple devs, Business is the correct plan.",
    })
  }

  return results
}

function auditClaude(entry, useCase) {
  const { plan, seats, monthlySpend } = entry
  const results = []

  if (plan === "Team" && seats <= 2) {
    const savings = (PRICING.claude.Team - PRICING.claude.Pro) * seats
    results.push({
      type: "downgrade",
      recommendation: "Switch to Claude Pro (individual)",
      monthlySavings: savings,
      reason: `Team plan requires minimum 5 seats and adds collaboration features. With ${seats} users, Pro at $20/user saves $${savings}/mo with the same model access.`,
    })
  }

  if (plan === "Max" && useCase !== "coding" && useCase !== "research") {
    const savings = (PRICING.claude.Max - PRICING.claude.Pro) * seats
    results.push({
      type: "downgrade",
      recommendation: "Downgrade to Claude Pro",
      monthlySavings: savings,
      reason: `Max plan is for very high-volume users (5x more usage). For ${useCase} use cases, Pro limits are rarely hit. Saves $${savings}/mo.`,
    })
  }

  return results
}

function auditChatGPT(entry, useCase) {
  const { plan, seats, monthlySpend } = entry
  const results = []

  if (plan === "Team" && seats <= 2) {
    const savings = (PRICING.chatgpt.Team - PRICING.chatgpt.Plus) * seats
    results.push({
      type: "downgrade",
      recommendation: "Switch to ChatGPT Plus per user",
      monthlySavings: savings,
      reason: `Team plan adds shared workspace and admin tools. With ${seats} users, individual Plus subscriptions save $${savings}/mo with identical model access.`,
    })
  }

  if (plan === "Plus" && useCase === "coding" && seats >= 1) {
    results.push({
      type: "alternative",
      recommendation: "Consider switching to Cursor Pro",
      monthlySavings: 0,
      reason: "For coding use cases, Cursor Pro ($20/user) provides deeper IDE integration than ChatGPT Plus and may deliver more value per dollar.",
    })
  }

  return results
}

function auditGemini(entry) {
  const { plan, seats } = entry
  const results = []

  if (plan === "Ultra") {
    results.push({
      type: "review",
      recommendation: "Verify Gemini Ultra usage",
      monthlySavings: PRICING.gemini.Ultra * seats,
      reason: `Gemini Pro is free and covers most tasks. Ultra ($20/user) is only justified for heavy multimodal or Workspace-integrated workflows. Could save $${PRICING.gemini.Ultra * seats}/mo.`,
    })
  }

  return results
}

function auditWindsurf(entry, useCase) {
  const { plan, seats } = entry
  const results = []

  if (plan === "Teams" && seats <= 3 && useCase === "coding") {
    const savings = (PRICING.windsurf.Teams - PRICING.windsurf.Pro) * seats
    results.push({
      type: "downgrade",
      recommendation: "Downgrade to Windsurf Pro",
      monthlySavings: savings,
      reason: `Teams plan adds admin controls not needed for small teams. Pro has the same AI features and saves $${savings}/mo.`,
    })
  }

  return results
}

function auditAPISpend(entry) {
  const { tool, monthlySpend } = entry
  const results = []

  if (monthlySpend > 200) {
    results.push({
      type: "credits",
      recommendation: "Buy discounted API credits via Credex",
      monthlySavings: Math.round(monthlySpend * 0.2),
      reason: `At $${monthlySpend}/mo on API spend, discounted credits through Credex could save ~20% ($${Math.round(monthlySpend * 0.2)}/mo) on the same usage.`,
    })
  }

  return results
}

// ─── main audit function ────────────────────────────────────────────────────

export function runAudit(formData) {
  const { tools, teamSize, useCase } = formData
  const toolResults = []

  for (const entry of tools) {
    let findings = []

    switch (entry.tool) {
      case "cursor":
        findings = auditCursor(entry)
        break
      case "github_copilot":
        findings = auditGithubCopilot(entry, useCase)
        break
      case "claude":
        findings = auditClaude(entry, useCase)
        break
      case "chatgpt":
        findings = auditChatGPT(entry, useCase)
        break
      case "gemini":
        findings = auditGemini(entry)
        break
      case "windsurf":
        findings = auditWindsurf(entry, useCase)
        break
      case "anthropic_api":
      case "openai_api":
        findings = auditAPISpend(entry)
        break
      default:
        findings = []
    }

    // if no findings, tool is optimized
    if (findings.length === 0) {
      findings = [{
        type: "optimal",
        recommendation: "Looks good",
        monthlySavings: 0,
        reason: "Your current plan appears well-matched to your team size and use case.",
      }]
    }

    toolResults.push({
      tool: entry.tool,
      plan: entry.plan,
      seats: entry.seats,
      currentMonthlySpend: entry.monthlySpend,
      findings,
    })
  }

  const totalMonthlySavings = toolResults.reduce((sum, t) =>
    sum + t.findings.reduce((s, f) => s + f.monthlySavings, 0), 0
  )

  return {
    toolResults,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    teamSize,
    useCase,
    createdAt: new Date().toISOString(),
  }
}