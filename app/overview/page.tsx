"use client";

import { useEffect, useMemo, useState } from "react";

import AppShell from "@/app/components/AppShell";

type Opportunity = {
  processId: string;
  process: string;
  department: string;
  automationId: string;
  automation: string;
  maturity: string;
  confidence: number;
  opportunityScore: number;
  priority: "High" | "Medium" | "Low";
  systemCount: number;
  dependencyCount: number;
};

type OverviewSummary = {
  processes: number;
  automations: number;
  production: number;
  pilot: number;
  averageConfidence: number;
  relationships: number;
  systems: number;
  technologies: number;
  departments?: number;
  nodes: number;

  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
  averageOpportunity: number;

  // Backward-compatible fields
  totalProcesses?: number;
  totalAutomations?: number;
  productionAutomations?: number;
  pilotAutomations?: number;
  totalRelationships?: number;
  totalSystems?: number;
  totalTechnologies?: number;
};

type Technology = {
  technology: string;
  automationCount: number;
};

type Department = {
  department: string;
  processCount: number;
};

type OverviewResponse = {
  success: boolean;
  source: string;
  summary: OverviewSummary;
  opportunities: Opportunity[];
  technologies: Technology[];
  departments: Department[];
};

function MetricCard({
  label,
  value,
  description,
  accent = "default",
}: {
  label: string;
  value: string | number;
  description: string;
  accent?: "default" | "cyan" | "purple" | "green" | "yellow";
}) {
  const accentClass = {
    default: "text-white",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    green: "text-emerald-400",
    yellow: "text-yellow-400",
  }[accent];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {label}
      </div>

      <div className={`mt-3 text-3xl font-semibold ${accentClass}`}>
        {value}
      </div>

      <div className="mt-2 text-xs text-slate-500">
        {description}
      </div>
    </div>
  );
}

function ProgressBar({
  value,
  max = 100,
}: {
  value: number;
  max?: number;
}) {
  const percentage = Math.min(
    100,
    Math.max(0, (value / max) * 100)
  );

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
      <div
        className="h-full rounded-full bg-cyan-400 transition-all duration-500"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}

function getPriorityClass(priority: Opportunity["priority"]) {
  switch (priority) {
    case "High":
      return "border-red-500/30 bg-red-500/10 text-red-400";

    case "Medium":
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";

    default:
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
  }
}

function getScoreClass(score: number) {
  if (score >= 70) {
    return "text-red-400";
  }

  if (score >= 40) {
    return "text-yellow-400";
  }

  return "text-emerald-400";
}

