// Governance, Outcomes, Mentor & Partner data layer
// Additive — does not modify existing TLO/CLO/framework data.

export type TpfFlag = boolean;

export const CAREER_PATHWAYS: {
  role: string;
  family: "Venture" | "Product" | "Growth" | "Operations" | "Capital" | "Strategy" | "Ecosystem";
  skills: string[];
  evidence: string[];
  relevance: string;
}[] = [
  {
    role: "Founder",
    family: "Venture",
    skills: ["Opportunity Recognition", "Vision", "Execution", "Fundraising", "Leadership"],
    evidence: ["Validation Reports", "MVPs", "Pilot Users", "Pitch Decks"],
    relevance:
      "Direct outcome of the track — student runs an incorporated or pre-incorporation venture.",
  },
  {
    role: "Co-Founder",
    family: "Venture",
    skills: ["Execution", "Stakeholder Mgmt", "Product/GTM Split", "Operations"],
    evidence: ["Founder Reviews", "Operating Cadence", "Equity Notes"],
    relevance:
      "Joins a peer venture as technical/product/growth co-founder with documented contribution.",
  },
  {
    role: "Founder's Office",
    family: "Strategy",
    skills: ["Strategy", "Communication", "Cross-functional Ops", "Investor Updates"],
    evidence: ["Board Decks", "Operational Dashboards", "Memo Writing"],
    relevance: "Hired by funded startups for chief-of-staff style execution roles.",
  },
  {
    role: "Associate Product Manager",
    family: "Product",
    skills: ["Customer Discovery", "Product Thinking", "Specs", "Analytics"],
    evidence: ["PRDs", "Interview Logs", "Wireframes", "A/B Tests"],
    relevance: "Standard APM funnel — Razorpay, Cred, Meesho, PhonePe, Atlassian.",
  },
  {
    role: "Product Manager",
    family: "Product",
    skills: ["Roadmapping", "Discovery", "Prioritisation", "Stakeholders"],
    evidence: ["Roadmaps", "Launch Reviews", "User Research"],
    relevance: "Mid-track PM roles for students with strong build evidence.",
  },
  {
    role: "Growth Associate",
    family: "Growth",
    skills: ["Funnel Design", "Performance Marketing", "Retention Loops"],
    evidence: ["GTM Experiments", "Channel Reports"],
    relevance: "D2C, SaaS, fintech growth pods — measurable experiment volume.",
  },
  {
    role: "Growth Manager",
    family: "Growth",
    skills: ["Channel Strategy", "LTV/CAC", "Lifecycle"],
    evidence: ["Cohort Dashboards", "Growth Models"],
    relevance: "Scaled startups & growth-stage companies hiring builders, not theorists.",
  },
  {
    role: "Business Operations",
    family: "Operations",
    skills: ["Ops Cadence", "SOPs", "Vendor & Supply"],
    evidence: ["Operational Dashboards", "Process Docs"],
    relevance: "BizOps at logistics, marketplaces, fintechs.",
  },
  {
    role: "Program Manager",
    family: "Operations",
    skills: ["Stakeholder Mgmt", "Timelines", "Cross-team Delivery"],
    evidence: ["Program Plans", "Status Reports"],
    relevance: "Program/launch teams at large product orgs.",
  },
  {
    role: "Startup Analyst",
    family: "Capital",
    skills: ["Market Research", "Thesis Building", "Founder Diligence"],
    evidence: ["Sector Reports", "Founder Memos"],
    relevance: "Accelerators, syndicates, scout programs.",
  },
  {
    role: "VC Analyst",
    family: "Capital",
    skills: ["Diligence", "Modeling", "Sourcing", "Memo Writing"],
    evidence: ["Investment Memos", "Pipeline Trackers"],
    relevance: "Seed and early-stage funds prioritising builder-analysts.",
  },
  {
    role: "Investment Associate",
    family: "Capital",
    skills: ["Deal Execution", "Portfolio Support", "LP Communication"],
    evidence: ["Deal Memos", "Portfolio Reviews"],
    relevance: "Growth funds, family offices, CVCs.",
  },
  {
    role: "Strategy Associate",
    family: "Strategy",
    skills: ["Frameworks", "Market Sizing", "Competitive Mapping"],
    evidence: ["Strategy Decks", "Market Analyses"],
    relevance: "Corporate strategy & new-business units.",
  },
  {
    role: "Innovation Associate",
    family: "Strategy",
    skills: ["0→1 Thinking", "Pilots", "Internal GTM"],
    evidence: ["Pilot Reports", "Innovation Reviews"],
    relevance: "Corporate innovation labs and venture studios.",
  },
  {
    role: "Consulting",
    family: "Strategy",
    skills: ["Structured Problem Solving", "Client Mgmt", "Communication"],
    evidence: ["Case Studies", "Client Decks"],
    relevance: "Tech & strategy consulting — entrepreneurial track candidates are differentiated.",
  },
  {
    role: "Community Builder",
    family: "Ecosystem",
    skills: ["Programming", "Storytelling", "Network Mgmt"],
    evidence: ["Event Reports", "Community Metrics"],
    relevance: "Developer/founder communities, DAOs, accelerator programs.",
  },
  {
    role: "Ecosystem Manager",
    family: "Ecosystem",
    skills: ["Partnerships", "Programming", "Operator Network"],
    evidence: ["Partnership Logs", "Event ROI"],
    relevance: "Accelerators, sector bodies, large platform ecosystems.",
  },
];

