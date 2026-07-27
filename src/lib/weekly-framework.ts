// Weekly Execution Framework — Semester 3 & Semester 4
// Operational playbook for delivery: faculty, mentors, TPF, leadership, students.

export type Week = {
  n: number;
  title: string;
  objective?: string;
  topics?: string[];
  activities?: string[];
  deliverables?: string[];
  evidence?: string[];
  tlos?: string[];
  clos?: string[];
  evaluation?: string;
  mentor?: string;
  tpf?: string; // TPF involvement (green-flagged when present)
  industry?: string;
  event?: string;
  panel?: string;
  outcome?: string;
};

export type Semester = {
  id: "S3" | "S4";
  number: 3 | 4;
  title: string;
  theme: string;
  weeks: Week[];
};

export const SEM3: Semester = {
  id: "S3",
  number: 3,
  title: "Semester 3",
  theme: "Founder Mindset, Problem Discovery & Validation",
  weeks: [
    {
      n: 1,
      title: "Founder Mindset & Startup Reality",
      objective: "Understand entrepreneurship as execution under uncertainty.",
      topics: [
        "Startup myths",
        "Founder reality",
        "Why startups fail",
        "Execution vs ideas",
        "Founder psychology",
        "Ownership mindset",
      ],
      activities: ["Founder self-assessment", "Startup failure analysis", "Reflection workshop"],
      deliverables: ["Founder Reflection Journal"],
      evidence: ["Reflection report", "Participation"],
      tlos: ["TLO-1", "TLO-5"],
      clos: ["CLO-1"],
      evaluation: "Conceptual understanding",
      mentor: "Internal",
      tpf: "Masterclass #1 — Founder Mindset & Opportunity Recognition",
      outcome: "Student understands founder expectations.",
    },
    {
      n: 2,
      title: "Opportunity Recognition & Problem Discovery",
      topics: [
        "Problem observation",
        "Friction mapping",
        "Opportunity spotting",
        "Painkiller vs vitamin",
      ],
      activities: ["Field observations", "Problem logging"],
      deliverables: ["25 observed problems"],
      evidence: ["Observation journal"],
      tlos: ["TLO-1"],
      clos: ["CLO-1"],
      evaluation: "Observation rigour",
      mentor: "Internal",
      tpf: "Continuation of Masterclass #1",
      outcome: "Students begin identifying meaningful problems.",
    },
    {
      n: 3,
      title: "Customer Discovery",
      topics: ["Customer interviews", "Interview design", "Bias elimination", "User psychology"],
      activities: ["Conduct interviews"],
      deliverables: ["10 customer interviews"],
      evidence: ["Interview logs"],
      tlos: ["TLO-1", "TLO-2"],
      clos: ["CLO-2"],
      evaluation: "Interview quality & insight",
      mentor: "Internal",
      tpf: "Masterclass #2 — Customer Discovery & Validation",
    },
    {
      n: 4,
      title: "Problem Validation",
      topics: ["Root cause analysis", "Problem prioritization", "Validation systems"],
      deliverables: ["Problem Validation Report"],
      evidence: ["Interview synthesis"],
      tlos: ["TLO-2"],
      clos: ["CLO-2"],
      evaluation: "Validation evidence",
      mentor: "Internal",
      tpf: "Continuation of Masterclass #2",
    },
    {
      n: 5,
      title: "Market Research",
      topics: ["TAM", "SAM", "SOM", "Competition mapping"],
      deliverables: ["Market Analysis"],
      evidence: ["Market research report"],
      tlos: ["TLO-2", "TLO-3"],
      clos: ["CLO-2"],
      evaluation: "Market depth",
      mentor: "Internal",
    },
    {
      n: 6,
      title: "ICP Development",
      topics: ["Customer personas", "Buyer psychology", "User segmentation"],
      deliverables: ["ICP Canvas"],
      evidence: ["Persona documentation"],
      tlos: ["TLO-2"],
      clos: ["CLO-2"],
      evaluation: "ICP clarity",
      mentor: "Internal",
    },
    {
      n: 7,
      title: "Ideation & Solution Design",
      topics: ["Solution generation", "Opportunity scoring", "Startup concepts"],
      deliverables: ["Solution Canvas"],
      evidence: ["Solution write-up"],
      tlos: ["TLO-1", "TLO-2"],
      clos: ["CLO-2", "CLO-3"],
      evaluation: "Solution-fit reasoning",
      mentor: "Internal",
      industry: "Ideathon",
      event: "Ideathon",
    },
    {
      n: 8,
      title: "Mid-Sem Founder Review",
      activities: ["Students present Problem, Interviews, Validation, ICP, Solution"],
      evaluation: "Founder Review",
      panel: "NST Mentors + TPF",
      mentor: "Internal",
      tpf: "External evaluator on review panel",
      evidence: ["Review sheets"],
      tlos: ["TLO-1", "TLO-2", "TLO-5"],
      clos: ["CLO-1", "CLO-2"],
      outcome: "Validated startup direction.",
    },
    {
      n: 9,
      title: "MVP Thinking",
      topics: ["MVP philosophy", "MVP mistakes", "Scope reduction"],
      tlos: ["TLO-2"],
      clos: ["CLO-3"],
      evaluation: "Scope discipline",
      mentor: "Internal",
      tpf: "Masterclass #3 — Product Thinking & MVP Strategy",
    },
    {
      n: 10,
      title: "Product Thinking",
      topics: ["User journey", "Activation", "Retention"],
      deliverables: ["User Flow"],
      tlos: ["TLO-2"],
      clos: ["CLO-3"],
      evaluation: "Journey rigour",
      mentor: "Internal",
      tpf: "Continuation of Masterclass #3",
    },
    {
      n: 11,
      title: "AI & No-Code MVP Building",
      topics: ["Lovable", "Bolt", "AI development", "Rapid prototyping"],
      deliverables: ["Prototype V1"],
      tlos: ["TLO-2"],
      clos: ["CLO-3"],
      evaluation: "Prototype quality",
      mentor: "Internal",
    },
    {
      n: 12,
      title: "MVP Sprint",
      deliverables: ["Working prototype"],
      evidence: ["Product demo"],
      tlos: ["TLO-2", "TLO-4"],
      clos: ["CLO-3"],
      evaluation: "Build velocity",
      mentor: "Internal",
    },
    {
      n: 13,
      title: "Validation Experiments",
      topics: ["Landing pages", "Fake door tests", "Experiments"],
      deliverables: ["Validation Dashboard"],
      evidence: ["Real user data"],
      tlos: ["TLO-2", "TLO-3"],
      clos: ["CLO-3"],
      evaluation: "Signal quality",
      mentor: "Internal",
    },
    {
      n: 14,
      title: "Founder Communication",
      topics: ["Storytelling", "Founder positioning", "Communication"],
      deliverables: ["Founder Narrative"],
      tlos: ["TLO-5"],
      clos: ["CLO-4"],
      evaluation: "Narrative coherence",
      mentor: "Internal",
    },
    {
      n: 15,
      title: "Pitch Development",
      deliverables: ["Pitch Deck"],
      evidence: ["Presentation"],
      tlos: ["TLO-5"],
      clos: ["CLO-4"],
      evaluation: "Pitch clarity",
      mentor: "Internal",
    },
    {
      n: 16,
      title: "Semester Demo Day",
      panel: "NST + TPF + Mentors",
      deliverables: ["Startup presentation"],
      tlos: ["TLO-1", "TLO-2", "TLO-5"],
      clos: ["CLO-1", "CLO-2", "CLO-3", "CLO-4"],
      evaluation: "Semester completion review",
      mentor: "Internal",
      tpf: "Demo Day panelist & ecosystem feedback",
      event: "Demo Day",
      outcome: "Semester completion review.",
    },
  ],
};

