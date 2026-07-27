import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { MENTOR_SESSIONS } from "@/lib/governance-data";
import { TpfBadge } from "@/components/TpfBlock";
import { Badge } from "@/components/ui/badge";
import { Users, Target } from "lucide-react";

export const Route = createFileRoute("/mentor-framework")({
  head: () => ({
    meta: [
      { title: "External Mentor & Ecosystem Partner Framework · NST Entrepreneurship" },
      {
        name: "description",
        content: "Specialist contributor architecture for external mentors and ecosystem partners.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <TopBar
        title="External Mentor & Ecosystem Partner Framework"
        breadcrumb="Governance & Outcomes"
      />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                Partner-Agnostic Architecture
              </p>
              <h2 className="font-mono text-xl tracking-tight">
                Specialist contributors, not course owners
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                External mentors and ecosystem partners participate at precise, high-leverage
                touchpoints in the founder journey. NST owns delivery, governance and credits;
                partners contribute industry signal, evaluations and ecosystem access. Sessions
                marked <TpfBadge /> are currently anchored by The Placement Factory.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {MENTOR_SESSIONS.map((s) => (
            <article
              key={s.id}
              className="glass-strong rounded-xl border border-emerald-400/20 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-border/60 bg-background/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {s.id}
                  </span>
                  <h3 className="font-mono text-sm tracking-tight">{s.title}</h3>
                </div>
                {s.tpf && <TpfBadge />}
              </div>
              <div className="mt-3 flex items-start gap-2">
                <Target className="mt-0.5 h-3.5 w-3.5 text-primary" />
                <p className="text-xs text-muted-foreground">{s.objective}</p>
              </div>
              <div className="mt-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-chart-2/80">
                  Expected Deliverables
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {s.deliverables.map((d) => (
                    <Badge
                      key={d}
                      variant="outline"
                      className="border-chart-2/30 bg-chart-2/10 font-mono text-[10px] text-chart-2"
                    >
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Mapped CLOs
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {s.clos.map((x) => (
                      <Badge key={x} variant="outline" className="font-mono text-[10px]">
                        {x}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Mapped TLOs
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {s.tlos.map((x) => (
                      <Badge
                        key={x}
                        variant="outline"
                        className="border-primary/30 bg-primary/10 font-mono text-[10px] text-primary"
                      >
                        {x}
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
