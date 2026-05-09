import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { getAuditBySlug } from "../lib/api"

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

export default function PublicAudit() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [audit, setAudit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getAuditBySlug(slug).then((data) => {
      if (!data) {
        setNotFound(true)
      } else {
        setAudit(data)
      }

      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        Loading audit...
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6">

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-10 text-center max-w-lg">

          <div className="text-6xl mb-5">
            ⚠️
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Audit Not Found
          </h1>

          <p className="text-slate-400 mb-8">
            The shared audit link may be invalid or expired.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all duration-300 text-white px-6 py-3 rounded-2xl font-semibold"
          >
            Run Your Own Audit →
          </button>

        </div>

      </div>
    )
  }

  const isOptimal = audit.total_monthly_savings === 0
  const isHighSavings = audit.total_monthly_savings > 500

  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >

          <p className="text-slate-300 text-sm">
            This is a shared AI spend audit report.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-white text-slate-900 hover:bg-slate-100 transition-all px-5 py-2 rounded-xl font-semibold text-sm"
          >
            Audit My Stack →
          </button>

        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-[36px] p-10 mb-8 border backdrop-blur-2xl ${
            isOptimal
              ? "bg-white/5 border-white/10"
              : "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/20"
          }`}
        >

          {isOptimal ? (
            <div className="text-center">

              <div className="text-7xl mb-5">
                ✅
              </div>

              <h1 className="text-5xl font-black mb-4">
                This Team Is Spending Well
              </h1>

              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                No significant AI overspend detected across the current tool stack.
              </p>

            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-6">
                  Shared Audit Report
                </div>

                <h1 className="text-6xl font-black mb-3">
                  ${Number(audit.total_monthly_savings).toLocaleString()}
                </h1>

                <p className="text-2xl text-slate-300 mb-4">
                  Potential Monthly Savings
                </p>

                <p className="text-slate-400 leading-relaxed">
                  This organization could reduce AI operational costs
                  through smarter subscription allocation and plan optimization.
                </p>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    Annual Savings
                  </p>

                  <h2 className="text-4xl font-bold">
                    ${Number(audit.total_annual_savings).toLocaleString()}
                  </h2>
                </div>

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    Tools Audited
                  </p>

                  <h2 className="text-4xl font-bold">
                    {audit.tool_results.length}
                  </h2>
                </div>

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    Optimization Score
                  </p>

                  <h2 className="text-4xl font-bold text-emerald-400">
                    83%
                  </h2>
                </div>

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    Efficiency Gain
                  </p>

                  <h2 className="text-4xl font-bold text-cyan-400">
                    +28%
                  </h2>
                </div>

              </div>

            </div>
          )}

        </motion.div>

        {/* Credex CTA */}
        {isHighSavings && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 backdrop-blur-2xl rounded-[36px] p-8 mb-8"
          >

            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <div className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300 mb-5">
                  Credex Recommendation
                </div>

                <h2 className="text-4xl font-black mb-4">
                  Capture More Savings
                </h2>

                <p className="text-slate-300 leading-relaxed">
                  Credex provides discounted AI infrastructure credits
                  sourced from unused enterprise commitments.
                </p>

              </div>

              <div className="flex justify-start lg:justify-end">

                <a
                  href="https://credex.rocks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-indigo-700 hover:bg-slate-100 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-lg"
                >
                  Book Consultation →
                </a>

              </div>

            </div>

          </motion.div>
        )}

        {/* Tool Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[36px] p-8 mb-8"
        >

          <div className="mb-8">

            <h2 className="text-3xl font-bold mb-2">
              Audit Breakdown
            </h2>

            <p className="text-slate-400">
              Detailed recommendations for each AI service
            </p>

          </div>

          <div className="space-y-6">

            {audit.tool_results.map((toolResult) => (
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >

          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold text-lg"
          >
            Audit My Own AI Stack →
          </button>

        </motion.div>

      </div>

    </div>
  )
}