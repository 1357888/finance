# InvestIQ — AI Investment Research Agent

> A production-quality, multi-agent investment research platform built with Next.js, LangGraph.js, and GPT-4o.

---

## 🚀 Live Demo

Deploy to Vercel in one click — see deployment section below.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 7 Specialized Agents | Research, Financial, News, Sentiment, Competitive, Risk, Decision |
| 📊 Investment Scorecard | 8-dimension scoring (0–100 per dimension) |
| ⚡ Real-time Streaming | Live agent execution timeline via SSE |
| 🐂🐻 Bull vs Bear Debate | Two AI analysts argue for and against the investment |
| 📈 Financial Charts | Revenue trends, profit comparison (Recharts) |
| 🎯 Risk Radar | Spider chart + severity-tagged risk list |
| 👶 ELI5 Mode | Simplified explanation anyone can understand |
| 📄 PDF Export | Professional downloadable report (jsPDF) |
| 🌙 Dark Glassmorphism UI | Modern, responsive, animated dark UI |
| ❓ Follow-up Q&A | 5 auto-generated investor questions answered |

---

## 🏗 Architecture

```
User Input (company name)
        ↓
   Next.js API Route (/api/analyze)
        ↓
┌─────────────────────────────────────┐
│          LangGraph Workflow         │
│                                     │
│  1. Research Agent                  │
│     └─ Company overview, products   │
│  2. Financial Agent                 │
│     └─ Margins, P/E, revenue trends │
│  3. News Agent                      │
│     └─ News items + sentiment tags  │
│  4. Sentiment Agent                 │
│     └─ Reddit, Twitter, analysts    │
│  5. Competitive Agent               │
│     └─ Competitors, moat, threats   │
│  6. Risk Agent                      │
│     └─ Risk categories + scoring    │
│  7. Decision Agent ◄─────all above  │
│     └─ INVEST / WATCHLIST / PASS    │
└─────────────────────────────────────┘
        ↓ SSE stream
   Frontend (React) renders live
```

Each agent is a node in a **sequential LangGraph state machine**. The state accumulates outputs across nodes and the Decision Agent reads the complete state to synthesize a final recommendation.

---

## 📁 Folder Structure

