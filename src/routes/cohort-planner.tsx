import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { TLOS_EXT, TLO_SEMESTER_COVERAGE, COURSES_DESIGN } from "@/lib/tlo-extended";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { CalendarRange, Target, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/cohort-planner")({
  head: () => ({
    meta: [
      { title: "Cohort Planner · NST Entrepreneurship" },
      {
        name: "description",
        content: "Pick a target cohort year and see required TLO and CLO coverage per term.",
      },
    ],
  }),
  component: Page,
});

const CURRENT_YEAR = 2026;
const COHORT_YEARS = [2026, 2027, 2028, 2029, 2030];
const STRENGTH_LABEL = ["None", "Supporting", "Strong", "Primary"];
const STRENGTH_TONE = [
  "bg-muted/30 text-muted-foreground",
  "bg-muted/60",
  "bg-primary/30 text-primary",
  "bg-primary/70 text-primary-foreground",
];

// 4-year program → graduation = entry year + 4
function termsFor(entryYear: number) {
  return [1, 2, 3, 4].flatMap((y) => [
    {
      sem: (y - 1) * 2 + 1,
      label: `Y${y} · Odd`,
      calendar: `Aug ${entryYear + y - 1} → Dec ${entryYear + y - 1}`,
    },
    {
      sem: (y - 1) * 2 + 2,
      label: `Y${y} · Even`,
      calendar: `Jan ${entryYear + y} → May ${entryYear + y}`,
    },
  ]);
}

// Map sem (1..8) → curricular semester (1..4) — 2 academic terms per curricular semester
const SEM_TO_CURRICULAR = (sem: number) => Math.min(4, Math.ceil(sem / 2)) as 1 | 2 | 3 | 4;

function Page() {
  const [entryYear, setEntryYear] = useState<number>(CURRENT_YEAR);
  const terms = useMemo(() => termsFor(entryYear), [entryYear]);
  const gradYear = entryYear + 4;

  return (
    <>
      <TopBar title="Cohort Planner" breadcrumb="NST 2026 · Operations" />
      <main className="relative flex-1 px-6 py-8 lg:px-10 lg:py-10 space-y-6">
        <section className="glass-strong relative overflow-hidden rounded-2xl p-6 lg:p-8">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary/80">
            Planning · Cohort orchestration
          </p>
          <h2 className="mt-2 font-mono text-2xl tracking-tight lg:text-4xl">
            Required TLO & CLO coverage
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Choose a target intake year. The planner projects the term-by-term coverage map you must
            deliver to ensure every Track-Level Outcome lands at the expected strength before
            graduation.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarRange className="h-4 w-4 text-primary" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Cohort intake
              </span>
              <Select value={String(entryYear)} onValueChange={(v) => setEntryYear(Number(v))}>
                <SelectTrigger className="w-32 bg-background/40 font-mono text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COHORT_YEARS.map((y) => (
                    <SelectItem key={y} value={String(y)} className="font-mono text-xs">
                      Aug {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              Graduation · May {gradYear}
            </Badge>
            <Badge variant="outline" className="font-mono text-[10px]">
              {TLOS_EXT.length} TLOs · {COURSES_DESIGN.length} mapped courses
            </Badge>
          </div>
        </section>

        <Tabs defaultValue="tlo">
          <TabsList className="bg-background/40">
            <TabsTrigger value="tlo" className="font-mono text-xs">
              <Target className="mr-2 h-3.5 w-3.5" />
              TLO coverage
            </TabsTrigger>
            <TabsTrigger value="clo" className="font-mono text-xs">
              <GraduationCap className="mr-2 h-3.5 w-3.5" />
              CLO load per term
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tlo" className="mt-4">
            <div className="glass-strong overflow-x-auto rounded-2xl p-5">
              <table className="w-full min-w-200 font-mono text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="pb-3 pr-3">TLO</th>
                    {terms.map((t) => (
                      <th key={t.sem} className="pb-3 pr-2 text-center">
                        <div>{t.label}</div>
                        <div className="text-[9px] normal-case text-muted-foreground/70">
                          {t.calendar}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TLOS_EXT.map((t) => {
                    const coverage = TLO_SEMESTER_COVERAGE[t.id];
                    return (
                      <tr key={t.id} className="border-t border-border/30">
                        <td className="py-2 pr-3">
                          <HoverCard openDelay={120}>
                            <HoverCardTrigger asChild>
                              <span className="cursor-help text-primary">
                                {t.id} · {t.short}
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="glass-strong w-80 text-xs">
                              <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                                {t.id}
                              </p>
                              <p className="mt-1 text-sm">{t.statement}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </td>
                        {terms.map((tm) => {
                          const strength = coverage[SEM_TO_CURRICULAR(tm.sem) - 1] ?? 0;
                          return (
                            <td key={tm.sem} className="px-1 py-1">
                              <div
                                className={`rounded-md px-2 py-2 text-center text-[10px] ${STRENGTH_TONE[strength]}`}
                              >
                                {STRENGTH_LABEL[strength]}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mt-3 flex flex-wrap gap-2">
                {STRENGTH_LABEL.map((l, i) => (
                  <span
                    key={l}
                    className={`rounded-md px-2 py-1 font-mono text-[10px] ${STRENGTH_TONE[i]}`}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clo" className="mt-4">
            <div className="grid gap-3 lg:grid-cols-2">
              {terms.map((tm) => {
                const cur = SEM_TO_CURRICULAR(tm.sem);
                const courses = COURSES_DESIGN.filter((c) => c.semester === cur);
                const cloCount = courses.reduce((s, c) => s + c.cos.length, 0);
                return (
                  <div key={tm.sem} className="glass-strong rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                          {tm.label}
                        </p>
                        <p className="font-mono text-sm">{tm.calendar}</p>
                      </div>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {cloCount} CLOs · {courses.length} courses
                      </Badge>
                    </div>
                    {courses.length === 0 ? (
                      <p className="mt-3 text-xs text-muted-foreground">
                        No mapped courses yet. Faculty rituals + electives populate this term.
                      </p>
                    ) : (
                      <ul className="mt-3 space-y-2">
                        {courses.map((c) => (
                          <li
                            key={c.id}
                            className="rounded-lg border border-border/40 bg-background/30 p-3"
                          >
                            <p className="font-mono text-xs text-primary">
                              {c.code} · {c.title}
                            </p>
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {c.cos.map((co) => (
                                <Badge
                                  key={co.id}
                                  variant="outline"
                                  className="font-mono text-[10px]"
                                >
                                  {co.id}
                                </Badge>
                              ))}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
