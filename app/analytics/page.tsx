"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/app/components/AppShell";

type GraphNode = {
  type: string;
  id: string;
  name: string;
};

type Relationship = {
  from: GraphNode;
  relationship: string;
  to: GraphNode;
};

type GraphResponse = {
  success: boolean;
  count: number;
  relationships: Relationship[];
};

type DepartmentMetric = {
  name: string;
  processes: number;
  automations: number;
};

type TechnologyMetric = {
  name: string;
  usage: number;
};

type SystemMetric = {
  name: string;
  usage: number;
};

export default function AnalyticsPage() {
  const [relationships, setRelationships] = useState<
    Relationship[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGraph() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/graph", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load analytics data.");
        }

        const data: GraphResponse = await response.json();

        if (!data.success) {
          throw new Error("Neo4j analytics request failed.");
        }

        setRelationships(data.relationships);
      } catch (err) {
        console.error(err);
        setError("Unable to load live analytics from Neo4j.");
      } finally {
        setLoading(false);
      }
    }

    loadGraph();
  }, []);

  // =========================================================
  // UNIQUE NODES
  // =========================================================

  const nodes = useMemo(() => {
    const map = new Map<string, GraphNode>();

    relationships.forEach((relationship) => {
      map.set(
        `${relationship.from.type}:${relationship.from.id}`,
        relationship.from
      );

      map.set(
        `${relationship.to.type}:${relationship.to.id}`,
        relationship.to
      );
    });

    return Array.from(map.values());
  }, [relationships]);

  const processes = useMemo(
    () => nodes.filter((node) => node.type === "Process"),
    [nodes]
  );

  const automations = useMemo(
    () => nodes.filter((node) => node.type === "Automation"),
    [nodes]
  );

  const departments = useMemo(
    () => nodes.filter((node) => node.type === "Department"),
    [nodes]
  );

  const systems = useMemo(
    () => nodes.filter((node) => node.type === "System"),
    [nodes]
  );

  const technologies = useMemo(
    () => nodes.filter((node) => node.type === "Technology"),
    [nodes]
  );

  // =========================================================
  // RELATIONSHIP METRICS
  // =========================================================

  const relationshipMetrics = useMemo(() => {
    const counts: Record<string, number> = {};

    relationships.forEach((relationship) => {
      counts[relationship.relationship] =
        (counts[relationship.relationship] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [relationships]);

  // =========================================================
  // AUTOMATION COVERAGE
  // =========================================================

  const automatedProcessIds = useMemo(() => {
    return new Set(
      relationships
        .filter(
          (relationship) =>
            relationship.relationship === "AUTOMATED_BY"
        )
        .map((relationship) => relationship.from.id)
    );
  }, [relationships]);

  const automatedProcesses = automatedProcessIds.size;

  const automationCoverage = processes.length
    ? Math.round(
        (automatedProcesses / processes.length) * 100
      )
    : 0;

  // =========================================================
  // DEPARTMENT ANALYTICS
  // =========================================================

  const departmentMetrics = useMemo<DepartmentMetric[]>(() => {
    return departments
      .map((department) => {
        const departmentProcesses = relationships.filter(
          (relationship) =>
            relationship.from.id === department.id &&
            relationship.relationship === "CONTAINS"
        );

        const processIds = departmentProcesses.map(
          (relationship) => relationship.to.id
        );

        const departmentAutomations = relationships.filter(
          (relationship) =>
            relationship.relationship === "AUTOMATED_BY" &&
            processIds.includes(relationship.from.id)
        );

        return {
          name: department.name,
          processes: departmentProcesses.length,
          automations: departmentAutomations.length,
        };
      })
      .sort((a, b) => b.processes - a.processes);
  }, [departments, relationships]);

  // =========================================================
  // TECHNOLOGY USAGE
  // =========================================================

  const technologyMetrics = useMemo<TechnologyMetric[]>(() => {
    return technologies
      .map((technology) => {
        const usage = relationships.filter(
          (relationship) =>
            relationship.relationship === "USES_TECHNOLOGY" &&
            relationship.to.id === technology.id
        ).length;

        return {
          name: technology.name,
          usage,
        };
      })
      .sort((a, b) => b.usage - a.usage);
  }, [technologies, relationships]);

  // =========================================================
  // SYSTEM USAGE
  // =========================================================

  const systemMetrics = useMemo<SystemMetric[]>(() => {
    return systems
      .map((system) => {
        const usage = relationships.filter(
          (relationship) =>
            relationship.relationship === "USES_SYSTEM" &&
            relationship.to.id === system.id
        ).length;

        return {
          name: system.name,
          usage,
        };
      })
      .sort((a, b) => b.usage - a.usage);
  }, [systems, relationships]);

  // =========================================================
  // DEPENDENCIES
  // =========================================================

  const dependencyCount = useMemo(
    () =>
      relationships.filter(
        (relationship) =>
          relationship.relationship === "DEPENDS_ON"
      ).length,
    [relationships]
  );

  // =========================================================
  // GRAPH HEALTH
  // =========================================================

  const graphHealth = useMemo(() => {
    if (!nodes.length) return 0;

    const connectedNodeIds = new Set<string>();

    relationships.forEach((relationship) => {
      connectedNodeIds.add(relationship.from.id);
      connectedNodeIds.add(relationship.to.id);
    });

    return Math.round(
      (connectedNodeIds.size / nodes.length) * 100
    );
  }, [nodes, relationships]);

  // =========================================================
  // MAX VALUES FOR BARS
  // =========================================================

  const maxDepartmentProcesses = Math.max(
    ...departmentMetrics.map((item) => item.processes),
    1
  );

  const maxTechnologyUsage = Math.max(
    ...technologyMetrics.map((item) => item.usage),
    1
  );

  const maxSystemUsage = Math.max(
    ...systemMetrics.map((item) => item.usage),
    1
  );

  const maxRelationshipCount = Math.max(
    ...relationshipMetrics.map((item) => item.count),
    1
  );

  return (
    <AppShell
      title="Analytics"
      description="Monitor operational structure, automation coverage, graph health and technology usage using live knowledge graph data."
    >
      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-900 bg-red-950/20 p-4 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* =====================================================
          KPI ROW
      ===================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Processes"
          value={loading ? "—" : processes.length}
          description="Operational processes"
        />

        <MetricCard
          label="Automations"
          value={loading ? "—" : automations.length}
          description="Automation entities"
        />

        <MetricCard
          label="Systems"
          value={loading ? "—" : systems.length}
          description="Connected systems"
        />

        <MetricCard
          label="Technologies"
          value={loading ? "—" : technologies.length}
          description="Technology entities"
        />

        <MetricCard
          label="Relationships"
          value={loading ? "—" : relationships.length}
          description="Live graph connections"
          accent
        />
      </section>

      {/* =====================================================
          AUTOMATION COVERAGE + GRAPH HEALTH
      ===================================================== */}

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Automation Coverage */}

        <Panel
          title="Automation Coverage"
          subtitle="Percentage of processes connected to an automation."
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-semibold text-cyan-400">
                {loading ? "—" : `${automationCoverage}%`}
              </div>

              <div className="mt-2 text-xs text-slate-500">
                {automatedProcesses} of {processes.length}{" "}
                processes automated
              </div>
            </div>

            <div className="text-right">
              <div className="text-[9px] uppercase tracking-wider text-slate-600">
                Coverage
              </div>

              <div className="mt-1 text-sm font-medium text-white">
                {loading
                  ? "—"
                  : automationCoverage >= 80
                    ? "High"
                    : automationCoverage >= 50
                      ? "Moderate"
                      : "Low"}
              </div>
            </div>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all"
              style={{
                width: `${automationCoverage}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-[9px] text-slate-600">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </Panel>

        {/* Graph Health */}

        <Panel
          title="Graph Health"
          subtitle="Connectivity and structural integrity of the knowledge graph."
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-semibold text-emerald-400">
                {loading ? "—" : `${graphHealth}%`}
              </div>

              <div className="mt-2 text-xs text-slate-500">
                Connected graph entities
              </div>
            </div>

            <div className="rounded-full border border-emerald-900 bg-emerald-950/30 px-3 py-1.5 text-[9px] text-emerald-400">
              {graphHealth === 100
                ? "Healthy"
                : "Review Required"}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <MiniMetric
              label="Nodes"
              value={nodes.length}
            />

            <MiniMetric
              label="Relationships"
              value={relationships.length}
            />

            <MiniMetric
              label="Dependencies"
              value={dependencyCount}
            />
          </div>
        </Panel>
      </section>

      {/* =====================================================
          DEPARTMENT COVERAGE
      ===================================================== */}

      <section className="mt-6">
        <Panel
          title="Processes by Department"
          subtitle="Distribution of operational processes across business areas."
        >
          {loading ? (
            <LoadingState />
          ) : (
            <div className="space-y-5">
              {departmentMetrics.map((department) => (
                <div key={department.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs font-medium text-white">
                      {department.name}
                    </div>

                    <div className="text-[10px] text-slate-500">
                      {department.processes} processes ·{" "}
                      {department.automations} automations
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${
                          (department.processes /
                            maxDepartmentProcesses) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </section>

      {/* =====================================================
          TECHNOLOGY + SYSTEM USAGE
      ===================================================== */}

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Technology Usage */}

        <Panel
          title="Technology Usage"
          subtitle="Technologies referenced by automation entities."
        >
          {loading ? (
            <LoadingState />
          ) : technologyMetrics.length === 0 ? (
            <EmptyState text="No technology usage found." />
          ) : (
            <div className="space-y-4">
              {technologyMetrics.map((technology) => (
                <div key={technology.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-slate-300">
                      {technology.name}
                    </span>

                    <span className="text-[10px] text-slate-500">
                      {technology.usage}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${
                          (technology.usage /
                            maxTechnologyUsage) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>

        {/* System Usage */}

        <Panel
          title="System Usage"
          subtitle="Systems connected to automation entities."
        >
          {loading ? (
            <LoadingState />
          ) : systemMetrics.length === 0 ? (
            <EmptyState text="No system usage found." />
          ) : (
            <div className="space-y-4">
              {systemMetrics.map((system) => (
                <div key={system.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-slate-300">
                      {system.name}
                    </span>

                    <span className="text-[10px] text-slate-500">
                      {system.usage}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${
                          (system.usage /
                            maxSystemUsage) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </section>

      {/* =====================================================
          RELATIONSHIP DISTRIBUTION
      ===================================================== */}

      <section className="mt-6">
        <Panel
          title="Relationship Distribution"
          subtitle="Live relationship types stored in Neo4j."
        >
          {loading ? (
            <LoadingState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relationshipMetrics.map((relationship) => (
                <div
                  key={relationship.name}
                  className="rounded-lg border border-slate-800 bg-[#050b1c] p-4"
                >
                  <div className="text-[9px] uppercase tracking-wider text-slate-600">
                    {relationship.name}
                  </div>

                  <div className="mt-2 flex items-end justify-between">
                    <div className="text-2xl font-semibold text-white">
                      {relationship.count}
                    </div>

                    <div className="text-[9px] text-slate-600">
                      relationships
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${
                          (relationship.count /
                            maxRelationshipCount) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </section>

      {/* =====================================================
          INTELLIGENCE SIGNALS
      ===================================================== */}

      <section className="mt-6">
        <Panel
          title="Intelligence Signals"
          subtitle="High-level observations derived directly from the operational graph."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SignalCard
              title="Automation Coverage"
              value={`${automationCoverage}%`}
              description="Processes connected to automation."
            />

            <SignalCard
              title="Dependencies"
              value={dependencyCount}
              description="Process-to-process dependency relationships."
            />

            <SignalCard
              title="Technology Footprint"
              value={technologies.length}
              description="Distinct technologies represented in the graph."
            />

            <SignalCard
              title="System Footprint"
              value={systems.length}
              description="Distinct operational systems represented."
            />
          </div>
        </Panel>
      </section>

      {/* =====================================================
          DATA SOURCE
      ===================================================== */}

      <div className="mt-6 flex flex-col justify-between gap-3 border-t border-slate-800 pt-5 text-[10px] text-slate-600 sm:flex-row">
        <span>
          Synthetic enterprise dataset · AI Operations Lab
        </span>

        <span className="text-emerald-500">
          ● Neo4j Aura · Live
        </span>
      </div>
    </AppShell>
  );
}

// =============================================================
// COMPONENTS
// =============================================================

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
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "border-cyan-900 bg-cyan-950/10"
          : "border-slate-800 bg-[#0b1224]"
      }`}
    >
      <div className="text-[9px] uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div
        className={`mt-2 text-3xl font-semibold ${
          accent ? "text-cyan-400" : "text-white"
        }`}
      >
        {value}
      </div>

      <div className="mt-2 text-[10px] text-slate-600">
        {description}
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b1224] p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-white">
          {title}
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-[#050b1c] p-4">
      <div className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 text-lg font-semibold text-white">
        {value}
      </div>
    </div>
  );
}

function SignalCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-[#050b1c] p-5">
      <div className="text-[9px] uppercase tracking-wider text-slate-600">
        {title}
      </div>

      <div className="mt-2 text-2xl font-semibold text-cyan-400">
        {value}
      </div>

      <p className="mt-2 text-[10px] leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="py-10 text-center text-xs text-slate-500">
      Loading live analytics from Neo4j...
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-8 text-center text-xs text-slate-600">
      {text}
    </div>
  );
}