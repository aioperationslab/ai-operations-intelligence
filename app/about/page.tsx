import Link from "next/link";

const principles = [
  {
    title: "AI-native operations",
    description:
      "AI should be designed as part of the operating model, not added as a disconnected layer on top of existing automation.",
  },
  {
    title: "Connected intelligence",
    description:
      "Processes, systems, technologies and business knowledge become more useful when they are connected through a common operational model.",
  },
  {
    title: "Human-centered automation",
    description:
      "The goal is not automation for its own sake. AI should help teams make better decisions, reduce repetitive work and focus on higher-value activities.",
  },
];

const capabilities = [
  "AI Agents",
  "Process Intelligence",
  "Knowledge Graphs",
  "RAG & Retrieval",
  "Intelligent Automation",
  "Operational Analytics",
];

export default function AboutPage() {
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
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pt-20">
        <div className="max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            About AI Operations Lab
          </div>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
            Building the intelligence layer for{" "}
            <span className="text-cyan-400">
              enterprise operations.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            AI Operations Lab explores how AI agents, knowledge graphs,
            retrieval and intelligent automation can work together to
            transform complex operational processes.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Our mission
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Make enterprise operations more intelligent.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-7 text-slate-400">
              <p>
                Enterprise operations generate enormous amounts of process
                knowledge across applications, documents, systems and teams.
              </p>

              <p>
                AI Operations Lab explores ways to bring that knowledge
                together so intelligent systems can understand processes,
                identify relationships and support better operational
                decisions.
              </p>

              <p>
                The platform is designed around a simple idea: combine
                structured operational intelligence with AI reasoning and
                automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Principles
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            How we think about enterprise AI.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-xl border border-slate-800 bg-[#08111f] p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                ✦
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                {principle.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Technology focus
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                A modern foundation for intelligent automation.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-400">
                AI Operations Lab brings together complementary technologies
                rather than treating AI, automation and operational data as
                separate systems.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="rounded-lg border border-slate-800 bg-[#091321] px-4 py-5 text-center text-sm text-slate-300"
                >
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-8 py-14 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Explore the platform
          </div>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            See operational intelligence in action.
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