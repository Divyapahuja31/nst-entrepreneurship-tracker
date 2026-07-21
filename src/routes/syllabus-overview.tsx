import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, BookOpen, Layers, GitBranch } from "lucide-react";

export const Route = createFileRoute("/syllabus-overview")({
  head: () => ({
    meta: [
      { title: "Syllabus Overview · TLO × CLO Matrix" },
      { name: "description", content: "Full TLO + CLO mapping matrix for the NST Entrepreneurship Track." },
      { property: "og:title", content: "Syllabus Overview — TLO × CLO Mapping Matrix" },
      { property: "og:description", content: "Section 16 mapping matrix: 6 Track-Level Outcomes mapped to 16 Semester CLOs across 4 semesters." },
    ],
  }),
  component: Page,
});

// ---------- Data: from Section 16 — TLO → CLO → Mapping Matrix ----------

type TLOId = "TLO-1" | "TLO-2" | "TLO-3" | "TLO-4" | "TLO-5" | "TLO-6";

const TLO_DEFS: { id: TLOId; title: string; verb: string; description: string; tag: string }[] = [
  {
    id: "TLO-1",
    title: "Entrepreneurial Thinking",
    verb: "Create / Evaluate",
    tag: "Mindset",
    description:
      "Identify meaningful problems, distinguish painkillers from vitamins, recognize market gaps, and form founder-level judgment under uncertainty.",
  },
  {
    id: "TLO-2",
    title: "Product & Validation Capability",
    verb: "Create",
    tag: "Product",
    description:
      "Conduct customer discovery, validate assumptions with evidence, design MVP scope, and build usable prototypes that map to real user behavior.",
  },
  {
    id: "TLO-3",
    title: "Execution & GTM Capability",
    verb: "Create / Evaluate",
    tag: "GTM",
    description:
      "Launch products, run distribution experiments, design onboarding and acquisition funnels, and measure traction with signal-driven metrics.",
  },
  {
    id: "TLO-4",
    title: "Operational & Leadership Maturity",
    verb: "Create",
    tag: "Ops",
    description:
      "Coordinate venture teams, run execution cadence, distribute ownership, and maintain measurable progress in dynamic startup environments.",
  },
  {
    id: "TLO-5",
    title: "Adaptability & Failure Recovery",
    verb: "Evaluate",
    tag: "Resilience",
    description:
      "Recover from failed assumptions, pivot intelligently, identify repeated mistakes, and demonstrate structured learning loops after setbacks.",
  },
  {
    id: "TLO-6",
    title: "Communication & Strategic Thinking",
    verb: "Evaluate / Create",
    tag: "Strategy",
    description:
      "Communicate venture decisions, defend strategic choices, pitch to investors and customers, and reason about long-term sustainability.",
  },
];

type Strength = "Primary" | "Strong" | "Supporting";

type CLO = {
  id: string;
  statement: string;
  mapping: Partial<Record<TLOId, Strength>>;
};

type SemesterCLO = {
  key: "S1" | "S2" | "S3" | "S4";
  label: string;
  focus: string;
  clos: CLO[];
};

