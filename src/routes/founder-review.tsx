import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { FOUNDER_RUBRIC, RUBRIC_BANDS } from "@/lib/governance-data";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/founder-review")({
  head: () => ({
    meta: [
      { title: "Founder Review System · NST Entrepreneurship" },
      {
        name: "description",
        content: "Venture-grade founder evaluation rubric and scoring bands.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [scores, setScores] = useState<number[]>(FOUNDER_RUBRIC.map(() => 5));
  const avg = useMemo(() => scores.reduce((a, b) => a + b, 0) / scores.length, [scores]);
  const band = useMemo(() => {
    if (avg >= 9) return RUBRIC_BANDS[0];
    if (avg >= 7) return RUBRIC_BANDS[1];
    if (avg >= 5) return RUBRIC_BANDS[2];
    if (avg >= 3) return RUBRIC_BANDS[3];
    return RUBRIC_BANDS[4];
  }, [avg]);

  return (
    <>
      <TopBar title="Founder Review System" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
                <Trophy className="h-4 w-4 text-primary" />
              </div>
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                  Portfolio-Style Review
                </p>
                <h2 className="font-mono text-xl tracking-tight">
                  Standardised founder evaluation
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mirrors a venture-capital portfolio review. Every category is scored 1–10 against
                  evidence, and the aggregate places the founder in one of five bands.
                </p>
              </div>
            </div>
            <div className={`rounded-xl border px-5 py-4 ${band.tone}`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                Current Placement
              </p>
              <p className="mt-1 font-mono text-2xl">{avg.toFixed(1)}</p>
              <p className="mt-0.5 font-mono text-xs">
                {band.band} · {band.range}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-2 md:grid-cols-5">
            {RUBRIC_BANDS.map((b) => (
              <div key={b.band} className={`rounded-lg border p-3 ${b.tone}`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                  {b.range}
                </p>
                <p className="font-mono text-sm">{b.band}</p>
                <p className="mt-1 text-[10px] opacity-80">{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {FOUNDER_RUBRIC.map((r, i) => (
            <article key={r.category} className="glass-strong rounded-xl p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <h3 className="font-mono text-sm tracking-tight">{r.category}</h3>
                </div>
                <span className="font-mono text-sm text-primary">{scores[i]}/10</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{r.description}</p>
              <Slider
                value={[scores[i]]}
                min={0}
                max={10}
                step={1}
                className="mt-3"
                onValueChange={(v) => {
                  const n = [...scores];
                  n[i] = v[0];
                  setScores(n);
                }}
              />
              <div className="mt-3 flex flex-wrap gap-1">
                {r.examples.map((e) => (
                  <Badge
                    key={e}
                    variant="outline"
                    className="border-chart-2/30 bg-chart-2/10 font-mono text-[9px] text-chart-2"
                  >
                    {e}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
