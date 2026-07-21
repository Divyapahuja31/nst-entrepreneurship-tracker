// Full NST Entrepreneurship Track syllabus — structured for the explorer page.
// Source: nst_syllabus_full.odt (Master Curriculum, Parts 1–4).

export type Semester = "S1" | "S2" | "S3" | "S4";

export const PARTS = [
  { id: "P1", title: "Track Philosophy, Vision & Academic Positioning" },
  { id: "P2", title: "Track-Level Outcomes (TLOs) & Competency Map" },
  { id: "P3", title: "Semester Architecture & Evaluation" },
  { id: "P4", title: "Week-by-Week Curriculum (Semester 1)" },
  { id: "P5", title: "Labs, Faculty & Industry Integration" },
  { id: "P6", title: "Failure Framework & BOS/AIAP Compliance" },
] as const;

export type PartId = (typeof PARTS)[number]["id"];

// ---------- PART 1: PHILOSOPHY ----------
export const PHILOSOPHY = {
  trackName: "Entrepreneurship Track — Founder Development & Venture Building",
  category: [
    "Multidisciplinary Minor",
    "Applied Venture Building Track",
    "Experiential Learning Track",
    "Startup Execution Program",
    "Industry Integrated Practical Track",
  ],
  duration: "4 Semesters · Progressive Founder Development Model",
  credits: [
    { component: "Lectures", credits: "2" },
    { component: "Labs / Venture Studio", credits: "2" },
    { component: "Founder Reviews / Industry Sessions", credits: "0.5" },
    { component: "Execution & Portfolio Work", credits: "0.5" },
    { component: "Total", credits: "5 Credits" },
  ],
  deliveryModel: "Hybrid Venture Studio Model — classroom + venture studio + founder mentoring + industry interactions + product building + customer validation + real-world experimentation.",
  corePhilosophy: [
    "Execution > Memorization — reward building, testing, validating, iterating.",
    "Failure is acceptable; repeated non-learning is not.",
    "Founder evaluation > traditional exam dominance.",
    "Practical learning must remain academically defensible.",
  ],
  designPrinciples: [
    "70% Real Execution · 20% Mentoring & Collaboration · 10% Theory",
    "Layered Founder Development Model: Knowledge → Execution → Founder Layer",
    "Selective entry philosophy (future): commitment, consistency, execution willingness",
    "Hybrid industry-academic integration with NST-owned curriculum",
  ],
  successMetrics: {
    academic: ["Course completion", "CLO achievement", "Evaluation distribution", "Participation", "Rubric consistency"],
    venture: ["MVP launches", "Active products", "User interviews", "Customer validation", "Iterations", "GTM execution", "Revenue attempts"],
    founder: ["Consistency", "Leadership", "Execution quality", "Recovery after failure", "Adaptability", "Ownership"],
    ecosystem: ["Startup internships", "Founder continuation", "Venture competitions", "Incubation", "Investor readiness", "Startup placements"],
  },
};

// ---------- PART 2: TLOs ----------
export const TLOS_FULL = [
  {
    id: "TLO-1",
    title: "Opportunity Identification & Problem Discovery",
    description: "Identify meaningful problems, distinguish painkillers vs vitamins, understand market gaps, validate whether a problem is worth solving.",
    demonstration: ["Customer interviews", "Field observations", "Problem statements", "Behavioral insights", "Evidence-backed validation"],
  },
  {
    id: "TLO-2",
    title: "Customer Discovery & Validation",
    description: "Identify ICPs, conduct structured user interviews, analyze customer behavior, validate assumptions, interpret qualitative & quantitative feedback.",
    demonstration: ["Conduct interviews", "Collect responses", "Analyze patterns", "Refine assumptions", "Generate validation reports"],
  },
  {
    id: "TLO-3",
    title: "MVP Design & Product Thinking",
    description: "Define MVP scope, avoid overbuilding, prioritize features, design solution hypotheses, map user flows.",
    demonstration: ["Build MVPs", "Define feature priorities", "Create workflows", "Show execution reasoning"],
  },
  {
    id: "TLO-4",
    title: "Execution & Iterative Building",
    description: "Execute under uncertainty, iterate rapidly, respond to user feedback, improve products systematically.",
    demonstration: ["Maintain iteration logs", "Document product changes", "Explain why changes were made", "Demonstrate learning loops"],
  },
  {
    id: "TLO-5",
    title: "Go-To-Market Understanding",
    description: "Understand GTM fundamentals, identify distribution channels, understand positioning, test acquisition, develop launch strategies.",
    demonstration: ["Attempt distribution", "Run outreach", "Conduct experiments", "Measure traction indicators"],
  },
  {
    id: "TLO-6",
    title: "Startup Economics & Business Thinking",
    description: "Understand pricing, CAC/LTV, retention, monetization logic, sustainability.",
    demonstration: ["Define pricing rationale", "Estimate viability", "Explain unit economics", "Justify monetization"],
  },
  {
    id: "TLO-7",
    title: "Founder Communication & Pitching",
    description: "Communicate ideas clearly, pitch products, explain traction, defend assumptions, answer critical questions.",
    demonstration: ["Presentations", "Reviews", "Defend decisions", "Explain execution logic"],
  },
  {
    id: "TLO-8",
    title: "Analytical & Decision-Making Ability",
    description: "Interpret data, distinguish vanity vs signal, identify execution bottlenecks, make evidence-backed decisions.",
    demonstration: ["Interpret metrics", "Analyze user behavior", "Explain pivots", "Justify strategic choices"],
  },
  {
    id: "TLO-9",
    title: "Team Collaboration & Founder Responsibility",
    description: "Work in venture teams, manage accountability, distribute ownership, resolve conflicts, contribute meaningfully.",
    demonstration: ["Show contribution evidence", "Execution logs", "Demonstrate accountability", "Participate consistently"],
  },
  {
    id: "TLO-10",
    title: "Failure Recovery & Adaptive Learning",
    description: "Recover from failed assumptions, pivot intelligently, identify repeated mistakes, adapt strategies after setbacks.",
    demonstration: ["Explain failed experiments", "Recovery attempts", "Pattern correction", "Lessons learned"],
  },
] as const;