export const CREDIT_COMPONENTS = [
  {
    component: "Founder Reviews",
    weight: 20,
    evidence: "Monthly venture review, validation evidence, traction logs",
    clos: ["CLO-1.1", "CLO-1.2"],
    tlos: ["TLO-1", "TLO-2", "TLO-9"],
  },
  {
    component: "Execution Reviews",
    weight: 20,
    evidence: "Sprint reports, shipping cadence, build commits",
    clos: ["CLO-2.1", "CLO-2.3"],
    tlos: ["TLO-3", "TLO-6"],
  },
  {
    component: "Market Validation",
    weight: 20,
    evidence: "Customer interviews, surveys, pilot LOIs, retention data",
    clos: ["CLO-1.2", "CLO-2.2"],
    tlos: ["TLO-2", "TLO-4"],
  },
  {
    component: "Startup Simulations",
    weight: 15,
    evidence: "Negotiation, pricing, fundraising and ops simulations",
    clos: ["CLO-3.1"],
    tlos: ["TLO-5", "TLO-7"],
  },
  {
    component: "Mentor Evaluations",
    weight: 10,
    evidence: "External mentor scoring across 5 dimensions",
    clos: ["CLO-1.3"],
    tlos: ["TLO-1", "TLO-10"],
  },
  {
    component: "Mid-Sem Review",
    weight: 5,
    evidence: "Structured review with internal + external panel",
    clos: ["CLO-2.4"],
    tlos: ["TLO-2", "TLO-3"],
  },
  {
    component: "Final Demo Day",
    weight: 10,
    evidence: "Public pitch, panel scoring, traction dossier",
    clos: ["CLO-3.2"],
    tlos: ["TLO-5", "TLO-8"],
  },
];

export const FOUNDER_RUBRIC = [
  {
    category: "Problem Understanding",
    description: "Depth of articulated pain, customer segment clarity, problem framing.",
    examples: ["Problem statement v3+", "Segmentation map", "Pain interview synthesis"],
  },
  {
    category: "Customer Discovery",
    description: "Volume + quality of conversations and resulting learnings.",
    examples: ["≥30 interview logs", "Insight matrix", "Discovery iteration trail"],
  },
  {
    category: "Validation Quality",
    description: "Strength of evidence: hypothesis → test → signal → decision.",
    examples: ["Pre-orders", "Pilot LOIs", "Waitlist conversion"],
  },
  {
    category: "MVP Progress",
    description: "Functional artefact tied to validated problem.",
    examples: ["Live MVP URL", "Demo video", "Build changelog"],
  },
  {
    category: "Execution Consistency",
    description: "Weekly shipping cadence, sprint completion rate.",
    examples: ["Sprint reports", "Commit history", "Weekly digest"],
  },
  {
    category: "Operational Discipline",
    description: "Cadence, dashboards, decision logs, financial hygiene.",
    examples: ["Operating dashboard", "Decision log", "Burn sheet"],
  },
  {
    category: "Communication",
    description: "Clarity in written + verbal updates; investor-grade narrative.",
    examples: ["Investor update", "Pitch deck v3", "Founder memo"],
  },
  {
    category: "Adaptability",
    description: "Pivot quality and speed of insight integration.",
    examples: ["Pivot memo", "Hypothesis revision log"],
  },
  {
    category: "Market Evidence",
    description: "External validation: users, revenue, retention, mentions.",
    examples: ["Active users", "Revenue", "Retention curve"],
  },
  {
    category: "Founder Maturity",
    description: "Self-awareness, team leadership, stress response.",
    examples: ["360 feedback", "Team retro notes"],
  },
];