function OpportunityCard({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-slate-700">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${getPriorityClass(
                opportunity.priority
              )}`}
            >
              {opportunity.priority}
            </span>

            <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[10px] text-slate-400">
              {opportunity.processId}
            </span>

            <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[10px] text-slate-400">
              {opportunity.maturity}
            </span>
          </div>

          <h3 className="text-base font-semibold text-white">
            {opportunity.process}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {opportunity.department} · {opportunity.automation}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 lg:min-w-[320px]">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              Opportunity
            </div>

            <div
              className={`mt-1 text-xl font-semibold ${getScoreClass(
                opportunity.opportunityScore
              )}`}
            >
              {opportunity.opportunityScore}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              Confidence
            </div>

            <div className="mt-1 text-xl font-semibold text-white">
              {opportunity.confidence}%
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              Systems
            </div>

            <div className="mt-1 text-xl font-semibold text-white">
              {opportunity.systemCount}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar value={opportunity.opportunityScore} />
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const [data, setData] =
    useState<OverviewResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOverview() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/overview", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            "Failed to load overview data."
          );
        }

        const result: OverviewResponse =
          await response.json();

        if (!result.success) {
          throw new Error(
            "Overview API returned an unsuccessful response."
          );
        }

        setData(result);
      } catch (err) {
        console.error(
          "Overview loading error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load overview data from Neo4j."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOverview();
  }, []);

  const summary = data?.summary;

  /*
   * =========================================================
   * CORE METRICS
   * =========================================================
   */

  const totalProcesses = summary?.processes ?? 0;

  const totalAutomations =
    summary?.automations ?? 0;

  const productionAutomations =
    summary?.production ?? 0;

  const pilotAutomations =
    summary?.pilot ?? 0;

  const averageConfidence =
    summary?.averageConfidence ?? 0;

  const totalRelationships =
    summary?.relationships ?? 0;

  const totalSystems =
    summary?.systems ?? 0;

  const totalTechnologies =
    summary?.technologies ?? 0;

  const totalNodes =
    summary?.nodes ?? 0;

  /*
   * =========================================================
   * OPPORTUNITY METRICS
   *
   * These values come directly from the API's canonical
   * scoring engine.
   * =========================================================
   */

  const highPriority =
    summary?.highPriority ?? 0;

  const mediumPriority =
    summary?.mediumPriority ?? 0;

  const lowPriority =
    summary?.lowPriority ?? 0;

  const averageOpportunity =
    summary?.averageOpportunity ?? 0;

  /*
   * =========================================================
   * AUTOMATION COVERAGE
   *
   * The synthetic knowledge graph currently has one
   * automation for every process.
   * =========================================================
   */

  const automationCoverage = useMemo(() => {
    if (totalProcesses === 0) {
      return 0;
    }

    const automatedProcesses =
      data?.opportunities.length ?? 0;

    return Math.round(
      (automatedProcesses / totalProcesses) * 100
    );
  }, [data, totalProcesses]);

  /*
   * =========================================================
   * TOP OPPORTUNITIES
   * =========================================================
   */

  const topOpportunities = useMemo(() => {
    return [...(data?.opportunities ?? [])]
      .sort(
        (a, b) =>
          b.opportunityScore -
          a.opportunityScore
      )
      .slice(0, 5);
  }, [data]);

  /*
   * =========================================================
   * DEPARTMENT DISTRIBUTION
   * =========================================================
   */

  const departmentDistribution =
    data?.departments ?? [];

  const maxDepartmentCount =
    departmentDistribution.length > 0
      ? Math.max(
          ...departmentDistribution.map(
            (item) => item.processCount
          )
        )
      : 0;

  /*
   * =========================================================
   * TECHNOLOGY ADOPTION
   * =========================================================
   */

  const technologyDistribution =
    data?.technologies ?? [];

  const maxTechnologyCount =
    technologyDistribution.length > 0
      ? Math.max(
          ...technologyDistribution.map(
            (item) => item.automationCount
          )
        )
      : 0;

  return (
    <AppShell
      title="Overview"
      description="Executive view of operational processes, automation maturity, knowledge graph structure and automation opportunities."
    >
      <div className="space-y-8">
        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <div className="text-sm font-medium text-red-400">
              Overview unavailable
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {error}
            </div>
          </div>
        )}

        {/* =====================================================
            OPERATIONAL OVERVIEW
        ===================================================== */}

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Operational Overview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current state of the live enterprise
                knowledge graph.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Neo4j Aura · Live
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Processes"
              value={
                loading ? "—" : totalProcesses
              }
              description="Processes in knowledge graph"
            />

            <MetricCard
              label="Automations"
              value={
                loading
                  ? "—"
                  : totalAutomations
              }
              description="Automation entities"
              accent="cyan"
            />

            <MetricCard
              label="Production"
              value={
                loading
                  ? "—"
                  : productionAutomations
              }
              description="Automations in production"
              accent="green"
            />

            <MetricCard
              label="Average Confidence"
              value={
                loading
                  ? "—"
                  : `${averageConfidence}%`
              }
              description="Across automated processes"
              accent="cyan"
            />
          </div>
        </section>

        {/* =====================================================
            KNOWLEDGE GRAPH SNAPSHOT
        ===================================================== */}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Knowledge Graph Snapshot
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Live structural view of the operational
              model.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              label="Nodes"
              value={loading ? "—" : totalNodes}
              description="Operational entities"
            />

            <MetricCard
              label="Relationships"
              value={
                loading
                  ? "—"
                  : totalRelationships
              }
              description="Live graph connections"
              accent="cyan"
            />

            <MetricCard
              label="Systems"
              value={
                loading ? "—" : totalSystems
              }
              description="Connected enterprise systems"
            />

            <MetricCard
              label="Technologies"
              value={
                loading
                  ? "—"
                  : totalTechnologies
              }
              description="Technology entities"
              accent="purple"
            />

            <MetricCard
              label="Departments"
              value={
                loading
                  ? "—"
                  : summary?.departments ??
                    departmentDistribution.length
              }
              description="Business areas represented"
              accent="yellow"
            />
          </div>
        </section>

        {/* =====================================================
            AUTOMATION COVERAGE + OPPORTUNITY DISTRIBUTION
        ===================================================== */}

        <section>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Automation Coverage */}

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Automation Coverage
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Processes represented with
                    automation intelligence.
                  </p>
                </div>

                <div className="text-3xl font-semibold text-cyan-400">
                  {loading
                    ? "—"
                    : `${automationCoverage}%`}
                </div>
              </div>

              <div className="mt-6">
                <ProgressBar
                  value={automationCoverage}
                />
              </div>

              <div className="mt-2 flex justify-between text-[10px] text-slate-600">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">
                    Production
                  </div>

                  <div className="mt-2 text-2xl font-semibold text-emerald-400">
                    {loading
                      ? "—"
                      : productionAutomations}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">
                    Pilot
                  </div>

                  <div className="mt-2 text-2xl font-semibold text-purple-400">
                    {loading
                      ? "—"
                      : pilotAutomations}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">
                    Total
                  </div>

                  <div className="mt-2 text-2xl font-semibold text-white">
                    {loading
                      ? "—"
                      : totalAutomations}
                  </div>
                </div>
              </div>
            </div>

            {/* Opportunity Distribution */}

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Opportunity Distribution
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current process opportunities by
                  priority.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                {/* High */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400" />

                      <span className="text-xs text-slate-300">
                        High Priority
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-red-400">
                      {loading
                        ? "—"
                        : highPriority}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-red-400"
                      style={{
                        width:
                          totalProcesses > 0
                            ? `${Math.min(
                                100,
                                (highPriority /
                                  totalProcesses) *
                                  100
                              )}%`
                            : "0%",
                      }}
                    />
                  </div>
                </div>

                {/* Medium */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-yellow-400" />

                      <span className="text-xs text-slate-300">
                        Medium Priority
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-yellow-400">
                      {loading
                        ? "—"
                        : mediumPriority}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{
                        width:
                          totalProcesses > 0
                            ? `${Math.min(
                                100,
                                (mediumPriority /
                                  totalProcesses) *
                                  100
                              )}%`
                            : "0%",
                      }}
                    />
                  </div>
                </div>

                {/* Low */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />

                      <span className="text-xs text-slate-300">
                        Low Priority
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-emerald-400">
                      {loading
                        ? "—"
                        : lowPriority}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{
                        width:
                          totalProcesses > 0
                            ? `${Math.min(
                                100,
                                (lowPriority /
                                  totalProcesses) *
                                  100
                              )}%`
                            : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-800 pt-5">
                <div className="text-[10px] uppercase tracking-wide text-slate-500">
                  Average Opportunity
                </div>

                <div className="mt-1 text-2xl font-semibold text-cyan-400">
                  {loading
                    ? "—"
                    : averageOpportunity}
                </div>

                <div className="mt-1 text-xs text-slate-600">
                  Opportunity score out of 100
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TOP OPPORTUNITIES
        ===================================================== */}

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Top Opportunities
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Highest-value candidates identified
                from the knowledge graph.
              </p>
            </div>

            <a
              href="/automation-opportunities"
              className="text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              View all →
            </a>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center text-sm text-slate-500">
                Loading opportunities from Neo4j...
              </div>
            ) : topOpportunities.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center text-sm text-slate-500">
                No automation opportunities
                available.
              </div>
            ) : (
              topOpportunities.map(
                (opportunity) => (
                  <OpportunityCard
                    key={opportunity.processId}
                    opportunity={opportunity}
                  />
                )
              )
            )}
          </div>
        </section>

        {/* =====================================================
            TECHNOLOGY ADOPTION
        ===================================================== */}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Technology Adoption
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Technologies connected to the automation
              portfolio.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {technologyDistribution.map(
              (technology) => (
                <div
                  key={technology.technology}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
                >
                  <div className="text-sm font-medium text-white">
                    {technology.technology}
                  </div>

                  <div className="mt-3 text-2xl font-semibold text-purple-400">
                    {technology.automationCount}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    automations
                  </div>

                  <div className="mt-4">
                    <ProgressBar
                      value={
                        technology.automationCount
                      }
                      max={
                        maxTechnologyCount ||
                        1
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* =====================================================
            DEPARTMENT DISTRIBUTION
        ===================================================== */}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Process Distribution by Department
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Synthetic enterprise process coverage
              across business areas.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="space-y-5">
              {departmentDistribution.map(
                (department) => (
                  <div key={department.department}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-slate-300">
                        {department.department}
                      </span>

                      <span className="text-xs font-semibold text-white">
                        {department.processCount}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{
                          width:
                            maxDepartmentCount >
                            0
                              ? `${Math.min(
                                  100,
                                  (department.processCount /
                                    maxDepartmentCount) *
                                    100
                                )}%`
                              : "0%",
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            CONFIDENCE
        ===================================================== */}

        <section>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm font-semibold text-white">
                  Automation Confidence
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Overall confidence across the
                  operational automation portfolio.
                </div>
              </div>

              <div className="text-3xl font-semibold text-cyan-400">
                {loading
                  ? "—"
                  : `${averageConfidence}%`}
              </div>
            </div>

            <div className="mt-5">
              <ProgressBar
                value={averageConfidence}
              />
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-slate-600">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="flex flex-col gap-2 border-t border-slate-800 pt-6 text-[10px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Synthetic enterprise dataset · AI
            Operations Lab
          </span>

          <span>
            Knowledge Graph Intelligence · LIVE
          </span>
        </footer>
      </div>
    </AppShell>
  );
}