export const COMPETENCY_CLUSTERS = [
  { id: "A", name: "Founder Thinking", items: ["Initiative", "Ownership", "Ambiguity handling", "Resilience", "Accountability"] },
  { id: "B", name: "Product & Customer Thinking", items: ["User understanding", "Product framing", "Validation", "Experimentation", "Iteration"] },
  { id: "C", name: "Venture Execution", items: ["MVP building", "Launch execution", "GTM testing", "Traction building", "Operations"] },
  { id: "D", name: "Analytical Decision-Making", items: ["Metrics interpretation", "Problem solving", "Strategic analysis", "Prioritization"] },
  { id: "E", name: "Communication & Leadership", items: ["Pitching", "Storytelling", "Founder communication", "Collaboration", "Stakeholder interaction"] },
];

// ---------- PART 3: SEMESTERS ----------
export interface CourseModule {
  id: string;
  title: string;
  topics: string[];
}

export interface SemesterLab {
  id: string;
  title: string;
  description: string;
}

export interface SemesterData {
  key: Semester;
  title: string;
  theme: string;
  objective: string;
  outcomes: string[];
  competencies: { name: string; focus: string }[];
  modules: CourseModule[];
  labs: SemesterLab[];
  evaluation: { component: string; weight: string }[];
  successMetrics: string[];
  failureConditions: string[];
  tloMap: string[]; // TLO ids primarily addressed
  faculty: string[];
  industry: string[];
}