export const RUBRIC_BANDS = [
  {
    band: "Founder Grade",
    range: "9–10",
    tone: "bg-primary/20 text-primary border-primary/40",
    description: "Investor-ready venture with validated traction and operating cadence.",
  },
  {
    band: "Operator Grade",
    range: "7–8",
    tone: "bg-chart-2/20 text-chart-2 border-chart-2/40",
    description: "Strong execution and discipline; hireable into elite startup operating roles.",
  },
  {
    band: "Builder Grade",
    range: "5–6",
    tone: "bg-chart-5/20 text-chart-5 border-chart-5/40",
    description: "Demonstrated build & validation capability; needs more market evidence.",
  },
  {
    band: "Explorer Grade",
    range: "3–4",
    tone: "bg-warning/20 text-warning border-warning/40",
    description: "Early stage exploration; partial evidence across core dimensions.",
  },
  {
    band: "Insufficient Evidence",
    range: "0–2",
    tone: "bg-destructive/20 text-destructive border-destructive/40",
    description: "Insufficient artefacts to assess — remediation required.",
  },
];

export const MENTOR_SESSIONS: {
  id: string;
  title: string;
  objective: string;
  deliverables: string[];
  clos: string[];
  tlos: string[];
  tpf: TpfFlag;
}[] = [
  {
    id: "S1",
    title: "Founder Mindset & Opportunity Recognition",
    objective: "Calibrate founder lens — opportunity scouting, framing, and risk appetite.",
    deliverables: ["Opportunity briefs ×3", "Founder reflection memo"],
    clos: ["CLO-1.1"],
    tlos: ["TLO-1", "TLO-10"],
    tpf: true,
  },
  {
    id: "S2",
    title: "Customer Discovery & Validation",
    objective: "Industry-grade discovery patterns, interview craft, signal interpretation.",
    deliverables: ["Discovery script", "Interview synthesis", "Validation grid"],
    clos: ["CLO-1.2"],
    tlos: ["TLO-2"],
    tpf: true,
  },
  {
    id: "S3",
    title: "Product Thinking & MVP Strategy",
    objective: "Spec → scope → ship loops; MVP archetypes and validation tests.",
    deliverables: ["MVP spec", "Cut-list", "Test plan"],
    clos: ["CLO-2.1"],
    tlos: ["TLO-3", "TLO-6"],
    tpf: true,
  },
  {
    id: "S4",
    title: "GTM & Growth",
    objective: "Channel-fit, distribution loops, early growth experiments.",
    deliverables: ["GTM canvas", "Channel test plan", "Loop diagram"],
    clos: ["CLO-2.3"],
    tlos: ["TLO-4"],
    tpf: true,
  },
  {
    id: "S5",
    title: "Fundraising & Venture Communication",
    objective: "Narrative arc, deck architecture, investor conversations.",
    deliverables: ["Pitch deck v3", "Investor update", "Cap table draft"],
    clos: ["CLO-3.2"],
    tlos: ["TLO-5"],
    tpf: true,
  },
  {
    id: "M1",
    title: "Mid-Sem Founder Review",
    objective: "External panel founder review with structured rubric scoring.",
    deliverables: ["Founder review scores", "Action memo"],
    clos: ["CLO-2.4"],
    tlos: ["TLO-2", "TLO-3"],
    tpf: true,
  },
  {
    id: "D1",
    title: "Demo Day Panel",
    objective: "Public showcase with investor, operator, and founder evaluators.",
    deliverables: ["Demo recording", "Panel scoring sheet", "Traction dossier"],
    clos: ["CLO-3.2"],
    tlos: ["TLO-5", "TLO-8"],
    tpf: true,
  },
];

