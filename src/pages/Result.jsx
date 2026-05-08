import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { runAudit } from "../engine/auditEngine"

const TOOL_LABELS = {
  cursor: "Cursor",
  github_copilot: "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  anthropic_api: "Anthropic API",
  openai_api: "OpenAI API",
  gemini: "Gemini",
  windsurf: "Windsurf",
}

const TYPE_STYLES = {
  downgrade: {
    bg: "bg-emerald-500/10 border border-emerald-500/20",
    badge: "bg-emerald-500/20 text-emerald-300",
    label: "Cost Reduction",
  },

  alternative: {
    bg: "bg-blue-500/10 border border-blue-500/20",
    badge: "bg-blue-500/20 text-blue-300",
    label: "Alternative",
  },

  credits: {
    bg: "bg-purple-500/10 border border-purple-500/20",
    badge: "bg-purple-500/20 text-purple-300",
    label: "Credits",
  },

  review: {
    bg: "bg-yellow-500/10 border border-yellow-500/20",
    badge: "bg-yellow-500/20 text-yellow-300",
    label: "Review",
  },

  upgrade_warning: {
    bg: "bg-orange-500/10 border border-orange-500/20",
    badge: "bg-orange-500/20 text-orange-300",
    label: "Warning",
  },

  optimal: {
    bg: "bg-white/5 border border-white/10",
    badge: "bg-white/10 text-slate-300",
    label: "Optimal",
  },
}

export default function Results() {
  const navigate = useNavigate()

  const [audit, setAudit] = useState(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("auditForm")

    if (!saved) {
      navigate("/")
      return
    }

    const formData = JSON.parse(saved)
    const result = runAudit(formData)

    setAudit(result)
  }, [])

  if (!audit) return null

  const {
    toolResults,
    totalMonthlySavings,
    totalAnnualSavings,
  } = audit

  const isOptimal = totalMonthlySavings === 0

  const handleEmailSubmit = () => {
    if (!email) return

    console.log("Lead captured:", email)

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/")}
          className="mb-8 text-slate-400 hover:text-white transition flex items-center gap-2"
        >
          ← Back to Dashboard
        </motion.button>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-[36px] p-10 mb-8 border ${
            isOptimal
              ? "bg-white/5 border-white/10"
              : "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/20"
          } backdrop-blur-2xl`}
        >

          {isOptimal ? (
            <div className="text-center">

              <div className="text-7xl mb-5">
                ✅
              </div>

              <h1 className="text-5xl font-black mb-4">
                Your AI Stack Looks Optimized
              </h1>

              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Your current subscriptions appear cost-efficient
                based on your team size and usage patterns.
              </p>

            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-6">
                  Savings Opportunity Identified
                </div>

                <h1 className="text-6xl font-black mb-3">
                  ${totalMonthlySavings.toLocaleString()}
                </h1>

                <p className="text-2xl text-slate-300 mb-4">
                  Potential Monthly Savings
                </p>

                <p className="text-slate-400 leading-relaxed">
                  Your organization may reduce AI operational costs
                  through plan optimization, tool consolidation,
                  and smarter subscription allocation.
                </p>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    Annual Savings
                  </p>

                  <h2 className="text-4xl font-bold">
                    ${totalAnnualSavings.toLocaleString()}
                  </h2>
                </div>

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    AI Services
                  </p>

                  <h2 className="text-4xl font-bold">
                    {toolResults.length}
                  </h2>
                </div>

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    Optimization Score
                  </p>

                  <h2 className="text-4xl font-bold text-emerald-400">
                    82%
                  </h2>
                </div>

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    Estimated ROI
                  </p>

                  <h2 className="text-4xl font-bold text-cyan-400">
                    +31%
                  </h2>
                </div>

              </div>

            </div>
          )}

        </motion.div>

        {/* TOOL BREAKDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[36px] p-8 mb-8"
        >

          <div className="flex items-center justify-between mb-8">

            <div>
              <h2 className="text-3xl font-bold mb-2">
                AI Spend Analysis
              </h2>

              <p className="text-slate-400">
                Detailed breakdown of tool recommendations
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
              Live Audit Results
            </div>

          </div>

          <div className="space-y-6">

            {toolResults.map((toolResult) => (
              <motion.div
                key={toolResult.tool}
                whileHover={{ scale: 1.01 }}
                className="bg-[#111827]/80 border border-white/10 rounded-3xl overflow-hidden"
              >

                {/* Header */}
                <div className="flex justify-between items-center px-7 py-6 border-b border-white/10">

                  <div>

                    <h3 className="text-2xl font-semibold">
                      {TOOL_LABELS[toolResult.tool]}
                    </h3>

                    <p className="text-slate-400 mt-1">
                      {toolResult.plan} ·{" "}
                      {toolResult.seats} seat
                      {toolResult.seats > 1 ? "s" : ""}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-slate-400 text-sm mb-1">
                      Current Cost
                    </p>

                    <h3 className="text-3xl font-bold">
                      ${toolResult.currentMonthlySpend}
                    </h3>

                  </div>

                </div>

                {/* Findings */}
                <div className="p-6 space-y-4">

                  {toolResult.findings.map((finding, index) => {
                    const style =
                      TYPE_STYLES[finding.type] ||
                      TYPE_STYLES.optimal

                    return (
                      <div
                        key={index}
                        className={`rounded-2xl p-5 ${style.bg}`}
                      >

                        <div className="flex justify-between gap-5">

                          <div className="flex-1">

                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${style.badge}`}
                            >
                              {style.label}
                            </span>

                            <h4 className="text-lg font-semibold mt-4 mb-2">
                              {finding.recommendation}
                            </h4>

                            <p className="text-slate-400 leading-relaxed">
                              {finding.reason}
                            </p>

                          </div>

                          {finding.monthlySavings > 0 && (
                            <div className="text-right min-w-[120px]">

                              <p className="text-emerald-400 text-2xl font-bold">
                                -${finding.monthlySavings}
                              </p>

                              <p className="text-slate-400 text-sm">
                                per month
                              </p>

                              <p className="text-slate-500 text-xs mt-2">
                                -$
                                {finding.monthlySavings * 12}
                                /year
                              </p>

                            </div>
                          )}

                        </div>

                      </div>
                    )
                  })}

                </div>

              </motion.div>
            ))}

          </div>

        </motion.div>

        {/* EMAIL CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/20 backdrop-blur-2xl rounded-[36px] p-8"
        >

          {submitted ? (
            <div className="text-center py-8">

              <div className="text-6xl mb-4">
                📩
              </div>

              <h2 className="text-3xl font-bold mb-3">
                Report Successfully Sent
              </h2>

              <p className="text-slate-300">
                Your AI optimization report has been delivered.
              </p>

            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <div className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300 mb-5">
                  Executive Report
                </div>

                <h2 className="text-4xl font-black mb-4">
                  Receive the Full Audit
                </h2>

                <p className="text-slate-300 leading-relaxed">
                  Get a detailed AI cost optimization report,
                  actionable recommendations, and strategic
                  savings insights directly in your inbox.
                </p>

              </div>

              <div>

                <div className="flex gap-3">

                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition"
                  />

                  <button
                    onClick={handleEmailSubmit}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all duration-300 px-7 py-4 rounded-2xl font-semibold whitespace-nowrap"
                  >
                    Send Report
                  </button>

                </div>

              </div>

            </div>
          )}

        </motion.div>

      </div>

    </div>
  )
}