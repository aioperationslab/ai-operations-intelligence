"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/app/components/AppShell";

type Opportunity = {
  processId: string;
  process: string;
  department: string;
  automationId: string;
  automation: string;
  automationType: string;
  maturity: string;
  confidence: number;
  opportunityScore: number;
  priority: string;
  recommendation: string;
  systems: string[];
  technologies: string[];
  dependencies: string[];
};

type ApiResponse = {
  success: boolean;
  count: number;
  opportunities: Opportunity[];
  source: string;
};

function priorityClass(priority: string) {
  if (priority === "High") {
    return "border-red-500/30 bg-red-500/10 text-red-300";
  }

  if (priority === "Medium") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  }

  return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
}

function scoreClass(score: number) {
  if (score >= 60) return "text-red-400";
  if (score >= 35) return "text-amber-400";
  return "text-emerald-400";
}

export default function AutomationOpportunitiesPage() {
  const [data, setData] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadOpportunities() {
      try {
        const response = await fetch("/api/opportunities", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load opportunities.");
        }

        const result: ApiResponse = await response.json();

        if (result.success) {
          setData(result.opportunities);
        }
      } catch (error) {
        console.error("Failed to load opportunities:", error);
      } finally {
        setLoading(false);
      }
    }

    loadOpportunities();
  }, []);

  const high = data.filter(
    (item) => item.priority === "High"
  ).length;

  const medium = data.filter(
    (item) => item.priority === "Medium"
  ).length;

  const averageScore = data.length
    ? Math.round(
        data.reduce(
          (sum, item) => sum + item.opportunityScore,
          0
        ) / data.length
      )
    : 0;

  const filteredData = useMemo(() => {
    if (filter === "All") return data;

    return data.filter(
      (item) => item.priority === filter
    );
  }, [data, filter]);

  return (
    <AppShell
      title="Automation Opportunities"
      description="Identify processes with the strongest potential for automation, AI optimization, and operational improvement."
    >
      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-[#0b1626] p-5">
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Processes analyzed
          </div>

          <div className="mt-3 text-3xl font-semibold text-white">
            {data.length}
          </div>

          <div className="mt-2 text-[11px] text-slate-600">
            Live from knowledge graph
          </div>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-5">
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            High priority
          </div>

          <div className="mt-3 text-3xl font-semibold text-red-400">
            {high}
          </div>

          <div className="mt-2 text-[11px] text-slate-600">
            Immediate assessment
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Medium priority
          </div>

          <div className="mt-3 text-3xl font-semibold text-amber-400">
            {medium}
          </div>

          <div className="mt-2 text-[11px] text-slate-600">
            Improvement candidates
          </div>
        </div>

        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-5">
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Average opportunity
          </div>

          <div className="mt-3 text-3xl font-semibold text-cyan-400">
            {averageScore}
          </div>

          <div className="mt-2 text-[11px] text-slate-600">
            Out of 100
          </div>
        </div>
      </div>

      {/* Opportunity Portfolio */}
      <section className="mt-8 rounded-2xl border border-slate-800 bg-[#0b1626]">
        <div className="border-b border-slate-800 px-6 py-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Opportunity Portfolio
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Ranked using automation confidence, maturity,
                dependencies and system complexity.
              </p>
            </div>

            <div className="flex gap-2">
              {["All", "High", "Medium", "Low"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-lg border px-3 py-2 text-xs transition ${
                      filter === item
                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                        : "border-slate-700 text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Opportunity list */}
        <div className="divide-y divide-slate-800">
          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Loading opportunities from Neo4j...
            </div>
          ) : filteredData.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              No opportunities match this filter.
            </div>
          ) : (
            filteredData.map((item) => (
              <button
                key={item.processId}
                onClick={() => setSelected(item)}
                className="group w-full p-6 text-left transition hover:bg-slate-900/40"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${priorityClass(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>

                      <span className="text-xs text-slate-600">
                        {item.processId}
                      </span>

                      <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[11px] text-slate-400">
                        {item.maturity}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-medium text-white group-hover:text-cyan-300">
                      {item.process}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.department} · {item.automation}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:w-[420px]">
                    <div>
                      <div className="text-xs text-slate-600">
                        Opportunity
                      </div>

                      <div
                        className={`mt-1 text-2xl font-semibold ${scoreClass(
                          item.opportunityScore
                        )}`}
                      >
                        {item.opportunityScore}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-600">
                        Confidence
                      </div>

                      <div className="mt-1 text-2xl font-semibold text-white">
                        {item.confidence}
                        <span className="text-sm text-slate-600">
                          %
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-600">
                        Systems
                      </div>

                      <div className="mt-1 text-2xl font-semibold text-white">
                        {item.systems.length}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      {/* Detail panel */}
      {selected && (
        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.03] p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                Opportunity Analysis
              </div>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                {selected.process}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {selected.department}
              </p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Close
            </button>
          </div>

          {/* Summary */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-[#07111f] p-4">
              <div className="text-xs text-slate-500">
                Automation
              </div>

              <div className="mt-2 text-sm font-medium text-white">
                {selected.automation}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {selected.automationType}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#07111f] p-4">
              <div className="text-xs text-slate-500">
                Maturity
              </div>

              <div className="mt-2 text-sm font-medium text-white">
                {selected.maturity}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#07111f] p-4">
              <div className="text-xs text-slate-500">
                Opportunity score
              </div>

              <div
                className={`mt-2 text-2xl font-semibold ${scoreClass(
                  selected.opportunityScore
                )}`}
              >
                {selected.opportunityScore}/100
              </div>
            </div>
          </div>

          {/* Systems / Technologies / Dependencies */}
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-xs text-slate-500">
                Systems
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {selected.systems.map((system) => (
                  <span
                    key={system}
                    className="rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500">
                Technologies
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {selected.technologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300"
                    >
                      {technology}
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500">
                Dependencies
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {selected.dependencies.length > 0 ? (
                  selected.dependencies.map(
                    (dependency) => (
                      <span
                        key={dependency}
                        className="rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300"
                      >
                        {dependency}
                      </span>
                    )
                  )
                ) : (
                  <span className="text-xs text-slate-600">
                    No direct dependencies
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-[#07111f] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Recommended action
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {selected.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5 text-[11px] text-slate-600">
        <span>
          Synthetic enterprise dataset · AI Operations Lab
        </span>

        <span>
          Knowledge Graph Intelligence · LIVE
        </span>
      </div>
    </AppShell>
  );
}