const SEMESTER_CLOS: SemesterCLO[] = [
  {
    key: "S1",
    label: "Semester 1",
    focus: "Founder Mindset + Problem Discovery",
    clos: [
      {
        id: "CLO 1.1",
        statement:
          "Demonstrate founder mindset, ownership, and structured thinking when approaching ambiguous real-world problems.",
        mapping: { "TLO-1": "Primary", "TLO-4": "Supporting", "TLO-5": "Strong" },
      },
      {
        id: "CLO 1.2",
        statement:
          "Identify and articulate meaningful problems through structured market observation and friction mapping.",
        mapping: { "TLO-1": "Primary", "TLO-2": "Strong", "TLO-6": "Supporting" },
      },
      {
        id: "CLO 1.3",
        statement:
          "Conduct evidence-driven customer interviews and synthesize qualitative behavioral signals into validated insights.",
        mapping: { "TLO-2": "Primary", "TLO-1": "Strong", "TLO-6": "Supporting" },
      },
      {
        id: "CLO 1.4",
        statement:
          "Distinguish surface problems from root problems and defend problem prioritization decisions using collected evidence.",
        mapping: { "TLO-1": "Primary", "TLO-2": "Strong", "TLO-6": "Strong" },
      },
    ],
  },
  {
    key: "S2",
    label: "Semester 2",
    focus: "Validation + MVP Design",
    clos: [
      {
        id: "CLO 2.1",
        statement:
          "Design and scope a minimum viable product that maps directly to a validated problem hypothesis.",
        mapping: { "TLO-2": "Primary", "TLO-1": "Strong", "TLO-4": "Supporting" },
      },
      {
        id: "CLO 2.2",
        statement:
          "Run structured validation experiments — landing pages, fake-door tests, surveys, prototypes — and interpret outcomes.",
        mapping: { "TLO-2": "Primary", "TLO-3": "Strong", "TLO-5": "Strong" },
      },
      {
        id: "CLO 2.3",
        statement:
          "Build and iterate a usable MVP, maintaining iteration logs and explaining product changes through user feedback.",
        mapping: { "TLO-2": "Primary", "TLO-4": "Strong", "TLO-5": "Strong" },
      },
      {
        id: "CLO 2.4",
        statement:
          "Defend MVP scope and feature priorities during founder reviews using execution reasoning and validation evidence.",
        mapping: { "TLO-2": "Strong", "TLO-6": "Primary", "TLO-1": "Supporting" },
      },
    ],
  },
  {
    key: "S3",
    label: "Semester 3",
    focus: "Product Launch + GTM",
    clos: [
      {
        id: "CLO 3.1",
        statement:
          "Design and execute a Go-To-Market plan including positioning, channels, and early acquisition experiments.",
        mapping: { "TLO-3": "Primary", "TLO-6": "Strong", "TLO-2": "Supporting" },
      },
      {
        id: "CLO 3.2",
        statement:
          "Build onboarding, activation, and retention systems and improve them through measured user behavior.",
        mapping: { "TLO-3": "Primary", "TLO-2": "Strong", "TLO-4": "Strong" },
      },
      {
        id: "CLO 3.3",
        statement:
          "Distinguish vanity from signal metrics, interpret funnels, and make evidence-backed product and GTM decisions.",
        mapping: { "TLO-3": "Strong", "TLO-5": "Primary", "TLO-6": "Supporting" },
      },
      {
        id: "CLO 3.4",
        statement:
          "Communicate traction, learnings, and pivots through founder demos, reviews, and structured storytelling.",
        mapping: { "TLO-6": "Primary", "TLO-3": "Strong", "TLO-5": "Strong" },
      },
    ],
  },
  {
    key: "S4",
    label: "Semester 4",
    focus: "Scale, Systems, Fundraising & Venture Operations",
    clos: [
      {
        id: "CLO 4.1",
        statement:
          "Operate venture systems — sprint cadence, ownership distribution, accountability — across a scaling team.",
        mapping: { "TLO-4": "Primary", "TLO-3": "Strong", "TLO-6": "Supporting" },
      },
      {
        id: "CLO 4.2",
        statement:
          "Reason about startup economics: pricing, CAC/LTV, retention, monetization, and unit-level sustainability.",
        mapping: { "TLO-4": "Strong", "TLO-6": "Primary", "TLO-3": "Strong" },
      },
      {
        id: "CLO 4.3",
        statement:
          "Pitch a venture to investors and mentors, defending assumptions, traction narrative, and capital strategy.",
        mapping: { "TLO-6": "Primary", "TLO-1": "Strong", "TLO-4": "Supporting" },
      },
      {
        id: "CLO 4.4",
        statement:
          "Demonstrate adaptive learning across failed experiments and produce a defensible founder reflection portfolio.",
        mapping: { "TLO-5": "Primary", "TLO-4": "Strong", "TLO-1": "Strong" },
      },
    ],
  },
];

