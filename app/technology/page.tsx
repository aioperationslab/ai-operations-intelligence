import Link from "next/link";

const technologies = [
  {
    number: "01",
    category: "INTELLIGENCE",
    title: "AI Agents",
    description:
      "Intelligent agents that can query operational knowledge, reason over business context and support operational decisions.",
    capabilities: [
      "Knowledge graph querying",
      "Context-aware reasoning",
      "Operational question answering",
      "AI-assisted decision support",
    ],
  },
  {
    number: "02",
    category: "REASONING",
    title: "Large Language Models",
    description:
      "LLM technology provides the reasoning layer required to understand operational context and transform information into useful insights.",
    capabilities: [
      "Natural language understanding",
      "Reasoning over context",
      "Structured response generation",
      "Provider-flexible architecture",
    ],
  },
  {
    number: "03",
    category: "CONTEXT",
    title: "RAG & Retrieval",
    description:
      "Retrieval connects AI systems with relevant operational knowledge and business documents to provide richer context.",
    capabilities: [
      "Document retrieval",
      "Context enrichment",
      "Knowledge grounding",
      "Retrieval-ready architecture",
    ],
  },
  {
    number: "04",
    category: "KNOWLEDGE",
    title: "Neo4j Knowledge Graph",
    description:
      "A connected representation of operational knowledge linking processes, automations, systems, technologies and business structures.",
    capabilities: [
      "Process relationships",
      "Dependency analysis",
      "Technology mapping",
      "Operational knowledge discovery",
    ],
  },
  {
    number: "05",
    category: "UNDERSTANDING",
    title: "Process Intelligence",
    description:
      "Process intelligence provides the operational foundation for understanding processes, dependencies, automation maturity and opportunities.",
    capabilities: [
      "Process discovery",
      "Dependency analysis",
      "Automation maturity",
      "Opportunity identification",
    ],
  },
  {
    number: "06",
    category: "EXECUTION",
    title: "Automation",
    description:
      "Automation technologies turn operational intelligence into measurable improvements through intelligent workflows and automated execution.",
    capabilities: [
      "RPA",
      "AI-powered workflows",
      "Intelligent automation",
      "Operational optimization",
    ],
  },
];

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
              href="/#capabilities"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Capabilities
            </Link>

            <Link
              href="/technology"
              className="text-sm text-cyan-400"
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
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-28">
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
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Architecture
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                From operational knowledge to intelligent action.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-400">
                The platform is designed as a continuous intelligence
                layer: understand the operation, connect its knowledge,
                reason over the context and identify opportunities for
                optimization.
              </p>
            </div>

            <div className="space-y-3">
              {architecture.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border-slate-800 bg-[#091321] p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-xs font-semibold text-cyan-400">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {step.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-slate-400">
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

      {/* Technology stack */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Technology stack
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Six technology layers working together.
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Each layer contributes a different capability to the
            intelligence platform while remaining connected to the broader
            operational architecture.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {technologies.map((technology) => (
            <div
              key={technology.number}
              className="rounded-xl border border-slate-800 bg-[#08111f] p-7 transition hover:border-cyan-500/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400">
                  {technology.number}
                </span>

                <span className="text-[10px] font-medium tracking-[0.18em] text-slate-500">
                  {technology.category}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {technology.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {technology.description}
              </p>

              <div className="mt-6 space-y-2.5">
                {technology.capabilities.map((capability) => (
                  <div
                    key={capability}
                    className="flex items-center gap-2 text-xs text-slate-300"
                  >
                    <span className="text-cyan-400">→</span>
                    <span>{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Connected architecture */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Connected intelligence
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Intelligence is created by the connection between layers.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
              Knowledge graphs provide structure. Retrieval provides
              context. AI agents provide reasoning. Automation turns
              intelligence into operational action.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6 text-center">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Intelligence
              </div>

              <div className="mt-3 text-lg font-semibold text-white">
                AI Agents
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Reason over operational context.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6 text-center">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Knowledge
              </div>

              <div className="mt-3 text-lg font-semibold text-white">
                Neo4j
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Connect operational entities and relationships.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6 text-center">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Context
              </div>

              <div className="mt-3 text-lg font-semibold text-white">
                RAG
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Retrieve relevant business knowledge.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6 text-center">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Execution
              </div>

              <div className="mt-3 text-lg font-semibold text-white">
                Automation
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Turn intelligence into operational action.
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
            See the technology working together.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore the live knowledge graph, process intelligence,
            automation opportunities and AI Agent.
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