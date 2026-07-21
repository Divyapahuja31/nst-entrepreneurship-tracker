// Extended TLO data from TLO_draft_1.docx — the 10 formal Track-Level Outcomes
// drafted during the NST Entrepreneurship Track Discovery Workshop.

export type TLOExt = {
  id: string;
  short: string;
  statement: string;
  clusters: number[]; // index into CAPABILITY_CLUSTERS
  verbTier: "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create" | "Apply / Evaluate" | "Analyze / Evaluate" | "Evaluate / Create" | "Apply / Analyze";
};

export const CAPABILITY_CLUSTERS = [
  { id: 1, name: "Founder Thinking", skills: ["initiative", "ownership", "ambiguity handling", "resilience", "accountability"] },
  { id: 2, name: "Product & Customer Thinking", skills: ["user understanding", "validation", "experimentation", "iteration", "product framing"] },
  { id: 3, name: "Venture Execution", skills: ["MVP building", "launch execution", "GTM testing", "startup operations"] },
  { id: 4, name: "Analytical Decision-Making", skills: ["metrics interpretation", "prioritization", "strategic analysis", "problem solving"] },
  { id: 5, name: "Communication & Leadership", skills: ["pitching", "storytelling", "founder communication", "collaboration", "stakeholder interaction"] },
] as const;

export const TLOS_EXT: TLOExt[] = [
  { id: "TLO-1", short: "Problem Identification", statement: "Identify meaningful problems and validate whether they are worth solving through structured customer discovery and behavioral observation.", clusters: [1, 2], verbTier: "Analyze / Evaluate" },
  { id: "TLO-2", short: "Customer Discovery", statement: "Conduct customer discovery using interviews, validation systems, experimentation, and evidence-backed analysis.", clusters: [2, 4], verbTier: "Apply / Evaluate" },
  { id: "TLO-3", short: "MVP Build & Iterate", statement: "Build and iterate MVPs using structured product thinking, prioritization, and execution systems.", clusters: [3], verbTier: "Create" },
  { id: "TLO-4", short: "Execute under Uncertainty", statement: "Execute under uncertainty while adapting products, strategies, and workflows using iterative learning loops.", clusters: [1, 3, 4], verbTier: "Create" },
  { id: "TLO-5", short: "Venture Communication", statement: "Communicate startup ideas, validation evidence, and venture logic clearly through presentations, storytelling, and founder communication.", clusters: [5], verbTier: "Create" },
  { id: "TLO-6", short: "Startup Economics & GTM", statement: "Understand startup economics, GTM systems, and venture operations to support sustainable execution and strategic decision-making.", clusters: [3, 4], verbTier: "Apply / Analyze" },
  { id: "TLO-7", short: "Team & Accountability", statement: "Work effectively in venture teams through accountability, ownership, collaboration, and founder responsibility.", clusters: [1, 5], verbTier: "Apply" },
  { id: "TLO-8", short: "Evidence-Backed Decisions", statement: "Interpret user behavior, metrics, feedback, and traction signals to make evidence-backed startup decisions.", clusters: [2, 4], verbTier: "Analyze" },
  { id: "TLO-9", short: "Execution Consistency", statement: "Demonstrate execution consistency, structured experimentation, and learning through founder review systems and venture labs.", clusters: [1, 3], verbTier: "Apply" },
  { id: "TLO-10", short: "Recovery & Adaptation", statement: "Recover from failed assumptions, identify repeated mistakes, and adapt strategies through reflective learning and iteration.", clusters: [1, 4], verbTier: "Evaluate / Create" },
];

// TLO coverage by semester (1..4) — strength 0..3 (0 none, 1 supporting, 2 strong, 3 primary)
export const TLO_SEMESTER_COVERAGE: Record<string, [number, number, number, number]> = {
  "TLO-1": [3, 2, 1, 1],
  "TLO-2": [3, 3, 2, 1],
  "TLO-3": [1, 3, 3, 2],
  "TLO-4": [1, 2, 3, 3],
  "TLO-5": [1, 2, 3, 3],
  "TLO-6": [0, 1, 3, 3],
  "TLO-7": [1, 2, 2, 3],
  "TLO-8": [1, 2, 3, 3],
  "TLO-9": [2, 3, 3, 3],
  "TLO-10": [1, 2, 2, 3],
};

