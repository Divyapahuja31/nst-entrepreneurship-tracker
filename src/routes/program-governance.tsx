import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { GOVERNANCE_METRICS } from "@/lib/governance-data";
import { Activity } from "lucide-react";

export const Route = createFileRoute("/program-governance")({
  head: () => ({
    meta: [
      { title: "Program Governance · NST Entrepreneurship" },
      {
        name: "description",
        content: "Leadership dashboard for program health, outcomes and engagement.",
      },
    ],
  }),
  component: Page,
});

const toneMap: Record<string, string> = {
  primary: "border-primary/30 bg-primary/10 text-primary",
  "chart-2": "border-chart-2/30 bg-chart-2/10 text-chart-2",
  "chart-5": "border-chart-5/30 bg-chart-5/10 text-chart-5",
  warning: "border-warning/30 bg-warning/10 text-warning",
};

function Page() {
  return (
    <>
      <TopBar title="Program Governance" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                Leadership View
              </p>
              <h2 className="font-mono text-xl tracking-tight">Program health, at a glance</h2>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                Operational, academic and outcome metrics required for university governance,
                accreditation reviews and ecosystem reporting. Numbers shown are illustrative
                baselines; live data binds in once the operations layer is connected.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GOVERNANCE_METRICS.map((m) => (
            <div
              key={m.label}
              className={`glass-strong rounded-xl border p-4 ${toneMap[m.tone] ?? toneMap.primary}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                {m.label}
              </p>
              <p className="mt-2 font-mono text-3xl tracking-tight">{m.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                {m.trend}
              </p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