export const RESIDENCY_MONTHS = [
  {
    month: 1,
    phase: "Problem Validation",
    deliverables: ["Problem statement v3", "≥20 customer conversations", "Validation grid"],
    credits: 2,
  },
  {
    month: 2,
    phase: "Customer Discovery",
    deliverables: ["Persona dossier", "JTBD map", "Pre-order intent / LOIs"],
    credits: 2,
  },
  {
    month: 3,
    phase: "MVP",
    deliverables: ["Live MVP", "Build changelog", "Usability findings"],
    credits: 3,
  },
  {
    month: 4,
    phase: "Pilot",
    deliverables: ["≥5 pilot users", "Pilot agreements", "Pilot retro"],
    credits: 3,
  },
  {
    month: 5,
    phase: "Traction",
    deliverables: ["Active usage metrics", "Retention curve", "Revenue (if any)"],
    credits: 3,
  },
  {
    month: 6,
    phase: "Founder Review",
    deliverables: ["Venture report", "Panel review", "Next-quarter plan"],
    credits: 3,
  },
];

export const RESIDENCY_COMPONENTS = [
  {
    name: "Monthly Founder Review",
    weight: 25,
    evidence: "Structured monthly review by internal + external panel",
  },
  { name: "Customer Validation", weight: 15, evidence: "Interview logs, LOIs, pilot agreements" },
  {
    name: "Product Progress",
    weight: 15,
    evidence: "Live MVP, build changelog, usability evidence",
  },
  { name: "Execution Consistency", weight: 15, evidence: "Sprint cadence, weekly digest" },
  {
    name: "Mentor Feedback",
    weight: 10,
    evidence: "External mentor scoring (TPF + ecosystem mentors)",
  },
  {
    name: "Operational Reporting",
    weight: 10,
    evidence: "Operating dashboard, decision log, burn sheet",
  },
  { name: "Final Venture Report", weight: 10, evidence: "End-of-residency dossier and reflection" },
];

export const READINESS_MAP = [
  {
    skill: "Customer Discovery",
    evidence: ["Interview logs", "Discovery synthesis", "JTBD map"],
    roles: ["Product Manager", "Founder's Office", "VC Analyst"],
  },
  {
    skill: "Market Research",
    evidence: ["Sector reports", "Competitive maps"],
    roles: ["Strategy Associate", "VC Analyst", "Innovation Associate"],
  },
  {
    skill: "Product Thinking",
    evidence: ["PRDs", "Spec reviews", "MVP releases"],
    roles: ["APM", "Product Manager"],
  },
  {
    skill: "Sales",
    evidence: ["Outreach logs", "Pilot LOIs", "Deal pipeline"],
    roles: ["Growth Associate", "Business Ops", "Founder"],
  },
  {
    skill: "Operations",
    evidence: ["Operating dashboard", "SOPs", "Vendor sheets"],
    roles: ["Business Operations", "Program Manager"],
  },
  {
    skill: "Communication",
    evidence: ["Investor updates", "Pitch decks", "Memos"],
    roles: ["Consulting", "Founder's Office", "Strategy"],
  },
  {
    skill: "Leadership",
    evidence: ["Team retros", "360 feedback", "Hiring memos"],
    roles: ["Founder", "Co-Founder", "Founder's Office"],
  },
  {
    skill: "Startup Finance",
    evidence: ["Cap table", "Burn sheet", "Financial model"],
    roles: ["VC Analyst", "Investment Associate"],
  },
  {
    skill: "Data Analysis",
    evidence: ["Cohort dashboards", "A/B reports"],
    roles: ["Growth Manager", "APM", "Analyst"],
  },
  {
    skill: "Stakeholder Management",
    evidence: ["Status reports", "Update cadence"],
    roles: ["Program Manager", "Founder's Office"],
  },
];

