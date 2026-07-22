import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { YEARS, TLOS, type YearKey } from "@/lib/framework-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Sparkles, Layers } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "4-Year Roadmap · NST Entrepreneurship" },
      {
        name: "description",
        content:
          "Curriculum architecture across Foundation, Execution, Scaling, and Residency layers.",
      },
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

function Page() {
  const [active, setActive] = useState<YearKey>("Year 1");
  const year = YEARS.find((y) => y.key === active)!;
  const [cloCourseId, setCloCourseId] = useState<string>(year.courses[0].id);
  const cloCourse = year.courses.find((c) => c.id === cloCourseId) ?? year.courses[0];

  return (
    <>
      <TopBar title="Curriculum Architecture" breadcrumb="Master Framework" />
      <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
        <Tabs
          value={active}
          onValueChange={(v) => {
            setActive(v as YearKey);
            const y = YEARS.find((yy) => yy.key === v)!;
            setCloCourseId(y.courses[0].id);
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                Curriculum
              </p>
              <h2 className="font-mono text-xl tracking-tight">4-Year Interactive Roadmap</h2>
            </div>
            <TabsList className="glass h-10 rounded-lg p-1">
              {YEARS.map((y) => (
                <TabsTrigger
                  key={y.key}
                  value={y.key}
                  className="font-mono text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {y.key}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {YEARS.map((y) => (
            <TabsContent key={y.key} value={y.key} className="mt-6 space-y-6">
              <section className="glass-strong relative overflow-hidden rounded-2xl p-7">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                  <Layers className="h-3.5 w-3.5" /> {y.layer}
                </div>
                <h3 className="mt-2 font-mono text-2xl tracking-tight">
                  {y.key} — <span className="gold-text">{y.layer}</span>
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{y.tagline}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {y.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[11px] text-primary"
                    >
                      <Sparkles className="h-3 w-3" /> {h}
                    </span>
                  ))}
                </div>
              </section>

              <section className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                      CLO Dropdown
                    </p>
                    <h3 className="font-mono text-base tracking-tight">Course-Level Outcomes</h3>
                  </div>
                  <Select value={cloCourseId} onValueChange={setCloCourseId}>
                    <SelectTrigger className="w-[280px] bg-background/40 font-mono text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {y.courses.map((c) => (
                        <SelectItem key={c.id} value={c.id} className="font-mono text-xs">
                          {c.id} · {c.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-5 space-y-2">
                  {cloCourse.clos.map((clo) => (
                    <div
                      key={clo.id}
                      className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/20 p-3"
                    >
                      <span className="mt-0.5 rounded-sm bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                        {clo.id}
                      </span>
                      <p className="flex-1 text-sm text-foreground/90">{clo.statement}</p>
                      <div className="flex flex-wrap gap-1">
                        {clo.tlos.map((tloId) => {
                          const t = TLOS.find((x) => x.id === tloId)!;
                          return (
                            <HoverCard key={tloId} openDelay={60}>
                              <HoverCardTrigger asChild>
                                <button className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary hover:bg-primary/20">
                                  {tloId}
                                </button>
                              </HoverCardTrigger>
                              <HoverCardContent className="glass-strong w-80 border-border/60">
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                                  {t.id} · {t.verb}
                                </p>
                                <h4 className="mt-1 font-mono text-sm">{t.title}</h4>
                                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                  {t.description}
                                </p>
                              </HoverCardContent>
                            </HoverCard>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                {y.courses.map((c) => (
                  <div key={c.id} className="glass rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                        {c.id}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h4 className="mt-2 font-mono text-base tracking-tight">{c.title}</h4>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className={`font-mono text-[10px] uppercase tracking-widest ${tagTone[t] ?? ""}`}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="hairline my-4" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          Topics
                        </p>
                        <ul className="mt-1.5 space-y-1">
                          {c.topics.slice(0, 5).map((tp) => (
                            <li key={tp} className="text-xs text-foreground/80">
                              · {tp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          Execution
                        </p>
                        <ul className="mt-1.5 space-y-1">
                          {c.execution.map((e) => (
                            <li key={e} className="text-xs text-foreground/80">
                              → {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </>
  );
}
