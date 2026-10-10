import Link from "next/link";
import Sidebar from "../components/Sidebar";

const suggestedQuestions = [
  "Which processes should we automate first?",
  "Where are we losing the most manual hours?",
  "Which processes have the highest business impact?",
  "What are the biggest automation opportunities?",
];

const recentInsights = [
  {
    title: "Invoice Processing",
    description:
      "High transaction volume and manual effort make this the strongest automation candidate.",
    score: "92%",
  },
  {
    title: "Supplier Query Management",
    description:
      "High repetitive workload with strong potential for AI-assisted classification and response.",
    score: "87%",
  },
  {
    title: "Payment Status Requests",
    description:
      "Frequent requests across Finance could be handled through automated retrieval and response.",
    score: "89%",
  },
];

export default function AIAgent() {
  return (
    <>
      <Sidebar />

      <main className="ml-64 min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/95">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:bg-slate-800 hover:text-white"
              >
                <span>←</span>
                <span>Overview</span>
              </Link>

              <div className="h-8 w-px bg-slate-800" />

              <div>
                <p className="text-xs text-slate-500">
                  Operations Intelligence Platform
                </p>

                <h1 className="mt-0.5 text-lg font-semibold">
                  AI Operations Agent
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                ● System Online
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-medium">
                FZ
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-8 py-10">
          {/* Hero */}
          <section>
            <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
              Intelligence Layer
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Ask your operations data.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
              Use the AI Operations Agent to understand processes, identify
              automation opportunities, investigate operational risks, and
              discover where AI can create the greatest business impact.
            </p>
          </section>

          {/* Main Agent Area */}
          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Chat */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 lg:col-span-2">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-lg text-cyan-400">
                    ✦
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      AI Operations Agent
                    </h3>

                    <p className="text-xs text-slate-500">
                      Operational intelligence assistant
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  Ready
                </span>
              </div>

              {/* Conversation */}
              <div className="min-h-[420px] px-6 py-8">
                {/* Agent message */}
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-sm text-cyan-400">
                    ✦
                  </div>

                  <div className="max-w-2xl">
                    <p className="text-xs text-slate-500">
                      AI Operations Agent
                    </p>

                    <div className="mt-2 rounded-2xl rounded-tl-none border border-slate-800 bg-slate-950 p-4">
                      <p className="text-sm leading-6 text-slate-300">
                        Hello. I can analyze your operational processes and
                        help identify where AI and automation could create
                        the greatest impact.
                      </p>

                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        Try asking me about automation opportunities,
                        manual effort, business impact, or process risks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Example User Question */}
                <div className="mt-8 flex justify-end">
                  <div className="max-w-xl rounded-2xl rounded-tr-none bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950">
                    Which processes should we automate first?
                  </div>
                </div>

                {/* Example Agent Response */}
                <div className="mt-8 flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-sm text-cyan-400">
                    ✦
                  </div>

                  <div className="max-w-2xl">
                    <p className="text-xs text-slate-500">
                      AI Operations Agent
                    </p>

                    <div className="mt-2 rounded-2xl rounded-tl-none border border-cyan-500/20 bg-cyan-500/5 p-5">
                      <p className="text-sm leading-6 text-slate-300">
                        Based on the current process inventory, I would
                        prioritize the following opportunities:
                      </p>

                      <div className="mt-4 space-y-3">
                        <Recommendation
                          rank="01"
                          name="Invoice Processing"
                          score="92%"
                        />

                        <Recommendation
                          rank="02"
                          name="Payment Status Requests"
                          score="89%"
                        />

                        <Recommendation
                          rank="03"
                          name="Supplier Query Management"
                          score="87%"
                        />
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-400">
                        These processes combine high transaction volume,
                        repetitive manual work, and strong automation
                        potential.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-slate-800 p-5">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Ask about your operations..."
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                  />

                  <button className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                    Ask Agent →
                  </button>
                </div>

                <p className="mt-2 text-[10px] text-slate-600">
                  AI-generated insights should be validated before making
                  business decisions.
                </p>
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              {/* Suggested Questions */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Suggested Questions
                </p>

                <div className="mt-4 space-y-2">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-left text-sm text-slate-300 transition hover:border-cyan-400/30 hover:bg-slate-800 hover:text-white"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Agent Capabilities */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Agent Capabilities
                </p>

                <div className="mt-5 space-y-4">
                  <Capability
                    title="Process Analysis"
                    description="Understand process structure and operational workload."
                  />

                  <Capability
                    title="Opportunity Detection"
                    description="Identify high-value automation candidates."
                  />

                  <Capability
                    title="Impact Analysis"
                    description="Estimate potential time and business impact."
                  />

                  <Capability
                    title="Knowledge Retrieval"
                    description="Ground answers in enterprise operational knowledge."
                  />
                </div>
              </div>

              {/* Architecture */}
              <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-slate-900 p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-cyan-400">
                  Intelligence Architecture
                </p>

                <div className="mt-5 space-y-2">
                  <ArchitectureItem label="User Question" />

                  <ArchitectureArrow />

                  <ArchitectureItem label="AI Agent" />

                  <ArchitectureArrow />

                  <ArchitectureItem label="RAG + Knowledge Graph" />

                  <ArchitectureArrow />

                  <ArchitectureItem label="LLM Reasoning" />

                  <ArchitectureArrow />

                  <ArchitectureItem label="Recommendation" />
                </div>
              </div>
            </div>
          </section>

          {/* Recent Insights */}
          <section className="mt-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Agent Context
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  Recent operational insights
                </h3>
              </div>

              <Link
                href="/process-intelligence"
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                View processes →
              </Link>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {recentInsights.map((insight) => (
                <Insight
                  key={insight.title}
                  title={insight.title}
                  description={insight.description}
                  score={insight.score}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

/* Recommendation */

function Recommendation({
  rank,
  name,
  score,
}: {
  rank: string;
  name: string;
  score: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-cyan-400">
          {rank}
        </span>

        <span className="text-sm text-slate-200">
          {name}
        </span>
      </div>

      <span className="text-sm font-semibold text-cyan-400">
        {score}
      </span>
    </div>
  );
}

/* Capability */

function Capability({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

        <p className="text-sm font-medium text-slate-200">
          {title}
        </p>
      </div>

      <p className="mt-1 pl-3.5 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* Architecture */

function ArchitectureItem({
  label,
}: {
  label: string;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-center text-xs text-slate-300">
      {label}
    </div>
  );
}

function ArchitectureArrow() {
  return (
    <div className="text-center text-xs text-cyan-400">
      ↓
    </div>
  );
}

/* Insight */

function Insight({
  title,
  description,
  score,
}: {
  title: string;
  description: string;
  score: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-slate-200">
          {title}
        </h4>

        <span className="text-sm font-semibold text-cyan-400">
          {score}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}