export const SEMESTERS: SemesterData[] = [
  {
    key: "S1",
    title: "Founder Discovery & Problem Understanding",
    theme: "Founder Mindset + Problem Discovery",
    objective: "Shift students from passive academic thinking toward active problem-oriented thinking. Identify meaningful problems, understand users, conduct customer conversations, frame startup opportunities.",
    outcomes: [
      "Identify real-world pain points",
      "Conduct customer interviews",
      "Differentiate ideas from problems",
      "Define ICPs",
      "Understand startup fundamentals",
      "Build structured problem statements",
      "Conduct market observation",
      "Understand startup ecosystems",
    ],
    competencies: [
      { name: "Founder Thinking", focus: "Ownership, curiosity, initiative" },
      { name: "Problem Discovery", focus: "Pain-point identification" },
      { name: "User Understanding", focus: "ICP and behavioral observation" },
      { name: "Communication", focus: "Interviews and articulation" },
      { name: "Research", focus: "Basic market analysis" },
    ],
    modules: [
      { id: "M1", title: "Introduction to Entrepreneurship", topics: ["What is entrepreneurship?", "Startup vs business vs freelancing", "Venture lifecycle", "Why startups fail", "Startup ecosystems", "Founder psychology"] },
      { id: "M2", title: "Problem Discovery", topics: ["Identifying meaningful problems", "Surface vs root problem", "Behavioral observation", "Friction mapping", "Customer pain analysis", "Problem worth solving"] },
      { id: "M3", title: "Customer Discovery", topics: ["ICP identification", "Customer personas", "Conducting interviews", "Open-ended questioning", "Observational research", "Qualitative feedback"] },
      { id: "M4", title: "Market Understanding", topics: ["TAM/SAM/SOM basics", "Existing alternatives", "Competition mapping", "Behavioral segmentation", "Consumer psychology"] },
      { id: "M5", title: "Startup Ideation", topics: ["Idea generation systems", "Problem-first startups", "Founder-market fit", "Opportunity selection", "Hypothesis framing"] },
      { id: "M6", title: "Communication & Pitching Basics", topics: ["Explaining ideas clearly", "Narrative building", "Founder communication", "Early pitching", "Feedback handling"] },
    ],
    labs: [
      { id: "L1", title: "Problem Observation Exercise", description: "Document frustrations, inefficiencies, repetitive pain points." },
      { id: "L2", title: "Customer Interview Sprint", description: "Conduct 15–25 customer interviews in the field." },
      { id: "L3", title: "ICP Mapping", description: "Define target audience, behavior, demographics, psychographics." },
      { id: "L4", title: "Problem Validation Report", description: "Submit validation evidence, interview synthesis, opportunity analysis." },
      { id: "L5", title: "Founder Reflection Journal", description: "Maintain execution logs, learning logs, founder reflections." },
    ],
    evaluation: [
      { component: "Founder Participation & Execution", weight: "20%" },
      { component: "Customer Discovery & Interviews", weight: "20%" },
      { component: "Problem Validation Report", weight: "20%" },
      { component: "Research & Market Analysis", weight: "15%" },
      { component: "Pitching & Communication", weight: "10%" },
      { component: "Reflection & Iteration Logs", weight: "10%" },
      { component: "Viva / Review", weight: "5%" },
    ],
    successMetrics: ["Complete interviews", "Identify validated problems", "Show customer understanding", "Demonstrate structured thinking"],
    failureConditions: ["Fake interviews", "No fieldwork", "No iteration", "Passive participation", "Validation lacks evidence"],
    tloMap: ["TLO-1", "TLO-2", "TLO-7", "TLO-9"],
    faculty: ["Track Lead — Founder pedagogy", "Lecturer — Entrepreneurship fundamentals", "Lab Mentor — Field interview supervision", "Industry Mentor — Founder stories"],
    industry: ["Startup founders", "Operators", "PMs", "Startup engineers", "Venture builders"],
  },
  {
    key: "S2",
    title: "Validation & MVP Building",
    theme: "Validation + MVP Design",
    objective: "Convert validated problems into usable solutions. Learn MVP thinking, experimentation, prototyping, iteration, and early execution systems.",
    outcomes: [
      "Define MVP scope",
      "Prioritize features",
      "Build prototypes",
      "Test assumptions",
      "Gather user feedback",
      "Iterate based on evidence",
    ],
    competencies: [
      { name: "Product Thinking", focus: "MVP definition" },
      { name: "Validation", focus: "Assumption testing" },
      { name: "Execution", focus: "Prototype building" },
      { name: "Iteration", focus: "Feedback-driven improvement" },
      { name: "Decision-Making", focus: "Prioritization" },
    ],
    modules: [
      { id: "M1", title: "MVP Philosophy", topics: ["MVP vs full product", "Overbuilding mistakes", "Lean startup basics", "Speed vs perfection"] },
      { id: "M2", title: "Product Design Basics", topics: ["User flows", "Product journeys", "Feature prioritization", "Wireframing", "UX fundamentals"] },
      { id: "M3", title: "Validation Systems", topics: ["Hypothesis testing", "Fake door tests", "Landing page validation", "Surveys", "Waitlists"] },
      { id: "M4", title: "Prototype Building", topics: ["No-code tools", "Rapid prototyping", "Functional demos", "Workflow testing"] },
      { id: "M5", title: "User Feedback & Iteration", topics: ["Feedback interpretation", "Signal vs noise", "Iteration systems", "Feature refinement"] },
      { id: "M6", title: "Team Dynamics & Execution", topics: ["Startup team structures", "Founder conflict", "Accountability systems", "Execution planning"] },
    ],
    labs: [
      { id: "L1", title: "MVP Scope Definition", description: "Define must-have features, excluded features, launch constraints." },
      { id: "L2", title: "Prototype Sprint", description: "Build clickable MVP, functional prototype, demo workflow." },
      { id: "L3", title: "Validation Experiment", description: "Conduct user tests, onboarding attempts, usability reviews." },
      { id: "L4", title: "Iteration Sprint", description: "Modify product, document changes, explain reasoning." },
      { id: "L5", title: "MVP Review Day", description: "Present MVP, assumptions, validation evidence, next steps." },
    ],
    evaluation: [
      { component: "MVP Execution", weight: "25%" },
      { component: "Validation Experiments", weight: "20%" },
      { component: "Product Iteration", weight: "20%" },
      { component: "Founder Review", weight: "15%" },
      { component: "Product Presentation", weight: "10%" },
      { component: "Documentation", weight: "5%" },
      { component: "Viva", weight: "5%" },
    ],
    successMetrics: ["Launch MVPs", "Validate assumptions", "Demonstrate iteration", "Gather real user feedback"],
    failureConditions: ["MVP non-functional", "No user testing", "No iteration", "Assumptions unsupported"],
    tloMap: ["TLO-3", "TLO-4", "TLO-8", "TLO-9"],
    faculty: ["Product Mentor", "MVP Lab Coach", "UX Reviewer", "Industry PM Mentor"],
    industry: ["Product managers", "Designers", "No-code builders", "Early-stage founders"],
  },
  {
    key: "S3",
    title: "Product Launch, GTM & Traction",
    theme: "Product Launch + GTM",
    objective: "Transition from building to distribution and market testing. Focus on launching, onboarding, acquisition, analytics, traction, retention.",
    outcomes: [
      "Launch products publicly",
      "Attempt acquisition",
      "Test GTM",
      "Analyze metrics",
      "Improve onboarding",
      "Iterate distribution systems",
    ],
    competencies: [
      { name: "GTM Strategy", focus: "Channel selection" },
      { name: "Acquisition", focus: "Funnels & conversion" },
      { name: "Analytics", focus: "Signal vs vanity" },
      { name: "Monetization", focus: "Pricing experiments" },
      { name: "Operations", focus: "Founder cadence" },
    ],
    modules: [
      { id: "M1", title: "Go-To-Market Strategy", topics: ["GTM frameworks", "Distribution channels", "B2B vs B2C", "Early-stage positioning"] },
      { id: "M2", title: "Content & Distribution", topics: ["Community building", "SEO basics", "Social distribution", "Startup storytelling"] },
      { id: "M3", title: "User Acquisition", topics: ["Acquisition funnels", "Conversion systems", "Referral loops", "Onboarding systems"] },
      { id: "M4", title: "Startup Analytics", topics: ["Vanity vs signal", "Retention", "Engagement", "Funnel analysis"] },
      { id: "M5", title: "Pricing & Monetization", topics: ["Pricing psychology", "Pricing experiments", "Subscription models", "Freemium logic"] },
      { id: "M6", title: "Founder Operations", topics: ["Weekly planning", "Execution systems", "Sprint structures", "Prioritization"] },
    ],
    labs: [
      { id: "L1", title: "Product Launch Sprint", description: "Public launch with onboarding flow and feedback collection." },
      { id: "L2", title: "GTM Experimentation", description: "Run multiple channel experiments and document CAC signals." },
      { id: "L3", title: "Analytics Tracking", description: "Instrument funnel, define north-star metric, weekly review." },
      { id: "L4", title: "Funnel Optimization", description: "Identify drop-offs, test fixes, measure lift." },
      { id: "L5", title: "User Retention Review", description: "Cohort retention analysis and re-engagement experiments." },
      { id: "L6", title: "Founder Demo Day", description: "Public demo with traction story and live Q&A." },
    ],
    evaluation: [
      { component: "Product Launch", weight: "20%" },
      { component: "GTM Execution", weight: "20%" },
      { component: "Analytics & Learning", weight: "20%" },
      { component: "Iteration Quality", weight: "15%" },
      { component: "Founder Reviews", weight: "10%" },
      { component: "Presentation", weight: "10%" },
      { component: "Documentation", weight: "5%" },
    ],
    successMetrics: ["Public launch", "Acquisition signal", "Retention data", "Distribution learning loops"],
    failureConditions: ["No launch attempt", "Vanity-only metrics", "No funnel data", "No retention analysis"],
    tloMap: ["TLO-5", "TLO-6", "TLO-8"],
    faculty: ["Growth Mentor", "Analytics Coach", "GTM Lecturer", "Industry Operator"],
    industry: ["Growth leads", "Marketers", "Community builders", "Sales operators"],
  },
  {
    key: "S4",
    title: "Scale, Systems & Venture Operations",
    theme: "Scale, Systems, Fundraising & Venture Operations",
    objective: "Learn operationalization, startup systems, pricing, startup finance, scaling logic, investor communication.",
    outcomes: [
      "Understand venture systems",
      "Structure operations",
      "Understand startup economics",
      "Communicate ventures professionally",
    ],
    competencies: [
      { name: "Systems Thinking", focus: "SOPs & internal ops" },
      { name: "Finance", focus: "Unit economics" },
      { name: "Fundraising", focus: "Investor communication" },
      { name: "Leadership", focus: "Founder psychology" },
      { name: "Scaling", focus: "Hiring & delegation" },
    ],
    modules: [
      { id: "M1", title: "Startup Systems", topics: ["SOPs", "Startup operations", "Internal systems", "Scaling constraints"] },
      { id: "M2", title: "Finance & Unit Economics", topics: ["CAC", "LTV", "Burn", "Revenue models", "Runway"] },
      { id: "M3", title: "Fundraising Basics", topics: ["Pitch decks", "Investor communication", "Venture expectations", "Due diligence basics"] },
      { id: "M4", title: "Leadership & Founder Psychology", topics: ["Founder burnout", "Decision-making", "Leadership", "Team culture"] },
      { id: "M5", title: "Scale & Expansion", topics: ["Scaling operations", "Hiring", "Delegation", "Product expansion"] },
    ],
    labs: [
      { id: "L1", title: "Venture Audit", description: "Full audit of venture systems, ops, and metrics." },
      { id: "L2", title: "Founder Pitch Day", description: "Investor-style pitch and Q&A." },
      { id: "L3", title: "Startup Systems Review", description: "Document SOPs and operational gaps." },
      { id: "L4", title: "Pricing Simulation", description: "Test pricing variants on live or simulated customers." },
      { id: "L5", title: "Investor Simulation", description: "Mock diligence with investor mentors." },
      { id: "L6", title: "Final Venture Defense", description: "Defend venture trajectory, decisions, learnings." },
    ],
    evaluation: [
      { component: "Venture Maturity", weight: "20%" },
      { component: "Operational Thinking", weight: "20%" },
      { component: "Startup Economics", weight: "15%" },
      { component: "Investor Communication", weight: "15%" },
      { component: "Founder Reviews", weight: "15%" },
      { component: "Final Defense", weight: "10%" },
      { component: "Documentation", weight: "5%" },
    ],
    successMetrics: ["Operational maturity", "Defensible economics", "Investor-ready narrative", "Final venture defense"],
    failureConditions: ["No systems", "Unjustified economics", "No fundraising readiness", "Defense fails"],
    tloMap: ["TLO-4", "TLO-6", "TLO-7", "TLO-10"],
    faculty: ["Venture Operator", "Finance Mentor", "Investor Mentor", "Leadership Coach"],
    industry: ["VCs", "Angels", "CFOs", "Scaling founders"],
  },
];

