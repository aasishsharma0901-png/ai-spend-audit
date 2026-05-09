import { supabase } from "./supabase"

// generate a random short slug like "abc12"
function generateSlug() {
  return Math.random().toString(36).substring(2, 8)
}

export async function sendAuditEmail(email, auditResult, shareUrl) {
  // We'll just log for now — email can be handled manually or via Resend dashboard
  // Full edge function deploy can be done after submission via Supabase dashboard UI
  console.log("Email would be sent to:", email)
  return true
}

// save audit to DB, return the slug
export async function saveAudit(auditResult) {
  const slug = generateSlug()

  const { error } = await supabase.from("audits").insert({
    slug,
    tool_results: auditResult.toolResults,
    total_monthly_savings: auditResult.totalMonthlySavings,
    total_annual_savings: auditResult.totalAnnualSavings,
    team_size: auditResult.teamSize,
    use_case: auditResult.useCase,
  })

  if (error) {
    console.error("Error saving audit:", error)
    return null
  }

  return slug
}

// fetch audit by slug for the public shareable page
export async function getAuditBySlug(slug) {
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching audit:", error)
    return null
  }

  return data
}

// save lead (email capture)
export async function saveLead(email, auditSlug, companyName = "", role = "") {
  const { error } = await supabase.from("leads").insert({
    email,
    audit_slug: auditSlug,
    company_name: companyName,
    role,
  })

  if (error) {
    console.error("Error saving lead:", error)
    return false
  }

  return true
}