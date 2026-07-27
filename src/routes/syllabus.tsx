import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import {
  PARTS,
  PHILOSOPHY,
  TLOS_FULL,
  COMPETENCY_CLUSTERS,
  SEMESTERS,
  WEEKS,
  RUBRICS,
  FAILURE_FRAMEWORK,
  COMPLIANCE,
  RESOURCES,
  INDUSTRY_REQUIREMENTS,
  INDUSTRY_INTEGRATION,
  FACULTY_RESPONSIBILITIES,
  FACULTY_OPERATING_MODEL,
  FOUNDER_OPERATOR_EVAL,
  BUILDER_EVAL,
  KNOWLEDGE_EVAL,
  SELECTIVE_ENTRY,
  FILTER_TAGS,
  type SemesterData,
} from "@/lib/full-syllabus-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Search,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Gauge,
  ShieldAlert,
  Users,
  Briefcase,
  Scale,
  ChevronRight,
  X,
} from "lucide-react";

export const Route = createFileRoute("/syllabus")({
  head: () => ({
    meta: [
      { title: "Full Syllabus · NST Entrepreneurship" },
      {
        name: "description",
        content:
          "Interactive curriculum OS: semesters, weekly plans, labs, rubrics, faculty, failure framework, BOS/AIAP compliance.",
      },
    ],
  }),
  component: Page,
});

type FilterKey = "all" | "S1" | "S2" | "S3" | "S4" | "labs" | "evaluation" | "failure" | "faculty";
type TabKey =
  | "semesters"
  | "weeks"
  | "tlos"
  | "rubrics"
  | "faculty"
  | "resources"
  | "failure"
  | "compliance";

const FILTER_TO_TAB: Record<FilterKey, TabKey> = {
  all: "semesters",
  S1: "semesters",
  S2: "semesters",
  S3: "semesters",
  S4: "semesters",
  labs: "weeks",
  evaluation: "rubrics",
  failure: "failure",
  faculty: "faculty",
};

type ModuleSelection = { semester: SemesterData; moduleId: string } | null;