export const GOVERNANCE_METRICS = [
  { label: "Intake Size", value: "120", trend: "+18 YoY", tone: "primary" },
  { label: "Acceptance Rate", value: "14%", trend: "selectivity ↑", tone: "chart-2" },
  { label: "Attendance", value: "92%", trend: "rolling 4-wk", tone: "chart-2" },
  { label: "Founder Reviews", value: "240", trend: "this semester", tone: "primary" },
  { label: "Mentor Sessions", value: "36", trend: "TPF + ecosystem", tone: "chart-5" },
  { label: "Mid-Sem Reviews", value: "120", trend: "100% coverage", tone: "primary" },
  { label: "Demo Day", value: "2/yr", trend: "external panel", tone: "chart-2" },
  { label: "Placement Outcomes", value: "78%", trend: "non-founder track", tone: "chart-2" },
  { label: "Startup Outcomes", value: "22%", trend: "active ventures", tone: "primary" },
  { label: "VC Interactions", value: "48", trend: "/ semester", tone: "chart-5" },
  { label: "Industry Interactions", value: "60+", trend: "operator panels", tone: "chart-5" },
  { label: "Startup Survival", value: "64%", trend: "12-month", tone: "warning" },
  { label: "Student Retention", value: "96%", trend: "track completion", tone: "primary" },
];

export const PARTNER_FRAMEWORK = {
  tpfResponsibilities: [
    "Review semester structure & founder journey",
    "Suggest industry-relevant modifications",
    "Provide startup ecosystem insights",
    "Recommend emerging trends — AI startups, product, growth, venture building",
  ],
  masterclasses: {
    sem1: [
      "Founder Mindset & Opportunity Recognition",
      "Customer Discovery & Validation",
      "Product Thinking & MVP Strategy",
    ],
    sem2: ["GTM & Distribution", "Venture Communication & Fundraising"],
  },
  founderReviews: {
    role: ["External Evaluator", "Industry Perspective", "Venture Assessment"],
    scope: [
      "Problem Validation Review",
      "Customer Discovery Review",
      "MVP Review",
      "Founder Feedback",
    ],
  },
  demoDay: {
    support: [
      "Evaluation Panel",
      "Startup Feedback",
      "Founder Assessment",
      "Industry Benchmarking",
    ],
    optional: [
      "Founder Invitations",
      "Operator Invitations",
      "Investor Invitations",
      "Ecosystem Stakeholder Invitations",
    ],
  },
  ecosystem: [
    "Startup Events",
    "Founder Networking",
    "Buildathons",
    "Ideathons",
    "Startup Showcases",
    "Industry Interactions",
  ],
  mentorAreas: [
    "Product",
    "Growth",
    "GTM",
    "Fundraising",
    "Founder Psychology",
    "Venture Building",
    "Operations",
    "AI Startups",
  ],
  placementAlignment: [
    "Founder's Office",
    "Product Roles",
    "Growth Roles",
    "Startup Operations",
    "Venture Analyst Roles",
    "Innovation Roles",
  ],
  ownership: {
    nst: [
      "Course Delivery",
      "Weekly Execution",
      "Founder Tracking",
      "Startup Reviews",
      "Assessments",
      "Credit Mapping",
      "Academic Governance",
    ],
    partner: [
      "Expert Interventions",
      "Ecosystem Access",
      "Industry Reviews",
      "Founder Evaluations",
      "Demo Day Participation",
      "Mentor Introductions",
    ],
    joint: ["Program Evolution", "Founder Outcomes", "Event Strategy", "Industry Engagement"],
  },
  annualEngagement: {
    sem1: ["3 Masterclasses", "1 Mid-Sem Review", "1 Demo Day"],
    sem2: ["2 Masterclasses", "1 Mid-Sem Review", "1 Demo Day"],
    optional: ["Ideathon", "Buildathon", "Founder Summit", "Investor Interaction"],
  },
};
