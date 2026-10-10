"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Overview",
    icon: "⌂",
    href: "/",
  },
  {
    name: "Process Intelligence",
    icon: "◈",
    href: "/process-intelligence",
  },
  {
    name: "AI Agent",
    icon: "✦",
    href: "/ai-agent",
  },
  {
    name: "Knowledge Graph",
    icon: "◎",
    href: "/knowledge-graph",
  },
  {
    name: "Automation Opportunities",
    icon: "⚡",
    href: "/automation-opportunities",
  },
  {
    name: "Analytics",
    icon: "▥",
    href: "/analytics",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-800 bg-[#070b18]">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <Link href="/" className="block">
          <div className="text-lg font-bold tracking-tight text-white">
            AI Operations Lab
          </div>

          <div className="mt-0.5 text-xs text-cyan-400">
            Intelligence Platform
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Platform
        </div>

        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-md text-sm ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-slate-500"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-800 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white">
          <span className="flex h-7 w-7 items-center justify-center text-slate-500">
            ⚙
          </span>

          Settings
        </button>

        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs font-medium text-slate-300">
              System Online
            </span>
          </div>

          <p className="mt-1 text-[10px] text-slate-500">
            AI Operations Lab
          </p>
        </div>
      </div>
    </aside>
  );
}