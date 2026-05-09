import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const TOOLS = [
  {
    id: "cursor",
    label: "Cursor",
    plans: ["Hobby", "Pro", "Business", "Enterprise"],
    category: "Development",
  },
  {
    id: "github_copilot",
    label: "GitHub Copilot",
    plans: ["Individual", "Business", "Enterprise"],
    category: "Development",
  },
  {
    id: "claude",
    label: "Claude",
    plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API"],
    category: "AI Assistant",
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    plans: ["Plus", "Team", "Enterprise", "API"],
    category: "AI Assistant",
  },
  {
    id: "anthropic_api",
    label: "Anthropic API",
    plans: ["API Direct"],
    category: "API",
  },
  {
    id: "openai_api",
    label: "OpenAI API",
    plans: ["API Direct"],
    category: "API",
  },
  {
    id: "gemini",
    label: "Gemini",
    plans: ["Pro", "Ultra", "API"],
    category: "Research",
  },
  {
    id: "windsurf",
    label: "Windsurf",
    plans: ["Free", "Pro", "Teams"],
    category: "Development",
  },
]

const USE_CASES = [
  { id: "coding", label: "Coding" },
  { id: "writing", label: "Writing" },
  { id: "research", label: "Research" },
  { id: "data", label: "Data Analysis" },
  { id: "mixed", label: "Mixed Workflow" },
]

const EMPTY_FORM = {
  tools: [],
  teamSize: 5,
  useCase: "mixed",
}

