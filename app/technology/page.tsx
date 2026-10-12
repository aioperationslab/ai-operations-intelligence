import Link from "next/link";

const architecture = [
  {
    number: "01",
    title: "Understand",
    description:
      "Capture processes, systems, technologies, documents and relationships that shape the operation.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Structure operational knowledge through knowledge graphs, retrieval and contextual data connections.",
  },
  {
    number: "03",
    title: "Reason",
    description:
      "Use AI agents and language models to query, analyze and reason over the operational context.",
  },
  {
    number: "04",
    title: "Optimize",
    description:
      "Identify opportunities to improve processes through automation and intelligent workflows.",
  },
];

const technologies = [
  {
    number: "01",
    title: "AI Agents",
    description:
      "Intelligent agents designed to interact with structured operational knowledge and business context.",
  },
  {
    number: "02",
    title: "LLMs",
    description:
      "Language models provide reasoning and natural-language interaction capabilities.",
  },
  {
    number: "03",
    title: "Neo4j",
    description:
      "Knowledge graph technology connects processes, systems, technologies and operational relationships.",
  },
  {
    number: "04",
    title: "RAG",
    description:
      "Retrieval brings relevant operational documents and contextual information into AI workflows.",
  },
  {
    number: "05",
    title: "Process Intelligence",
    description:
      "Operational process structures provide the foundation for understanding dependencies and opportunities.",
  },
  {
    number: "06",
    title: "Automation",
    description:
      "Automation technologies turn operational insights into measurable improvements and intelligent workflows.",
  },
];

const layers = [
  {
    label: "Intelligence",
    title: "AI Agents",
    description:
      "Reasoning and interaction over operational context.",
  },
  {
    label: "Knowledge",
    title: "Neo4j",
    description:
      "Connected representations of operational knowledge.",
  },
  {
    label: "Context",
    title: "RAG",
    description:
      "Retrieved business context for intelligent applications.",
  },
  {
    label: "Execution",
    title: "Automation",
    description:
      "Intelligent workflows designed around operational value.",
  },
];

export default function TechnologyPage() {
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
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Solutions
            </Link>

            <Link
              href="/technology"
              className="text-sm text-cyan-400 transition hover:text-cyan-300"
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
              Technology
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
              The technology foundation for{" "}
              <span className="text-cyan-400">
                intelligent operations.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
              AI Operations Lab combines AI agents, language models,
              retrieval, knowledge graphs, process intelligence and
              automation into a connected architecture for enterprise
              operations.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Architecture
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                From operational knowledge to intelligent action.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
                The platform is designed as a continuous intelligence layer:
                understand the operation, connect its knowledge, reason over
                the context and identify opportunities for optimization.
              </p>
            </div>

            <div className="space-y-4">
              {architecture.map((step) => (
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
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Technology stack
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Complementary technologies working together.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            The goal is not to use technology for its own sake. Each
            component contributes a specific capability to the operational
            intelligence architecture.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((technology) => (
            <div
              key={technology.number}
              className="rounded-xl border border-slate-800 bg-[#08111f] p-7 transition hover:border-cyan-500/30"
            >
              <div className="text-xs font-semibold text-cyan-400">
                {technology.number}
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                {technology.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {technology.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intelligence Layers */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Intelligence layers
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A connected foundation for enterprise AI.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-slate-400">
              Operational intelligence becomes more useful when knowledge,
              context, reasoning and execution are connected.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {layers.map((layer) => (
              <div
                key={layer.title}
                className="rounded-xl border border-slate-800 bg-[#08111f] p-6"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {layer.label}
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {layer.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {layer.description}
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
            AI Operations Lab
          </div>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore the operational intelligence platform.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore the live knowledge graph, process intelligence,
            automation opportunities and AI Agent.
          </p>

          <Link
            href="/overview"
            className="mt-8 inline-flex items-center rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Open AI Operations Intelligence
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