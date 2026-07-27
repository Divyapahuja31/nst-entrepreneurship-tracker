import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

type Assessment = { name: string; weight: number };
type Band = { label: string; min: number; max: number; tone: string; advice: string };

const BANDS: Band[] = [
  {
    label: "Fail",
    min: 0,
    max: 39,
    tone: "bg-destructive/30 text-destructive-foreground border-destructive/50",
    advice: "Re-attempt with structured remediation; revisit CO scaffolding.",
  },
  {
    label: "Pass",
    min: 40,
    max: 54,
    tone: "bg-muted/40 text-foreground border-border",
    advice: "Meets baseline. Strengthen evidence and reflection depth.",
  },
  {
    label: "Average",
    min: 55,
    max: 64,
    tone: "bg-muted/60 text-foreground border-border",
    advice: "Solid execution; push for original insight and sharper framing.",
  },
  {
    label: "Good",
    min: 65,
    max: 74,
    tone: "bg-primary/20 text-foreground border-primary/40",
    advice: "Above expectation; ready to mentor peers on weaker components.",
  },
  {
    label: "Distinction",
    min: 75,
    max: 89,
    tone: "bg-primary/40 text-primary-foreground border-primary/60",
    advice: "Track-strong performer; nominate for showcases and venture labs.",
  },
  {
    label: "Outstanding",
    min: 90,
    max: 100,
    tone: "bg-primary/80 text-primary-foreground border-primary",
    advice: "Exemplar work. Capture as benchmark artifact for the cohort.",
  },
];

function bandFor(score: number) {
  return BANDS.find((b) => score >= b.min && score <= b.max) ?? BANDS[0];
}

export function RubricGrader({ assessments }: { assessments: Assessment[] }) {
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(assessments.map((a) => [a.name, 65])),
  );

  const totalWeight = assessments.reduce((s, a) => s + a.weight, 0);
  const weighted = useMemo(() => {
    const sum = assessments.reduce((s, a) => s + (scores[a.name] ?? 0) * a.weight, 0);
    return totalWeight ? sum / totalWeight : 0;
  }, [scores, assessments, totalWeight]);

  const band = bandFor(Math.round(weighted));

  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-mono text-lg">Rubric Grader</h3>
          <p className="text-xs text-muted-foreground">
            Drop in per-component scores to project the weighted band placement. Used for advisory
            grading only.
          </p>
        </div>
        <div className={`rounded-xl border px-4 py-3 text-right ${band.tone}`}>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-80">
            Projected band
          </p>
          <p className="font-mono text-2xl leading-none">{Math.round(weighted)}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest">{band.label}</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {assessments.map((a) => {
          const v = scores[a.name] ?? 0;
          const ab = bandFor(v);
          return (
            <div key={a.name} className="rounded-lg border border-border/40 bg-background/30 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs">{a.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Weight · {a.weight}%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {ab.label}
                  </Badge>
                  <span className="font-mono text-sm tabular-nums">{v}</span>
                </div>
              </div>
              <Slider
                value={[v]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) => setScores((s) => ({ ...s, [a.name]: val[0] }))}
                className="mt-3"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg border border-border/40 bg-background/30 p-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Faculty note</p>
        <p className="mt-1 text-xs">{band.advice}</p>
      </div>
    </div>
  );
}