```
ai-investment-agent/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/route.ts     ← SSE streaming API
│   │   ├── globals.css              ← Glassmorphism design tokens
│   │   ├── layout.tsx
│   │   └── page.tsx                 ← Main app page
│   ├── components/
│   │   ├── agents/
│   │   │   └── AgentTimeline.tsx    ← Live execution timeline
│   │   ├── charts/
│   │   │   ├── FinancialCharts.tsx  ← Revenue/profit charts
│   │   │   └── RiskRadar.tsx        ← Risk spider chart
│   │   ├── layout/
│   │   │   ├── HeroSection.tsx
│   │   │   └── ResultsDashboard.tsx ← Main results view
│   │   └── ui/
│   │       ├── BullBearDebate.tsx
│   │       ├── CompanyOverview.tsx
│   │       ├── InvestmentThesis.tsx
│   │       ├── NewsPanel.tsx
│   │       ├── RecommendationBadge.tsx
│   │       ├── ScoreCard.tsx
│   │       └── SearchBar.tsx
│   ├── hooks/
│   │   └── useAnalysis.ts           ← SSE state management hook
│   ├── lib/
│   │   ├── agents/                  ← 7 LLM-powered agent modules
│   │   │   ├── researchAgent.ts
│   │   │   ├── financialAgent.ts
│   │   │   ├── newsAgent.ts
│   │   │   ├── sentimentAgent.ts
│   │   │   ├── competitiveAgent.ts
│   │   │   ├── riskAgent.ts
│   │   │   └── decisionAgent.ts
│   │   ├── langgraph/
│   │   │   └── graph.ts             ← LangGraph state machine
│   │   └── utils/
│   │       ├── llm.ts               ← LLM client (OpenAI)
│   │       └── pdfExport.ts         ← jsPDF report generator
│   └── types/
│       └── index.ts                 ← All TypeScript interfaces
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🧠 Why LangGraph?

LangGraph was chosen over a simple chain for several reasons:

1. **State accumulation** — Each agent's output is merged into a shared state, making it trivially accessible to downstream agents without explicit data passing.
2. **Conditional routing** — Easy to add `addConditionalEdges` for early-exit paths (e.g., skip sentiment if news fails).
3. **Parallelism ready** — Agents like News + Sentiment + Competitive can be parallelized with `Send` in a future iteration.
4. **Observability** — LangGraph's streaming API lets us emit events per-node, enabling the real-time execution timeline UI.
5. **Extensibility** — Adding a new agent is just `addNode` + `addEdge`.

---

## ⚖️ Design Trade-offs

| Decision | Choice | Alternative | Reason |
|---|---|---|---|
| Agent execution | Sequential | Parallel | Simpler for MVP; easy to parallelize later |
| LLM data source | GPT-4o knowledge | Real APIs | No API key friction; add Alpha Vantage etc. easily |
| Streaming | SSE | WebSocket | SSE is simpler for one-directional server→client |
| PDF generation | jsPDF (client) | Server-side PDF | Avoids server memory overhead |
| State management | Custom hook + SSE | Zustand/Redux | Minimal dependencies for this scope |

---

## 🛠️ Setup & Installation

### 1. Clone and install

```bash
git clone <your-repo>
cd ai-investment-agent
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local and add your OPENAI_API_KEY
```

### 3. Run locally

```bash
npm run dev
# Visit http://localhost:3000
```

---

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
vercel
# Add OPENAI_API_KEY in Vercel dashboard → Settings → Environment Variables
```

Or deploy via Vercel's GitHub integration for automatic deployments.

> **Note:** Set `maxDuration = 120` in the API route (already configured) to handle the ~60–90s analysis time on Vercel's Pro plan.

---

## 🔮 Future Improvements

- [ ] Parallel agent execution (LangGraph `Send` API)
- [ ] Real financial data via Alpha Vantage / Yahoo Finance API
- [ ] Real news via NewsAPI / Exa
- [ ] RAG with SEC EDGAR filings
- [ ] Company comparison mode (side-by-side)
- [ ] Watchlist with saved analyses (Supabase / Prisma)
- [ ] Voice input
- [ ] Agent memory across sessions
- [ ] Multi-LLM comparison (GPT-4o vs Claude vs Gemini)
- [ ] Live stock price via WebSocket
- [ ] Rate limiting (Upstash Redis)

---

## 📝 Example LLM Interaction Log

**Research Agent prompt (system):**
> You are a company research analyst. Given a company name, output a JSON object with: companyName, ticker, industry, description, marketCap, revenue, employees, founded, headquarters, products, website...

**Research Agent response (Apple):**
```json
{
  "companyName": "Apple Inc.",
  "ticker": "AAPL",
  "industry": "Consumer Electronics & Software",
  "description": "Apple designs, manufactures and sells smartphones, personal computers, tablets, wearables and accessories worldwide. The company also offers related services including the App Store, iCloud, Apple Music, and Apple TV+.",
  "marketCap": "$3.1T",
  "revenue": "$391B TTM",
  "employees": "164,000",
  ...
}
```

**Decision Agent prompt includes all 6 prior agent outputs** and returns a structured decision with recommendation, confidence, scorecard, bull/bear debate, thesis, ELI5, and follow-up QA.

---

## ⚠️ Disclaimer

InvestIQ is an AI-powered research tool for **informational purposes only**. It does not constitute financial advice. Always conduct your own due diligence before making investment decisions.

---

## 📸 Screenshots

*(Add screenshots after deployment)*

---

Built with ❤️ using Next.js 14, LangGraph.js, OpenAI GPT-4o, TailwindCSS, and Recharts.
