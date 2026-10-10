import Link from "next/link";
import Sidebar from "../components/Sidebar";

const processes = [
  {
    name: "Invoice Processing",
    department: "Finance",
    volume: "12,480 / year",
    manualTime: "18 min",
    automation: "92%",
    impact: "High",
    systems: "SAP · Outlook · Excel",
  },
  {
    name: "Supplier Query Management",
    department: "Procurement",
    volume: "8,240 / year",
    manualTime: "14 min",
    automation: "87%",
    impact: "High",
    systems: "Outlook · SAP",
  },
  {
    name: "Purchase Order Validation",
    department: "Supply Chain",
    volume: "6,720 / year",
    manualTime: "11 min",
    automation: "74%",
    impact: "Medium",
    systems: "SAP · Excel",
  },
  {
    name: "Customer Master Data Updates",
    department: "Operations",
    volume: "4,180 / year",
    manualTime: "9 min",
    automation: "61%",
    impact: "Medium",
    systems: "CRM · Excel",
  },
  {
    name: "Payment Status Requests",
    department: "Finance",
    volume: "5,640 / year",
    manualTime: "7 min",
    automation: "89%",
    impact: "High",
    systems: "SAP · Outlook",
  },
];

export default function ProcessIntelligence() {
  return (
    <>
      <Sidebar />

      <main className="ml-64 min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-950/95">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              {/* Back to Overview */}
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:bg-slate-800 hover:text-white"
              >
                <span className="text-base">←</span>
                <span>Overview</span>
              </Link>

              {/* Divider */}
              <div className="h-8 w-px bg-slate-800" />

              {/* Page title */}
              <div>
                <p className="text-xs text-slate-500">
                  Operations Intelligence Platform
                </p>

                <h1 className="mt-0.5 text-lg font-semibold">
                  Process Intelligence
                </h1>
              </div>
            </div>

            {/* Status */}
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
          {/* Page Introduction */}
          <section>
            <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
              Process Discovery
            </p>

            <div className="mt-3 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight">
                  Understand how your organization operates.
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
                  Analyze operational processes, identify repetitive
                  activities, and evaluate where AI and automation can
                  create the greatest business impact.
                </p>
              </div>

              <button className="shrink-0 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                + Analyze Process
              </button>
            </div>
          </section>

          {/* Summary Cards */}
          <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="Processes Analyzed"
              value="248"
              description="Across 6 business functions"
            />

            <SummaryCard
              label="High Opportunities"
              value="12"
              description="Ready for automation"
            />

            <SummaryCard
              label="Manual Hours"
              value="18,640"
              description="Estimated annually"
            />

            <SummaryCard
              label="Automation Potential"
              value="74%"
              description="Average opportunity score"
            />
          </section>

          {/* Filters */}
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search processes..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

              <button className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800">
                All departments
              </button>

              <button className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800">
                All opportunities
              </button>

              <button className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800">
                Sort: Opportunity
              </button>
            </div>
          </section>

          {/* Process Table */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Process Inventory
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    Identified operational processes
                  </h3>
                </div>

                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                  {processes.length} shown
                </span>
              </div>
            </div>

            {/* Table Header */}
            <div className="hidden grid-cols-12 gap-4 border-b border-slate-800 bg-slate-950/50 px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 md:grid">
              <div className="col-span-3">Process</div>
              <div className="col-span-2">Volume</div>
              <div className="col-span-2">Manual Time</div>
              <div className="col-span-2">Automation</div>
              <div className="col-span-1">Impact</div>
              <div className="col-span-2">Systems</div>
            </div>

            {/* Table Rows */}
            <div>
              {processes.map((process) => (
                <ProcessTableRow
                  key={process.name}
                  process={process}
                />
              ))}
            </div>
          </section>

          {/* AI Insight */}
          <section className="mt-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-slate-900 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-lg text-cyan-400">
                ✦
              </div>

              <div>
                <p className="text-sm font-medium text-cyan-400">
                  AI Operations Insight
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                  Invoice Processing is currently the strongest automation
                  candidate.
                </h3>

                <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
                  The process combines high transaction volume, significant
                  manual effort, and a strong automation potential score.
                  The AI Operations Agent recommends investigating document
                  extraction, classification, validation, and automated
                  response generation as the first optimization
                  opportunities.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

/* Summary Card */

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">
      <p className="text-sm text-slate-400">{label}</p>

      <p className="mt-3 text-3xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* Process Table Row */

function ProcessTableRow({
  process,
}: {
  process: {
    name: string;
    department: string;
    volume: string;
    manualTime: string;
    automation: string;
    impact: string;
    systems: string;
  };
}) {
  return (
    <div className="border-b border-slate-800 px-6 py-5 transition last:border-0 hover:bg-slate-800/30">
      {/* Desktop */}
      <div className="hidden grid-cols-12 items-center gap-4 md:grid">
        <div className="col-span-3">
          <p className="font-medium text-slate-200">
            {process.name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {process.department}
          </p>
        </div>

        <div className="col-span-2 text-sm text-slate-400">
          {process.volume}
        </div>

        <div className="col-span-2 text-sm text-slate-400">
          {process.manualTime}
        </div>

        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400"
                style={{
                  width: process.automation,
                }}
              />
            </div>

            <span className="text-sm font-semibold text-cyan-400">
              {process.automation}
            </span>
          </div>
        </div>

        <div className="col-span-1">
          <ImpactBadge impact={process.impact} />
        </div>

        <div className="col-span-2 text-xs text-slate-500">
          {process.systems}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-medium text-slate-200">
              {process.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {process.department}
            </p>
          </div>

          <ImpactBadge impact={process.impact} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-600">Volume</p>

            <p className="mt-1 text-slate-400">
              {process.volume}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-600">
              Manual Time
            </p>

            <p className="mt-1 text-slate-400">
              {process.manualTime}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-600">
              Automation
            </p>

            <p className="mt-1 font-semibold text-cyan-400">
              {process.automation}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-600">
              Systems
            </p>

            <p className="mt-1 text-slate-400">
              {process.systems}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Impact Badge */

function ImpactBadge({
  impact,
}: {
  impact: string;
}) {
  const high = impact === "High";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs ${
        high
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-amber-500/10 text-amber-400"
      }`}
    >
      {impact}
    </span>
  );
}