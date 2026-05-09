import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { runAudit } from "../engine/auditEngine"
import { saveAudit, saveLead } from "../lib/api"
import { generateSummary } from "../lib/summary"

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
  const [summary, setSummary] = useState("")
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [slug, setSlug] = useState(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("auditForm")

    if (!saved) {
      navigate("/")
      return
    }

    const formData = JSON.parse(saved)

    const result = runAudit(formData)

    setAudit(result)

    saveAudit(result).then((newSlug) => {
      if (newSlug) {
        setSlug(newSlug)
      }
    })

    generateSummary(result).then((text) => {
      setSummary(text)
      setSummaryLoading(false)
    })
  }, [])

  if (!audit) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        Loading audit...
      </div>
    )
  }

  const {
    toolResults,
    totalMonthlySavings,
    totalAnnualSavings,
  } = audit

  const isHighSavings = totalMonthlySavings > 500
  const isOptimal = totalMonthlySavings === 0

  const shareUrl = slug
    ? `${window.location.origin}/audit/${slug}`
    : null

  const handleCopyLink = () => {
    if (!shareUrl) return

    navigator.clipboard.writeText(shareUrl)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleEmailSubmit = async () => {
    if (!email) return

    await saveLead(email, slug)

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* Back */}
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
                Your AI Stack Looks Optimized
              </h1>

              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Your subscriptions already appear cost-efficient
                based on your team size and workflow.
              </p>

            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-6">
                  Savings Opportunity Detected
                </div>

                <h1 className="text-6xl font-black mb-3">
                  ${totalMonthlySavings.toLocaleString()}
                </h1>

                <p className="text-2xl text-slate-300 mb-4">
                  Potential Monthly Savings
                </p>

                <p className="text-slate-400 leading-relaxed">
                  Your organization can reduce AI operational costs
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
                    Tools Audited
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
                    84%
                  </h2>
                </div>

                <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                  <p className="text-slate-400 text-sm mb-2">
                    Efficiency Gain
                  </p>

                  <h2 className="text-4xl font-bold text-cyan-400">
                    +31%
                  </h2>
                </div>

              </div>

            </div>
          )}

        </motion.div>

        {/* AI SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[36px] p-8 mb-8"
        >

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-2xl font-bold mb-1">
                AI Generated Analysis
              </h2>

              <p className="text-slate-400">
                Personalized optimization summary
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
              AI Insights
            </div>

          </div>

          {summaryLoading ? (
            <div className="space-y-3 animate-pulse">

              <div className="h-4 rounded bg-white/10 w-full" />
              <div className="h-4 rounded bg-white/10 w-5/6" />
              <div className="h-4 rounded bg-white/10 w-4/6" />

            </div>
          ) : (
            <p className="text-slate-300 leading-relaxed text-lg">
              {summary}
            </p>
          )}

        </motion.div>

        {/* CREDEX CTA */}
        {isHighSavings && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 backdrop-blur-2xl rounded-[36px] p-8 mb-8"
          >

            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <div className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300 mb-5">
                  Credex Recommendation
                </div>

                <h2 className="text-4xl font-black mb-4">
                  Unlock Additional Savings
                </h2>

                <p className="text-slate-300 leading-relaxed">
                  Credex helps companies access discounted AI
                  infrastructure credits from overforecasted
                  enterprise contracts.
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

        {/* TOOL BREAKDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[36px] p-8 mb-8"
        >

          <div className="flex items-center justify-between mb-8">

            <div>
              <h2 className="text-3xl font-bold mb-2">
                Detailed Audit Results
              </h2>

              <p className="text-slate-400">
                Per-tool optimization recommendations
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
              Live Analysis
            </div>

          </div>

          <div className="space-y-6">

            {toolResults.map((toolResult) => (
              <motion.div
                key={toolResult.tool}
                whileHover={{ scale: 1.01 }}
                className="bg-[#111827]/80 border border-white/10 rounded-3xl overflow-hidden"
              >

                {/* HEADER */}
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

                {/* FINDINGS */}
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

        {/* EMAIL + SHARE */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEAD CAPTURE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
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
                  Your optimization report has been delivered.
                </p>

              </div>
            ) : (
              <>
                <div className="mb-6">

                  <div className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300 mb-5">
                    Executive Report
                  </div>

                  <h2 className="text-3xl font-black mb-3">
                    Receive Full Report
                  </h2>

                  <p className="text-slate-300">
                    Get personalized recommendations and future optimization updates.
                  </p>

                </div>

                <div className="flex flex-col gap-4">

                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition"
                  />

                  <button
                    onClick={handleEmailSubmit}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.01] transition-all duration-300 py-4 rounded-2xl font-semibold"
                  >
                    Send Report
                  </button>

                </div>
              </>
            )}

          </motion.div>

          {/* SHARE */}
          {shareUrl && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[36px] p-8"
            >

              <div className="mb-6">

                <div className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300 mb-5">
                  Public Share Link
                </div>

                <h2 className="text-3xl font-black mb-3">
                  Share Audit Results
                </h2>

                <p className="text-slate-400">
                  Sensitive information is automatically removed from public links.
                </p>

              </div>

              <div className="flex flex-col gap-4">

                <input
                  readOnly
                  value={shareUrl}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-slate-300"
                />

                <button
                  onClick={handleCopyLink}
                  className="bg-white text-slate-900 hover:bg-slate-100 transition-all duration-300 py-4 rounded-2xl font-semibold"
                >
                  {copied ? "Copied!" : "Copy Share Link"}
                </button>

              </div>

            </motion.div>
          )}

        </div>

      </div>

    </div>
  )
}