// Course-level CLO examples (Section 16 / Course Objective + Outcomes)
const COURSE_CLOS = [
  {
    id: "Course 1",
    title: "Entrepreneurship Fundamentals",
    objective: "Establish founder mindset, ownership, and the structural logic of how ventures are built under uncertainty.",
    clos: [
      { id: "CLO-1", text: "Articulate the difference between operator, founder, and intrapreneur mindsets.", tlos: ["TLO-1", "TLO-6"] as TLOId[] },
      { id: "CLO-2", text: "Map venture lifecycle stages onto a real startup case study.", tlos: ["TLO-1", "TLO-5"] as TLOId[] },
      { id: "CLO-3", text: "Demonstrate ownership through a founder commitment log over the semester.", tlos: ["TLO-1", "TLO-4"] as TLOId[] },
    ],
  },
  {
    id: "Course 2",
    title: "Problem Discovery & Customer Behavior",
    objective: "Develop the capability to identify, observe, and validate real customer problems through structured discovery.",
    clos: [
      { id: "CLO-1", text: "Conduct 25+ structured customer interviews and synthesize behavioral patterns.", tlos: ["TLO-2", "TLO-1"] as TLOId[] },
      { id: "CLO-2", text: "Distinguish painkiller vs vitamin problems using evidence and ICP definition.", tlos: ["TLO-1", "TLO-2"] as TLOId[] },
      { id: "CLO-3", text: "Produce a validated problem statement defended in a founder review.", tlos: ["TLO-2", "TLO-6"] as TLOId[] },
    ],
  },
  {
    id: "Course 3",
    title: "MVP Design & Product Thinking",
    objective: "Translate validated problems into scoped MVPs and iterate them through real user feedback loops.",
    clos: [
      { id: "CLO-1", text: "Define MVP scope using must-have / excluded feature trade-offs.", tlos: ["TLO-2", "TLO-4"] as TLOId[] },
      { id: "CLO-2", text: "Build and ship a usable MVP and capture structured user feedback.", tlos: ["TLO-2", "TLO-3"] as TLOId[] },
      { id: "CLO-3", text: "Iterate the MVP across at least three documented learning cycles.", tlos: ["TLO-2", "TLO-5"] as TLOId[] },
    ],
  },
  {
    id: "Course 4",
    title: "GTM Fundamentals & Community Building",
    objective: "Operate early Go-To-Market motions, distribution experiments, and community-led acquisition systems.",
    clos: [
      { id: "CLO-1", text: "Run at least two distribution experiments and measure signal vs vanity outcomes.", tlos: ["TLO-3", "TLO-5"] as TLOId[] },
      { id: "CLO-2", text: "Build positioning, messaging, and a working onboarding funnel.", tlos: ["TLO-3", "TLO-6"] as TLOId[] },
      { id: "CLO-3", text: "Design and operate an early community or feedback loop for retention.", tlos: ["TLO-3", "TLO-4"] as TLOId[] },
    ],
  },
];

const STRENGTH_TONE: Record<Strength, string> = {
  Primary: "bg-primary/25 text-primary border-primary/50",
  Strong: "bg-chart-2/20 text-chart-2 border-chart-2/40",
  Supporting: "bg-muted/40 text-muted-foreground border-border/60",
};

// ---------- Page ----------

