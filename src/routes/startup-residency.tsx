import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { RESIDENCY_MONTHS, RESIDENCY_COMPONENTS } from "@/lib/governance-data";
import { Badge } from "@/components/ui/badge";
import { Rocket, CheckSquare } from "lucide-react";

export const Route = createFileRoute("/startup-residency")({
  head: () => ({
    meta: [
      { title: "Startup Residency Evaluation System · NST Entrepreneurship" },
      { name: "description", content: "Evaluation framework for students choosing startup-building instead of internships." },
    ],
  }),
  component: Page,
});

function Page() {
  const totalCredits = RESIDENCY_MONTHS.reduce((a, m) => a + m.credits, 0);
  return (
    <>
      <TopBar title="Startup Residency Evaluation System" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
              <Rocket className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">Startup Track</p>
              <h2 className="font-mono text-xl tracking-tight">For students building, not interning</h2>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                A six-month residency that grants academic credit for verified venture progress. Each month has a phase,
                deliverable set, and credit allocation. Evidence — not effort — earns credits.
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Total Credits</p>
              <p className="font-mono text-2xl text-primary">{totalCredits}</p>
            </div>
          </div>
        </section>

        <section>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">6-Month Progression Model</p>
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {RESIDENCY_MONTHS.map((m) => (
              <div key={m.month} className="glass-strong rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">Month {m.month}</p>
                  <Badge variant="outline" className="border-primary/40 bg-primary/15 font-mono text-[10px] text-primary">{m.credits} cr</Badge>
                </div>
                <h3 className="mt-2 font-mono text-sm tracking-tight">{m.phase}</h3>
                <ul className="mt-2 space-y-1">
                  {m.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                      <CheckSquare className="mt-0.5 h-3 w-3 text-chart-2" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-strong overflow-hidden rounded-2xl">
          <div className="grid grid-cols-12 gap-3 border-b border-border/50 bg-background/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <div className="col-span-4">Evaluation Component</div>
            <div className="col-span-2">Weight</div>
            <div className="col-span-6">Evidence</div>
          </div>
          {RESIDENCY_COMPONENTS.map((c) => (
            <div key={c.name} className="grid grid-cols-12 gap-3 border-b border-border/30 px-5 py-3 last:border-b-0">
              <div className="col-span-4 font-mono text-sm">{c.name}</div>
              <div className="col-span-2 font-mono text-sm text-primary">{c.weight}%</div>
              <div className="col-span-6 text-xs text-muted-foreground">{c.evidence}</div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
