"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
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

type ProcessDetails = {
  processId: string;
  processName: string;

  department?: {
    id: string;
    name: string;
  };

  automation?: {
    id: string;
    name: string;
  };

  systems?: {
    id: string;
    name: string;
  }[];

  technologies?: {
    id: string;
    name: string;
  }[];

  dependencies?: {
    id: string;
    name: string;
  }[];
};

type ProcessDetailsResponse = {
  success: boolean;
  data?: ProcessDetails;
};

const typeLabels: Record<string, string> = {
  Department: "DEPARTMENT",
  Process: "PROCESS",
  Automation: "AUTOMATION",
  System: "SYSTEM",
  Technology: "TECHNOLOGY",
  Document: "DOCUMENT",
  Platform: "PLATFORM",
};

export default function KnowledgeGraphPage() {
  const [graph, setGraph] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProcess, setSelectedProcess] =
    useState<GraphNode | null>(null);

  const [processDetails, setProcessDetails] =
    useState<ProcessDetails | null>(null);

  const [detailsLoading, setDetailsLoading] = useState(false);

  // =========================================================
  // LOAD GRAPH FROM NEO4J
  // =========================================================

  useEffect(() => {
    async function loadGraph() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/graph", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load Neo4j graph.");
        }

        const data: GraphResponse = await response.json();

        if (!data.success) {
          throw new Error("Neo4j graph request failed.");
        }

        setGraph(data.relationships);
      } catch (err) {
        console.error(err);
        setError("Unable to load the live Neo4j graph.");
      } finally {
        setLoading(false);
      }
    }

    loadGraph();
  }, []);

  // =========================================================
  // BUILD UNIQUE NODE LISTS
  // =========================================================

  const nodes = useMemo(() => {
    const map = new Map<string, GraphNode>();

    graph.forEach((relationship) => {
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
  }, [graph]);

  const departments = useMemo(
    () => nodes.filter((node) => node.type === "Department"),
    [nodes]
  );

  const processes = useMemo(
    () => nodes.filter((node) => node.type === "Process"),
    [nodes]
  );

  const automations = useMemo(
    () => nodes.filter((node) => node.type === "Automation"),
    [nodes]
  );

  const systems = useMemo(
    () => nodes.filter((node) => node.type === "System"),
    [nodes]
  );

  // =========================================================
  // PROCESS DETAILS
  // =========================================================

  async function openProcess(process: GraphNode) {
    setSelectedProcess(process);
    setProcessDetails(null);
    setDetailsLoading(true);

    try {
      const response = await fetch(
        `/api/process-details?id=${encodeURIComponent(process.id)}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load process details.");
      }

      const result: ProcessDetailsResponse =
        await response.json();

      if (result.success && result.data) {
        setProcessDetails(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDetailsLoading(false);
    }
  }

  // =========================================================
  // RELATIONSHIP HELPERS
  // =========================================================

  function getRelationshipsForNode(node: GraphNode) {
    return graph.filter(
      (relationship) =>
        relationship.from.id === node.id ||
        relationship.to.id === node.id
    );
  }

  function getNodeRelationships(node: GraphNode) {
    return getRelationshipsForNode(node).slice(0, 6);
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <AppShell
      title="Knowledge Graph"
      description="Explore how processes, automations, departments, systems and technologies are connected through the live operational knowledge graph."
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mb-8">
        <div>
          <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-400">
            Operational Knowledge Graph
          </div>

          <h1 className="max-w-[720px] text-3xl font-semibold leading-tight tracking-tight">
            Understand how your operations are connected.
          </h1>

          <p className="mt-4 max-w-[720px] text-sm leading-6 text-slate-400">
            Connect processes, automations, departments, systems and
            technologies to reveal dependencies and identify where
            automation can create the greatest impact.
          </p>
        </div>
      </section>

      {/* Error */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-900 bg-red-950/20 p-4 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* =================================================
          KPI CARDS
      ================================================= */}

      <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Processes"
          value={loading ? "—" : processes.length}
          description="Operational activities"
        />

        <KpiCard
          label="Automations"
          value={loading ? "—" : automations.length}
          description="Connected in graph"
        />

        <KpiCard
          label="Systems"
          value={loading ? "—" : systems.length}
          description="Connected platforms"
        />

        <KpiCard
          label="Departments"
          value={loading ? "—" : departments.length}
          description="Business areas"
        />
      </section>

      {/* =================================================
          RELATIONSHIP MAP
      ================================================= */}

      <section className="rounded-xl border border-slate-800 bg-[#0b1224] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-500">
              Relationship Map
            </div>

            <h2 className="mt-1 text-base font-semibold">
              Operations ecosystem
            </h2>
          </div>

          <div className="flex gap-2">
            <Pill text="Department" />
            <Pill text="Process" />
            <Pill text="Automation" />
            <Pill text="System" />
          </div>
        </div>

        <div className="mb-6 h-px bg-slate-800" />

        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500">
            Loading live graph from Neo4j...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* Departments */}

            <GraphColumn
              title="Departments"
              subtitle="From Neo4j"
              nodes={departments}
            />

            {/* Processes */}

            <div>
              <ColumnHeader
                title="Processes"
                subtitle="Click a process to explore"
              />

              <div className="space-y-2">
                {processes.map((process) => {
                  const selected =
                    selectedProcess?.id === process.id;

                  return (
                    <button
                      key={process.id}
                      onClick={() => openProcess(process)}
                      className={`group w-full rounded-lg border p-4 text-left transition ${
                        selected
                          ? "border-cyan-500 bg-cyan-950/30"
                          : "border-slate-800 bg-[#050b1c] hover:border-cyan-900 hover:bg-slate-950"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-medium text-white">
                          {process.name}
                        </span>

                        <span className="text-xs text-cyan-400">
                          →
                        </span>
                      </div>

                      <div className="mt-2 text-[9px] uppercase tracking-wider text-slate-600">
                        {process.id}
                      </div>

                      <div className="mt-2 text-[9px] text-cyan-500 opacity-0 transition group-hover:opacity-100">
                        Click to explore →
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Automations */}

            <GraphColumn
              title="Automations"
              subtitle="From Neo4j"
              nodes={automations}
            />

            {/* Systems */}

            <GraphColumn
              title="Systems"
              subtitle="From Neo4j"
              nodes={systems}
            />
          </div>
        )}

        {/* =================================================
            RELATIONSHIP PATTERN
        ================================================= */}

        <div className="mt-8 rounded-lg border border-cyan-950 bg-[#061021] p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-slate-500">
              Graph relationship pattern
            </span>

            <span className="text-[9px] text-cyan-400">
              {graph.length} relationships
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <RelationshipPill text="Department" />

            <Arrow />

            <RelationshipPill text="CONTAINS" />

            <Arrow />

            <RelationshipPill text="Process" />

            <Arrow />

            <RelationshipPill text="AUTOMATED_BY" />

            <Arrow />

            <RelationshipPill text="Automation" />

            <Arrow />

            <RelationshipPill text="USES_SYSTEM" />

            <Arrow />

            <RelationshipPill text="System" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "USES_TECHNOLOGY",
              "DEPENDS_ON",
              "HAS_DOCUMENT",
              "OWNS",
              "MONITORS",
            ].map((relationship) => (
              <RelationshipPill
                key={relationship}
                text={relationship}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          LIVE PROCESS EXPLORER
      ================================================= */}

      {selectedProcess && (
        <section className="mt-6 rounded-xl border border-cyan-900 bg-[#0b1729] p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-cyan-400">
                Live Neo4j Process Explorer
              </div>

              <h2 className="mt-1 text-xl font-semibold">
                {selectedProcess.name}
              </h2>

              <div className="mt-1 text-[9px] text-slate-500">
                {selectedProcess.id}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedProcess(null);
                setProcessDetails(null);
              }}
              className="rounded-md border border-slate-700 px-3 py-2 text-[9px] text-slate-400 transition hover:border-slate-500 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="my-6 h-px bg-slate-800" />

          {detailsLoading ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Loading process relationships from Neo4j...
            </div>
          ) : processDetails ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {/* Department */}

              <DetailCard
                title="Department"
                relationship="CONTAINS"
              >
                {processDetails.department ? (
                  <>
                    <div className="text-xs font-medium text-white">
                      {processDetails.department.name}
                    </div>

                    <div className="mt-1 text-[9px] text-slate-600">
                      {processDetails.department.id}
                    </div>
                  </>
                ) : (
                  <EmptyState />
                )}
              </DetailCard>

              {/* Automation */}

              <DetailCard
                title="Automation"
                relationship="AUTOMATED_BY"
              >
                {processDetails.automation ? (
                  <>
                    <div className="text-xs font-medium text-white">
                      {processDetails.automation.name}
                    </div>

                    <div className="mt-1 text-[9px] text-slate-600">
                      {processDetails.automation.id}
                    </div>
                  </>
                ) : (
                  <EmptyState />
                )}
              </DetailCard>

              {/* Systems */}

              <DetailCard
                title="Systems"
                relationship="USES_SYSTEM"
              >
                {processDetails.systems &&
                processDetails.systems.length > 0 ? (
                  <div className="space-y-3">
                    {processDetails.systems.map((system) => (
                      <div key={system.id}>
                        <div className="text-xs font-medium text-white">
                          {system.name}
                        </div>

                        <div className="text-[9px] text-slate-600">
                          {system.id}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </DetailCard>

              {/* Technologies */}

              <DetailCard
                title="Technologies"
                relationship="USES_TECHNOLOGY"
              >
                {processDetails.technologies &&
                processDetails.technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {processDetails.technologies.map(
                      (technology) => (
                        <span
                          key={technology.id}
                          className="rounded-md border border-cyan-900 bg-cyan-950/30 px-2 py-1 text-[9px] text-cyan-300"
                        >
                          {technology.name}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </DetailCard>

              {/* Dependencies */}

              <DetailCard
                title="Dependencies"
                relationship="DEPENDS_ON"
              >
                {processDetails.dependencies &&
                processDetails.dependencies.length > 0 ? (
                  <div className="space-y-3">
                    {processDetails.dependencies.map(
                      (dependency) => (
                        <div key={dependency.id}>
                          <div className="text-xs font-medium text-white">
                            {dependency.name}
                          </div>

                          <div className="text-[9px] text-slate-600">
                            {dependency.id}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-[9px] text-slate-500">
                    No process dependency recorded.
                  </div>
                )}
              </DetailCard>

              {/* Graph Connections */}

              <DetailCard
                title="Graph Connections"
                relationship="LIVE"
              >
                <div className="space-y-3">
                  {getNodeRelationships(selectedProcess).map(
                    (relationship, index) => (
                      <div
                        key={`${relationship.relationship}-${index}`}
                        className="text-[9px]"
                      >
                        <span className="text-slate-400">
                          {relationship.from.name}
                        </span>

                        <span className="mx-1 text-cyan-500">
                          →
                        </span>

                        <span className="text-cyan-400">
                          {relationship.relationship}
                        </span>

                        <span className="mx-1 text-cyan-500">
                          →
                        </span>

                        <span className="text-slate-300">
                          {relationship.to.name}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </DetailCard>
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-slate-500">
              No process details found.
            </div>
          )}
        </section>
      )}

      {/* =================================================
          GRAPH INTELLIGENCE
      ================================================= */}

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <InsightCard
          title="Neo4j Nodes"
          value={nodes.length}
          description="Core operational entities"
        />

        <InsightCard
          title="Neo4j Relationships"
          value={graph.length}
          description="Connected graph relationships"
        />

        <InsightCard
          title="Graph Intelligence"
          value="LIVE"
          description="Powered by Neo4j"
        />
      </section>

      {/* Synthetic data notice */}

      <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-[9px] text-slate-500">
        <span className="font-medium text-slate-400">
          Synthetic enterprise model:
        </span>{" "}
        all entities and relationships displayed in this portfolio
        environment are fictional and are used exclusively for
        demonstration purposes.
      </div>
    </AppShell>
  );
}

// =============================================================
// COMPONENTS
// =============================================================

function KpiCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-[#0b1224] p-5">
      <div className="text-[9px] uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-semibold text-white">
        {value}
      </div>

      <div className="mt-1 text-[9px] text-slate-600">
        {description}
      </div>
    </div>
  );
}

function ColumnHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-3">
      <div className="text-xs font-semibold text-white">
        {title}
      </div>

      <div className="mt-1 text-[9px] text-slate-600">
        {subtitle}
      </div>
    </div>
  );
}

function GraphColumn({
  title,
  subtitle,
  nodes,
}: {
  title: string;
  subtitle: string;
  nodes: GraphNode[];
}) {
  return (
    <div>
      <ColumnHeader
        title={title}
        subtitle={subtitle}
      />

      <div className="space-y-2">
        {nodes.map((node) => (
          <div
            key={`${node.type}-${node.id}`}
            className="rounded-lg border border-slate-800 bg-[#050b1c] p-4 transition hover:border-cyan-950"
          >
            <div className="text-xs font-medium text-white">
              {node.name}
            </div>

            <div className="mt-2 text-[9px] uppercase tracking-wider text-slate-600">
              {typeLabels[node.type] || node.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-[8px] text-slate-400">
      {text}
    </span>
  );
}

function RelationshipPill({ text }: { text: string }) {
  return (
    <span className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-[8px] text-slate-300">
      {text}
    </span>
  );
}

function Arrow() {
  return (
    <span className="text-xs text-slate-600">
      →
    </span>
  );
}

function DetailCard({
  title,
  relationship,
  children,
}: {
  title: string;
  relationship: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-[#050b1c] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold text-white">
          {title}
        </div>

        <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[7px] text-slate-500">
          {relationship}
        </span>
      </div>

      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-[9px] text-slate-600">
      No connected entity found.
    </div>
  );
}

function InsightCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-[#0b1224] p-5">
      <div className="text-[9px] uppercase tracking-wider text-slate-500">
        {title}
      </div>

      <div className="mt-2 text-2xl font-semibold text-white">
        {value}
      </div>

      <div className="mt-1 text-[9px] text-slate-600">
        {description}
      </div>
    </div>
  );
}