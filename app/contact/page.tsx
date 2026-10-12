import Link from "next/link";

const contactOptions = [
  {
    number: "01",
    title: "AI & Automation",
    description:
      "Explore AI agents, intelligent automation and operational intelligence opportunities.",
    action: "Discuss an opportunity",
  },
  {
    number: "02",
    title: "Technology & Partnerships",
    description:
      "Connect around AI platforms, knowledge graphs, retrieval, automation and emerging enterprise technologies.",
    action: "Explore collaboration",
  },
  {
    number: "03",
    title: "Product & Innovation",
    description:
      "Discuss ideas around AI-native products, process intelligence and the future of enterprise operations.",
    action: "Start a conversation",
  },
];

export default function ContactPage() {
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
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="max-w-4xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Contact AI Operations Lab
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
              Let&apos;s build the future of{" "}
              <span className="text-cyan-400">
                intelligent operations.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
              Whether you are exploring AI agents, intelligent automation,
              process intelligence or new technology partnerships, AI
              Operations Lab is open to meaningful conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="border-y border-slate-800/80 bg-[#07111f]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Start a conversation
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Explore what we can build together.
            </h2>

            <p className="mt-4 text-slate-400">
              AI Operations Lab focuses on practical applications of AI,
              automation and operational intelligence.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {contactOptions.map((option) => (
              <div
                key={option.number}
                className="rounded-xl border border-slate-800 bg-[#08111f] p-7 transition hover:border-cyan-500/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-400">
                    {option.number}
                  </span>

                  <span className="text-slate-600">✦</span>
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {option.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {option.description}
                </p>

                <div className="mt-6 text-sm font-medium text-cyan-400">
                  {option.action} →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Get in touch
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Have an idea, challenge or opportunity?
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-400">
              Send a message and describe what you are working on. The best
              conversations start with a concrete problem worth solving.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#08111f] p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Email
            </div>

            <a
              href="mailto:zahra.elgoumri@aioperationslab.com"
              className="mt-4 block text-xl font-medium text-cyan-400 transition hover:text-cyan-300 sm:text-2xl"
            >
              zahra.elgoumri@aioperationslab.com
            </a>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              AI Operations Lab
              <br />
              Building intelligent AI agents &amp; automation solutions for
              enterprise operations.
            </p>
          </div>
        </div>
      </section>

      {/* Platform CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
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
            Building intelligent AI agents &amp; automation solutions for
            enterprise operations.
          </div>
        </div>
      </footer>
    </main>
  );
}