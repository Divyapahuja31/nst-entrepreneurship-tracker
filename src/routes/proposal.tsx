import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/proposal")({
  // TODO(kanishkranjan): Add meta Data
  loader: async () => {
    const { data, error } = await supabase.from("proposal").select("*");
    return data;
  },
  component: Page,
});

function Page() {
  const proposals = Route.useLoaderData();
  return (
    <>
      <TopBar title="Credit & Evaluation Architecture" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="glass-strong overflow-hidden rounded-2xl">
          <div className="grid grid-cols-12 gap-3 border-b border-border/50 bg-background/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Subject</div>
            <div className="col-span-4">Venture</div>
            <div className="col-span-2">Action</div>
          </div>
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="grid grid-cols-12 items-center gap-3 border-b border-border/30 px-5 py-4 last:border-b-0"
            >
              {/* name */}
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm">{proposal.name}</p>
                </div>
              </div>
              {/* subject */}
              <div className="col-span-2 text-xs text-muted-foreground">{proposal.subject}</div>
              {/* venture */}
              <div className="col-span-4 text-xs text-muted-foreground">{proposal.venture}</div>
              {/* accept & reject */}
              <div className="col-span-2 flex flex-wrap gap-1">
                <Button>Accept</Button>
                <Button>Reject</Button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
