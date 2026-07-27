import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { TLOS, FAILURE_PATTERNS } from "@/lib/framework-data";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target, ShieldAlert, AlertTriangle, Zap } from "lucide-react";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "Philosophy · NST Entrepreneurship" },
      {
        name: "description",
        content:
          "Track philosophy, strategic intent, anti-failure patterns, and Track-Level Outcomes.",
      },
    ],
  }),
  component: Page,
});

const CORE = [
  { k: "Execution over Theory", v: "Founders are forged in market interactions, not textbooks." },
  { k: "Validation over Ideation", v: "Evidence-driven validation precedes building." },
  { k: "Systems over Hype", v: "Operational rigor beats jargon and presentation polish." },
  { k: "Iteration over Perfection", v: "Measurable iteration cycles, not one-shot launches." },
];

function Page() {
  return (
    <>
      <TopBar title="Track Philosophy & Context" breadcrumb="Master Framework" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="glass-strong rounded-2xl p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                  Core Intent
                </p>
                <h2 className="font-mono text-xl tracking-tight">Why this track exists</h2>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Not a motivational startup club. Not a theoretical management program. A structured
              execution-oriented entrepreneurial engineering track that turns technically capable
              students into founders, operators, product builders and venture-ready engineers.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {CORE.map((c) => (
                <div key={c.k} className="rounded-lg border border-border/60 bg-background/20 p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    <p className="font-mono text-sm tracking-tight">{c.k}</p>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{c.v}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-strong rounded-2xl p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-destructive/15 ring-1 ring-destructive/40">
                <ShieldAlert className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-destructive/80">
                  Anti-Failure
                </p>
                <h2 className="font-mono text-xl tracking-tight">Observed failure patterns</h2>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The curriculum is engineered against these recurring founder gaps observed across
              evaluations.
            </p>
            <Accordion type="multiple" className="mt-4">
              {FAILURE_PATTERNS.map((cluster) => (
                <AccordionItem
                  key={cluster.cluster}
                  value={cluster.cluster}
                  className="border-border/50"
                >
                  <AccordionTrigger className="font-mono text-sm hover:no-underline">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-destructive/80" />
                      {cluster.cluster} Failures
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid gap-1.5 pl-6">
                      {cluster.items.map((it) => (
                        <li
                          key={it}
                          className="list-disc text-xs text-muted-foreground marker:text-destructive/60"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                TLO Grid
              </p>
              <h2 className="font-mono text-xl tracking-tight">Track-Level Outcomes</h2>
            </div>
            <p className="hidden font-mono text-[11px] text-muted-foreground sm:block">
              Hover any tile for the full TLO definition.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {TLOS.map((t, i) => (
              <HoverCard key={t.id} openDelay={80} closeDelay={80}>
                <HoverCardTrigger asChild>
                  <button className="glass group relative overflow-hidden rounded-xl p-5 text-left transition hover:-translate-y-0.5 hover:border-primary/40">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                        {t.id}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} / 06
                      </span>
                    </div>
                    <h3 className="mt-3 font-mono text-base tracking-tight">{t.title}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {t.verb}
                    </p>
                    <div className="hairline mt-4" />
                    <p className="mt-3 line-clamp-3 text-xs text-muted-foreground">
                      {t.description}
                    </p>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="glass-strong w-96 border-border/60">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                    {t.id} · {t.verb}
                  </p>
                  <h4 className="mt-1 font-mono text-sm tracking-tight">{t.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {t.description}
                  </p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