// ---------- PART 4: WEEK-BY-WEEK (Semester 1, fully expanded; S2–S4 outlined) ----------
export interface WeekEntry {
  week: number;
  semester: Semester;
  title: string;
  sessions: { id: string; bullets: string[] }[];
  labs: { id: string; bullets: string[] }[];
  deliverables: string[];
  evaluationFocus: { metric: string; focus: string }[];
}

export const WEEKS: WeekEntry[] = [
  {
    week: 1, semester: "S1", title: "Introduction to Entrepreneurship",
    sessions: [
      { id: "Session 1", bullets: ["What is entrepreneurship?", "Startup vs business vs freelancing", "Why startups fail", "Reality of startup ecosystems", "Myths around entrepreneurship"] },
      { id: "Session 2", bullets: ["Founder psychology", "Uncertainty and ambiguity", "Why execution matters more than ideas", "Risk and experimentation"] },
    ],
    labs: [
      { id: "Lab 1", bullets: ["Founder self-assessment: interests, strengths, risk appetite, curiosity mapping"] },
      { id: "Lab 2", bullets: ["Startup ecosystem exploration: Indian startups, failed startups, unicorns, bootstrapped"] },
    ],
    deliverables: ["Reflection document: \"Why do I want to build something?\""],
    evaluationFocus: [
      { metric: "Participation", focus: "Engagement" },
      { metric: "Reflection", focus: "Clarity of thought" },
      { metric: "Research", focus: "Depth of exploration" },
    ],
  },
  {
    week: 2, semester: "S1", title: "Problem Discovery",
    sessions: [
      { id: "Session 1", bullets: ["Problem-first thinking", "Painkillers vs vitamins", "Real vs imaginary problems", "Human behavior and friction"] },
      { id: "Session 2", bullets: ["Everyday inefficiencies", "Observational entrepreneurship", "Behavioral problem mapping", "Local problem ecosystems"] },
    ],
    labs: [
      { id: "Lab 1", bullets: ["Identify 25 frustrations in daily life"] },
      { id: "Lab 2", bullets: ["Problem observation exercise: document inefficiencies, delays, repetitive pain points"] },
    ],
    deliverables: ["Problem Observation Sheet", "Friction Journal"],
    evaluationFocus: [
      { metric: "Observation quality", focus: "Specificity" },
      { metric: "Problem depth", focus: "Real-world relevance" },
    ],
  },
  {
    week: 3, semester: "S1", title: "Customer Discovery",
    sessions: [
      { id: "Session 1", bullets: ["What is customer discovery?", "ICP fundamentals", "User personas", "Assumptions vs reality"] },
      { id: "Session 2", bullets: ["Interview techniques", "Open-ended questioning", "Avoiding biased interviews", "Extracting behavioral insights"] },
    ],
    labs: [
      { id: "Lab 1", bullets: ["Create ICP maps and user personas"] },
      { id: "Lab 2", bullets: ["Mock customer interview simulations"] },
    ],
    deliverables: ["ICP Sheet", "Interview Questionnaire"],
    evaluationFocus: [
      { metric: "ICP clarity", focus: "Specificity of target" },
      { metric: "Interview craft", focus: "Bias avoidance" },
    ],
  },
  {
    week: 4, semester: "S1", title: "Field Interviews",
    sessions: [
      { id: "Session 1", bullets: ["Customer empathy", "Listening vs pitching", "Identifying emotional pain points"] },
      { id: "Session 2", bullets: ["Organizing interview data", "Identifying patterns", "Qualitative synthesis"] },
    ],
    labs: [
      { id: "Lab 1", bullets: ["Conduct 10–15 real interviews in the field"] },
      { id: "Lab 2", bullets: ["Interview synthesis workshop"] },
    ],
    deliverables: ["Interview Notes", "Pattern Analysis Document"],
    evaluationFocus: [
      { metric: "Real interviews", focus: "Authenticity" },
      { metric: "Analysis", focus: "Insight extraction" },
    ],
  },
  {
    week: 5, semester: "S1", title: "Market Understanding",
    sessions: [
      { id: "Session 1", bullets: ["Market sizing basics", "TAM/SAM/SOM", "Existing alternatives"] },
      { id: "Session 2", bullets: ["Competitive analysis", "Why competitors matter", "Behavioral segmentation"] },
    ],
    labs: [
      { id: "Lab 1", bullets: ["Identify direct and indirect competitors"] },
      { id: "Lab 2", bullets: ["Competitive matrix and segmentation map"] },
    ],
    deliverables: ["Market Sizing Note", "Competitive Matrix"],
    evaluationFocus: [
      { metric: "Sizing rigor", focus: "Reasoned estimates" },
      { metric: "Competitive insight", focus: "Differentiation" },
    ],
  },
  // S1 weeks 6–16 condensed (themes preserved)
  { week: 6, semester: "S1", title: "Startup Ideation Systems",
    sessions: [{ id: "Session 1", bullets: ["Idea generation systems", "Problem-first startups", "Founder-market fit"] }, { id: "Session 2", bullets: ["Opportunity selection", "Hypothesis framing", "Decision filters"] }],
    labs: [{ id: "Lab 1", bullets: ["Generate 50 ideas → shortlist 5"] }, { id: "Lab 2", bullets: ["Hypothesis canvas per idea"] }],
    deliverables: ["Idea Shortlist", "Hypothesis Canvas"], evaluationFocus: [{ metric: "Originality", focus: "Non-obvious framing" }] },
  { week: 7, semester: "S1", title: "Opportunity Selection",
    sessions: [{ id: "Session 1", bullets: ["Selection criteria", "Effort vs impact", "Founder-market fit deep dive"] }, { id: "Session 2", bullets: ["Sequencing experiments", "Killing weak ideas"] }],
    labs: [{ id: "Lab 1", bullets: ["Score shortlisted ideas"] }, { id: "Lab 2", bullets: ["Pick primary venture direction"] }],
    deliverables: ["Selection Memo"], evaluationFocus: [{ metric: "Reasoning", focus: "Evidence-based" }] },
  { week: 8, semester: "S1", title: "Behavioral Insight Synthesis",
    sessions: [{ id: "Session 1", bullets: ["Behavioral patterns", "JTBD basics"] }, { id: "Session 2", bullets: ["Workflow mapping", "Jobs vs tasks"] }],
    labs: [{ id: "Lab 1", bullets: ["JTBD interviews"] }, { id: "Lab 2", bullets: ["Workflow diagrams"] }],
    deliverables: ["JTBD Document"], evaluationFocus: [{ metric: "Synthesis", focus: "Pattern depth" }] },
  { week: 9, semester: "S1", title: "Problem Validation Sprint",
    sessions: [{ id: "Session 1", bullets: ["Validation frameworks", "Disconfirming evidence"] }, { id: "Session 2", bullets: ["Validation reports", "Storytelling with evidence"] }],
    labs: [{ id: "Lab 1", bullets: ["Run validation experiments"] }, { id: "Lab 2", bullets: ["Synthesize findings"] }],
    deliverables: ["Problem Validation Report"], evaluationFocus: [{ metric: "Evidence", focus: "Authenticity" }] },
  { week: 10, semester: "S1", title: "Founder Communication",
    sessions: [{ id: "Session 1", bullets: ["Narrative building", "Audience empathy"] }, { id: "Session 2", bullets: ["Slide structure", "Verbal clarity"] }],
    labs: [{ id: "Lab 1", bullets: ["3-min idea pitch drills"] }, { id: "Lab 2", bullets: ["Peer critique"] }],
    deliverables: ["Pitch Draft"], evaluationFocus: [{ metric: "Clarity", focus: "Audience adaptation" }] },
  { week: 11, semester: "S1", title: "Pitching Basics",
    sessions: [{ id: "Session 1", bullets: ["Pitch anatomy", "Problem-solution arc"] }, { id: "Session 2", bullets: ["Handling Q&A", "Defending assumptions"] }],
    labs: [{ id: "Lab 1", bullets: ["Mock pitch w/ mentors"] }, { id: "Lab 2", bullets: ["Iterate pitch"] }],
    deliverables: ["Pitch v2"], evaluationFocus: [{ metric: "Pitch quality", focus: "Structure & defense" }] },
  { week: 12, semester: "S1", title: "Founder Reflection & Iteration",
    sessions: [{ id: "Session 1", bullets: ["Reflection systems", "Learning loops"] }, { id: "Session 2", bullets: ["Founder journaling"] }],
    labs: [{ id: "Lab 1", bullets: ["Weekly reflection ritual"] }, { id: "Lab 2", bullets: ["Founder review with mentor"] }],
    deliverables: ["Reflection Log"], evaluationFocus: [{ metric: "Self-awareness", focus: "Honest assessment" }] },
  { week: 13, semester: "S1", title: "Industry Founder Sessions",
    sessions: [{ id: "Session 1", bullets: ["Founder case studies"] }, { id: "Session 2", bullets: ["Failure post-mortems"] }],
    labs: [{ id: "Lab 1", bullets: ["Live founder Q&A"] }, { id: "Lab 2", bullets: ["Write case-study notes"] }],
    deliverables: ["Case Study Notes"], evaluationFocus: [{ metric: "Insight extraction", focus: "Application" }] },
  { week: 14, semester: "S1", title: "Mid-Semester Founder Review",
    sessions: [{ id: "Session 1", bullets: ["Review prep", "Evidence packaging"] }, { id: "Session 2", bullets: ["Review feedback handling"] }],
    labs: [{ id: "Lab 1", bullets: ["Full venture review"] }, { id: "Lab 2", bullets: ["Action plan"] }],
    deliverables: ["Review Deck"], evaluationFocus: [{ metric: "Progress", focus: "Tangible execution" }] },
  { week: 15, semester: "S1", title: "Final Validation Defense",
    sessions: [{ id: "Session 1", bullets: ["Defense structure"] }, { id: "Session 2", bullets: ["Critical Q&A drills"] }],
    labs: [{ id: "Lab 1", bullets: ["Mock defense"] }, { id: "Lab 2", bullets: ["Final defense"] }],
    deliverables: ["Validation Defense Document"], evaluationFocus: [{ metric: "Defense quality", focus: "Evidence + clarity" }] },
  { week: 16, semester: "S1", title: "Semester Synthesis & Portfolio",
    sessions: [{ id: "Session 1", bullets: ["Portfolio structure"] }, { id: "Session 2", bullets: ["Next-semester planning"] }],
    labs: [{ id: "Lab 1", bullets: ["Compile founder portfolio"] }, { id: "Lab 2", bullets: ["Plan S2 venture trajectory"] }],
    deliverables: ["Founder Portfolio v1"], evaluationFocus: [{ metric: "Portfolio", focus: "Completeness" }] },

  // ---- Semester 2 (16 weeks) ----
  ...quickWeeks("S2", [
    ["MVP Philosophy", "MVP vs full product, lean basics", "Define MVP scope for venture", "MVP Scope Doc"],
    ["Feature Prioritization", "Must-have vs nice-to-have", "Build feature priority matrix", "Priority Matrix"],
    ["Product Design Basics", "User flows & wireframes", "Wireframe MVP screens", "Wireframe Pack"],
    ["UX Fundamentals", "User journeys & friction", "Journey map + friction log", "Journey Map"],
    ["Validation Systems", "Hypothesis tests, fake doors", "Run landing-page test", "Validation Plan"],
    ["Prototype Sprint A", "No-code rapid build", "Build clickable prototype", "Prototype v1"],
    ["Prototype Sprint B", "Functional demos", "Wire backend or fake-it logic", "Prototype v2"],
    ["User Testing", "Usability sessions", "Run 5+ usability tests", "Usability Report"],
    ["Feedback Synthesis", "Signal vs noise", "Cluster feedback themes", "Insight Doc"],
    ["Iteration Sprint A", "Targeted improvements", "Ship product changes", "Changelog v1"],
    ["Iteration Sprint B", "Refinement & polish", "Ship product changes", "Changelog v2"],
    ["Team Dynamics", "Accountability systems", "Define team operating model", "Team Charter"],
    ["Founder Review (Mid)", "Evidence packaging", "Mid-semester founder review", "Review Deck"],
    ["MVP Review Day", "Public demo prep", "Demo MVP to mentors", "Demo Recording"],
    ["Validation Defense", "Defend MVP decisions", "Mock & live defense", "Defense Doc"],
    ["S2 Portfolio", "Compile MVP artifacts", "Update founder portfolio", "Portfolio v2"],
  ]),

  // ---- Semester 3 (16 weeks) ----
  ...quickWeeks("S3", [
    ["GTM Frameworks", "B2B vs B2C, ICP-channel fit", "Draft GTM hypothesis", "GTM Brief"],
    ["Distribution Channels", "Channel inventory & cost", "Shortlist 3 channels", "Channel Map"],
    ["Positioning", "Messaging & narrative", "Write positioning statement", "Positioning Doc"],
    ["Launch Prep", "Onboarding & assets", "Build launch checklist", "Launch Plan"],
    ["Product Launch", "Go-live execution", "Public launch sprint", "Launch Report"],
    ["Content & Community", "Community-led growth", "Run content experiment", "Content Log"],
    ["User Acquisition", "Funnels & conversion", "Instrument top of funnel", "Funnel Doc"],
    ["Onboarding Systems", "Activation loops", "Improve activation rate", "Onboarding v2"],
    ["Analytics Setup", "Tracking & north star", "Implement analytics stack", "Metrics Sheet"],
    ["Signal vs Vanity", "Cohorts & retention", "Build cohort report", "Cohort Analysis"],
    ["Funnel Optimization", "Conversion experiments", "Run A/B experiment", "Experiment Log"],
    ["Pricing Experiments", "Pricing psychology", "Test pricing variants", "Pricing Memo"],
    ["Retention Review", "Engagement levers", "Re-engagement campaign", "Retention Report"],
    ["Founder Operations", "Sprint cadence", "Weekly ops review", "Ops Log"],
    ["Founder Demo Day", "Traction storytelling", "Public demo + Q&A", "Demo Deck"],
    ["S3 Portfolio", "GTM artifacts", "Compile traction evidence", "Portfolio v3"],
  ]),

  // ---- Semester 4 (16 weeks) ----
  ...quickWeeks("S4", [
    ["Startup Systems", "SOPs & internal ops", "Document SOP v1", "SOP Doc"],
    ["Operational Scaling", "Scaling constraints", "Map operational bottlenecks", "Ops Audit"],
    ["Unit Economics", "CAC, LTV, payback", "Build UE model", "UE Sheet"],
    ["Burn & Runway", "Cash discipline", "Build runway model", "Runway Sheet"],
    ["Revenue Models", "Pricing & monetization", "Define monetization plan", "Revenue Memo"],
    ["Fundraising Basics", "Investor landscape", "Investor list & narrative", "Investor List"],
    ["Pitch Deck Craft", "Story + structure", "Build pitch deck v1", "Deck v1"],
    ["Investor Comms", "Updates & cadence", "Draft investor update", "Update Draft"],
    ["Due Diligence", "Data room basics", "Assemble data room", "Data Room"],
    ["Leadership", "Founder decision-making", "Run leadership workshop", "Leadership Log"],
    ["Founder Psychology", "Burnout & resilience", "Personal operating system", "POS Doc"],
    ["Team Culture", "Hiring & delegation", "Define hiring plan", "Hiring Plan"],
    ["Scale & Expansion", "Product expansion logic", "Draft expansion plan", "Expansion Memo"],
    ["Investor Simulation", "Mock diligence", "Investor mock panel", "Sim Report"],
    ["Final Venture Defense", "Public defense", "Defend venture trajectory", "Defense Pack"],
    ["S4 Portfolio & Exit", "Closeout artifacts", "Final founder portfolio", "Portfolio v4"],
  ]),
];