export const SEM4: Semester = {
  id: "S4",
  number: 4,
  title: "Semester 4",
  theme: "Launch, Growth, Operations & Venture Building",
  weeks: [
    {
      n: 1,
      title: "Launch Readiness Review",
      tlos: ["TLO-3"],
      clos: ["CLO-5"],
      evaluation: "Launch readiness",
      mentor: "Internal",
      deliverables: ["Launch Readiness Checklist"],
    },
    {
      n: 2,
      title: "Customer Acquisition",
      tlos: ["TLO-3"],
      clos: ["CLO-5"],
      evaluation: "Acquisition strategy",
      mentor: "Internal",
      tpf: "Masterclass #4 — GTM & Distribution",
    },
    {
      n: 3,
      title: "Distribution Channels",
      tlos: ["TLO-3"],
      clos: ["CLO-5"],
      evaluation: "Channel selection",
      mentor: "Internal",
    },
    {
      n: 4,
      title: "Growth Experiments",
      tlos: ["TLO-3"],
      clos: ["CLO-5"],
      evaluation: "Experiment design",
      mentor: "Internal",
      tpf: "Continuation of Masterclass #4",
      deliverables: ["Growth Experiment Log"],
    },
    {
      n: 5,
      title: "Community Building",
      tlos: ["TLO-3", "TLO-4"],
      clos: ["CLO-5"],
      evaluation: "Community traction",
      mentor: "Internal",
    },
    {
      n: 6,
      title: "Sales Fundamentals",
      tlos: ["TLO-3"],
      clos: ["CLO-5"],
      evaluation: "Sales motion",
      mentor: "Internal",
    },
    {
      n: 7,
      title: "Negotiation & Conversion",
      tlos: ["TLO-3", "TLO-5"],
      clos: ["CLO-5"],
      evaluation: "Conversion outcomes",
      mentor: "Internal",
    },
    {
      n: 8,
      title: "Mid-Sem Founder Review",
      panel: "NST + TPF + Mentors",
      tlos: ["TLO-3", "TLO-4", "TLO-5"],
      clos: ["CLO-5", "CLO-6"],
      evaluation: "Founder Review",
      mentor: "Internal",
      tpf: "External evaluator on review panel",
      evidence: ["Review sheets"],
    },
    {
      n: 9,
      title: "Startup Metrics",
      topics: ["CAC", "LTV", "Retention"],
      tlos: ["TLO-3", "TLO-6"],
      clos: ["CLO-6"],
      evaluation: "Metric literacy",
      mentor: "Internal",
    },
    {
      n: 10,
      title: "Buildathon",
      event: "Product Build Sprint",
      tlos: ["TLO-2", "TLO-4"],
      clos: ["CLO-6"],
      evaluation: "Build outcomes",
      mentor: "Internal",
      deliverables: ["Sprint Build"],
    },
    {
      n: 11,
      title: "Operations & Systems",
      topics: ["SOPs", "Workflows", "Scaling"],
      tlos: ["TLO-4"],
      clos: ["CLO-7"],
      evaluation: "Ops maturity",
      mentor: "Internal",
    },
    {
      n: 12,
      title: "Startup Finance",
      topics: ["Revenue", "Burn", "Runway"],
      tlos: ["TLO-4", "TLO-6"],
      clos: ["CLO-7"],
      evaluation: "Financial literacy",
      mentor: "Internal",
    },
    {
      n: 13,
      title: "Fundraising Fundamentals",
      tlos: ["TLO-6"],
      clos: ["CLO-8"],
      evaluation: "Fundraising readiness",
      mentor: "Internal",
      tpf: "Masterclass #5 — Fundraising & Venture Communication",
    },
    {
      n: 14,
      title: "Investor Communication",
      topics: ["Data rooms", "Investor updates"],
      tlos: ["TLO-5", "TLO-6"],
      clos: ["CLO-8"],
      evaluation: "Investor narrative",
      mentor: "Internal",
    },
    {
      n: 15,
      title: "Pitch Rehearsals",
      activities: ["Mock investor reviews"],
      tlos: ["TLO-5", "TLO-6"],
      clos: ["CLO-8"],
      evaluation: "Pitch readiness",
      mentor: "Internal",
      tpf: "Founder assessment on mock panels",
    },
    {
      n: 16,
      title: "Final Demo Day",
      deliverables: ["Venture Report — Metrics, Product, Growth, Learnings"],
      panel: "NST + TPF + Mentors + Industry Experts",
      tlos: ["TLO-3", "TLO-4", "TLO-5", "TLO-6"],
      clos: ["CLO-5", "CLO-6", "CLO-7", "CLO-8"],
      evaluation: "Final venture evaluation",
      mentor: "Internal",
      tpf: "Demo Day panelist & ecosystem feedback",
      event: "Final Demo Day",
      outcome: "End-of-program venture readiness.",
    },
  ],
};

export const SEMESTERS = [SEM3, SEM4];

export function semesterHealth(s: Semester) {
  const weeks = s.weeks.length;
  const masterclasses = s.weeks.filter((w) => /masterclass/i.test(w.tpf || "")).length;
  const founderReviews = s.weeks.filter(
    (w) => /founder review|demo day/i.test(w.title) || /founder review/i.test(w.evaluation || ""),
  ).length;
  const events = s.weeks.filter((w) => w.event).length;
  const deliverables = s.weeks.reduce((n, w) => n + (w.deliverables?.length || 0), 0);
  const checkpoints = s.weeks.filter((w) => w.evaluation).length;
  return { weeks, masterclasses, founderReviews, events, deliverables, checkpoints };
}