function Page() {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<FilterKey>("all");
  const [tloFilter, setTloFilter] = useState<string>("ALL");
  const [tab, setTab] = useState<TabKey>("semesters");
  const [selectedModule, setSelectedModule] = useState<ModuleSelection>(null);
  const [expandedSemesters, setExpandedSemesters] = useState<string[]>([]);

  const needle = q.trim().toLowerCase();
  const matches = (text: string) => !needle || text.toLowerCase().includes(needle);

  // Filter → tab sync + auto-expand semester
  useEffect(() => {
    setTab(FILTER_TO_TAB[scope]);
    if (scope === "S1" || scope === "S2" || scope === "S3" || scope === "S4") {
      setExpandedSemesters([scope]);
    } else if (scope === "all") {
      setExpandedSemesters([]);
    }
  }, [scope]);

  const semKey =
    scope === "S1" || scope === "S2" || scope === "S3" || scope === "S4" ? scope : null;

  const filteredSemesters = useMemo(() => {
    return SEMESTERS.filter((s) => {
      if (semKey && s.key !== semKey) return false;
      if (tloFilter !== "ALL" && !s.tloMap.includes(tloFilter)) return false;
      if (!needle) return true;
      const blob = [
        s.title,
        s.theme,
        s.objective,
        ...s.outcomes,
        ...s.modules.flatMap((m) => [m.title, ...m.topics]),
        ...s.labs.flatMap((l) => [l.title, l.description]),
        ...s.evaluation.map((e) => `${e.component} ${e.weight}`),
        ...s.faculty,
        ...s.industry,
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(needle);
    });
  }, [needle, semKey, tloFilter]);

  const filteredWeeks = useMemo(() => {
    return WEEKS.filter((w) => {
      if (semKey && w.semester !== semKey) return false;
      if (!needle) return true;
      const blob = [
        w.title,
        ...w.sessions.flatMap((s) => [s.id, ...s.bullets]),
        ...w.labs.flatMap((l) => [l.id, ...l.bullets]),
        ...w.deliverables,
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(needle);
    });
  }, [needle, semKey]);

  const filteredTlos = useMemo(() => {
    return TLOS_FULL.filter((t) => {
      if (tloFilter !== "ALL" && t.id !== tloFilter) return false;
      if (!needle) return true;
      return [t.id, t.title, t.description, ...t.demonstration]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [needle, tloFilter]);

  // Labs aggregated across all semesters (for scope=labs view inside weeks tab)
  const allLabs = useMemo(() => {
    const sem = SEMESTERS.flatMap((s) =>
      s.labs.map((l) => ({ ...l, semester: s.key, semTitle: s.title })),
    );
    return sem.filter((l) => matches(`${l.id} ${l.title} ${l.description} ${l.semester}`));
  }, [needle]);

  return (
    <>
      <TopBar title="Full Syllabus Explorer" breadcrumb="Master Framework" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        {/* Hero */}
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                Interactive Curriculum OS · Parts 1 → 6
              </p>
              <h2 className="mt-2 font-mono text-2xl tracking-tight">{PHILOSOPHY.trackName}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {PHILOSOPHY.deliveryModel}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PHILOSOPHY.category.map((c) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="border-border/60 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Search + Filters */}
        <section className="glass rounded-xl p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search semesters, modules, weeks, labs, rubrics, faculty, failure patterns…"
                className="h-10 bg-background/40 pl-9 font-mono text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ["all", "All"],
                  ["S1", "Sem 1"],
                  ["S2", "Sem 2"],
                  ["S3", "Sem 3"],
                  ["S4", "Sem 4"],
                  ["labs", "Labs"],
                  ["evaluation", "Evaluation"],
                  ["failure", "Failure"],
                  ["faculty", "Faculty"],
                ] as [FilterKey, string][]
              ).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setScope(k)}
                  className={`rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${scope === k ? "border-primary/60 bg-primary/15 text-primary" : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <select
              value={tloFilter}
              onChange={(e) => setTloFilter(e.target.value)}
              className="h-10 rounded-md border border-border/60 bg-background/40 px-2 font-mono text-xs text-foreground"
            >
              <option value="ALL">All TLOs</option>
              {FILTER_TAGS.tlos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
            Active scope: <span className="text-primary">{scope}</span> · Active tab:{" "}
            <span className="text-primary">{tab}</span>
          </p>
        </section>

        {/* Parts overview (compact) */}
        <section>
          <SectionHeader
            icon={<BookOpen className="h-4 w-4 text-primary" />}
            eyebrow="Structure"
            title="Six Parts of the Master Framework"
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {PARTS.map((p) => (
              <Card key={p.id} className="glass border-border/60">
                <CardHeader className="pb-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                    {p.id}
                  </p>
                  <CardTitle className="font-mono text-sm tracking-tight">{p.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Tabs (controlled) */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="w-full">
          <TabsList className="flex w-full flex-wrap gap-1 bg-background/40 p-1">
            <TabsTrigger value="semesters" className="font-mono text-xs">
              Semesters
            </TabsTrigger>
            <TabsTrigger value="weeks" className="font-mono text-xs">
              Weekly Breakdown
            </TabsTrigger>
            <TabsTrigger value="tlos" className="font-mono text-xs">
              TLOs / CLOs
            </TabsTrigger>
            <TabsTrigger value="rubrics" className="font-mono text-xs">
              Rubrics
            </TabsTrigger>
            <TabsTrigger value="faculty" className="font-mono text-xs">
              Faculty & Industry
            </TabsTrigger>
            <TabsTrigger value="resources" className="font-mono text-xs">
              Resources
            </TabsTrigger>
            <TabsTrigger value="failure" className="font-mono text-xs">
              Failure Framework
            </TabsTrigger>
            <TabsTrigger value="compliance" className="font-mono text-xs">
              BOS / AIAP
            </TabsTrigger>
          </TabsList>

          {/* Semesters */}
          <TabsContent value="semesters" className="mt-5">
            {filteredSemesters.length === 0 ? (
              <Empty />
            ) : (
              <Accordion
                type="multiple"
                value={expandedSemesters}
                onValueChange={setExpandedSemesters}
                className="space-y-3"
              >
                {filteredSemesters.map((s) => (
                  <AccordionItem
                    key={s.key}
                    value={s.key}
                    className="glass rounded-xl border border-border/60 px-5"
                  >
                    <AccordionTrigger className="py-4 hover:no-underline">
                      <div className="flex flex-1 items-center gap-3 text-left">
                        <Badge className="bg-primary/15 font-mono text-primary hover:bg-primary/15">
                          {s.key}
                        </Badge>
                        <div>
                          <div className="font-mono text-sm tracking-tight">{s.title}</div>
                          <div className="text-[11px] text-muted-foreground">{s.theme}</div>
                        </div>
                        <div className="ml-auto hidden gap-1 md:flex">
                          {s.tloMap.map((t) => (
                            <Badge
                              key={t}
                              variant="outline"
                              className="border-border/60 font-mono text-[10px] text-muted-foreground"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <SemesterDetail
                        s={s}
                        onOpenModule={(moduleId) => setSelectedModule({ semester: s, moduleId })}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </TabsContent>

          {/* Weeks  OR  Labs view when scope=labs */}
          <TabsContent value="weeks" className="mt-5">
            {scope === "labs" ? (
              <>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  All Labs · Across Semesters
                </p>
                {allLabs.length === 0 ? (
                  <Empty />
                ) : (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {allLabs.map((l) => (
                      <Card key={`${l.semester}-${l.id}`} className="glass border-border/60">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="border-primary/40 font-mono text-[10px] text-primary"
                            >
                              {l.semester} · {l.id}
                            </Badge>
                          </div>
                          <CardTitle className="mt-1 font-mono text-sm tracking-tight">
                            {l.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">{l.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {semKey ? `${semKey} weekly plan` : "Full 4-semester weekly breakdown · 64 weeks"}
                </p>
                {filteredWeeks.length === 0 ? (
                  <Empty />
                ) : (
                  <div className="grid gap-3 lg:grid-cols-2">
                    {filteredWeeks.map((w) => (
                      <Card key={`${w.semester}-${w.week}`} className="glass border-border/60">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="border-primary/40 font-mono text-[10px] text-primary"
                            >
                              {w.semester} · W{w.week}
                            </Badge>
                            <CardTitle className="font-mono text-sm tracking-tight">
                              {w.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          {w.sessions.map((s) => (
                            <Block key={s.id} label={s.id} items={s.bullets} />
                          ))}
                          {w.labs.map((l) => (
                            <Block key={l.id} label={l.id} items={l.bullets} accent />
                          ))}
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                              Deliverables
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {w.deliverables.map((d) => (
                                <Badge
                                  key={d}
                                  variant="outline"
                                  className="border-border/60 font-mono text-[10px]"
                                >
                                  {d}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* TLOs / CLOs */}
          <TabsContent value="tlos" className="mt-5 space-y-6">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredTlos.map((t) => (
                <HoverCard key={t.id} openDelay={120}>
                  <HoverCardTrigger asChild>
                    <Card className="glass cursor-help border-border/60 transition-colors hover:border-primary/40">
                      <CardHeader className="pb-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                          {t.id}
                        </p>
                        <CardTitle className="font-mono text-sm tracking-tight">
                          {t.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3 text-xs text-muted-foreground">
                          {t.description}
                        </p>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 glass-strong border-border/60">
                    <p className="font-mono text-xs text-foreground">{t.description}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-primary/80">
                      Demonstration
                    </p>
                    <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                      {t.demonstration.map((d) => (
                        <li key={d}>· {d}</li>
                      ))}
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>

            <div>
              <SectionHeader
                icon={<Users className="h-4 w-4 text-primary" />}
                eyebrow="Competency Map"
                title="Five Clusters"
              />
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {COMPETENCY_CLUSTERS.map((c) => (
                  <Card key={c.id} className="glass border-border/60">
                    <CardHeader className="pb-2">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                        Cluster {c.id}
                      </p>
                      <CardTitle className="font-mono text-sm tracking-tight">{c.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {c.items.map((i) => (
                          <li key={i}>· {i}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Rubrics + 3 evaluation lenses */}
          <TabsContent value="rubrics" className="mt-5 space-y-6">
            <div className="grid gap-4 xl:grid-cols-3">
              <EvalLens lens={FOUNDER_OPERATOR_EVAL} />
              <EvalLens lens={BUILDER_EVAL} />
              <EvalLens lens={KNOWLEDGE_EVAL} />
            </div>
            <SectionHeader
              icon={<Gauge className="h-4 w-4 text-primary" />}
              eyebrow="Rubrics"
              title="Rubric Library"
            />
            {RUBRICS.filter(
              (r) =>
                !needle ||
                (r.name + r.criteria.map((c) => c.desc).join(" ")).toLowerCase().includes(needle),
            ).map((r) => (
              <Card key={r.name} className="glass border-border/60">
                <CardHeader>
                  <CardTitle className="font-mono text-sm tracking-tight">{r.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="py-2 pr-3 font-normal uppercase tracking-widest">Level</th>
                        <th className="py-2 font-normal uppercase tracking-widest">Descriptor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {r.criteria.map((c) => (
                        <tr key={c.level} className="border-t border-border/40">
                          <td className="py-2 pr-3 text-foreground">{c.level}</td>
                          <td className="py-2 text-muted-foreground">{c.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            ))}
            <SectionHeader
              icon={<GraduationCap className="h-4 w-4 text-primary" />}
              eyebrow="Selective Entry"
              title={SELECTIVE_ENTRY.title}
            />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {SELECTIVE_ENTRY.stages.map((s) => (
                <Card key={s.stage} className="glass border-border/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm tracking-tight">{s.stage}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {s.criteria.map((c) => (
                        <li key={c}>· {c}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ul className="grid gap-2 md:grid-cols-3 text-xs text-muted-foreground">
              {SELECTIVE_ENTRY.principles.map((p) => (
                <li
                  key={p}
                  className="rounded-md border border-border/40 bg-background/30 p-3 font-mono"
                >
                  · {p}
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Faculty & Industry */}
          <TabsContent value="faculty" className="mt-5 space-y-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <Card className="glass border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono text-sm tracking-tight">
                    <Users className="h-4 w-4 text-primary" /> Faculty Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {FACULTY_RESPONSIBILITIES.filter((f) =>
                    matches(`${f.role} ${f.duties.join(" ")}`),
                  ).map((f) => (
                    <div
                      key={f.role}
                      className="rounded-md border border-border/40 bg-background/30 p-3"
                    >
                      <p className="font-mono text-xs text-foreground">{f.role}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {f.duties.map((d) => (
                          <Badge
                            key={d}
                            variant="outline"
                            className="border-border/60 font-mono text-[10px] text-muted-foreground"
                          >
                            {d}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono text-sm tracking-tight">
                    <Briefcase className="h-4 w-4 text-primary" /> Industry Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {INDUSTRY_REQUIREMENTS.filter((r) => matches(r)).map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 text-primary/70" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <SectionHeader
              icon={<Users className="h-4 w-4 text-primary" />}
              eyebrow="Operating Model"
              title={FACULTY_OPERATING_MODEL.title}
            />
            <Card className="glass border-border/60">
              <CardContent className="p-0">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="px-4 py-3 font-normal uppercase tracking-widest">Ritual</th>
                      <th className="px-4 py-3 font-normal uppercase tracking-widest">Cadence</th>
                      <th className="px-4 py-3 font-normal uppercase tracking-widest">Owners</th>
                      <th className="px-4 py-3 font-normal uppercase tracking-widest">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FACULTY_OPERATING_MODEL.cadence.map((c) => (
                      <tr key={c.ritual} className="border-t border-border/40">
                        <td className="px-4 py-2 text-foreground">{c.ritual}</td>
                        <td className="px-4 py-2 text-muted-foreground">{c.frequency}</td>
                        <td className="px-4 py-2 text-muted-foreground">{c.owners.join(", ")}</td>
                        <td className="px-4 py-2 text-muted-foreground">{c.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <SectionHeader
              icon={<Briefcase className="h-4 w-4 text-primary" />}
              eyebrow="Per-Semester"
              title="Industry Integration"
            />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {INDUSTRY_INTEGRATION.map((i) => (
                <Card key={i.phase} className="glass border-border/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-mono text-sm tracking-tight">{i.phase}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {i.touchpoints.map((t) => (
                        <li key={t}>· {t}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="mt-5">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {RESOURCES.filter((r) => matches(`${r.tag} ${r.title} ${r.note}`)).map((r) => (
                <Card key={r.title} className="glass border-border/60">
                  <CardHeader className="pb-2">
                    <Badge
                      variant="outline"
                      className="w-fit border-border/60 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                    >
                      {r.tag}
                    </Badge>
                    <CardTitle className="mt-2 font-mono text-sm tracking-tight">
                      {r.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{r.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Failure */}
          <TabsContent value="failure" className="mt-5 space-y-4">
            <Card className="glass-strong border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono text-sm tracking-tight">
                  <ShieldAlert className="h-4 w-4 text-primary" /> Principle
                </CardTitle>
                <CardDescription className="font-mono text-xs text-muted-foreground">
                  {FAILURE_FRAMEWORK.principle}
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="grid gap-3 xl:grid-cols-3">
              <FailureCard
                title="Acceptable Failure"
                items={FAILURE_FRAMEWORK.acceptable.filter(matches)}
                tone="ok"
              />
              <FailureCard
                title="Penalized Patterns"
                items={FAILURE_FRAMEWORK.penalized.filter(matches)}
                tone="bad"
              />
              <FailureCard
                title="Recovery Protocol"
                items={FAILURE_FRAMEWORK.recoveryProtocol.filter(matches)}
                tone="neutral"
              />
            </div>
          </TabsContent>

          {/* Compliance */}
          <TabsContent value="compliance" className="mt-5 grid gap-4 xl:grid-cols-2">
            <Card className="glass border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono text-sm tracking-tight">
                  <Scale className="h-4 w-4 text-primary" /> BOS Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {COMPLIANCE.bos.filter(matches).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 text-primary/70" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="glass border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono text-sm tracking-tight">
                  <GraduationCap className="h-4 w-4 text-primary" /> AIAP Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {COMPLIANCE.aiap.filter(matches).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 text-primary/70" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <ModuleDrawer selection={selectedModule} onClose={() => setSelectedModule(null)} />
    </>
  );
}

function SectionHeader({
  icon,
  eyebrow,
  title,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
        {icon}
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
          {eyebrow}
        </p>
        <h2 className="font-mono text-base tracking-tight">{title}</h2>
      </div>
    </div>
  );
}

function Block({ label, items, accent }: { label: string; items: string[]; accent?: boolean }) {
  return (
    <div
      className={`rounded-md border p-2.5 ${accent ? "border-primary/30 bg-primary/5" : "border-border/40 bg-background/30"}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <ul className="mt-1 space-y-0.5 text-xs text-foreground/90">
        {items.map((b, i) => (
          <li key={i}>· {b}</li>
        ))}
      </ul>
    </div>
  );
}

function SemesterDetail({
  s,
  onOpenModule,
}: {
  s: SemesterData;
  onOpenModule: (id: string) => void;
}) {
  return (
    <div className="space-y-5 pb-3">
      <p className="text-sm text-muted-foreground">{s.objective}</p>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Core Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-xs text-foreground/90">
              {s.outcomes.map((o) => (
                <li key={o}>· {o}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="glass border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Competencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-left font-mono text-[11px]">
              <tbody>
                {s.competencies.map((c) => (
                  <tr key={c.name} className="border-t border-border/40 first:border-0">
                    <td className="py-1 pr-3 text-foreground">{c.name}</td>
                    <td className="py-1 text-muted-foreground">{c.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-primary/80">
          Modules · Click for drill-down
        </p>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {s.modules.map((m) => (
            <button
              key={m.id}
              onClick={() => onOpenModule(m.id)}
              className="group flex flex-col items-start gap-1 rounded-md border border-border/40 bg-background/30 p-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                {m.id}
              </span>
              <span className="font-mono text-sm text-foreground">{m.title}</span>
              <span className="text-[11px] text-muted-foreground line-clamp-2">
                {m.topics.slice(0, 3).join(" · ")}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-primary/70 group-hover:text-primary">
                Open <ChevronRight className="h-3 w-3" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-primary/80">
          Week-by-Week Plan ({s.key})
        </p>
        <Accordion
          type="single"
          collapsible
          className="rounded-md border border-border/40 bg-background/30"
        >
          <AccordionItem value="weeks" className="border-0 px-3">
            <AccordionTrigger className="py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:no-underline">
              Show all {WEEKS.filter((w) => w.semester === s.key).length} weeks
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 pt-2 md:grid-cols-2">
                {WEEKS.filter((w) => w.semester === s.key).map((w) => (
                  <div
                    key={w.week}
                    className="rounded-md border border-border/40 bg-background/40 p-2.5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
                      W{w.week}
                    </p>
                    <p className="font-mono text-xs text-foreground">{w.title}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {w.deliverables.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <FlaskConical className="h-3.5 w-3.5 text-primary/80" />
              Labs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {s.labs.map((l) => (
              <div key={l.id} className="rounded-md border border-border/40 bg-background/30 p-2.5">
                <p className="font-mono text-xs text-foreground">
                  <span className="text-primary/80">{l.id}</span> · {l.title}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{l.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="glass border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <Gauge className="h-3.5 w-3.5 text-primary/80" />
              Evaluation Split
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-left font-mono text-[11px]">
              <tbody>
                {s.evaluation.map((e) => (
                  <tr key={e.component} className="border-t border-border/40 first:border-0">
                    <td className="py-1 pr-3 text-foreground">{e.component}</td>
                    <td className="py-1 text-right text-primary">{e.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MiniList title="Success Metrics" items={s.successMetrics} />
        <MiniList title="Failure Conditions" items={s.failureConditions} bad />
        <MiniList title="Faculty" items={s.faculty} />
        <MiniList title="Industry" items={s.industry} />
      </div>
    </div>
  );
}

function MiniList({ title, items, bad }: { title: string; items: string[]; bad?: boolean }) {
  return (
    <div className="rounded-md border border-border/40 bg-background/30 p-3">
      <p
        className={`font-mono text-[10px] uppercase tracking-widest ${bad ? "text-destructive/80" : "text-primary/80"}`}
      >
        {title}
      </p>
      <ul className="mt-1.5 space-y-1 text-xs text-foreground/90">
        {items.map((i) => (
          <li key={i}>· {i}</li>
        ))}
      </ul>
    </div>
  );
}

function FailureCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "ok" | "bad" | "neutral";
}) {
  const accent =
    tone === "ok"
      ? "border-primary/40"
      : tone === "bad"
        ? "border-destructive/40"
        : "border-border/60";
  return (
    <Card className={`glass ${accent}`}>
      <CardHeader className="pb-2">
        <CardTitle className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1.5 text-sm text-foreground/90">
          {items.map((i) => (
            <li key={i}>· {i}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function EvalLens({
  lens,
}: {
  lens: {
    title: string;
    description: string;
    dimensions: { name: string; indicators: string[] }[];
  };
}) {
  return (
    <Card className="glass border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="font-mono text-sm tracking-tight">{lens.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {lens.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {lens.dimensions.map((d) => (
          <div key={d.name} className="rounded-md border border-border/40 bg-background/30 p-2.5">
            <p className="font-mono text-[11px] text-foreground">{d.name}</p>
            <ul className="mt-1 space-y-0.5 text-[11px] text-muted-foreground">
              {d.indicators.map((i) => (
                <li key={i}>· {i}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ModuleDrawer({ selection, onClose }: { selection: ModuleSelection; onClose: () => void }) {
  const open = !!selection;
  const s = selection?.semester;
  const m = s?.modules.find((x) => x.id === selection?.moduleId);

  // Find weeks in this semester whose title or sessions overlap with module topics
  const relatedWeeks = useMemo(() => {
    if (!s || !m) return [];
    const keywords = m.topics
      .concat(m.title)
      .map((t) => t.toLowerCase().split(/[\s,/&]+/))
      .flat()
      .filter((w) => w.length > 4);
    return WEEKS.filter((w) => w.semester === s.key)
      .filter((w) => {
        const blob = (
          w.title +
          " " +
          w.sessions.flatMap((x) => x.bullets).join(" ") +
          " " +
          w.labs.flatMap((x) => x.bullets).join(" ")
        ).toLowerCase();
        return keywords.some((k) => blob.includes(k));
      })
      .slice(0, 6);
  }, [s, m]);

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-border/60 bg-background/95 p-0 backdrop-blur-xl sm:max-w-xl"
      >
        {s && m && (
          <>
            <SheetHeader className="border-b border-border/40 p-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/15 font-mono text-primary hover:bg-primary/15">
                  {s.key} · {m.id}
                </Badge>
                <button
                  onClick={onClose}
                  className="ml-auto rounded-md p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SheetTitle className="mt-2 font-mono text-lg tracking-tight">{m.title}</SheetTitle>
              <SheetDescription className="font-mono text-xs text-muted-foreground">
                {s.title} · {s.theme}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-5 p-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  Topics / Lecture Themes
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.topics.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="border-border/60 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  Lab Activities (Semester)
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  {s.labs.map((l) => (
                    <li key={l.id} className="flex gap-2">
                      <span className="text-primary/80">{l.id}</span> {l.title} — {l.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  Related Weeks
                </p>
                {relatedWeeks.length === 0 ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Cross-semester module — no direct week mapping.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {relatedWeeks.map((w) => (
                      <li key={w.week}>
                        · W{w.week} — {w.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  Evaluation Focus
                </p>
                <table className="mt-2 w-full text-left font-mono text-[11px]">
                  <tbody>
                    {s.evaluation.map((e) => (
                      <tr key={e.component} className="border-t border-border/40 first:border-0">
                        <td className="py-1 pr-3 text-foreground">{e.component}</td>
                        <td className="py-1 text-right text-primary">{e.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  Mapped TLOs
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.tloMap.map((t) => {
                    const tlo = TLOS_FULL.find((x) => x.id === t);
                    return (
                      <HoverCard key={t} openDelay={120}>
                        <HoverCardTrigger asChild>
                          <Badge
                            variant="outline"
                            className="cursor-help border-primary/40 font-mono text-[10px] text-primary"
                          >
                            {t}
                          </Badge>
                        </HoverCardTrigger>
                        {tlo && (
                          <HoverCardContent className="w-72 glass-strong border-border/60">
                            <p className="font-mono text-xs text-foreground">{tlo.title}</p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {tlo.description}
                            </p>
                          </HoverCardContent>
                        )}
                      </HoverCard>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  Deliverables (Semester)
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {WEEKS.filter((w) => w.semester === s.key)
                    .flatMap((w) => w.deliverables)
                    .slice(0, 12)
                    .map((d, i) => (
                      <Badge
                        key={`${d}-${i}`}
                        variant="outline"
                        className="border-border/60 font-mono text-[10px]"
                      >
                        {d}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Empty() {
  return (
    <div className="glass rounded-xl p-10 text-center font-mono text-sm text-muted-foreground">
      No matches for the current filter.
    </div>
  );
}