function quickWeeks(sem: Semester, rows: [string, string, string, string][]): WeekEntry[] {
  return rows.map(([title, session, lab, deliv], i) => ({
    week: i + 1,
    semester: sem,
    title,
    sessions: [{ id: "Session 1", bullets: [session] }],
    labs: [{ id: "Lab 1", bullets: [lab] }],
    deliverables: [deliv],
    evaluationFocus: [{ metric: "Execution", focus: "Weekly artifact shipped" }],
  }));
}

// ---------- PART 5: RUBRICS ----------
export const RUBRICS = [
  {
    name: "Customer Discovery Rubric",
    criteria: [
      { level: "Exemplary (9–10)", desc: "20+ authentic interviews, deep pattern synthesis, disconfirming evidence collected." },
      { level: "Proficient (7–8)", desc: "10–20 interviews, clear synthesis, mostly unbiased questioning." },
      { level: "Developing (5–6)", desc: "<10 interviews, partial synthesis, leading questions present." },
      { level: "Insufficient (0–4)", desc: "Few/no interviews, no synthesis, fabricated or surface-level data." },
    ],
  },
  {
    name: "MVP Execution Rubric",
    criteria: [
      { level: "Exemplary (9–10)", desc: "Functional MVP, real users, documented iteration loop, clear hypothesis testing." },
      { level: "Proficient (7–8)", desc: "Working MVP with some user testing and one iteration cycle." },
      { level: "Developing (5–6)", desc: "Prototype exists but no real user testing or iteration." },
      { level: "Insufficient (0–4)", desc: "No MVP, no testing, no iteration evidence." },
    ],
  },
  {
    name: "Founder Behavior Rubric",
    criteria: [
      { level: "Exemplary (9–10)", desc: "Consistent execution, accountability, recovery after setbacks." },
      { level: "Proficient (7–8)", desc: "Steady execution, mostly accountable, some recovery patterns." },
      { level: "Developing (5–6)", desc: "Inconsistent execution, weak accountability." },
      { level: "Insufficient (0–4)", desc: "Passive, missed reviews, no recovery after failure." },
    ],
  },
  {
    name: "GTM & Traction Rubric",
    criteria: [
      { level: "Exemplary (9–10)", desc: "Public launch, multi-channel experiments, retention data, learning loops." },
      { level: "Proficient (7–8)", desc: "Launched product, 2+ channel experiments, basic analytics." },
      { level: "Developing (5–6)", desc: "Launch attempt, weak analytics, vanity-only metrics." },
      { level: "Insufficient (0–4)", desc: "No launch, no data, no GTM experimentation." },
    ],
  },
];

