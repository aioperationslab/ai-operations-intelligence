import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />

      <main className="ml-64 min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/95">
          <div className="flex items-center justify-between px-8 py-5">
            <div>
              <p className="text-sm text-slate-500">
                Operations Intelligence Platform
              </p>
              <h1 className="mt-1 text-lg font-semibold tracking-tight">
                Overview
              </h1>
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

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-8 py-10">
          {/* Hero */}
          <section className="mb-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-cyan-400">
              AI Operations Intelligence
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Turn operational data into intelligent automation decisions.
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
              Discover processes, identify automation opportunities, and use AI
              agents to understand how your organization operates.
            </p>
          </section>

          {/* KPI Cards */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              label="Processes Analyzed"
              value="248"
              change="+18 this month"
            />

            <KpiCard
              label="Automation Opportunities"
              value="37"
              change="12 high priority"
            />

            <KpiCard
              label="Potential Hours Saved"
              value="11,240"
              change="per year"
            />

            <KpiCard
              label="Estimated Value"
              value="€1.8M"
              change="annual potential"
            />
          </section>

          {/* Main Grid */}
          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Process Intelligence */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Process Intelligence
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Operations overview
                  </h2>
                </div>

                <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800">
                  View processes
                </button>
              </div>

              <div className="mt-8 space-y-5">
                <ProcessRow
                  name="Invoice Processing"
                  category="Finance"
                  score="92%"
                  status="High opportunity"
                />

                <ProcessRow
                  name="Supplier Query Management"
                  category="Procurement"
                  score="87%"
                  status="High opportunity"
                />

                <ProcessRow
                  name="Purchase Order Validation"
                  category="Supply Chain"
                  score="74%"
                  status="Potential"
                />

                <ProcessRow
                  name="Customer Master Data Updates"
                  category="Operations"
                  score="61%"
                  status="Under analysis"
                />
              </div>
            </div>

            {/* AI Agent */}
            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-slate-900 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-lg">
                  ✦
                </div>

                <div>
                  <p className="text-sm font-medium text-cyan-400">
                    AI Operations Agent
                  </p>

                  <p className="text-xs text-slate-500">
                    Intelligence layer
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm leading-6 text-slate-400">
                  Ask the agent about your operational processes, automation
                  opportunities, risks, or potential savings.
                </p>

                <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">
                    Suggested question
                  </p>

                  <p className="mt-2 text-sm text-slate-200">
                    Which processes should we automate first?
                  </p>
                </div>

                <button className="mt-4 w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Ask AI Agent →
                </button>
              </div>
            </div>
          </section>

          {/* Intelligence Layer */}
          <section className="mt-6 grid gap-6 md:grid-cols-3">
            <InsightCard
              title="Knowledge Graph"
              description="Connect processes, systems, people, documents and dependencies using a structured operational knowledge graph."
              status="Neo4j"
            />

            <InsightCard
              title="RAG Intelligence"
              description="Ground AI reasoning in enterprise documents, process definitions and operational knowledge."
              status="RAG"
            />

            <InsightCard
              title="Automation Discovery"
              description="Identify repetitive, high-value processes and prioritize them based on impact and feasibility."
              status="AI Agent"
            />
          </section>
        </div>
      </main>
    </>
  );
}

/* KPI Card */

function KpiCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">
      <p className="text-sm text-slate-400">{label}</p>

      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>

      <p className="mt-2 text-xs text-emerald-400">{change}</p>
    </div>
  );
}

/* Process Row */

function ProcessRow({
  name,
  category,
  score,
  status,
}: {
  name: string;
  category: string;
  score: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="font-medium text-slate-200">{name}</p>

        <p className="mt-1 text-xs text-slate-500">{category}</p>
      </div>

      <div className="text-right">
        <p className="font-semibold text-cyan-400">{score}</p>

        <p className="mt-1 text-xs text-slate-500">{status}</p>
      </div>
    </div>
  );
}

/* Intelligence Card */

function InsightCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-400">
          {status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}