// Course design data — Entrepreneurship 1 (Founder Discovery & Problem Understanding)
// Source: Entrepreneurship_CLO.docx + sem 1 weekly plan
export type CourseDesign = {
  id: string;
  title: string;
  code: string;
  semester: 1 | 2 | 3 | 4;
  credits: string;
  lead: string;
  destination: string;
  cos: { id: string; statement: string; bloom: string; tloMap: string[]; mapsTo: string }[];
  transferTasks: { id: string; description: string; context: string; cos: string[]; why: string }[];
  assessments: { name: string; weight: number; cos: string[]; doVerb: string; proves: string }[];
  rubric: { name: string; bands: [string, string, string, string, string, string] }[]; // 6 bands
  forwardHandoff: { course: string; expects: string; co: string; how: string }[];
  weeklyPlan: { wk: number; topic: string; cos: string[]; strategy: string; check: string }[];
};

export const COURSES_DESIGN: CourseDesign[] = [
  {
    id: "entrepreneurship-1",
    title: "Entrepreneurship 1 — Founder Discovery & Problem Understanding",
    code: "TBD",
    semester: 1,
    credits: "L-T-P-C · 5",
    lead: "Nitish Krishna Ganesan Venkatraman",
    destination:
      "Industry-facing foundation for venture-building, MVP development, GTM execution, startup systems, and founder review labs. Acts as startup readiness + venture execution preparation.",
    cos: [
      { id: "CO1", statement: "Identify meaningful real-world problems using structured observation and behavioral analysis.", bloom: "Apply / Analyze", tloMap: ["TLO-1", "TLO-9"], mapsTo: "Startup Founder / Builder" },
      { id: "CO2", statement: "Conduct customer discovery and ICP analysis using interviews and validation systems.", bloom: "Apply / Evaluate", tloMap: ["TLO-2", "TLO-8"], mapsTo: "Startup Operator / Product Roles" },
      { id: "CO3", statement: "Analyze startup opportunities using market understanding, customer validation, and structured problem framing.", bloom: "Analyze", tloMap: ["TLO-3", "TLO-4", "TLO-6"], mapsTo: "Venture & Startup Ecosystem Roles" },
      { id: "CO4", statement: "Present and defend startup problem statements, customer insights, validation evidence, and founder reasoning clearly.", bloom: "Create", tloMap: ["TLO-5", "TLO-7"], mapsTo: "Founder Communication" },
    ],
    transferTasks: [
      { id: "T1", description: "Conduct customer interviews and synthesize behavioral insights.", context: "Startup customer discovery", cos: ["CO1", "CO2"], why: "Requires observation, interviewing, and validation ability." },
      { id: "T2", description: "Build a structured problem validation report with ICP and market understanding.", context: "Early-stage startup validation", cos: ["CO2", "CO3"], why: "Requires customer analysis and structured startup reasoning." },
      { id: "T3", description: "Present a startup opportunity and defend validation logic during founder review.", context: "Founder pitching and venture communication", cos: ["CO3", "CO4"], why: "Requires strategic reasoning and communication clarity." },
    ],
    assessments: [
      { name: "Founder Participation & Execution", weight: 20, cos: ["CO1"], doVerb: "Participate in founder labs, fieldwork, and startup exercises", proves: "Measures execution engagement and founder behavior" },
      { name: "Customer Discovery & Interviews", weight: 20, cos: ["CO1", "CO2"], doVerb: "Conduct real interviews and gather validation evidence", proves: "Proves customer interaction and validation capability" },
      { name: "Problem Validation Report", weight: 20, cos: ["CO2", "CO3"], doVerb: "Analyze customer feedback, ICPs, and startup opportunities", proves: "Demonstrates structured startup reasoning" },
      { name: "Research & Market Analysis", weight: 15, cos: ["CO3"], doVerb: "Conduct market analysis and competitor understanding", proves: "Validates market understanding ability" },
      { name: "Pitching & Communication", weight: 10, cos: ["CO4"], doVerb: "Present startup rationale and founder communication", proves: "Measures startup communication ability" },
      { name: "Reflection & Iteration Logs", weight: 10, cos: ["CO1", "CO3"], doVerb: "Maintain founder learning and execution logs", proves: "Measures learning loops and reflection capability" },
      { name: "Viva / Founder Review", weight: 5, cos: ["CO4"], doVerb: "Defend startup reasoning verbally", proves: "Validates founder communication and strategic thinking" },
    ],
    rubric: [
      { name: "Founder Participation & Execution", bands: ["Passive participation", "Minimal engagement", "Inconsistent execution", "Active participation", "Strong execution discipline", "Exceptional founder initiative"] },
      { name: "Customer Discovery & Interviews", bands: ["Fake / no interviews", "Weak interviews", "Basic interview effort", "Good customer insights", "Strong validation depth", "Exceptional customer understanding"] },
      { name: "Problem Validation Report", bands: ["Unsupported claims", "Weak analysis", "Basic validation", "Structured reasoning", "Strong evidence-backed logic", "Outstanding strategic clarity"] },
      { name: "Research & Market Analysis", bands: ["Weak / no research", "Limited understanding", "Basic competitor analysis", "Structured market reasoning", "Strong analytical understanding", "Outstanding market interpretation"] },
      { name: "Pitching & Communication", bands: ["Unclear", "Weak articulation", "Basic communication", "Good founder communication", "Strong presentation logic", "Exceptional clarity and persuasion"] },
      { name: "Reflection & Iteration Logs", bands: ["No reflection", "Minimal learning", "Basic iteration", "Structured learning loops", "Strong self-analysis", "Exceptional founder growth insights"] },
      { name: "Viva / Founder Review", bands: ["Cannot defend logic", "Weak responses", "Basic defense", "Good reasoning", "Strong strategic defense", "Exceptional founder-level thinking"] },
    ],
    forwardHandoff: [
      { course: "Entrepreneurship 2 — Validation & MVP", expects: "Validation systems and MVP thinking", co: "CO2, CO3", how: "Validation reports, founder reviews, customer interviews" },
      { course: "Entrepreneurship 3 — GTM & Launch", expects: "Communication, startup reasoning, execution discipline", co: "CO3, CO4", how: "Startup presentations and founder evaluations" },
      { course: "Venture Labs / Startup Studio", expects: "Founder execution capability and experimentation", co: "CO1, CO2", how: "Weekly labs, fieldwork, execution logs" },
    ],
    weeklyPlan: [
      { wk: 1, topic: "Founder Mindset & Startup Basics", cos: ["CO1"], strategy: "Reflection & startup research", check: "Reflection document" },
      { wk: 2, topic: "Problem Discovery", cos: ["CO1"], strategy: "Friction mapping", check: "Problem journal" },
      { wk: 3, topic: "Customer Discovery", cos: ["CO2"], strategy: "Mock interviews", check: "ICP sheets" },
      { wk: 4, topic: "Field Interviews", cos: ["CO2"], strategy: "Field interviews", check: "Interview notes" },
      { wk: 5, topic: "Market Understanding", cos: ["CO3"], strategy: "Competitor mapping", check: "Market map" },
      { wk: 6, topic: "Startup Ideation", cos: ["CO3"], strategy: "Ideation workshop", check: "Idea rationale" },
      { wk: 7, topic: "Problem Statement Design", cos: ["CO3"], strategy: "Mentor feedback", check: "Problem statement" },
      { wk: 8, topic: "Mid-Sem Founder Review", cos: ["CO2", "CO3"], strategy: "Founder presentations", check: "Mid-sem evaluation" },
      { wk: 9, topic: "Startup Case Studies", cos: ["CO3"], strategy: "Case study reviews", check: "Failure analysis" },
      { wk: 10, topic: "User Behavior & Psychology", cos: ["CO2"], strategy: "Observation exercises", check: "Behavioral report" },
      { wk: 11, topic: "Validation Methods", cos: ["CO2", "CO3"], strategy: "Validation experiments", check: "Validation plan" },
      { wk: 12, topic: "Communication & Pitching", cos: ["CO4"], strategy: "Pitch practice", check: "Pitch reviews" },
      { wk: 13, topic: "Team Building & Execution", cos: ["CO3"], strategy: "Team retrospectives", check: "Team charter" },
      { wk: 14, topic: "Iteration & Learning Loops", cos: ["CO3"], strategy: "Reflection workshops", check: "Failure logs" },
      { wk: 15, topic: "Final Presentation Preparation", cos: ["CO3", "CO4"], strategy: "Presentation prep labs", check: "Mentor review" },
      { wk: 16, topic: "Final Founder Review & Presentation", cos: ["CO4"], strategy: "Founder presentation defense", check: "Final evaluation" },
    ],
  },
];

// Track Dashboard KPIs
export const TRACK_KPIS = [
  { label: "Track Duration", value: "4", unit: "Semesters" },
  { label: "Total Credits", value: "5", unit: "Per Sem" },
  { label: "TLOs", value: "10", unit: "Outcomes" },
  { label: "Capability Clusters", value: "5", unit: "Domains" },
  { label: "Delivery Model", value: "70-20-10", unit: "Build · Mentor · Lecture" },
  { label: "Practical : Theory", value: "80 : 20", unit: "Split" },
];
