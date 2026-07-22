import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { CREDIT_COMPONENTS } from "@/lib/governance-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gauge, Scale } from "lucide-react";

export const Route = createFileRoute("/credit-mapping")({
  head: () => ({
    meta: [
      { title: "Credit & Evaluation Architecture · NST Entrepreneurship" },
      {
        name: "description",
        content: "Configurable semester evaluation with CLO / TLO traceability.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [weights, setWeights] = useState(CREDIT_COMPONENTS.map((c) => c.weight));
  const total = useMemo(() => weights.reduce((a, b) => a + b, 0), [weights]);

  return (
    <>
      <TopBar title="Credit & Evaluation Architecture" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                Academic Rigor
              </p>
              <h2 className="font-mono text-xl tracking-tight">
                Credits earned through evidence, mapped to outcomes
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                Every evaluation component is configurable, traceable to specific CLOs and TLOs, and
                backed by required artefacts. Adjust weights to model alternative semester
                configurations — total must remain at 100.
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Weight Total
              </p>
              <p
                className={`font-mono text-2xl ${total === 100 ? "text-primary" : "text-warning"}`}
              >
                {total}%
              </p>
            </div>
          </div>
        </section>

        <section className="glass-strong overflow-hidden rounded-2xl">
          <div className="grid grid-cols-12 gap-3 border-b border-border/50 bg-background/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <div className="col-span-3">Component</div>
            <div className="col-span-2">Weight</div>
            <div className="col-span-4">Evidence Required</div>
            <div className="col-span-1">CLOs</div>
            <div className="col-span-2">TLOs</div>
          </div>
          {CREDIT_COMPONENTS.map((c, i) => (
            <div
              key={c.component}
              className="grid grid-cols-12 items-center gap-3 border-b border-border/30 px-5 py-4 last:border-b-0"
            >
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-3.5 w-3.5 text-primary" />
                  <p className="font-mono text-sm">{c.component}</p>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Input
                  type="number"
                  value={weights[i]}
                  onChange={(e) => {
                    const next = [...weights];
                    next[i] = Number(e.target.value) || 0;
                    setWeights(next);
                  }}
                  className="h-8 w-16 font-mono text-xs"
                />
                <span className="font-mono text-xs text-muted-foreground">%</span>
              </div>
              <div className="col-span-4 text-xs text-muted-foreground">{c.evidence}</div>
              <div className="col-span-1 flex flex-wrap gap-1">
                {c.clos.map((x) => (
                  <Badge
                    key={x}
                    variant="outline"
                    className="border-chart-2/30 bg-chart-2/10 font-mono text-[9px] text-chart-2"
                  >
                    {x}
                  </Badge>
                ))}
              </div>
              <div className="col-span-2 flex flex-wrap gap-1">
                {c.tlos.map((x) => (
                  <Badge
                    key={x}
                    variant="outline"
                    className="border-primary/30 bg-primary/10 font-mono text-[9px] text-primary"
                  >
                    {x}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