// ---------- PART 6: FAILURE FRAMEWORK ----------
export const FAILURE_FRAMEWORK = {
  principle: "Startup failure ≠ academic failure. Students are evaluated on response to failure, not occurrence of failure.",
  acceptable: [
    "Failed market experiment with documented learning",
    "Pivot after evidence-based invalidation",
    "MVP rejection followed by structured iteration",
    "Channel failure followed by GTM experimentation",
  ],
  penalized: [
    "Repeated avoidable mistakes with no iteration",
    "Fake validation / fabricated interviews",
    "Passive participation, missed reviews",
    "No learning loop after setback",
    "Execution effort absent",
  ],
  recoveryProtocol: [
    "Document failed assumption",
    "Identify root cause vs surface symptom",
    "Define a corrective experiment",
    "Execute corrective experiment within next sprint",
    "Reflect and update founder log",
  ],
};

// ---------- BOS / AIAP COMPLIANCE ----------
export const COMPLIANCE = {
  bos: [
    "TS/ES + CLO→CO flow preserved",
    "Unit-wise syllabus breakup per semester",
    "PO/PSO mapping per CLO",
    "Evaluation distribution documented (internal/external)",
    "C-D-I-O alignment per module",
    "Pass/fail thresholds explicit",
    "5-credit structure (Lecture 2 + Lab 2 + Reviews 0.5 + Portfolio 0.5)",
    "Lecture/Lab architecture documented",
    "16-week semester pacing",
  ],
  aiap: [
    "Bloom's taxonomy verbs across TLOs (Create / Evaluate / Apply)",
    "Measurable outcomes per CLO",
    "Structured progression S1→S4",
    "Assessment clarity with rubrics",
    "Academic defensibility maintained alongside startup volatility",
    "Standardized documentation across all modules",
    "Realistic passing distribution (no startup-success-only grading)",
  ],
};

