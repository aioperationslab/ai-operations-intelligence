"use client";

import Link from "next/link";

type PageHeaderProps = {
  title: string;
  description: string;
  breadcrumb?: string;
  live?: boolean;
  action?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  breadcrumb,
  live = true,
  action,
}: PageHeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-[#070b18]">
      <div className="px-8 py-7">
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
            <Link
              href="/"
              className="transition hover:text-slate-300"
            >
              AI Operations Lab
            </Link>

            <span className="text-slate-700">/</span>

            <span className="text-slate-400">
              {breadcrumb}
            </span>
          </div>
        )}

        {/* Header Content */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {title}
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {action}

            {live && (
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-emerald-400">
                  Neo4j Aura · Live
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}