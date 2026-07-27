import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { WEIGHTAGE, ANTI_GAMING } from "@/lib/framework-data";
import {
  ResponsiveContainer,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { ShieldCheck, Eye, Activity, FileSearch } from "lucide-react";

export const Route = createFileRoute("/evaluation")({
  head: () => ({
    meta: [
      { title: "Evaluation Logic · NST Entrepreneurship" },
      {
        name: "description",
        content: "Grading weightage, anti-gaming protocol, and quality controls.",
      },
    ],
  }),
  component: Page,
});

const ICONS = [ShieldCheck, Eye, Activity, FileSearch];

function Page() {
  const colors = [
    "oklch(0.78 0.13 80)",
    "oklch(0.65 0.13 220)",
    "oklch(0.72 0.16 155)",
    "oklch(0.62 0.18 295)",
  ];

  return (
    <>
      <TopBar title="Grading & Quality Control" breadcrumb="Master Framework" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="grid gap-6 xl:grid-cols-5">
          <div className="glass-strong rounded-2xl p-7 xl:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
              Weightage
            </p>
            <h2 className="font-mono text-xl tracking-tight">Where the grade comes from</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Execution and market evidence dominate. Theory is necessary, never sufficient.
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="35%"
                    outerRadius="100%"
                    data={WEIGHTAGE.map((w, i) => ({ ...w, fill: colors[i] }))}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 40]} tick={false} />
                    <RadialBar
                      background={{ fill: "oklch(1 0 0 / 0.05)" }}
                      dataKey="value"
                      cornerRadius={6}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(0.18 0.018 250)",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                        fontFamily: "JetBrains Mono",
                        fontSize: 12,
                        borderRadius: 8,
                      }}
                      formatter={(v: number) => [`${v}%`, ""]}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={WEIGHTAGE}
                    layout="vertical"
                    margin={{ left: 0, right: 16, top: 8, bottom: 8 }}
                  >
                    <XAxis type="number" hide domain={[0, 40]} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={140}
                      tick={{
                        fill: "oklch(0.7 0.015 250)",
                        fontSize: 10,
                        fontFamily: "JetBrains Mono",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                      contentStyle={{
                        background: "oklch(0.18 0.018 250)",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                        fontFamily: "JetBrains Mono",
                        fontSize: 12,
                        borderRadius: 8,
                      }}
                      formatter={(v: number) => [`${v}%`, "Weight"]}
                    />
                    <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                      {WEIGHTAGE.map((_, i) => (
                        <Cell key={i} fill={colors[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {WEIGHTAGE.map((w, i) => (
                <div
                  key={w.name}
                  className="flex items-center justify-between rounded-md border border-border/50 bg-background/20 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: colors[i] }} />
                    <span className="font-mono text-xs">{w.name}</span>
                  </div>
                  <span className="font-mono text-sm gold-text">{w.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-7 xl:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-destructive/80">
              Grade Distribution
            </p>
            <h2 className="font-mono text-xl tracking-tight">From founder-grade to fail</h2>
            <div className="mt-5 space-y-3">
              {[
                {
                  g: "10",
                  t: "Founder-Student",
                  d: "Operates real ventures with measurable traction.",
                },
                {
                  g: "8–9",
                  t: "Operator",
                  d: "Executes well, validates rigorously, ships consistently.",
                },
                { g: "6–7", t: "Builder", d: "Solid execution but inconsistent validation." },
                {
                  g: "<5",
                  t: "Jargon-Heavy",
                  d: "Vocabulary without operational clarity. Fake traction.",
                },
              ].map((r) => (
                <div
                  key={r.g}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/20 p-3"
                >
                  <span className="rounded-md bg-primary/15 px-2 py-1 font-mono text-sm text-primary">
                    {r.g}
                  </span>
                  <div>
                    <p className="font-mono text-sm tracking-tight">{r.t}</p>
                    <p className="text-xs text-muted-foreground">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
                Anti-Gaming Protocol
              </p>
              <h2 className="font-mono text-xl tracking-tight">
                How the program prevents faked traction
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ANTI_GAMING.map((a, i) => {
              const Icon = ICONS[i] ?? ShieldCheck;
              return (
                <div key={a.title} className="glass rounded-xl p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mt-4 font-mono text-base tracking-tight">{a.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a.body}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