function Page() {
  const [q, setQ] = useState("");
  const [tloFilter, setTloFilter] = useState<TLOId | null>(null);
  const [semFilter, setSemFilter] = useState<SemesterCLO["key"] | "ALL">("ALL");

  const needle = q.trim().toLowerCase();

  const filteredSemesters = useMemo(() => {
    return SEMESTER_CLOS.filter((s) => semFilter === "ALL" || s.key === semFilter).map((s) => ({
      ...s,
      clos: s.clos.filter((c) => {
        if (tloFilter && !(tloFilter in c.mapping)) return false;
        if (!needle) return true;
        return (
          c.id.toLowerCase().includes(needle) ||
          c.statement.toLowerCase().includes(needle) ||
          s.label.toLowerCase().includes(needle) ||
          s.focus.toLowerCase().includes(needle)
        );
      }),
    }));
  }, [needle, tloFilter, semFilter]);

  const totalCLOs = SEMESTER_CLOS.reduce((n, s) => n + s.clos.length, 0);
  const shownCLOs = filteredSemesters.reduce((n, s) => n + s.clos.length, 0);

  return (
    <>
      <TopBar title="Syllabus Overview" breadcrumb="Master Framework · Section 16" />
      <main className="flex-1 space-y-6 px-6 py-8 lg:px-10 lg:py-10">
        {/* Header / intent */}
        <section className="glass-strong rounded-2xl p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                TLO × CLO Mapping Matrix
              </p>
              <h2 className="font-mono text-xl tracking-tight">The complete outcome backbone of the track.</h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Sourced from <span className="text-foreground">Section 16 — Complete TLO → CLO → Weekly Session Mapping Matrix</span>, the
                CLO Governance framework (Section 4), and per-course CLO definitions. Every CLO is traceable to one or
                more Track-Level Outcomes.
              </p>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search CLOs, semesters, focus…"
                className="h-9 bg-background/40 pl-9 font-mono text-sm"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Track-Level Outcomes" value="6" icon={<Layers className="h-4 w-4" />} />
            <Stat label="Semester CLOs" value={String(totalCLOs)} icon={<GitBranch className="h-4 w-4" />} />
            <Stat label="Semesters" value="4" icon={<BookOpen className="h-4 w-4" />} />
            <Stat label="Course CLO Examples" value={String(COURSE_CLOS.length)} icon={<BookOpen className="h-4 w-4" />} />
          </div>
        </section>

        {/* TLO definitions */}
        <section className="space-y-3">
          <SectionHeader eyebrow="TLO Definitions" title="The six Track-Level Outcomes" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {TLO_DEFS.map((t) => {
              const active = tloFilter === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTloFilter(active ? null : t.id)}
                  className={`glass group rounded-xl border p-4 text-left transition hover:border-primary/40 ${
                    active ? "border-primary/60 ring-1 ring-primary/40" : "border-border/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">{t.id}</p>
                    <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">
                      {t.tag}
                    </Badge>
                  </div>
                  <h3 className="mt-2 font-mono text-sm tracking-tight text-foreground">{t.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    {t.verb}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-primary/70">
                    {active ? "Filtering matrix · click to clear" : "Click to filter matrix"}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Filters */}
        <section className="glass rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Scope</span>
            <Chip active={semFilter === "ALL"} onClick={() => setSemFilter("ALL")}>All Semesters</Chip>
            {SEMESTER_CLOS.map((s) => (
              <Chip key={s.key} active={semFilter === s.key} onClick={() => setSemFilter(s.key)}>
                {s.key}
              </Chip>
            ))}
            <span className="mx-2 h-4 w-px bg-border/60" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">TLO</span>
            <Chip active={!tloFilter} onClick={() => setTloFilter(null)}>All</Chip>
            {TLO_DEFS.map((t) => (
              <Chip key={t.id} active={tloFilter === t.id} onClick={() => setTloFilter(tloFilter === t.id ? null : t.id)}>
                {t.id}
              </Chip>
            ))}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {shownCLOs} / {totalCLOs} CLOs
            </span>
          </div>
        </section>

        {/* Mapping matrix */}
        <Tabs defaultValue="matrix" className="space-y-4">
          <TabsList className="bg-background/40">
            <TabsTrigger value="matrix" className="font-mono text-xs uppercase tracking-widest">Mapping Matrix</TabsTrigger>
            <TabsTrigger value="semester" className="font-mono text-xs uppercase tracking-widest">By Semester</TabsTrigger>
            <TabsTrigger value="courses" className="font-mono text-xs uppercase tracking-widest">Course CLO Examples</TabsTrigger>
            <TabsTrigger value="governance" className="font-mono text-xs uppercase tracking-widest">Governance</TabsTrigger>
          </TabsList>

          {/* Matrix */}
          <TabsContent value="matrix">
            <div className="glass overflow-hidden rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border/60 bg-background/40 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      <th className="sticky left-0 z-10 bg-background/60 px-4 py-3 text-left">Semester / CLO</th>
                      <th className="px-4 py-3 text-left">Outcome</th>
                      {TLO_DEFS.map((t) => (
                        <th key={t.id} className="px-3 py-3 text-center">
                          <HoverCard openDelay={80}>
                            <HoverCardTrigger asChild>
                              <button className="font-mono">{t.id}</button>
                            </HoverCardTrigger>
                            <HoverCardContent className="glass-strong w-80 border-border/60">
                              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">{t.id} · {t.verb}</p>
                              <h4 className="mt-1 font-mono text-sm">{t.title}</h4>
                              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSemesters.map((s) =>
                      s.clos.length === 0 ? null : (
                        <>
                          <tr key={s.key + "-h"} className="border-b border-border/40 bg-primary/5">
                            <td colSpan={2 + TLO_DEFS.length} className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                              {s.label} — {s.focus}
                            </td>
                          </tr>
                          {s.clos.map((c) => (
                            <tr key={c.id} className="border-b border-border/40 hover:bg-accent/15">
                              <td className="sticky left-0 z-10 bg-background/40 px-4 py-3 font-mono text-xs text-primary">{c.id}</td>
                              <td className="px-4 py-3 text-foreground/90">{c.statement}</td>
                              {TLO_DEFS.map((t) => {
                                const strength = c.mapping[t.id];
                                return (
                                  <td key={t.id} className="px-3 py-3 text-center">
                                    {strength ? (
                                      <span
                                        className={`inline-flex min-w-[64px] justify-center rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${STRENGTH_TONE[strength]}`}
                                      >
                                        {strength}
                                      </span>
                                    ) : (
                                      <span className="font-mono text-[10px] text-muted-foreground/40">·</span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </>
                      ),
                    )}
                    {shownCLOs === 0 && (
                      <tr>
                        <td colSpan={2 + TLO_DEFS.length} className="px-4 py-10 text-center font-mono text-sm text-muted-foreground">
                          No CLOs match the current filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center gap-3 border-t border-border/60 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>Strength legend:</span>
                <LegendDot tone={STRENGTH_TONE.Primary} label="Primary" />
                <LegendDot tone={STRENGTH_TONE.Strong} label="Strong" />
                <LegendDot tone={STRENGTH_TONE.Supporting} label="Supporting" />
              </div>
            </div>
          </TabsContent>

          {/* By Semester */}
          <TabsContent value="semester">
            <div className="glass rounded-2xl p-4">
              <Accordion type="multiple" defaultValue={["S1"]} className="w-full">
                {filteredSemesters.map((s) => (
                  <AccordionItem key={s.key} value={s.key} className="border-border/60">
                    <AccordionTrigger className="font-mono text-sm">
                      <div className="flex flex-col items-start">
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">{s.label}</span>
                        <span className="text-foreground">{s.focus}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {s.clos.map((c) => (
                          <div key={c.id} className="rounded-lg border border-border/60 bg-background/30 p-4">
                            <p className="font-mono text-[11px] uppercase tracking-widest text-primary">{c.id}</p>
                            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{c.statement}</p>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {Object.entries(c.mapping).map(([tlo, strength]) => (
                                <span
                                  key={tlo}
                                  className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                                    STRENGTH_TONE[strength as Strength]
                                  }`}
                                >
                                  {tlo} · {strength}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                        {s.clos.length === 0 && (
                          <p className="text-sm text-muted-foreground">No CLOs match this filter.</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Course examples */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {COURSE_CLOS.map((c) => (
                <div key={c.id} className="glass rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">{c.id}</p>
                    <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">CLO</Badge>
                  </div>
                  <h3 className="mt-1 font-mono text-base tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.objective}</p>
                  <div className="mt-4 space-y-2">
                    {c.clos.map((clo) => (
                      <div key={clo.id} className="rounded-md border border-border/60 bg-background/30 p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">{clo.id}</p>
                          <div className="flex gap-1">
                            {clo.tlos.map((id) => {
                              const def = TLO_DEFS.find((t) => t.id === id)!;
                              return (
                                <HoverCard key={id} openDelay={60}>
                                  <HoverCardTrigger asChild>
                                    <button className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary hover:bg-primary/20">
                                      {id}
                                    </button>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="glass-strong w-72 border-border/60">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">{def.id}</p>
                                    <h4 className="mt-1 font-mono text-sm">{def.title}</h4>
                                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{def.description}</p>
                                  </HoverCardContent>
                                </HoverCard>
                              );
                            })}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-foreground/90">{clo.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Governance */}
          <TabsContent value="governance">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <GovernanceCard
                title="TLO Design Principles"
                items={[
                  "TLOs combine academic outcomes with venture outcomes — conceptual rigor + product execution.",
                  "Each TLO is verb-anchored using Bloom-aligned action verbs (Create, Evaluate, Apply).",
                  "TLOs are demonstrably measurable through artifacts, founder reviews, and behavior, not exams alone.",
                  "Every TLO has a documented expected demonstration that maps to rubric criteria.",
                ]}
              />
              <GovernanceCard
                title="CLO Governance (Section 4)"
                items={[
                  "Each course defines 3–4 Course-Level Outcomes mapped explicitly to TLOs.",
                  "CLOs must specify Primary, Strong, and Supporting mapping strengths against TLOs.",
                  "CLO statements describe what the student will demonstrate, not what the instructor will cover.",
                  "CLOs are reviewed semesterly against BOS / AIAP standards and execution evidence.",
                ]}
              />
              <GovernanceCard
                title="CLO → TLO Mapping System"
                items={[
                  "Every CLO maps to at least one Primary TLO and may map to multiple Strong/Supporting TLOs.",
                  "Mapping strength governs rubric weight in evaluation: Primary > Strong > Supporting.",
                  "Weekly sessions inherit their CLO mapping into the Section 16 master matrix.",
                  "Unmapped CLOs are flagged for academic moderation review and revision.",
                ]}
              />
              <GovernanceCard
                title="BOS Alignment & Moderation"
                items={[
                  "All TLOs and CLOs follow AIAP-style outcome formatting for BOS submission.",
                  "Internal moderation reviews every CLO once per semester for clarity, measurability, and TLO traceability.",
                  "External industry contributors may co-author execution layers but cannot modify CLO/TLO governance.",
                  "Track-level outcome integrity remains internally owned and version-controlled.",
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

// ---------- Small UI helpers ----------

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="glass rounded-xl border border-border/60 p-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>{label}</span>
        <span className="text-primary/80">{icon}</span>
      </div>
      <p className="mt-1 font-mono text-2xl tracking-tight text-foreground">{value}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">{eyebrow}</p>
      <h2 className="font-mono text-lg tracking-tight">{title}</h2>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest transition ${
        active
          ? "border-primary/50 bg-primary/15 text-primary"
          : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function LegendDot({ tone, label }: { tone: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`h-2.5 w-2.5 rounded-sm border ${tone}`} />
      <span>{label}</span>
    </span>
  );
}

function GovernanceCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">Governance</p>
      <h3 className="mt-1 font-mono text-base tracking-tight">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm text-foreground/90">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
