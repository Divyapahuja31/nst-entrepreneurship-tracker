import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Command, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TLOS, YEARS } from "@/lib/framework-data";
import { SEMESTERS, WEEKS, TLOS_FULL } from "@/lib/full-syllabus-data";
import { TLOS_EXT, COURSES_DESIGN } from "@/lib/tlo-extended";
import { Button } from "@/components/ui/button";

type Hit = { kind: "TLO" | "Course" | "CLO" | "Page"; label: string; sub: string; to: string };

export function FrameworkSearch() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = useMemo<Hit[]>(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const out: Hit[] = [];

    TLOS.forEach((t) => {
      if (
        t.id.toLowerCase().includes(needle) ||
        t.title.toLowerCase().includes(needle) ||
        t.description.toLowerCase().includes(needle)
      ) {
        out.push({ kind: "TLO", label: `${t.id} — ${t.title}`, sub: t.verb, to: "/outcomes" });
      }
    });

    YEARS.forEach((y) => {
      y.courses.forEach((c) => {
        if (c.title.toLowerCase().includes(needle) || c.id.toLowerCase().includes(needle)) {
          out.push({ kind: "Course", label: c.title, sub: `${y.key} · ${c.id}`, to: "/roadmap" });
        }
        c.clos.forEach((clo) => {
          if (
            clo.statement.toLowerCase().includes(needle) ||
            clo.id.toLowerCase().includes(needle)
          ) {
            out.push({
              kind: "CLO",
              label: `${c.id}/${clo.id}`,
              sub: clo.statement.slice(0, 70) + "…",
              to: "/outcomes",
            });
          }
        });
      });
    });

    [
      { label: "Overview", to: "/" },
      { label: "Command Center", to: "/command-center" },
      { label: "Philosophy", to: "/philosophy" },
      { label: "4-Year Roadmap", to: "/roadmap" },
      { label: "Evaluation Logic", to: "/evaluation" },
      { label: "Track Outcomes", to: "/outcomes" },
      { label: "Full Syllabus", to: "/syllabus" },
      { label: "Syllabus Overview", to: "/syllabus-overview" },
    ].forEach((p) => {
      if (p.label.toLowerCase().includes(needle))
        out.push({ kind: "Page", label: p.label, sub: "Page", to: p.to });
    });

    // Extended 10 TLOs
    TLOS_EXT.forEach((t) => {
      if (
        t.id.toLowerCase().includes(needle) ||
        t.short.toLowerCase().includes(needle) ||
        t.statement.toLowerCase().includes(needle)
      ) {
        out.push({
          kind: "TLO",
          label: `${t.id} — ${t.short}`,
          sub: t.verbTier,
          to: "/command-center",
        });
      }
    });

    // Course designs
    COURSES_DESIGN.forEach((c) => {
      if (c.title.toLowerCase().includes(needle) || c.id.toLowerCase().includes(needle)) {
        out.push({
          kind: "Course",
          label: c.title,
          sub: `Sem ${c.semester} · Course Designer`,
          to: `/course/${c.id}`,
        });
      }
      c.cos.forEach((co) => {
        if (co.id.toLowerCase().includes(needle) || co.statement.toLowerCase().includes(needle)) {
          out.push({
            kind: "CLO",
            label: `${c.id}/${co.id}`,
            sub: co.statement.slice(0, 70) + "…",
            to: `/course/${c.id}`,
          });
        }
      });
    });

    // Syllabus search across semesters, modules, weeks, TLOs
    SEMESTERS.forEach((s) => {
      if (s.title.toLowerCase().includes(needle) || s.theme.toLowerCase().includes(needle)) {
        out.push({
          kind: "Page",
          label: `${s.key} · ${s.title}`,
          sub: "Semester",
          to: "/syllabus",
        });
      }
      s.modules.forEach((m) => {
        if (m.title.toLowerCase().includes(needle)) {
          out.push({
            kind: "Course",
            label: `${s.key}/${m.id} · ${m.title}`,
            sub: "Module",
            to: "/syllabus",
          });
        }
      });
    });
    WEEKS.forEach((w) => {
      if (w.title.toLowerCase().includes(needle)) {
        out.push({
          kind: "Page",
          label: `${w.semester} W${w.week} · ${w.title}`,
          sub: "Week",
          to: "/syllabus",
        });
      }
    });
    TLOS_FULL.forEach((t) => {
      if (t.id.toLowerCase().includes(needle) || t.title.toLowerCase().includes(needle)) {
        out.push({ kind: "TLO", label: `${t.id} — ${t.title}`, sub: "Syllabus", to: "/syllabus" });
      }
    });

    return out.slice(0, 8);
  }, [q]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search TLOs, courses, CLOs…"
        className="h-8 bg-white/80 border-stone-200/80 pl-8 pr-12 font-sans text-xs placeholder:text-stone-400 text-stone-900 focus-visible:ring-[#C85A32]/30 rounded-lg shadow-2xs"
      />
      <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-stone-200 bg-stone-100/70 px-1.5 py-0.5 font-mono text-[9px] text-stone-500 sm:flex">
        <Command className="h-2.5 w-2.5" /> K
      </kbd>
      {results.length > 0 && (
        <div className="glass-strong absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-80 overflow-auto rounded-xl p-1.5 shadow-xl border border-stone-200 bg-white/95">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                setQ("");
                navigate({ to: r.to as string });
              }}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-stone-100/80 cursor-pointer"
            >
              <div className="min-w-0">
                <div className="truncate font-sans font-medium text-stone-900">{r.label}</div>
                <div className="truncate text-[11px] text-stone-500">{r.sub}</div>
              </div>
              <span className="rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest text-stone-500 shrink-0">
                {r.kind}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopBar({ title, breadcrumb }: { title: string; breadcrumb?: string }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-stone-200/80 bg-[#FAF8F5]/85 px-6 backdrop-blur-xl transition-colors">
      <div className="flex items-center gap-2">
        {breadcrumb && (
          <>
            <Link
              to="/"
              className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400 hover:text-stone-700 transition-colors"
            >
              {breadcrumb}
            </Link>
            <span className="text-stone-300 font-mono text-xs">/</span>
          </>
        )}
        <h1 className="font-sans text-sm font-semibold tracking-tight text-stone-900">{title}</h1>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <FrameworkSearch />
      </div>
    </header>
  );
}
