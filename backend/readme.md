# InvestorLens AI – Backend

cd backend
python -m venv venv
# Activate venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
# Install directly
pip install fastapi uvicorn pydantic openai
uvicorn main:app --reload


This is the FastAPI backend for InvestorLens AI.

It is responsible for:
- API security
- Schema validation
- Multi-agent orchestration
- Aggregation logic
- Structured JSON output

Tech Stack:
- Python
- FastAPI
- Pydantic
- LLM Provider (OpenAI / Gemini / Groq)

------------------------------------------------------------
🚨 GLOBAL RULE (DO NOT BREAK)

Field names must EXACTLY match frontend.

Do NOT rename any request or response fields.
Do NOT modify JSON structure.
------------------------------------------------------------


============================================================
🔐 REQUEST MODEL (StartupInput)
============================================================

Must exactly match frontend:

class StartupInput(BaseModel):
    startup_name: str
    problem_statement: str
    solution_description: str
    unique_value_proposition: str
    target_customer_segment: str

    estimated_market_size: float
    geographic_focus: str
    competitors: list[str]
    market_growth_rate: float | None

    revenue_model: str
    pricing_strategy: str
    estimated_monthly_revenue: float
    estimated_burn_rate: float
    funding_stage: str
    runway_duration_months: int

    number_of_founders: int
    founders_background: str
    years_of_experience: int
    team_ratio: str
    previous_startup_experience: bool


============================================================
🔁 RESPONSE MODEL (AnalysisResponse)
============================================================

class AnalysisResponse(BaseModel):
    failure_probability: float
    risk_category: str
    confidence_score: float

    risk_breakdown: dict
    financial_analysis: dict

    investor_readiness: float
    time_projection: dict

    executive_summary: str
    improvement_suggestions: list[str]


============================================================
🤖 MEMBER 4 — Multi-Agent AI Engineer
============================================================

Owns:
- agents/
- utils/llm_client.py

Responsibilities:
- Implement:
  - risk_agent.py
  - financial_agent.py
  - vc_agent.py

Each agent receives:
data.dict()

Agents must return structured dictionaries only.

Do NOT:
- Return raw LLM text
- Change output field names
- Modify response schema


============================================================
🧠 MEMBER 5 — Orchestrator & Aggregation Engineer
============================================================

Owns:
- services/orchestrator.py
- services/aggregator.py

Responsibilities:
- Call all 3 agents
- Combine outputs
- Compute weighted failure_probability
- Determine risk_category
- Compute confidence_score
- Generate time_projection

Weighted formula example:

failure_probability =
(0.4 × risk average) +
(0.35 × financial_risk) +
(0.25 × (100 - investor_readiness))

Must return EXACT AnalysisResponse format.

Do NOT:
- Change response keys
- Skip schema validation
- Call LLM directly from main.py


============================================================
👨‍🔧 MEMBER 3 — Backend API & Schema Engineer
============================================================

Owns:
- main.py
- schemas/

Responsibilities:
- Define StartupInput
- Define AnalysisResponse
- Implement /analyze endpoint
- Connect orchestrator

Example:

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze(data: StartupInput):
    return run_full_analysis(data)

Must include:
- Proper error handling
- Validation
- Graceful failure if one agent fails


============================================================
🧪 HOW TO RUN BACKEND
============================================================

1. Create virtual environment
   python -m venv venv

2. Activate it
   source venv/bin/activate  (Mac/Linux)
   venv\Scripts\activate     (Windows)

3. Install dependencies
   pip install -r requirements.txt

4. Run server
   uvicorn main:app --reload

Server runs at:
http://localhost:8000

------------------------------------------------------------

Backend is responsible for:
- API key protection
- Multi-agent orchestration
- JSON schema validation
- Secure architecture

Frontend must NEVER call LLM directly.