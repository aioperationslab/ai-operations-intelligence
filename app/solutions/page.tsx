import Link from "next/link";

const solutions = [
  {
    number: "01",
    title: "Process Intelligence",
    description:
      "Map and understand operational processes, dependencies, systems and automation maturity through a connected intelligence layer.",
    capabilities: [
      "Process discovery",
      "Dependency analysis",
      "Operational knowledge mapping",
      "Automation maturity analysis",
    ],
  },
  {
    number: "02",
    title: "AI Agents",
    description:
      "Build AI agents that can reason over structured operational knowledge and retrieved business context.",
    capabilities: [
      "Knowledge graph querying",
      "Context-aware reasoning",
      "Operational question answering",
      "AI-assisted decision support",
    ],
  },
  {
    number: "03",
    title: "Knowledge Graphs & RAG",
    description:
      "Connect structured operational data with business documents to create a richer source of context for intelligent applications.",
    capabilities: [
      "Neo4j knowledge graphs",
      "Document retrieval",
      "Context enrichment",
      "Enterprise knowledge connections",
    ],
  },
  {
    number: "04",
    title: "Automation Intelligence",
    description:
      "Identify and prioritize opportunities where automation, AI agents or intelligent workflows can create measurable operational value.",
    capabilities: [
      "Opportunity identification",
      "Automation scoring",
      "Technology analysis",
      "Prioritization frameworks",
    ],
  },
];

const workflow = [
  {
    step: "01",
    title: "Understand",
    description:
      "Capture the processes, systems, knowledge and relationships that shape the operation.",
  },
  {
    step: "02",
    title: "Connect",
    description:
      "Structure operational knowledge through graphs, retrieval and contextual data connections.",
  },
  {
    step: "03",
    title: "Reason",
    description:
      "Use AI agents to query, analyze and reason over the operational context.",
  },
  {
    step: "04",
    title: "Optimize",
    description:
      "Identify opportunities to improve processes through automation and intelligent workflows.",
  },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#050b16] text-white">
      {/* Navigation */}
      <header className="border-b border-slate-800/80 bg-[#050b16]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="block">
            <div className="text-lg font-bold tracking-tight">
              AI Operations Lab
            </div>

            <div className="mt-0.5 text-xs text-cyan-400">
              Intelligence Platform
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/#capabilities"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Capabilities
            </Link>

            <Link
              href="/#technology"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Technology
            </Link>

            <Link
              href="/overview"
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Open Platform
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-8 lg:pt-28">
        <div className="max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Solutions
          </div>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
            Intelligence for{" "}
            <span className="text-cyan-400">
              modern operations.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            AI Operations Lab combines process intelligence, AI agents,
            knowledge graphs, retrieval and automation to explore a new
            approach to enterprise operations.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              What we build
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              An intelligence layer across the automation lifecycle.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              The platform connects operational understanding, AI reasoning
              and automation intelligence into a single architecture.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {solutions.map((solution) => (
              <div
                key={solution.number}
                className="rounded-xl border border-slate-800 bg-[#08111f] p-7 transition hover:border-cyan-500/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-cyan-400">
                    {solution.number}
                  </span>

                  <span className="text-slate-600">✦</span>
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {solution.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {solution.description}
                </p>

                <div className="mt-6 space-y-2">
                  {solution.capabilities.map((capability) => (
                    <div
                      key={capability}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <span className="text-cyan-400">→</span>
                      {capability}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating model */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Operating model
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              From operational knowledge to intelligent action.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-400">
              AI Operations Lab is designed around a continuous flow:
              understand the operation, connect its knowledge, reason over
              the context and identify opportunities for optimization.
            </p>
          </div>

          <div className="space-y-4">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="flex gap-5 rounded-xl border border-slate-800 bg-[#08111f] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-xs font-semibold text-cyan-400">
                  {item.step}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Intelligence
              </div>

              <div className="mt-3 text-lg font-semibold">
                AI Agents
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Agents that can reason over operational context.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Knowledge
              </div>

              <div className="mt-3 text-lg font-semibold">
                Neo4j
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Connected representations of operational knowledge.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Context
              </div>

              <div className="mt-3 text-lg font-semibold">
                RAG
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Retrieved business context for intelligent applications.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Execution
              </div>

              <div className="mt-3 text-lg font-semibold">
                Automation
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Intelligent workflows designed around operational value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-8 py-14 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Explore the platform
          </div>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            See operational intelligence in action.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore the knowledge graph, process intelligence, automation
            opportunities and AI Agent.
          </p>

          <Link
            href="/overview"
            className="mt-8 inline-flex items-center rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Open Intelligence Platform
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>© 2026 AI Operations Lab</div>

          <div>
            Building intelligent AI agents & automation solutions for
            enterprise operations.
          </div>
        </div>
      </footer>
    </main>
  );
}