export default function Home() {
  const navigate = useNavigate()
const [honeypot, setHoneypot] = useState("")
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("auditForm")
    return saved ? JSON.parse(saved) : EMPTY_FORM
  })

  useEffect(() => {
    localStorage.setItem("auditForm", JSON.stringify(form))
  }, [form])

  const isToolAdded = (id) =>
    form.tools.some((tool) => tool.tool === id)

  const addTool = (id) => {
    if (isToolAdded(id)) return

    const tool = TOOLS.find((t) => t.id === id)

    setForm((prev) => ({
      ...prev,
      tools: [
        ...prev.tools,
        {
          tool: id,
          plan: tool.plans[0],
          monthlySpend: 20,
          seats: 1,
        },
      ],
    }))
  }

  const removeTool = (id) => {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.filter((tool) => tool.tool !== id),
    }))
  }

  const updateTool = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.map((tool) =>
        tool.tool === id
          ? { ...tool, [field]: value }
          : tool
      ),
    }))
  }

  const totalSpend = form.tools.reduce(
    (sum, tool) => sum + tool.monthlySpend * tool.seats,
    0
  )

  const annualSpend = totalSpend * 12

  const estimatedSavings = Math.round(totalSpend * 0.28)

  const handleSubmit = () => {
  if (honeypot) return
  if (form.tools.length === 0) {
    alert("Add at least one tool first.")
    return
  }
  localStorage.setItem("auditForm", JSON.stringify(form))
  navigate("/results")
}

  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-slate-300">
              Enterprise AI Cost Intelligence
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                Optimize
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {" "}AI Spending
                </span>
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Analyze subscriptions, identify redundant tools,
                and reduce unnecessary AI operational costs with
                intelligent spend auditing.
              </p>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-5">

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
                <p className="text-slate-400 text-sm mb-2">
                  Monthly Spend
                </p>

                <h2 className="text-4xl font-bold text-white">
                  ${totalSpend}
                </h2>

                <p className="text-emerald-400 text-sm mt-3">
                  Live tracking
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
                <p className="text-slate-400 text-sm mb-2">
                  Annual Projection
                </p>

                <h2 className="text-4xl font-bold text-white">
                  ${annualSpend}
                </h2>

                <p className="text-cyan-400 text-sm mt-3">
                  Yearly estimate
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
                <p className="text-slate-400 text-sm mb-2">
                  Potential Savings
                </p>

                <h2 className="text-4xl font-bold text-white">
                  ${estimatedSavings}
                </h2>

                <p className="text-yellow-400 text-sm mt-3">
                  Optimization opportunity
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
                <p className="text-slate-400 text-sm mb-2">
                  Active Tools
                </p>

                <h2 className="text-4xl font-bold text-white">
                  {form.tools.length}
                </h2>

                <p className="text-pink-400 text-sm mt-3">
                  Connected services
                </p>
              </div>

            </div>

          </div>
        </motion.div>

        {/* TEAM CONFIG */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 mb-8"
        >

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                Team Configuration
              </h2>

              <p className="text-slate-400 mt-1">
                Configure your organization profile
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
              Active Workspace
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-slate-400 mb-3">
                Team Size
              </label>

              <input
                type="number"
                min={1}
                value={form.teamSize}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    teamSize: Number(e.target.value),
                  }))
                }
                className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-3">
                Primary Use Case
              </label>

              <select
                value={form.useCase}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    useCase: e.target.value,
                  }))
                }
                className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition"
              >
                {USE_CASES.map((useCase) => (
                  <option
                    key={useCase.id}
                    value={useCase.id}
                    className="bg-[#111827]"
                  >
                    {useCase.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </motion.div>

        {/* TOOL PICKER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 mb-8"
        >

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              AI Stack
            </h2>

            <p className="text-slate-400">
              Select the AI services currently used by your team
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() =>
                  isToolAdded(tool.id)
                    ? removeTool(tool.id)
                    : addTool(tool.id)
                }
                className={`group text-left rounded-3xl border transition-all duration-300 p-5 ${
                  isToolAdded(tool.id)
                    ? "border-blue-500 bg-blue-500/10 shadow-2xl shadow-blue-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                }`}
              >

                <div className="flex justify-between items-start mb-5">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                      {tool.category}
                    </p>

                    <h3 className="text-lg font-semibold">
                      {tool.label}
                    </h3>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 transition ${
                      isToolAdded(tool.id)
                        ? "bg-blue-500 border-blue-500"
                        : "border-slate-500"
                    }`}
                  />

                </div>

                <p className="text-sm text-slate-400">
                  {tool.plans.length} pricing plans available
                </p>

              </button>
            ))}

          </div>

        </motion.div>

        {/* TOOL DETAILS */}
        {form.tools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 mb-8"
          >

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Subscription Details
              </h2>

              <p className="text-slate-400">
                Configure spending and seat allocations
              </p>
            </div>

            <div className="space-y-6">

              {form.tools.map((entry) => {
                const toolDef = TOOLS.find(
                  (tool) => tool.id === entry.tool
                )

                return (
                  <div
                    key={entry.tool}
                    className="bg-[#111827]/80 border border-white/10 rounded-3xl p-6"
                  >

                    <div className="flex items-center justify-between mb-6">

                      <div>
                        <h3 className="text-xl font-semibold">
                          {toolDef.label}
                        </h3>

                        <p className="text-slate-400 text-sm mt-1">
                          {toolDef.category}
                        </p>
                      </div>

                      <button
                        onClick={() => removeTool(entry.tool)}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        Remove
                      </button>

                    </div>

                    <div className="grid md:grid-cols-3 gap-5">

                      <div>
                        <label className="block text-sm text-slate-400 mb-3">
                          Plan
                        </label>

                        <select
                          value={entry.plan}
                          onChange={(e) =>
                            updateTool(
                              entry.tool,
                              "plan",
                              e.target.value
                            )
                          }
                          className="w-full bg-[#0F172A] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition"
                        >
                          {toolDef.plans.map((plan) => (
                            <option
                              key={plan}
                              value={plan}
                              className="bg-[#111827]"
                            >
                              {plan}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-400 mb-3">
                          Monthly Spend ($)
                        </label>

                        <input
                          type="number"
                          min={0}
                          value={entry.monthlySpend}
                          onChange={(e) =>
                            updateTool(
                              entry.tool,
                              "monthlySpend",
                              Number(e.target.value)
                            )
                          }
                          className="w-full bg-[#0F172A] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-400 mb-3">
                          Seats
                        </label>

                        <input
                          type="number"
                          min={1}
                          value={entry.seats}
                          onChange={(e) =>
                            updateTool(
                              entry.tool,
                              "seats",
                              Number(e.target.value)
                            )
                          }
                          className="w-full bg-[#0F172A] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition"
                        />
                      </div>

                    </div>

                  </div>
                )
              })}

            </div>

          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          {/* Honeypot — hidden from humans, bots fill this */}
<input
  type="text"
  name="website"
  value={honeypot}
  onChange={e => setHoneypot(e.target.value)}
  style={{ display: "none" }}
  tabIndex={-1}
  autoComplete="off"
/>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:scale-[1.01] transition-all duration-300 text-white font-bold py-5 rounded-3xl text-lg shadow-2xl shadow-blue-500/20"
          >
            Generate AI Spend Report →
          </button>

        </motion.div>

      </div>

    </div>
  )
}