# ARCHITECTURE.md

# AI Spend Audit — System Architecture

## Architecture Philosophy

The application was intentionally designed as a lightweight client-heavy architecture to maximize development speed, reduce backend complexity, and provide instant feedback to users during the audit flow.

The core audit engine runs entirely client-side, which avoids unnecessary backend compute and creates a faster, more responsive user experience.

The backend is primarily used for:

* persistence
* public shareable reports
* lead capture
* asynchronous services

This approach matched the assignment’s MVP-oriented constraints and rapid iteration goals.

---

# System Diagram

```mermaid
graph TD

A[User fills spend form] --> B[React audit engine runs client-side]

B --> C[Results page renders instantly]

C --> D[Supabase stores audit]

C --> E[AI summary generated]

D --> F[Public slug generated]

F --> G[/audit/:slug public page]

C --> H[Lead capture form]

H --> I[Supabase stores lead]

H --> J[Email workflow prepared via Resend]

G --> K[Public audit fetched from Supabase]
```

---

# Data Flow

## 1. User Input

The user enters:

* AI tools
* pricing plans
* monthly spend
* team size
* workflow type

The form state is stored locally using localStorage for persistence between refreshes.

---

## 2. Audit Engine Execution

After submission:

```txt
runAudit(formData)
```

executes entirely in the browser.

The audit engine:

* evaluates pricing inefficiencies
* checks for overlapping subscriptions
* generates downgrade opportunities
* calculates monthly savings
* calculates annual savings
* produces structured findings

No backend request is required for the core calculations.

---

## 3. Results Rendering

The results dashboard renders immediately after calculations complete.

The UI displays:

* savings metrics
* optimization findings
* AI-generated summary
* shareable audit links

---

## 4. AI Summary Generation

An asynchronous API request is sent to the AI provider through OpenRouter.

The AI model is only responsible for:

* summarization
* explanation
* personalization

The AI does NOT perform financial calculations.

This separation was intentional to maintain deterministic audit logic.

---

## 5. Audit Persistence

Audit results are stored in Supabase.

Each audit receives:

* unique slug
* timestamp
* summarized findings
* public share identifier

This enables public audit sharing.

---

## 6. Public Share Pages

Public routes follow this structure:

```txt
/audit/:slug
```

The public page fetches audit data from Supabase and renders a sanitized read-only version of the report.

Sensitive user information is intentionally excluded.

---

## 7. Lead Capture

Users can optionally submit their email address to receive audit results.

Lead information is stored in Supabase for:

* future outreach
* product validation
* lead-generation tracking

---

# Stack Overview

## Frontend

### React + Vite

Chosen for:

* rapid iteration speed
* ecosystem maturity
* fast local development
* deployment simplicity

### Tailwind CSS

Chosen for:

* utility-first styling
* faster UI iteration
* responsive design efficiency

### Framer Motion

Used for:

* transitions
* micro-interactions
* perceived UI polish

### React Router

Used for:

* client-side routing
* public audit pages
* dynamic shareable URLs

---

# Backend & Services

## Supabase

Used for:

* PostgreSQL database
* audit persistence
* lead capture
* public audit retrieval

Chosen because it provides:

* hosted infrastructure
* fast setup
* REST APIs
* low operational overhead

---

## OpenRouter

Used as a proxy layer for AI-generated summaries.

Chosen because:

* unified API access across multiple LLM providers
* lower MVP development cost
* simpler experimentation during rapid iteration

The AI model is only responsible for:

* summarization
* explanation
* personalization

The core financial audit logic remains fully deterministic and rule-based.

If the AI request fails, the application falls back to a static templated summary.

---

## Resend

Prepared for:

* transactional email delivery

Integrated through:

* Supabase Edge Function architecture

A simplified fallback implementation was used during development due to local Windows CLI deployment limitations.

---

## Backend Language Decision

No custom backend server was written.

Supabase's hosted PostgreSQL database, REST APIs, and Edge Function architecture replaced the need for a separate backend runtime.

This significantly reduced infrastructure overhead and accelerated development during the 7-day sprint.

---

# Deployment

## Netlify

Chosen because:

* GitHub integration is simple
* deployment is instant
* free tier supports MVP needs
* frontend hosting workflow is minimal

React Router SPA redirects are configured using:

```txt
/* /index.html 200
```

---

# Security Considerations

* Environment variables are excluded from version control
* Public audit pages intentionally exclude sensitive user information
* Shareable pages are slug-based and read-only
* API keys are managed through deployment platform environment settings
* No authentication layer was implemented due to MVP scope constraints

---

## Security Incident During Development

During development, API keys were accidentally committed to `README.md`.

All exposed keys were immediately:

* revoked
* regenerated
* removed from documentation

Environment variables are now managed exclusively through deployment platform configuration and local `.env` files excluded from version control.

This incident reinforced the importance of secure secret management practices even during rapid MVP development.

---

# Key Tradeoffs

## Client-side Audit Logic

### Pros

* instant calculations
* lower backend costs
* simpler infrastructure
* faster development

### Cons

* business rules are visible publicly
* calculations are not server-verified

This tradeoff was accepted because the assignment prioritized rapid MVP delivery and user experience.

---

## JavaScript Instead of TypeScript

### Pros

* faster shipping speed
* reduced setup overhead
* simpler debugging during MVP phase

### Cons

* weaker type safety
* reduced scalability for large teams

This decision was made intentionally given the 7-day project timeline.

---

# Scaling Considerations

## Scaling to 10k Audits/Day

The architecture is already relatively scalable because:

* audit calculations run client-side
* backend load remains low
* Supabase handles persistence separately

Future scaling would likely require:

* Redis caching for public audit pages
* queue-based AI summary generation
* backend rate limiting
* CDN edge caching
* server-side analytics pipelines

Supabase Pro infrastructure would likely be sufficient for early-stage scaling.

---

# Future Improvements

Potential future upgrades:

* authentication system
* organization workspaces
* PDF export
* benchmark analytics
* spend trend visualization
* role-based collaboration
* historical audit tracking
* server-side audit validation
* billing integrations

---
