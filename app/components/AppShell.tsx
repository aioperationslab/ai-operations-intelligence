"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  eyebrow?: string;
  status?: string;
};

export default function AppShell({
  children,
  title,
  description,
  eyebrow = "AI Operations Lab",
  status = "Neo4j Aura · Live",
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      <div className="flex min-h-screen">
        {/* =====================================================
            GLOBAL SIDEBAR
        ===================================================== */}
        <Sidebar />

        {/* =====================================================
            MAIN APPLICATION AREA
        ===================================================== */}
        <main className="ml-64 min-h-screen min-w-0 flex-1 bg-[#050b16]">
          {/* ===================================================
              GLOBAL PAGE HEADER
          =================================================== */}
          <header className="border-b border-slate-800 bg-[#07111f]">
            <div className="flex min-h-[118px] items-center justify-between gap-8 px-8 py-6">
              {/* Page title */}
              <div className="min-w-0">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  {eyebrow}
                </div>

                {title && (
                  <h1 className="text-2xl font-semibold tracking-tight text-white">
                    {title}
                  </h1>
                )}

                {description && (
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                )}
              </div>

              {/* Live status */}
              <div className="shrink-0">
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="text-[11px] font-medium text-emerald-300">
                    {status}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* ===================================================
              PAGE CONTENT
          =================================================== */}
          <div className="mx-auto w-full max-w-[1440px] px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}