// ---------- CASE STUDIES & RESOURCES ----------
export const RESOURCES = [
  { tag: "Case Study", title: "Indian Unicorn Teardowns", note: "Founder journeys, early traction, pivots." },
  { tag: "Case Study", title: "Failed Startup Post-Mortems", note: "Pattern library of why startups failed." },
  { tag: "Case Study", title: "Bootstrapped Companies", note: "Capital-efficient venture playbooks." },
  { tag: "Reading", title: "Lean Startup (Reference)", note: "MVP, build-measure-learn." },
  { tag: "Reading", title: "The Mom Test (Reference)", note: "Customer interview craft." },
  { tag: "Tooling", title: "No-Code Stack", note: "Prototype tools used in S2 labs." },
  { tag: "Tooling", title: "Analytics Stack", note: "Funnel & retention instrumentation for S3." },
];

// ---------- INDUSTRY REQUIREMENTS ----------
export const INDUSTRY_REQUIREMENTS = [
  "Founder talks every semester (minimum 4 sessions)",
  "Industry-led MVP reviews in S2",
  "GTM operator reviews in S3",
  "Investor / VC simulation in S4",
  "Domain expert mentorship through venture lifecycle",
  "External evaluator on final defense panel",
];

// ---------- FACULTY RESPONSIBILITIES ----------
export const FACULTY_RESPONSIBILITIES = [
  { role: "Track Lead", duties: ["Curriculum ownership", "Outcome mapping", "Rubric integrity", "Faculty coordination"] },
  { role: "Lecturer", duties: ["Concept delivery", "Framework teaching", "Case-study facilitation"] },
  { role: "Lab Mentor", duties: ["Execution supervision", "Iteration coaching", "Review facilitation"] },
  { role: "Founder Reviewer", duties: ["Founder reviews", "Execution audits", "Behavior assessment"] },
  { role: "Industry Mentor", duties: ["Domain expertise", "Real-world feedback", "Network access"] },
];

