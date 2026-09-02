import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { TLOS, YEARS, WEIGHTAGE } from "@/lib/framework-data";
import { ArrowRight, Compass, Map, Gauge, Trophy } from "lucide-react";
import { ApplyNowButton } from "@/components/ApplyNowButton";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview · NST Entrepreneurship Master Framework" },
      {
        name: "description",
        content: "Dashboard overview of the NST Entrepreneurship Track master framework.",
      },
    ],
  }),
  component: Page,
});

const NAV = [
  {
    to: "/philosophy",
    icon: Compass,
    title: "Philosophy",
    sub: "Strategic intent · failure patterns",
  },
  {
    to: "/roadmap",
    icon: Map,
    title: "4-Year Roadmap",
    sub: "Foundation → Residency",
  },
  {
    to: "/evaluation",
    icon: Gauge,
    title: "Evaluation Logic",
    sub: "Weightage · anti-gaming",
  },
  {
    to: "/outcomes",
    icon: Trophy,
    title: "Track Outcomes",
    sub: "TLO × CLO matrix",
  },
] as const;

function Page() {
  const { isStaff, status } = useAuth();
  const totalCourses = YEARS.reduce((a, y) => a + y.courses.length, 0);

  return (
    <>
      <TopBar title="Master Framework · Overview" breadcrumb="NST 2026" />
      <main className="relative flex-1 space-y-6 px-6 py-8 lg:px-10 lg:py-10 max-w-7xl mx-auto w-full">
        {/* BIG CONTAINER (HERO + EMBEDDED STAT CARDS) */}
        <section className="glass-strong relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white/85 p-8 lg:p-10 shadow-xs backdrop-blur-md">
          <h1 className="max-w-4xl font-sans text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl text-stone-900">
            Building <span className="font-serif italic font-normal text-[#C85A32]">execution-first</span> founders, startup operators &amp; venture-ready engineers.
          </h1>
          
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            A structured execution-oriented entrepreneurial engineering track. Execution over
            theory. Validation over ideation. Systems thinking over hype.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {status !== "loading" && !isStaff && <ApplyNowButton size="lg" className="shadow-xs" />}
            <Link
              to="/philosophy"
              className="group inline-flex items-center gap-2 rounded-xl border border-stone-300/80 bg-stone-900 px-4.5 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-stone-800 shadow-2xs transition-all"
            >
              Read the philosophy
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 text-stone-300" />
            </Link>
          </div>

          {/* 4 Stat Cards Inside Bottom of Big Hero Container */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 pt-2">
            {[
              { k: "TLOS", v: TLOS.length },
              { k: "YEARS", v: YEARS.length },
              { k: "COURSES", v: totalCourses },
              { k: "EXECUTION WEIGHT", v: `${WEIGHTAGE[0].value}%` },
            ].map((m) => (
              <div
                key={m.k}
                className="rounded-xl border border-stone-200/80 bg-stone-50/80 px-4.5 py-3.5 backdrop-blur-xs"
              >
                <div className="font-serif text-2xl lg:text-3xl font-normal text-[#C85A32] tracking-tight">
                  {m.v}
                </div>
                <div className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  {m.k}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 SMALL CARDS GRID BELOW BIG CONTAINER (SHORTCUTS TO PAGES) */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative overflow-hidden rounded-xl border border-stone-200/90 bg-white/80 p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-700 border border-stone-200/80">
                    <n.icon className="h-4 w-4" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-stone-900" />
                </div>
                <h3 className="mt-4 font-sans text-base font-semibold tracking-tight text-stone-900">
                  {n.title}
                </h3>
                <p className="mt-1 text-xs text-stone-500 font-sans">{n.sub}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
