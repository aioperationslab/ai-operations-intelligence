import Link from "next/link";

const capabilities = [
  {
    title: "Process Intelligence",
    description:
      "Understand how operational processes, dependencies and automation maturity connect across the enterprise.",
    icon: "◈",
  },
  {
    title: "AI Agents",
    description:
      "Build intelligent agents that can reason over structured operational knowledge and business context.",
    icon: "✦",
  },
  {
    title: "Knowledge Graphs",
    description:
      "Connect processes, systems, technologies and business capabilities through a living operational knowledge graph.",
    icon: "◎",
  },
  {
    title: "Automation Intelligence",
    description:
      "Identify and prioritize the processes with the strongest potential for automation and AI optimization.",
    icon: "⚡",
  },
];

const technology = [
  "AI Agents",
  "LLMs",
  "RAG",
  "Neo4j",
  "Process Intelligence",
  "Automation",
];

export default function HomePage() {
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

          <nav className="hidden items-center gap-7 md:flex">
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-medium text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI-powered enterprise operations
            </div>

            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Transform enterprise operations with{" "}
              <span className="text-cyan-400">
                intelligent AI.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              AI Operations Lab builds intelligent AI agents and automation
              solutions that connect business processes, operational data,
              knowledge graphs and automation technology.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/overview"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore the Intelligence Platform
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/solutions"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/40 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800/60"
              >
                Explore solutions
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform preview */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Knowledge Graph
              </div>

              <div className="mt-4 text-4xl font-semibold text-cyan-400">
                39
              </div>

              <div className="mt-2 text-sm text-slate-400">
                operational entities connected through a live graph
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Relationships
              </div>

              <div className="mt-4 text-4xl font-semibold text-cyan-400">
                72
              </div>

              <div className="mt-2 text-sm text-slate-400">
                live relationships between processes, systems and automation
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#091321] p-6">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                AI Agent
              </div>

              <div className="mt-4 text-4xl font-semibold text-emerald-400">
                Live
              </div>

              <div className="mt-2 text-sm text-slate-400">
                query operational intelligence directly from the knowledge graph
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Platform capabilities
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Intelligence across the entire automation lifecycle.
          </h2>

          <p className="mt-4 text-slate-400">
            From understanding operational processes to identifying
            automation opportunities and enabling AI-assisted decisions.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="rounded-xl border border-slate-800 bg-[#08111f] p-7 transition hover:border-cyan-500/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500/10 text-lg text-cyan-400">
                {capability.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                {capability.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section
        id="technology"
        className="border-y border-slate-800/80 bg-[#07111f]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Technology foundation
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Built as an AI-native operations platform.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-400">
                The architecture combines structured operational knowledge,
                AI reasoning, retrieval and automation to create a foundation
                for intelligent enterprise operations.
              </p>

              <Link
                href="/technology"
                className="mt-7 inline-flex items-center text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                Explore the technology →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {technology.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-800 bg-[#091321] px-4 py-4 text-center text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About / Contact navigation */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/about"
            className="group rounded-xl border border-slate-800 bg-[#08111f] p-8 transition hover:border-cyan-500/30"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              About
            </div>

            <h2 className="mt-4 text-2xl font-semibold">
              Discover AI Operations Lab.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Learn more about the vision, principles and technology approach
              behind the platform.
            </p>

            <div className="mt-6 text-sm font-medium text-cyan-400 transition group-hover:text-cyan-300">
              About AI Operations Lab →
            </div>
          </Link>

          <Link
            href="/contact"
            className="group rounded-xl border border-slate-800 bg-[#08111f] p-8 transition hover:border-cyan-500/30"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Contact
            </div>

            <h2 className="mt-4 text-2xl font-semibold">
              Have an idea or opportunity?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Explore collaboration, AI automation opportunities, technology
              partnerships or product ideas.
            </p>

            <div className="mt-6 text-sm font-medium text-cyan-400 transition group-hover:text-cyan-300">
              Get in touch →
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
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