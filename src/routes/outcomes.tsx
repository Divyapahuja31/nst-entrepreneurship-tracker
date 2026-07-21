import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { TLOS, YEARS } from "@/lib/framework-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Search } from "lucide-react";

export const Route = createFileRoute("/outcomes")({
  head: () => ({
    meta: [
      { title: "Track Outcomes · NST Entrepreneurship" },
      { name: "description", content: "The Mastery Matrix — every CLO mapped to its TLOs." },
    ],
  }),
  component: Page,
});

const tagTone: Record<string, string> = {
  "High Intensity": "bg-destructive/15 text-destructive border-destructive/30",
  "Market Facing": "bg-chart-2/15 text-chart-2 border-chart-2/30",
  "Technical Engineering": "bg-primary/15 text-primary border-primary/30",
  Strategic: "bg-chart-5/15 text-chart-5 border-chart-5/30",
  Operational: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Ethical: "bg-warning/15 text-warning border-warning/30",
};

type Row = {
  year: string;
  courseId: string;
  courseTitle: string;
  cloId: string;
  statement: string;
  tlos: string[];
  tags: string[];
};

function Page() {
  const [q, setQ] = useState("");
  const [tloFilter, setTloFilter] = useState<string | null>(null);

  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    YEARS.forEach((y) =>
      y.courses.forEach((c) =>
        c.clos.forEach((clo) =>
          out.push({
            year: y.key,
            courseId: c.id,
            courseTitle: c.title,
            cloId: clo.id,
            statement: clo.statement,
            tlos: clo.tlos,
            tags: c.tags,
          }),
        ),
      ),
    );
    return out;
  }, []);

  const filtered = rows.filter((r) => {
    if (tloFilter && !r.tlos.includes(tloFilter)) return false;
    if (!q.trim()) return true;
    const n = q.trim().toLowerCase();
    return (
      r.statement.toLowerCase().includes(n) ||
      r.courseTitle.toLowerCase().includes(n) ||
      r.courseId.toLowerCase().includes(n) ||
      r.cloId.toLowerCase().includes(n) ||
      r.year.toLowerCase().includes(n) ||
      r.tlos.some((t) => t.toLowerCase().includes(n)) ||
      r.tags.some((t) => t.toLowerCase().includes(n))
    );
  });

  return (
    <>
      <TopBar title="The Mastery Matrix" breadcrumb="Master Framework" />
      <main className="flex-1 space-y-6 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">CLO × TLO Map</p>
              <h2 className="font-mono text-xl tracking-tight">Every outcome, traced.</h2>
              <p className="mt-1 text-sm text-muted-foreground">{filtered.length} of {rows.length} CLOs</p>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search CLOs, courses, tags…"
                className="h-9 bg-background/40 pl-9 font-mono text-sm"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <button
              onClick={() => setTloFilter(null)}
              className={`rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest ${
                !tloFilter ? "border-primary/50 bg-primary/15 text-primary" : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {TLOS.map((t) => (
              <HoverCard key={t.id} openDelay={80}>
                <HoverCardTrigger asChild>
                  <button
                    onClick={() => setTloFilter(tloFilter === t.id ? null : t.id)}
                    className={`rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest ${
                      tloFilter === t.id ? "border-primary/50 bg-primary/15 text-primary" : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.id}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="glass-strong w-80 border-border/60">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">{t.id} · {t.verb}</p>
                  <h4 className="mt-1 font-mono text-sm">{t.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </section>

        <section className="glass overflow-hidden rounded-2xl">
          <div className="hidden grid-cols-12 gap-4 border-b border-border/60 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:grid">
            <div className="col-span-1">Year</div>
            <div className="col-span-2">Course</div>
            <div className="col-span-1">CLO</div>
            <div className="col-span-5">Outcome</div>
            <div className="col-span-1">TLOs</div>
            <div className="col-span-2">Tags</div>
          </div>

          <div className="divide-y divide-border/50">
            {filtered.length === 0 && (
              <div className="px-6 py-10 text-center font-mono text-sm text-muted-foreground">
                No outcomes match this filter.
              </div>
            )}
            {filtered.map((r, i) => (
              <div key={i} className="grid grid-cols-1 gap-3 px-6 py-4 transition hover:bg-accent/20 md:grid-cols-12 md:items-center md:gap-4">
                <div className="col-span-1 font-mono text-[11px] uppercase tracking-widest text-primary/80">{r.year}</div>
                <div className="col-span-2">
                  <p className="font-mono text-xs text-muted-foreground">{r.courseId}</p>
                  <p className="font-mono text-sm tracking-tight">{r.courseTitle}</p>
                </div>
                <div className="col-span-1 font-mono text-xs text-primary">{r.cloId}</div>
                <div className="col-span-5 text-sm text-foreground/90">{r.statement}</div>
                <div className="col-span-1 flex flex-wrap gap-1">
                  {r.tlos.map((tloId) => {
                    const t = TLOS.find((x) => x.id === tloId)!;
                    return (
                      <HoverCard key={tloId} openDelay={60}>
                        <HoverCardTrigger asChild>
                          <button className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary hover:bg-primary/20">
                            {tloId}
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="glass-strong w-80 border-border/60">
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">{t.id} · {t.verb}</p>
                          <h4 className="mt-1 font-mono text-sm">{t.title}</h4>
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                </div>
                <div className="col-span-2 flex flex-wrap gap-1">
                  {r.tags.map((tg) => (
                    <Badge key={tg} variant="outline" className={`font-mono text-[10px] uppercase tracking-widest ${tagTone[tg] ?? ""}`}>{tg}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
