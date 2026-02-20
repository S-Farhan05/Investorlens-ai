# InvestorLens AI – Frontend


First make sure to download required things...

cd frontend
npm install next react react-dom tailwindcss recharts react-hook-form zod
npm run dev

This is the Next.js frontend for InvestorLens AI.
It is responsible for:

- Multi-step structured startup input
- Form validation
- Sending data to backend
- Rendering analytical dashboard
- Visualizing AI agent output

Tech Stack:
- Next.js (App Router)
- Tailwind CSS
- React Hook Form
- Zod
- Recharts

------------------------------------------------------------
🚨 GLOBAL RULE (DO NOT BREAK)

The request and response JSON structure is LOCKED.

Do NOT rename fields.
Do NOT create new field names.
Do NOT change response keys.

Frontend, Backend, and AI Agents must use the SAME variable names.
------------------------------------------------------------


============================================================
🔐 REQUEST STRUCTURE (Frontend → Backend)
============================================================

{
  "startup_name": "",
  "problem_statement": "",
  "solution_description": "",
  "unique_value_proposition": "",
  "target_customer_segment": "",

  "estimated_market_size": 0,
  "geographic_focus": "",
  "competitors": [],
  "market_growth_rate": 0,

  "revenue_model": "",
  "pricing_strategy": "",
  "estimated_monthly_revenue": 0,
  "estimated_burn_rate": 0,
  "funding_stage": "",
  "runway_duration_months": 0,

  "number_of_founders": 0,
  "founders_background": "",
  "years_of_experience": 0,
  "team_ratio": "",
  "previous_startup_experience": false
}

These names must match:
- React Hook Form register()
- Zod schema
- Backend Pydantic model
- AI Agents input
------------------------------------------------------------


============================================================
🔁 RESPONSE STRUCTURE (Backend → Frontend)
============================================================

{
  "failure_probability": 0,
  "risk_category": "",
  "confidence_score": 0,

  "risk_breakdown": {
    "market_risk": 0,
    "competition_risk": 0,
    "execution_risk": 0,
    "financial_risk": 0
  },

  "financial_analysis": {
    "revenue_strength": 0,
    "runway_risk": 0
  },

  "investor_readiness": 0,

  "time_projection": {
    "one_year_outlook": ""
  },

  "executive_summary": "",
  "improvement_suggestions": []
}

DO NOT MODIFY THIS STRUCTURE.
------------------------------------------------------------


============================================================
👨‍💻 MEMBER 1 — Frontend Form & Validation Engineer
============================================================

Owns:
- components/forms/
- lib/validationSchema.ts
- lib/api.ts
- app/analyze/page.tsx

Responsibilities:
- Build MultiStepForm
- Implement Business, Market, Financial, Team forms
- Use React Hook Form
- Use Zod validation
- Enforce min length rules (e.g., 150 chars)
- Submit to backend /analyze endpoint

Important:
Every input must use EXACT field names:

Example:
register("startup_name")
register("solution_description")
register("estimated_burn_rate")

DO NOT:
- Rename fields
- Send null instead of empty arrays
- Change JSON structure


============================================================
👨‍🎨 MEMBER 2 — Dashboard & Visualization Engineer
============================================================

Owns:
- components/dashboard/
- app/dashboard/page.tsx

Responsibilities:
- Render:
  - Failure Probability Gauge
  - Risk Breakdown Bar Chart
  - Radar Chart
  - Financial Graph
  - Investor Readiness Card
  - Executive Summary Panel
  - Improvement Suggestions
  - Time Projection

Must use:
- Recharts
- Tailwind CSS

Must consume EXACT keys:

data.failure_probability
data.risk_breakdown.market_risk
data.financial_analysis.runway_risk
data.executive_summary

DO NOT:
- Create new response fields
- Hardcode values
- Rename backend keys


============================================================
🧪 HOW TO RUN FRONTEND
============================================================

1. Install dependencies
   npm install

2. Run development server
   npm run dev

3. Backend must be running on:
   http://localhost:8000

------------------------------------------------------------

This frontend depends completely on backend schema alignment.
If backend changes field names, frontend will break.