import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { READINESS_MAP } from "@/lib/governance-data";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/industry-readiness")({
  head: () => ({
    meta: [
      { title: "Industry Readiness Framework · NST Entrepreneurship" },
      {
        name: "description",
        content: "Entrepreneurship outcomes mapped to employability outcomes.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <TopBar title="Industry Readiness Framework" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                Skill → Evidence → Role
              </p>
              <h2 className="font-mono text-xl tracking-tight">
                Entrepreneurship as employability
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                A direct map from the capabilities built inside the track to the roles employers
                hire for. Designed for students, parents, academic leadership, and placement teams.
              </p>
            </div>
          </div>
        </section>

        <section className="glass-strong overflow-hidden rounded-2xl">
          <div className="grid grid-cols-12 gap-3 border-b border-border/50 bg-background/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <div className="col-span-3">Skill</div>
            <div className="col-span-5">Evidence</div>
            <div className="col-span-4">Relevant Roles</div>
          </div>
          {READINESS_MAP.map((r) => (
            <div
              key={r.skill}
              className="grid grid-cols-12 items-start gap-3 border-b border-border/30 px-5 py-4 last:border-b-0"
            >
              <div className="col-span-3 font-mono text-sm">{r.skill}</div>
              <div className="col-span-5 flex flex-wrap gap-1">
                {r.evidence.map((e) => (
                  <Badge
                    key={e}
                    variant="outline"
                    className="border-chart-2/30 bg-chart-2/10 font-mono text-[10px] text-chart-2"
                  >
                    {e}
                  </Badge>
                ))}
              </div>
              <div className="col-span-4 flex flex-wrap gap-1">
                {r.roles.map((x) => (
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
          ))}
        </section>
      </main>
    </>
  );
}
