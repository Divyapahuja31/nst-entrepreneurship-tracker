import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import type { CourseDesign } from "@/lib/tlo-extended";
import { COURSES_DESIGN, TLOS_EXT } from "@/lib/tlo-extended";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ArrowLeft, BookOpenCheck, FlaskConical, GraduationCap, Layers, Gauge, Calculator } from "lucide-react";
import { RubricGrader } from "@/components/RubricGrader";
import { MappingEditor } from "@/components/MappingEditor";

export const Route = createFileRoute("/course/$courseId")({
  loader: ({ params }) => {
    const c = COURSES_DESIGN.find((x) => x.id === params.courseId);
    if (!c) throw notFound();
    return { course: c };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.course.title ?? "Course"} · Course Designer` },
      { name: "description", content: "Backward-design cascade for the NST Entrepreneurship Track — COs, transfer tasks, assessment plan, rubric bands and forward handoff." },
    ],
  }),
  notFoundComponent: () => (
    <main className="p-10">
      <p className="font-mono text-sm">Course not found.</p>
      <Link to="/command-center" className="mt-3 inline-block font-mono text-xs text-primary">← Back to Command Center</Link>
    </main>
  ),
  errorComponent: ({ error, reset }) => (
    <main className="p-10">
      <p className="font-mono text-sm text-destructive">Failed to load course: {error.message}</p>
      <button onClick={reset} className="mt-3 font-mono text-xs text-primary">Retry</button>
    </main>
  ),
  component: Page,
});

const BAND_LABELS = ["Fail (0–39)", "Pass (40–54)", "Average (55–64)", "Good (65–74)", "Distinction (75–89)", "Outstanding (90–100)"];
const BAND_BG = ["bg-destructive/20", "bg-muted/30", "bg-muted/40", "bg-primary/20", "bg-primary/40", "bg-primary/70"];

function Page() {
  const { course } = Route.useLoaderData() as { course: CourseDesign };

  return (
    <>
      <TopBar title={`Course Designer · ${course.title}`} breadcrumb="NST 2026" />
      <main className="relative flex-1 px-6 py-8 lg:px-10 lg:py-10 space-y-6">
        <Link to="/command-center" className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Command Center
        </Link>

        {/* HEADER */}
        <section className="glass-strong relative overflow-hidden rounded-2xl p-6 lg:p-8">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary/80">Course · Semester {course.semester} · {course.credits}</p>
          <h2 className="mt-2 font-mono text-2xl tracking-tight lg:text-4xl">{course.title}</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{course.destination}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">Code · {course.code}</Badge>
            <Badge variant="outline" className="font-mono text-[10px]">Lead · {course.lead}</Badge>
            <Badge variant="outline" className="font-mono text-[10px]">{course.cos.length} COs · {course.weeklyPlan.length} weeks</Badge>
          </div>
        </section>

        <Tabs defaultValue="cos" className="w-full">
          <TabsList className="bg-background/40">
            <TabsTrigger value="cos" className="font-mono text-xs"><BookOpenCheck className="mr-2 h-3.5 w-3.5"/>Course Outcomes</TabsTrigger>
            <TabsTrigger value="mapping" className="font-mono text-xs"><BookOpenCheck className="mr-2 h-3.5 w-3.5"/>CO↔TLO Mapping</TabsTrigger>
            <TabsTrigger value="transfer" className="font-mono text-xs"><FlaskConical className="mr-2 h-3.5 w-3.5"/>Transfer Tasks</TabsTrigger>
            <TabsTrigger value="weekly" className="font-mono text-xs"><Layers className="mr-2 h-3.5 w-3.5"/>16-Week Plan</TabsTrigger>
            <TabsTrigger value="assess" className="font-mono text-xs"><Gauge className="mr-2 h-3.5 w-3.5"/>Assessment & Rubric</TabsTrigger>
            <TabsTrigger value="grader" className="font-mono text-xs"><Calculator className="mr-2 h-3.5 w-3.5"/>Rubric Grader</TabsTrigger>
            <TabsTrigger value="handoff" className="font-mono text-xs"><GraduationCap className="mr-2 h-3.5 w-3.5"/>Forward Handoff</TabsTrigger>
          </TabsList>

          {/* COs */}
          <TabsContent value="cos" className="mt-4">
            <div className="grid gap-3 lg:grid-cols-2">
              {course.cos.map((co) => (
                <div key={co.id} className="glass-strong rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm text-primary">{co.id}</p>
                    <Badge variant="outline" className="font-mono text-[10px]">Bloom · {co.bloom}</Badge>
                  </div>
                  <p className="mt-2 text-sm">{co.statement}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Destination</p>
                  <p className="text-xs">{co.mapsTo}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {co.tloMap.map((tid) => {
                      const t = TLOS_EXT.find((x) => x.id === tid);
                      return (
                        <HoverCard key={tid} openDelay={120}>
                          <HoverCardTrigger asChild>
                            <Badge className="cursor-help bg-primary/15 font-mono text-[10px] text-primary hover:bg-primary/25">
                              {tid}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="glass-strong w-80 border-border/60 text-xs">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">{tid} · {t?.short}</p>
                            <p className="mt-1 text-sm">{t?.statement}</p>
                          </HoverCardContent>
                        </HoverCard>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* CO ↔ TLO Mapping (admin-editable) */}
          <TabsContent value="mapping" className="mt-4">
            <MappingEditor
              courseId={course.id}
              seedRows={course.cos.map((co) => ({ id: co.id, statement: co.statement, bloom: co.bloom, tloMap: co.tloMap }))}
            />
          </TabsContent>


          {/* Transfer Tasks */}
          <TabsContent value="transfer" className="mt-4">
            <div className="space-y-3">
              {course.transferTasks.map((t) => (
                <div key={t.id} className="glass-strong rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-primary">{t.id} · {t.context}</p>
                      <p className="mt-1 text-sm">{t.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {t.cos.map((c) => <Badge key={c} variant="outline" className="font-mono text-[10px]">{c}</Badge>)}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{t.why}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Weekly Plan */}
          <TabsContent value="weekly" className="mt-4">
            <div className="glass-strong rounded-2xl p-5">
              <div className="grid gap-2">
                {course.weeklyPlan.map((w) => (
                  <details key={w.wk} className="group rounded-lg border border-border/40 bg-background/30 p-3 open:border-primary/40">
                    <summary className="flex cursor-pointer items-center gap-3 font-mono text-xs">
                      <span className="flex h-7 w-9 items-center justify-center rounded-md bg-primary/15 text-primary">W{w.wk}</span>
                      <span className="flex-1 text-foreground">{w.topic}</span>
                      <span className="flex gap-1">
                        {w.cos.map((c) => <Badge key={c} variant="outline" className="font-mono text-[10px]">{c}</Badge>)}
                      </span>
                    </summary>
                    <div className="mt-3 grid gap-2 pl-12 text-xs text-muted-foreground sm:grid-cols-2">
                      <p><span className="font-mono text-[10px] uppercase tracking-widest text-primary">Strategy · </span>{w.strategy}</p>
                      <p><span className="font-mono text-[10px] uppercase tracking-widest text-primary">Check · </span>{w.check}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Assessment & Rubric */}
          <TabsContent value="assess" className="mt-4 space-y-4">
            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-mono text-lg">Assessment Architecture</h3>
              <table className="mt-3 w-full font-mono text-xs">
                <thead className="text-left text-[10px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="pb-2">Component</th><th className="pb-2">Weight</th><th className="pb-2">COs</th><th className="pb-2">Proves</th>
                  </tr>
                </thead>
                <tbody>
                  {course.assessments.map((a) => (
                    <tr key={a.name} className="border-t border-border/30">
                      <td className="py-2 pr-2 text-foreground">{a.name}</td>
                      <td className="py-2 pr-2 text-primary">{a.weight}%</td>
                      <td className="py-2 pr-2">{a.cos.join(", ")}</td>
                      <td className="py-2 text-muted-foreground">{a.proves}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-mono text-lg">Rubric Bands</h3>
              <p className="text-xs text-muted-foreground">Six performance bands per assessment — anti-gaming, behaviorally observable language.</p>

              <Accordion type="multiple" className="mt-3">
                {course.rubric.map((r) => (
                  <AccordionItem key={r.name} value={r.name} className="border-border/40">
                    <AccordionTrigger className="font-mono text-sm">{r.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                        {r.bands.map((b, i) => (
                          <div key={i} className={`rounded-md border border-border/40 p-3 ${BAND_BG[i]}`}>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/80">{BAND_LABELS[i]}</p>
                            <p className="mt-1 text-xs">{b}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Rubric Grader */}
          <TabsContent value="grader" className="mt-4">
            <RubricGrader assessments={course.assessments.map((a) => ({ name: a.name, weight: a.weight }))} />
          </TabsContent>

          {/* Forward Handoff */}
          <TabsContent value="handoff" className="mt-4">
            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-mono text-lg">Forward Handoff</h3>
              <p className="text-xs text-muted-foreground">What downstream courses receive when students complete this one.</p>
              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {course.forwardHandoff.map((h) => (
                  <div key={h.course} className="rounded-xl border border-border/60 bg-background/30 p-4">
                    <p className="font-mono text-sm text-primary">{h.course}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Expects</p>
                    <p className="text-xs">{h.expects}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">From CO</p>
                    <p className="text-xs">{h.co}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">How</p>
                    <p className="text-xs">{h.how}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
