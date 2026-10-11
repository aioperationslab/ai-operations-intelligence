"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/app/components/AppShell";

type Process = {
  processId: string;
  processName: string;
  departmentName: string;

  automationId: string;
  automationName: string;

  maturity: "Production" | "Pilot" | "Other";
  confidence: number;

  systems: number;
  dependencies: number;

  opportunityScore: number;
  priority: "High" | "Medium" | "Low";
};

type ApiResponse = {
  success: boolean;

  summary: {
    processes: number;
    production: number;
    pilot: number;
    averageConfidence: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
    averageOpportunity: number;
  };

  processes: Process[];
};

export default function ProcessIntelligencePage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(
    null
  );

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const response = await fetch("/api/process-intelligence", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load process intelligence data.");
        }

        const result: ApiResponse = await response.json();

        if (!result.success) {
          throw new Error("Process intelligence API returned an error.");
        }

        setData(result);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load process intelligence from Neo4j.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProcesses = useMemo(() => {
    if (!data) return [];

    if (filter === "All") {
      return data.processes;
    }

    return data.processes.filter(
      (process) => process.priority === filter
    );
  }, [data, filter]);

  return (
    <AppShell
      title="Process Intelligence"
      description="Analyze operational processes, automation maturity, dependencies and opportunities using the live knowledge graph."
    >
      <div>
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-[#0b1626] p-10 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />

            <p className="text-sm text-slate-400">
              Loading process intelligence from Neo4j...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-900/60 bg-red-950/20 p-6">
            <div className="font-semibold text-red-400">
              Process Intelligence unavailable
            </div>

            <p className="mt-2 text-sm text-slate-400">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* KPI cards */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Processes"
                value={data.summary.processes}
                description="Processes in knowledge graph"
              />

              <MetricCard
                label="Production"
                value={data.summary.production}
                description="Processes with production automation"
              />

              <MetricCard
                label="Pilot"
                value={data.summary.pilot}
                description="Processes currently in pilot"
              />

              <MetricCard
                label="Average Confidence"
                value={`${data.summary.averageConfidence}%`}
                description="Across automated processes"
                accent
              />
            </div>

            {/* Secondary KPIs */}
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <SecondaryMetric
                label="High Priority"
                value={data.summary.highPriority}
                description="Immediate improvement candidates"
                type="high"
              />

              <SecondaryMetric
                label="Medium Priority"
                value={data.summary.mediumPriority}
                description="Processes worth reviewing"
                type="medium"
              />

              <SecondaryMetric
                label="Average Opportunity"
                value={data.summary.averageOpportunity}
                description="Opportunity score out of 100"
                type="opportunity"
              />
            </div>

            {/* Process Portfolio */}
            <section className="mt-8 rounded-2xl border border-slate-800 bg-[#0b1626]">
              <div className="border-b border-slate-800 px-6 py-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Process Portfolio
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Live operational processes ranked by maturity,
                      confidence, dependencies and automation opportunity.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {["All", "High", "Medium", "Low"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`rounded-lg border px-4 py-2 text-xs font-medium transition ${
                          filter === item
                            ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                            : "border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-800">
                {filteredProcesses.map((process) => (
                  <ProcessRow
                    key={process.processId}
                    process={process}
                    onClick={() => setSelectedProcess(process)}
                  />
                ))}

                {filteredProcesses.length === 0 && (
                  <div className="px-6 py-10 text-center text-sm text-slate-500">
                    No processes match this filter.
                  </div>
                )}
              </div>
            </section>

            {/* Insight panels */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <ConfidenceDistribution processes={data.processes} />

              <DepartmentCoverage processes={data.processes} />
            </div>

            {/* Synthetic data notice */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-800 bg-[#081321] px-5 py-4">
              <div>
                <div className="text-xs font-medium text-slate-300">
                  Synthetic enterprise dataset
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  AI Operations Lab · Neo4j knowledge graph
                </div>
              </div>

              <div className="text-[11px] text-slate-500">
                Knowledge Graph Intelligence · LIVE
              </div>
            </div>
          </>
        )}
      </div>

      {/* Process detail modal */}
      {selectedProcess && (
        <ProcessDetail
          process={selectedProcess}
          onClose={() => setSelectedProcess(null)}
        />
      )}
    </AppShell>
  );
}

/* =========================================================
   KPI COMPONENTS
========================================================= */

function MetricCard({
  label,
  value,
  description,
  accent = false,
}: {
  label: string;
  value: string | number;
  description: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b1626] p-5">
      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div
        className={`mt-3 text-3xl font-semibold ${
          accent ? "text-cyan-400" : "text-white"
        }`}
      >
        {value}
      </div>

      <div className="mt-2 text-[11px] text-slate-600">
        {description}
      </div>
    </div>
  );
}

function SecondaryMetric({
  label,
  value,
  description,
  type,
}: {
  label: string;
  value: number;
  description: string;
  type: "high" | "medium" | "opportunity";
}) {
  const valueClass =
    type === "high"
      ? "text-red-400"
      : type === "medium"
        ? "text-amber-400"
        : "text-cyan-400";

  return (
    <div className="rounded-xl border border-slate-800 bg-[#091422] p-5">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className={`mt-2 text-2xl font-semibold ${valueClass}`}>
        {value}
      </div>

      <div className="mt-1 text-[11px] text-slate-600">
        {description}
      </div>
    </div>
  );
}

/* =========================================================
   PROCESS ROW
========================================================= */

function ProcessRow({
  process,
  onClick,
}: {
  process: Process;
  onClick: () => void;
}) {
  const maturityScore =
    process.maturity === "Production"
      ? 100
      : process.maturity === "Pilot"
        ? 60
        : 0;

  return (
    <button
      onClick={onClick}
      className="group block w-full text-left transition hover:bg-slate-900/40"
    >
      <div className="px-6 py-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <PriorityBadge priority={process.priority} />

              <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-500">
                {process.processId}
              </span>

              <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-500">
                {process.maturity}
              </span>
            </div>

            <h3 className="text-sm font-medium text-white group-hover:text-cyan-300">
              {process.processName}
            </h3>

            <div className="mt-1 text-xs text-slate-500">
              {process.departmentName} · {process.automationName}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <ProcessMetric
              label="Opportunity"
              value={process.opportunityScore}
              accent
            />

            <ProcessMetric
              label="Confidence"
              value={`${process.confidence}%`}
            />

            <ProcessMetric
              label="Maturity"
              value={maturityScore}
            />

            <ProcessMetric
              label="Systems"
              value={process.systems}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

function ProcessMetric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div
        className={`mt-1 text-lg font-semibold ${
          accent ? "text-cyan-400" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles =
    priority === "High"
      ? "border-red-500/30 bg-red-500/10 text-red-400"
      : priority === "Medium"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${styles}`}
    >
      {priority}
    </span>
  );
}

/* =========================================================
   CONFIDENCE DISTRIBUTION
========================================================= */

function ConfidenceDistribution({
  processes,
}: {
  processes: Process[];
}) {
  const buckets = [
    {
      label: "90–100%",
      count: processes.filter((p) => p.confidence >= 90).length,
    },
    {
      label: "80–89%",
      count: processes.filter(
        (p) => p.confidence >= 80 && p.confidence < 90
      ).length,
    },
    {
      label: "70–79%",
      count: processes.filter(
        (p) => p.confidence >= 70 && p.confidence < 80
      ).length,
    },
    {
      label: "<70%",
      count: processes.filter((p) => p.confidence < 70).length,
    },
  ];

  const max = Math.max(
    ...buckets.map((bucket) => bucket.count),
    1
  );

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#0b1626] p-6">
      <h2 className="text-base font-semibold">
        Automation Confidence
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Confidence distribution across processes
      </p>

      <div className="mt-6 space-y-5">
        {buckets.map((bucket) => (
          <div key={bucket.label}>
            <div className="mb-2 flex justify-between text-[11px]">
              <span className="text-slate-300">
                {bucket.label}
              </span>

              <span className="text-slate-500">
                {bucket.count} processes
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all"
                style={{
                  width: `${(bucket.count / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   DEPARTMENT COVERAGE
========================================================= */

function DepartmentCoverage({
  processes,
}: {
  processes: Process[];
}) {
  const departments = Array.from(
    new Set(processes.map((process) => process.departmentName))
  )
    .map((department) => ({
      department,
      count: processes.filter(
        (process) => process.departmentName === department
      ).length,
    }))
    .sort((a, b) => b.count - a.count);

  const max = Math.max(
    ...departments.map((item) => item.count),
    1
  );

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#0b1626] p-6">
      <h2 className="text-base font-semibold">
        Process Coverage by Department
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Distribution of processes across the operating model
      </p>

      <div className="mt-6 space-y-4">
        {departments.map((item) => (
          <div key={item.department}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                {item.department}
              </span>

              <span className="text-xs font-semibold text-white">
                {item.count}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400"
                style={{
                  width: `${(item.count / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS DETAIL
========================================================= */

function ProcessDetail({
  process,
  onClose,
}: {
  process: Process;
  onClose: () => void;
}) {
  const maturityScore =
    process.maturity === "Production"
      ? 100
      : process.maturity === "Pilot"
        ? 60
        : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-[#091422] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 p-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <PriorityBadge priority={process.priority} />

              <span className="text-xs text-slate-500">
                {process.processId}
              </span>
            </div>

            <h2 className="text-2xl font-semibold">
              {process.processName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {process.departmentName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <DetailMetric
              label="Opportunity"
              value={process.opportunityScore}
            />

            <DetailMetric
              label="Confidence"
              value={`${process.confidence}%`}
            />

            <DetailMetric
              label="Maturity"
              value={maturityScore}
            />

            <DetailMetric
              label="Systems"
              value={process.systems}
            />
          </div>

          {/* Automation */}
          <DetailSection title="Automation">
            <div className="rounded-xl border border-slate-800 bg-[#07111f] p-4">
              <div className="text-sm font-medium">
                {process.automationName}
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400">
                  {process.automationId}
                </span>

                <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400">
                  {process.maturity}
                </span>
              </div>
            </div>
          </DetailSection>

          {/* Systems */}
          <DetailSection title="Systems">
            <div className="text-sm text-slate-400">
              {process.systems} system
              {process.systems === 1 ? "" : "s"} connected to this
              automation.
            </div>
          </DetailSection>

          {/* Dependencies */}
          <DetailSection title="Dependencies">
            <div className="text-sm text-slate-400">
              {process.dependencies > 0
                ? `${process.dependencies} process ${
                    process.dependencies === 1 ? "dependency" : "dependencies"
                  } identified.`
                : "No process dependencies identified."}
            </div>
          </DetailSection>

          {/* Intelligence */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Process Intelligence
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              This process has an opportunity score of{" "}
              <span className="font-semibold text-white">
                {process.opportunityScore}
              </span>{" "}
              based on its automation confidence, maturity, system
              complexity and dependency structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#07111f] p-4">
      <div className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 text-xl font-semibold text-white">
        {value}
      </div>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </div>

      {children}
    </div>
  );
}