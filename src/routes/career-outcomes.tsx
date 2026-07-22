import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { CAREER_PATHWAYS } from "@/lib/governance-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Search, Target } from "lucide-react";

export const Route = createFileRoute("/career-outcomes")({
  head: () => ({
    meta: [
      { title: "Career Outcome Framework · NST Entrepreneurship" },
      {
        name: "description",
        content: "Founder-first capability translated into employability pathways.",
      },
    ],
  }),
  component: Page,
});

const families = [
  "Venture",
  "Product",
  "Growth",
  "Operations",
  "Capital",
  "Strategy",
  "Ecosystem",
] as const;

function Page() {
  const [q, setQ] = useState("");
  const [fam, setFam] = useState<string | null>(null);

  const rows = useMemo(() => {
    return CAREER_PATHWAYS.filter((p) => {
      if (fam && p.family !== fam) return false;
      if (!q) return true;
      const hay = [p.role, p.family, ...p.skills, ...p.evidence, p.relevance]
        .join(" ")
        .toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [q, fam]);

  return (
    <>
      <TopBar title="Career Outcome Framework" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                Outcome Translation
              </p>
              <h2 className="font-mono text-xl tracking-tight">
                If a student does not become a founder, what value does this minor create?
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Every capability built inside the founder journey — customer discovery, product
                thinking, market evidence, operational rigor — maps directly to high-leverage
                employment pathways. The track is execution-first; the evidence it produces is
                exactly what venture-grade employers screen for.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search role, skill, evidence…"
                className="h-9 w-64 pl-8 font-mono text-xs"
              />
            </div>
            <button
              onClick={() => setFam(null)}
              className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${!fam ? "border-primary/50 bg-primary/15 text-primary" : "border-border/60 text-muted-foreground"}`}
            >
              All
            </button>
            {families.map((f) => (
              <button
                key={f}
                onClick={() => setFam(f)}
                className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${fam === f ? "border-primary/50 bg-primary/15 text-primary" : "border-border/60 text-muted-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {rows.map((p) => (
            <article key={p.role} className="glass-strong rounded-xl p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <h3 className="font-mono text-sm tracking-tight">{p.role}</h3>
                </div>
                <Badge
                  variant="outline"
                  className="font-mono text-[9px] uppercase tracking-[0.18em]"
                >
                  {p.family}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{p.relevance}</p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                    Skills Developed
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {p.skills.map((s) => (
                      <Badge
                        key={s}
                        variant="outline"
                        className="border-primary/30 bg-primary/10 font-mono text-[10px] text-primary"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-chart-2/80">
                    Evidence Produced
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {p.evidence.map((e) => (
                      <Badge
                        key={e}
                        variant="outline"
                        className="border-chart-2/30 bg-chart-2/10 font-mono text-[10px] text-chart-2"
                      >
                        {e}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
