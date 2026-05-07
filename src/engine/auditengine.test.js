import { describe, it, expect } from "vitest"
import { runAudit } from "./auditEngine"

describe("Audit Engine", () => {

  it("recommends downgrade from Cursor Business to Pro for small teams", () => {
    const result = runAudit({
      tools: [{ tool: "cursor", plan: "Business", seats: 2, monthlySpend: 80 }],
      teamSize: 2,
      useCase: "coding",
    })
    const finding = result.toolResults[0].findings[0]
    expect(finding.type).toBe("downgrade")
    expect(finding.monthlySavings).toBe(40) // (40-20) * 2
  })

  it("recommends downgrade from Claude Team to Pro for small teams", () => {
    const result = runAudit({
      tools: [{ tool: "claude", plan: "Team", seats: 2, monthlySpend: 60 }],
      teamSize: 2,
      useCase: "writing",
    })
    const finding = result.toolResults[0].findings[0]
    expect(finding.type).toBe("downgrade")
    expect(finding.monthlySavings).toBe(20) // (30-20) * 2
  })

  it("marks optimal tools correctly", () => {
    const result = runAudit({
      tools: [{ tool: "cursor", plan: "Pro", seats: 5, monthlySpend: 100 }],
      teamSize: 5,
      useCase: "coding",
    })
    const finding = result.toolResults[0].findings[0]
    expect(finding.type).toBe("optimal")
  })

  it("calculates total monthly savings correctly", () => {
    const result = runAudit({
      tools: [
        { tool: "cursor", plan: "Business", seats: 2, monthlySpend: 80 },
        { tool: "claude", plan: "Team", seats: 2, monthlySpend: 60 },
      ],
      teamSize: 2,
      useCase: "coding",
    })
    expect(result.totalMonthlySavings).toBe(60) // 40 + 20
    expect(result.totalAnnualSavings).toBe(720)
  })

  it("flags high API spend for Credex credits recommendation", () => {
    const result = runAudit({
      tools: [{ tool: "openai_api", plan: "API direct", seats: 1, monthlySpend: 500 }],
      teamSize: 3,
      useCase: "mixed",
    })
    const finding = result.toolResults[0].findings[0]
    expect(finding.type).toBe("credits")
    expect(finding.monthlySavings).toBeGreaterThan(0)
  })

})