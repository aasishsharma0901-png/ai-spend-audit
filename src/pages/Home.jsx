import { useState, useEffect } from "react"

const TOOLS = [
  { id: "cursor", label: "Cursor", plans: ["Hobby", "Pro", "Business", "Enterprise"] },
  { id: "github_copilot", label: "GitHub Copilot", plans: ["Individual", "Business", "Enterprise"] },
  { id: "claude", label: "Claude", plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API"] },
  { id: "chatgpt", label: "ChatGPT", plans: ["Plus", "Team", "Enterprise", "API"] },
  { id: "anthropic_api", label: "Anthropic API", plans: ["API direct"] },
  { id: "openai_api", label: "OpenAI API", plans: ["API direct"] },
  { id: "gemini", label: "Gemini", plans: ["Pro", "Ultra", "API"] },
  { id: "windsurf", label: "Windsurf", plans: ["Free", "Pro", "Teams"] },
]

const USE_CASES = [
  { id: "coding", label: "Coding" },
  { id: "writing", label: "Writing" },
  { id: "data", label: "Data Analysis" },
  { id: "research", label: "Research" },
  { id: "mixed", label: "Mixed" },
]

const EMPTY_FORM = {
  tools: [],
  teamSize: 1,
  useCase: "mixed",
}

export default function Home() {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("auditForm")
    return saved ? JSON.parse(saved) : EMPTY_FORM
  })

  useEffect(() => {
    localStorage.setItem("auditForm", JSON.stringify(form))
  }, [form])

  const isToolAdded = (id) => form.tools.some(t => t.tool === id)

  const addTool = (id) => {
    if (isToolAdded(id)) return
    const tool = TOOLS.find(t => t.id === id)
    setForm(f => ({
      ...f,
      tools: [...f.tools, { tool: id, plan: tool.plans[0], monthlySpend: 0, seats: 1 }],
    }))
  }

  const removeTool = (id) => {
    setForm(f => ({ ...f, tools: f.tools.filter(t => t.tool !== id) }))
  }

  const updateTool = (id, field, value) => {
    setForm(f => ({
      ...f,
      tools: f.tools.map(t => t.tool === id ? { ...t, [field]: value } : t),
    }))
  }

  const handleSubmit = () => {
    if (form.tools.length === 0) {
      alert("Add at least one tool first.")
      return
    }
    // will wire to results page on Day 3
    console.log("Form data:", form)
    alert("Audit engine coming Day 2!")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI Spend Audit
          </h1>
          <p className="text-gray-500 text-lg">
            Find out where you're overspending on AI tools in 2 minutes.
          </p>
        </div>

        {/* Team info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Your Team</h2>
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Team size</label>
              <input
                type="number"
                min={1}
                value={form.teamSize}
                onChange={e => setForm(f => ({ ...f, teamSize: Number(e.target.value) }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Primary use case</label>
              <select
                value={form.useCase}
                onChange={e => setForm(f => ({ ...f, useCase: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {USE_CASES.map(u => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tool picker */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Which AI tools do you pay for?</h2>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map(t => (
              <button
                key={t.id}
                onClick={() => isToolAdded(t.id) ? removeTool(t.id) : addTool(t.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  isToolAdded(t.id)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                }`}
              >
                {isToolAdded(t.id) ? "✓ " : "+ "}{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Per-tool details */}
        {form.tools.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="font-semibold text-gray-800 mb-4">Tool details</h2>
            <div className="space-y-5">
              {form.tools.map(entry => {
                const toolDef = TOOLS.find(t => t.id === entry.tool)
                return (
                  <div key={entry.tool} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-800">{toolDef.label}</span>
                      <button
                        onClick={() => removeTool(entry.tool)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Plan</label>
                        <select
                          value={entry.plan}
                          onChange={e => updateTool(entry.tool, "plan", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {toolDef.plans.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Monthly spend ($)</label>
                        <input
                          type="number"
                          min={0}
                          value={entry.monthlySpend}
                          onChange={e => updateTool(entry.tool, "monthlySpend", Number(e.target.value))}
                          className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Seats</label>
                        <input
                          type="number"
                          min={1}
                          value={entry.seats}
                          onChange={e => updateTool(entry.tool, "seats", Number(e.target.value))}
                          className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl text-lg transition-all"
        >
          Audit my AI spend →
        </button>

      </div>
    </div>
  )
}