"use client";

import { FormEvent, useState } from "react";
import AppShell from "@/app/components/AppShell";

type AgentResultItem = {
  type: "graph" | "document";
  data: Record<string, unknown>;
};

type AgentResult = {
  success: boolean;
  question?: string;
  responseType?: string;
  answer?: string;

  results?: AgentResultItem[];
  resultCount?: number;

  graphData?: Record<string, unknown>[];
  documentData?: Record<string, unknown>[];

  source?: string;
  sources?: {
    type: string;
    name: string;
    description?: string;
  }[];

  confidence?: "high" | "medium" | "low";

  metadata?: {
    graphRecordCount?: number;
    documentCount?: number;
    routingIntent?: string;
  };

  message?: string;
};

export default function AIAgentPage() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<AgentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestedQuestions = [
    "Which processes are in the knowledge graph?",
    "Which automations are available?",
    "What process dependencies exist?",
    "Which technologies are used?",
    "Which systems are connected?",
    "Which departments are represented?",
  ];

  async function askAgent(customQuestion?: string) {
    const finalQuestion = (customQuestion ?? question).trim();

    if (!finalQuestion) {
      return;
    }

    setQuestion(finalQuestion);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/ai-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: finalQuestion,
        }),
      });

      const data: AgentResult = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "The AI Agent could not process the request."
        );
      }

      setResult(data);
    } catch (err) {
      console.error("AI Agent request failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while contacting the AI Agent."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askAgent();
  }

  function renderValue(value: unknown): string {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : "None";
    }

    if (value === null || value === undefined || value === "") {
      return "—";
    }

    return String(value);
  }

  function getDisplayFields(item: Record<string, unknown>) {
    return Object.entries(item).filter(
      ([key, value]) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        key !== "processId" &&
        key !== "automationId"
    );
  }

  return (
    <AppShell
      title="AI Agent"
      description="Ask questions about processes, automations, systems, technologies, departments and operational dependencies using live knowledge graph data."
    >
      <div className="space-y-8">
        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5">
            <span className="text-violet-300">✦</span>

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-violet-300">
              Operational Intelligence
            </span>
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Ask your operations
            <span className="block text-slate-400">
              knowledge graph.
            </span>
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            Ask questions about your operational processes, automations,
            systems, technologies, departments and process dependencies. The
            current Agent retrieves information directly from the live Neo4j
            knowledge graph.
          </p>
        </section>

        {/* =========================================================
            AGENT STATUS
        ========================================================= */}

        <section className="grid gap-4 md:grid-cols-3">
          <StatusCard
            label="Knowledge Source"
            value="Neo4j Aura"
            description="Live operational graph"
          />

          <StatusCard
            label="Current Agent"
            value="Rule-based"
            description="Grounded graph query engine"
          />

          <StatusCard
            label="AI Providers"
            value="Ready to extend"
            description="OpenAI / Claude architecture"
          />
        </section>

        {/* =========================================================
            QUESTION BOX
        ========================================================= */}

        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-slate-800 bg-[#0b1224] p-2">
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex flex-1 items-center">
                <span className="px-4 text-slate-500">⌕</span>

                <input
                  value={question}
                  onChange={(event) =>
                    setQuestion(event.target.value)
                  }
                  placeholder="Ask a question about your operations..."
                  className="h-12 flex-1 bg-transparent pr-4 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="h-12 rounded-xl bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Querying..." : "Ask Agent"}
              </button>
            </div>
          </div>
        </form>

        {/* =========================================================
            SUGGESTED QUESTIONS
        ========================================================= */}

        <section>
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Suggested questions
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((item) => (
              <button
                key={item}
                onClick={() => askAgent(item)}
                disabled={loading}
                className="rounded-full border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-400 transition hover:border-cyan-900 hover:bg-cyan-950/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* =========================================================
            ERROR
        ========================================================= */}

        {error && (
          <div className="rounded-xl border border-red-900 bg-red-950/20 p-5">
            <div className="flex items-start gap-3">
              <div className="text-red-400">!</div>

              <div>
                <div className="text-sm font-semibold text-red-300">
                  Agent request failed
                </div>

                <div className="mt-1 text-xs leading-6 text-red-300/70">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            LOADING
        ========================================================= */}

        {loading && (
          <div className="rounded-xl border border-slate-800 bg-[#0b1224] p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/5">
                <span className="animate-pulse text-violet-300">
                  ✦
                </span>
              </div>

              <div>
                <div className="text-sm font-medium text-white">
                  Querying knowledge graph
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Retrieving operational relationships from Neo4j Aura...
                </div>
              </div>
            </div>

            <div className="mt-6 h-1 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-violet-400" />
            </div>
          </div>
        )}

        {/* =========================================================
            RESULT
        ========================================================= */}

        {result && !loading && (
          <div className="space-y-6">
            {/* Agent Response */}

            <section className="rounded-xl border border-slate-800 bg-[#0b1224] p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    ✦
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      Agent Response
                    </div>

                    <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-slate-600">
                      {result.responseType || "Knowledge Graph Query"}
                    </div>
                  </div>
                </div>

                <div className="rounded-full border border-emerald-900 bg-emerald-950/20 px-3 py-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-400">
                    Live Data
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm leading-7 text-slate-300">
                  {result.answer}
                </p>
              </div>
            </section>

            {/* =====================================================
                KNOWLEDGE GRAPH RESULTS
            ===================================================== */}

            {result.graphData && result.graphData.length > 0 && (
              <section className="rounded-xl border border-slate-800 bg-[#0b1224] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Knowledge Graph Results
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {result.graphData.length} result
                      {result.graphData.length !== 1 ? "s" : ""} returned
                      from Neo4j
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 px-3 py-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
                      {result.source || "Neo4j Aura"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {result.graphData.map((item, index) => {
                    const fields = getDisplayFields(item);

                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-slate-700"
                      >
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {fields.map(([key, value]) => (
                            <div key={key}>
                              <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                                {formatLabel(key)}
                              </div>

                              <div className="text-xs leading-5 text-slate-300">
                                {renderValue(value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* =====================================================
                DOCUMENT EVIDENCE
            ===================================================== */}

            {result.documentData && result.documentData.length > 0 && (
              <section className="rounded-xl border border-slate-800 bg-[#0b1224] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Retrieved Document Context
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {result.documentData.length} relevant document
                      {result.documentData.length !== 1 ? "s" : ""} retrieved
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 px-3 py-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
                      Evidence
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {result.documentData.map((item, index) => {
                    const fields = getDisplayFields(item);

                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-slate-800 bg-slate-950/40 p-4"
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          {fields.map(([key, value]) => (
                            <div key={key}>
                              <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                                {formatLabel(key)}
                              </div>

                              <div className="whitespace-pre-wrap text-xs leading-6 text-slate-300">
                                {renderValue(value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* =====================================================
                QUERY METADATA
            ===================================================== */}

            <section className="grid gap-4 md:grid-cols-3">
              <MetricCard
                label="Response Type"
                value={result.responseType || "General"}
              />

              <MetricCard
                label="Results"
                value={String(result.resultCount ?? 0)}
              />

              <MetricCard
                label="Source"
                value={result.source || "Neo4j Aura"}
              />
            </section>

            {/* Grounding Notice */}

            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 text-[10px] leading-5 text-slate-600">
              <span className="font-medium text-slate-500">
                Grounding:
              </span>{" "}
              this response is based on data retrieved from the live Neo4j
              knowledge graph. Future LLM providers will use the same graph
              context rather than replacing Neo4j as the operational source of
              truth.
            </div>
          </div>
        )}

        {/* =========================================================
            EMPTY STATE
        ========================================================= */}

        {!result && !loading && !error && (
          <div className="grid gap-4 md:grid-cols-3">
            <CapabilityCard
              icon="◈"
              title="Process Intelligence"
              description="Explore processes and understand how they connect to departments and automations."
            />

            <CapabilityCard
              icon="◇"
              title="Automation Intelligence"
              description="Discover automations, their technologies and the processes they support."
            />

            <CapabilityCard
              icon="◉"
              title="Dependency Analysis"
              description="Understand relationships between processes, systems and operational dependencies."
            />
          </div>
        )}

        {/* =========================================================
            ARCHITECTURE
        ========================================================= */}

        <section className="rounded-xl border border-cyan-900/60 bg-cyan-950/10 p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
                Intelligence Architecture
              </div>

              <h2 className="mt-2 text-lg font-semibold text-white">
                Graph-grounded AI Agent
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">
                Neo4j remains the operational source of truth. The AI provider
                will become a replaceable reasoning layer on top of the
                retrieved graph context.
              </p>
            </div>

            <div className="rounded-full border border-cyan-900 bg-cyan-950/30 px-3 py-1.5 text-[9px] text-cyan-400">
              Provider-ready
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-5">
            <ArchitectureItem label="User Question" />

            <ArchitectureArrow />

            <ArchitectureItem label="Neo4j Context" />

            <ArchitectureArrow />

            <ArchitectureItem label="AI Provider" />

            <ArchitectureArrow />

            <ArchitectureItem label="Grounded Answer" />

            <ArchitectureArrow />

            <ArchitectureItem label="Evidence" />
          </div>
        </section>

        {/* =========================================================
            FOOTER
        ========================================================= */}

        <div className="flex flex-col justify-between gap-3 border-t border-slate-800 pt-5 text-[10px] text-slate-600 md:flex-row">
          <div>AI Operations Lab · Synthetic Enterprise Intelligence</div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Neo4j Aura Connected
          </div>
        </div>
      </div>
    </AppShell>
  );
}

// =============================================================
// COMPONENTS
// =============================================================

function StatusCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b1224] p-5">
      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
        {label}
      </div>

      <div className="mt-3 text-sm font-medium text-white">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-slate-600">
        {description}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b1224] p-5">
      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
        {label}
      </div>

      <div className="mt-3 truncate text-sm font-medium text-slate-300">
        {value}
      </div>
    </div>
  );
}

function CapabilityCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b1224] p-6 transition hover:border-slate-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-300">
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function ArchitectureItem({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-cyan-900/70 bg-slate-950/60 px-4 py-3 text-center text-[10px] font-medium text-slate-300">
      {label}
    </div>
  );
}

function ArchitectureArrow() {
  return (
    <div className="hidden items-center justify-center text-cyan-800 md:flex">
      →
    </div>
  );
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/\_/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}