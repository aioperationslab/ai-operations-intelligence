import Link from "next/link";

const solutions = [
  {
    number: "01",
    title: "Process Intelligence",
    description:
      "Map and understand operational processes, dependencies, systems and automation maturity through a connected intelligence layer.",
    items: [
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
    items: [
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
    items: [
      "Neo4j knowledge graphs",
      "Document retrieval",
      "Context enrichment",
      "Connected operational knowledge",
    ],
  },
  {
    number: "04",
    title: "Automation Intelligence",
    description:
      "Identify and prioritize opportunities where automation, AI agents or intelligent workflows can create measurable operational value.",
    items: [
      "Opportunity identification",
      "Automation scoring",
      "Technology analysis",
      "Prioritization",
    ],
  },
];

const operatingModel = [
  {
    number: "01",
    title: "Understand",
    description:
      "Capture the processes, systems, knowledge and relationships that shape the operation.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Structure operational knowledge through graphs, retrieval and contextual data connections.",
  },
  {
    number: "03",
    title: "Reason",
    description:
      "Use AI agents to query, analyze and reason over the operational context.",
  },
  {
    number: "04",
    title: "Optimize",
    description:
      "Identify opportunities to improve processes through automation and intelligent workflows.",
  },
];

const technology = [
  {
    category: "Intelligence",
    title: "AI Agents",
    description:
      "Agents that can reason over operational context.",
  },
  {
    category: "Knowledge",
    title: "Neo4j",
    description:
      "Connected representations of operational knowledge.",
  },
  {
    category: "Context",
    title: "RAG",
    description:
      "Retrieved business context for intelligent applications.",
  },
  {
    category: "Execution",
    title: "Automation",
    description:
      "Intelligent workflows designed around operational value.",
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
              href="/about"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/solutions"
              className="text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              Solutions
            </Link>

            <Link
              href="/technology"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Technology
            </Link>

            <Link
              href="/contact"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Contact
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

      {/* Back to Home */}
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pb-28 lg:pt-20">
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
        </div>
      </section>

      {/* What We Build */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              What we build
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              An intelligence layer across the automation lifecycle.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-slate-400">
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
                  <span className="text-xs font-semibold text-cyan-400">
                    {solution.number}
                  </span>

                  <span className="text-slate-600">
                    ✦
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold">
                  {solution.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {solution.description}
                </p>

                <div className="mt-6 space-y-2">
                  {solution.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <span className="text-cyan-400">
                        →
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Model */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Operating model
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              From operational knowledge to intelligent action.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
              AI Operations Lab is designed around a continuous flow:
              understand the operation, connect its knowledge, reason over
              the context and identify opportunities for optimization.
            </p>
          </div>

          <div className="space-y-4">
            {operatingModel.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-slate-800 bg-[#08111f] p-5"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-xs font-semibold text-cyan-400">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-base font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Foundation */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Technology foundation
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Designed for intelligent enterprise operations.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-slate-400">
              The architecture brings together AI agents, operational
              knowledge, retrieval and automation rather than treating them
              as isolated technologies.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technology.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-[#08111f] p-6"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {item.category}
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
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
          <div>
            © 2026 AI Operations Lab
          </div>

          <div>
            Building intelligent AI agents & automation solutions for
            enterprise operations.
          </div>
        </div>
      </footer>
    </main>
  );
}