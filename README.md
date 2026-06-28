# InvestIQ — AI Investment Research Agent

An AI-powered investment research platform that helps users evaluate companies through a structured, multi-agent analysis workflow. Simply enter a company name, and InvestIQ researches financial performance, market sentiment, recent news, competitive positioning, and potential risks before generating a clear investment recommendation.

Instead of presenting raw AI responses, InvestIQ organizes the results into a clean, interactive dashboard featuring investment scores, financial charts, competitor analysis, risk assessments, and a detailed investment thesis. Every recommendation is supported by transparent reasoning, making it easier to understand the factors behind the decision.

---

## 🚀 Live Demo

**Demo:** https://your-vercel-app.vercel.app

---

## ✨ Features

* 🤖 Multi-agent AI workflow for company research
* 📊 Investment score with confidence rating
* 📈 Interactive financial charts and analytics
* 📰 News aggregation and market sentiment analysis
* 🏆 Competitor benchmarking
* 🛡️ Risk assessment across multiple categories
* 🐂🐻 Bull vs Bear investment debate
* 👶 Explain Like I'm Five (ELI5) mode
* 📄 Exportable PDF investment report
* ⚡ Live analysis progress with streaming updates
* 🌙 Responsive modern dashboard with dark mode

---

# 🏗️ Architecture

The application follows a multi-agent architecture powered by **LangGraph.js**.

```
User Search
      │
      ▼
 Next.js API
      │
      ▼
LangGraph Workflow

Research Agent
      │
Financial Agent
      │
News Agent
      │
Sentiment Agent
      │
Competitive Agent
      │
Risk Agent
      │
Decision Agent
      │
      ▼
Frontend Dashboard
```

Each agent focuses on one aspect of the research process and contributes its findings to a shared state. The Decision Agent combines all insights to produce the final investment recommendation.

---

# 🤖 AI Workflow

### Research Agent

Collects:

* Company overview
* Industry
* Business model
* Products & services
* Key company information

### Financial Agent

Analyzes:

* Revenue growth
* Profitability
* Margins
* Debt
* Valuation
* Financial health

### News Agent

Summarizes:

* Latest company news
* Important developments
* Positive and negative events

### Sentiment Agent

Analyzes:

* Market sentiment
* Investor opinions
* Overall public perception

### Competitive Agent

Evaluates:

* Competitors
* Market position
* Competitive advantages
* Industry comparison

### Risk Agent

Identifies:

* Financial risks
* Regulatory risks
* Market risks
* Business risks

### Decision Agent

Combines all findings and returns:

* Invest / Watchlist / Pass
* Confidence score
* Investment thesis
* Bull vs Bear analysis
* Key strengths
* Key risks

---

# 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Recharts
* Lucide Icons

### Backend

* Next.js API Routes
* LangGraph.js
* LangChain.js

### AI

* **Groq API**
* **Llama 3.3 70B** *(or your selected Groq model)*

### Other

* jsPDF
* Server-Sent Events (SSE)

---

# 📂 Project Structure

```
src
│
├── app
│   ├── api
│   │   └── analyze
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── charts
│   ├── ui
│   ├── layout
│   └── agents
│
├── hooks
│
├── lib
│   ├── agents
│   ├── graph
│   └── utils
│
├── types
│
└── styles
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/investiq.git
```

Move into the project

```bash
cd investiq
```

Install dependencies

```bash
npm install
```

Create an environment file

```bash
cp .env.example .env.local
```

Add your API key

```env
GROQ_API_KEY=your_groq_api_key
```

Run locally

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🚀 Deploy on Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the following environment variable:

```env
GROQ_API_KEY=your_groq_api_key
```

4. Click **Deploy**.

Your application will be available at:

```
https://your-project.vercel.app
```

---

# 💡 Why LangGraph?

LangGraph was chosen because it provides a clean way to build multi-agent workflows.

Benefits include:

* Shared state between agents
* Modular architecture
* Easy scalability
* Better debugging
* Streaming support
* Future parallel execution

This makes it much easier to extend the application by adding new specialized agents.

---

# ⚖️ Design Decisions

* Sequential agent execution for simplicity and reliability.
* Server-Sent Events (SSE) for live progress updates.
* Groq API for fast and cost-effective LLM inference.
* Recharts for interactive financial visualizations.
* Framer Motion for smooth UI animations.

---

# 🔮 Future Improvements

* Real-time stock market APIs
* Yahoo Finance integration
* SEC filing analysis (RAG)
* Company comparison mode
* Portfolio tracking
* Watchlists
* Authentication
* Multi-LLM comparison
* Voice search
* Agent memory
* Live stock prices

---

# 📸 Sample Analysis

Input

```
NVIDIA
```

Output

```
Recommendation: INVEST

Confidence: 92%

Investment Score: 91/100

Key Strengths

• Strong AI market leadership
• High revenue growth
• Excellent profitability

Key Risks

• Premium valuation
• Semiconductor market cycles
```

---

# ⚠️ Disclaimer

InvestIQ is an AI-powered research tool built for educational and informational purposes. The analysis and recommendations generated by the platform should not be considered financial advice. Always conduct your own research before making investment decisions.

---

## Built With

* Next.js
* React
* TypeScript
* Tailwind CSS
* LangGraph.js
* LangChain.js
* **Groq API**
* Framer Motion
* Recharts
* jsPDF

---

**Developed as part of the AI Product Development Engineer Internship Take-Home Assignment for InsideIIM × Altuni AI Labs.**