// Filter taxonomies for the explorer page
export const FILTER_TAGS = {
  parts: PARTS.map((p) => p.title),
  semesters: ["S1", "S2", "S3", "S4"] as Semester[],
  evaluation: ["Internal", "External", "Founder Review", "Rubric-based"],
  labs: ["Field", "MVP", "GTM", "Analytics", "Pricing", "Defense"],
  tlos: TLOS_FULL.map((t) => t.id),
  faculty: ["Track Lead", "Lecturer", "Lab Mentor", "Founder Reviewer", "Industry Mentor"],
  failure: ["Acceptable", "Penalized", "Recovery"],
};

// ---------- FOUNDER-OPERATOR EVALUATION ----------
export const FOUNDER_OPERATOR_EVAL = {
  title: "Founder-Operator Evaluation",
  description: "Evaluates the student as a real-world founder: how they show up, decide, recover, and ship under uncertainty.",
  dimensions: [
    { name: "Ownership", indicators: ["Drives venture without prompting", "Owns outcomes", "Closes loops"] },
    { name: "Execution Cadence", indicators: ["Weekly shipped artifacts", "Sprint discipline", "Visible momentum"] },
    { name: "Decision Quality", indicators: ["Evidence-based pivots", "Trade-off clarity", "Time-to-decide"] },
    { name: "Recovery", indicators: ["Post-mortem rigor", "Corrective experiments", "Pattern correction"] },
    { name: "Founder Communication", indicators: ["Investor-grade clarity", "Defense under critique", "Honest reporting"] },
  ],
};

// ---------- BUILDER EVALUATION ----------
export const BUILDER_EVAL = {
  title: "Builder Evaluation",
  description: "Evaluates the student's ability to ship product — design, build, test, iterate.",
  dimensions: [
    { name: "MVP Quality", indicators: ["Functional core flow", "Real users in loop", "Bug discipline"] },
    { name: "Iteration Velocity", indicators: ["Changelog cadence", "Hypothesis → ship loop", "Cycle time"] },
    { name: "Technical Reasoning", indicators: ["Stack choices justified", "Scope discipline", "Build vs buy"] },
    { name: "UX & Product Sense", indicators: ["Journey clarity", "Friction removal", "Onboarding quality"] },
    { name: "Validation Rigor", indicators: ["Disconfirming evidence", "Cohort discipline", "Signal extraction"] },
  ],
};

// ---------- KNOWLEDGE EVALUATION ----------
export const KNOWLEDGE_EVAL = {
  title: "Knowledge Evaluation",
  description: "Academic-defensible component: concepts, frameworks, vocabulary, BOS/AIAP-aligned assessment.",
  dimensions: [
    { name: "Concept Mastery", indicators: ["Define & apply frameworks", "Cross-case reasoning"] },
    { name: "Framework Application", indicators: ["Use frameworks in own venture", "Adapt vs misuse"] },
    { name: "Case Analysis", indicators: ["Teardown depth", "Generalizable lessons"] },
    { name: "Written Defensibility", indicators: ["Structured memos", "Citations & evidence"] },
    { name: "Viva Performance", indicators: ["Concept defense", "Mapping to TLOs"] },
  ],
};

// ---------- SELECTIVE ENTRY SYSTEM ----------
export const SELECTIVE_ENTRY = {
  title: "Selective Entry (Future Phase)",
  principles: [
    "Track is not for everyone — selection protects intensity.",
    "Commitment > prior experience.",
    "Demonstrated execution > stated interest.",
  ],
  stages: [
    { stage: "Application", criteria: ["Founder essay", "Past execution evidence", "Time-commitment letter"] },
    { stage: "Builder Task", criteria: ["48-hour problem-discovery task", "Field interview submission", "Synthesis memo"] },
    { stage: "Founder Interview", criteria: ["Motivation depth", "Ambiguity tolerance", "Coachability"] },
    { stage: "Conditional Offer", criteria: ["Probation semester", "Weekly review cadence", "Exit ramp if non-execution"] },
  ],
};

// ---------- FACULTY OPERATING MODEL ----------
export const FACULTY_OPERATING_MODEL = {
  title: "Faculty Operating Model",
  description: "Hybrid academic + venture-studio faculty cadence required to run the track.",
  cadence: [
    { ritual: "Weekly Studio Review", frequency: "Weekly", owners: ["Lab Mentor", "Founder Reviewer"], purpose: "Execution audit + unblock" },
    { ritual: "Concept Lecture", frequency: "Weekly", owners: ["Lecturer"], purpose: "Framework + case-based teaching" },
    { ritual: "Founder Review", frequency: "Bi-weekly", owners: ["Founder Reviewer", "Industry Mentor"], purpose: "Founder behavior + venture trajectory" },
    { ritual: "Industry Session", frequency: "Monthly", owners: ["Industry Mentor"], purpose: "Domain depth + network access" },
    { ritual: "Rubric Calibration", frequency: "Monthly", owners: ["Track Lead", "Lecturer", "Lab Mentor"], purpose: "Inter-rater reliability" },
    { ritual: "Semester Defense Panel", frequency: "End of semester", owners: ["Track Lead", "Industry Mentor", "External Evaluator"], purpose: "Summative evaluation" },
  ],
};

// ---------- INDUSTRY INTEGRATION (structured) ----------
export const INDUSTRY_INTEGRATION = [
  { phase: "S1", touchpoints: ["Founder talks", "Ecosystem walkthroughs", "Mentor office hours"] },
  { phase: "S2", touchpoints: ["MVP critique panels", "PM/Designer mentorship", "No-code coaching"] },
  { phase: "S3", touchpoints: ["GTM operator reviews", "Growth teardown sessions", "Distribution mentors"] },
  { phase: "S4", touchpoints: ["Investor simulations", "CFO/Finance mentors", "External defense panel"] },
];
