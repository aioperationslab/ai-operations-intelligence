"use client";

import Sidebar from "@/app/components/Sidebar";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#070b18] text-white">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="border-b border-slate-800 bg-[#070b18] px-8 py-7">
          <div className="max-w-7xl">
            <div className="mb-2 text-[10px] font-medium uppercase tracking-widest text-slate-500">
              AI Operations Lab
              <span className="mx-2 text-slate-700">/</span>
              Settings
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Settings
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Configure the AI Operations Lab intelligence platform.
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-8 py-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Knowledge Graph */}
            <section className="rounded-xl border border-slate-800 bg-[#0b1424] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Knowledge Graph
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Current operational data source.
                  </p>
                </div>

                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-400">
                  Connected
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">Provider</span>
                  <span className="text-sm font-medium text-white">
                    Neo4j Aura
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">Status</span>
                  <span className="text-sm font-medium text-emerald-400">
                    Live
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">Data mode</span>
                  <span className="text-sm font-medium text-white">
                    Synthetic enterprise data
                  </span>
                </div>
              </div>
            </section>

            {/* AI Provider */}
            <section className="rounded-xl border border-slate-800 bg-[#0b1424] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    AI Provider
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI reasoning layer for the operations agent.
                  </p>
                </div>

                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium text-cyan-400">
                  Ready
                </span>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-cyan-500/30 bg-cyan-500/5 px-4 py-3 text-left"
                >
                  <div>
                    <div className="text-sm font-medium text-white">
                      Rule-based Agent
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      Current provider · no API cost
                    </div>
                  </div>

                  <span className="text-xs font-medium text-cyan-400">
                    Active
                  </span>
                </button>

                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-white">
                      OpenAI
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      Available as an AI provider
                    </div>
                  </div>

                  <span className="text-xs text-slate-600">
                    Not enabled
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-white">
                      Claude
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      Available as an AI provider
                    </div>
                  </div>

                  <span className="text-xs text-slate-600">
                    Not enabled
                  </span>
                </div>
              </div>
            </section>

            {/* Platform */}
            <section className="rounded-xl border border-slate-800 bg-[#0b1424] p-6">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-white">
                  Platform
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current application architecture.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">Application</span>
                  <span className="text-sm font-medium text-white">
                    Next.js
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">Frontend</span>
                  <span className="text-sm font-medium text-white">
                    React + Tailwind
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">Knowledge layer</span>
                  <span className="text-sm font-medium text-white">
                    Neo4j
                  </span>
                </div>
              </div>
            </section>

            {/* Environment */}
            <section className="rounded-xl border border-slate-800 bg-[#0b1424] p-6">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-white">
                  Environment
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current development environment.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">Environment</span>
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium text-amber-400">
                    Development
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">Database</span>
                  <span className="text-sm font-medium text-emerald-400">
                    Connected
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#070d1c] px-4 py-3">
                  <span className="text-sm text-slate-400">AI API calls</span>
                  <span className="text-sm font-medium text-slate-300">
                    Disabled
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Architecture note */}
          <section className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                ✦
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">
                  AI Provider Architecture
                </h2>

                <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-400">
                  The platform is designed so that Neo4j remains the source
                  of operational truth while the reasoning layer can use
                  different AI providers. OpenAI and Claude can therefore be
                  added without changing the underlying knowledge graph.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-[10px] text-slate-400">
                    Neo4j
                  </span>

                  <span className="text-slate-600">→</span>

                  <span className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-[10px] text-slate-400">
                    Context Builder
                  </span>

                  <span className="text-slate-600">→</span>

                  <span className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-[10px] text-slate-400">
                    AI Provider
                  </span>

                  <span className="text-slate-600">→</span>

                  <span className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-[10px] text-slate-400">
                    Agent Response
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-8 border-t border-slate-800 pt-5">
            <p className="text-[10px] text-slate-600">
              AI Operations Lab · Intelligence Platform · Configuration
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}