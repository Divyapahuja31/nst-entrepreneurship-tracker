import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { PARTNER_FRAMEWORK } from "@/lib/governance-data";
import { TpfBadge, TpfBlock } from "@/components/TpfBlock";
import { Badge } from "@/components/ui/badge";
import { Handshake } from "lucide-react";

export const Route = createFileRoute("/industry-partner")({
  head: () => ({
    meta: [
      { title: "Industry Partner Collaboration Framework · NST Entrepreneurship" },
      { name: "description", content: "Defined role of external ecosystem partners (TPF) inside the Entrepreneurship Minor." },
    ],
  }),
  component: Page,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-strong rounded-2xl p-6">
      <h3 className="font-mono text-sm tracking-tight">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Chips({ items, tone = "default" }: { items: string[]; tone?: "default" | "tpf" }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((x) => (
        <Badge
          key={x}
          variant="outline"
          className={tone === "tpf"
            ? "border-emerald-400/30 bg-emerald-500/10 font-mono text-[10px] text-emerald-200"
            : "border-primary/30 bg-primary/10 font-mono text-[10px] text-primary"}
        >
          {x}
        </Badge>
      ))}
    </div>
  );
}

function Page() {
  const p = PARTNER_FRAMEWORK;
  return (
    <>
      <TopBar title="Industry Partner Collaboration Framework" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong rounded-2xl p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/15 ring-1 ring-emerald-400/40">
              <Handshake className="h-4 w-4 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-300">Anchor Partner</p>
                <TpfBadge />
              </div>
              <h2 className="font-mono text-xl tracking-tight">The Placement Factory · ecosystem contribution model</h2>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                TPF participates as a specialist ecosystem contributor — providing industry signal, expert sessions,
                external evaluations and ecosystem access. NST retains full ownership of academic delivery, evaluation
                and credit governance.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <Section title="TPF Responsibilities · Program Design Support">
            <TpfBlock><Chips items={p.tpfResponsibilities} tone="tpf" /></TpfBlock>
          </Section>

          <Section title="Specialist Masterclasses">
            <TpfBlock label="TPF-Led Sessions">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Semester 1</p>
              <ol className="mt-1 list-decimal pl-4 text-xs text-emerald-50/90">
                {p.masterclasses.sem1.map((x) => (<li key={x}>{x}</li>))}
              </ol>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Semester 2</p>
              <ol className="mt-1 list-decimal pl-4 text-xs text-emerald-50/90" start={p.masterclasses.sem1.length + 1}>
                {p.masterclasses.sem2.map((x) => (<li key={x}>{x}</li>))}
              </ol>
            </TpfBlock>
          </Section>

          <Section title="Founder Reviews · Mid-Sem Support">
            <TpfBlock>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Scope</p>
              <Chips items={p.founderReviews.scope} tone="tpf" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Role</p>
              <Chips items={p.founderReviews.role} tone="tpf" />
            </TpfBlock>
          </Section>

          <Section title="Demo Day Support">
            <TpfBlock>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Core Support</p>
              <Chips items={p.demoDay.support} tone="tpf" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Optional Invitations</p>
              <Chips items={p.demoDay.optional} tone="tpf" />
            </TpfBlock>
          </Section>

          <Section title="Ecosystem Exposure">
            <TpfBlock><Chips items={p.ecosystem} tone="tpf" /></TpfBlock>
          </Section>

          <Section title="Mentor Network Access">
            <TpfBlock label="TPF Mentor Areas"><Chips items={p.mentorAreas} tone="tpf" /></TpfBlock>
          </Section>

          <Section title="Placement Alignment">
            <TpfBlock><Chips items={p.placementAlignment} tone="tpf" /></TpfBlock>
          </Section>

          <Section title="Annual Engagement Structure">
            <div className="grid gap-2">
              <TpfBlock label="Semester 1"><Chips items={p.annualEngagement.sem1} tone="tpf" /></TpfBlock>
              <TpfBlock label="Semester 2"><Chips items={p.annualEngagement.sem2} tone="tpf" /></TpfBlock>
              <TpfBlock label="Optional"><Chips items={p.annualEngagement.optional} tone="tpf" /></TpfBlock>
            </div>
          </Section>
        </div>

        <section className="glass-strong rounded-2xl p-7">
          <h3 className="font-mono text-sm tracking-tight">Ownership Model</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">NST Ownership</p>
              <ul className="mt-2 space-y-1 text-xs text-primary/90">
                {p.ownership.nst.map((x) => (<li key={x}>· {x}</li>))}
              </ul>
            </div>
            <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300">Industry Partner Ownership</p>
                <TpfBadge />
              </div>
              <ul className="mt-2 space-y-1 text-xs text-emerald-50/90">
                {p.ownership.partner.map((x) => (<li key={x}>· {x}</li>))}
              </ul>
            </div>
            <div className="rounded-lg border border-chart-5/30 bg-chart-5/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-chart-5">Joint Ownership</p>
              <ul className="mt-2 space-y-1 text-xs text-chart-5/90">
                {p.ownership.joint.map((x) => (<li key={x}>· {x}</li>))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
