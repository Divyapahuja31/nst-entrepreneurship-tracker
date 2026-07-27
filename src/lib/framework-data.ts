// Master framework data extracted from the NST Entrepreneurship Track document.

export const TLOS = [
  {
    id: "TLO-1",
    title: "Problem Discovery & Validation",
    verb: "Create / Evaluate",
    description:
      "Graduates will be able to identify, validate, and prioritize real-world customer problems through structured market discovery, behavioral observation, and evidence-driven validation systems under uncertain startup conditions.",
  },
  {
    id: "TLO-2",
    title: "MVP & Product Systems",
    verb: "Create",
    description:
      "Graduates will be able to design, build, iterate, and operationalize MVPs and product systems that optimize onboarding, activation, retention, and user engagement under resource-constrained environments.",
  },
  {
    id: "TLO-3",
    title: "GTM & Growth Engineering",
    verb: "Create / Evaluate",
    description:
      "Graduates will be able to engineer scalable GTM and growth systems using customer acquisition funnels, retention analytics, experimentation frameworks, and community-driven distribution models.",
  },
  {
    id: "TLO-4",
    title: "Operational Systems",
    verb: "Create",
    description:
      "Graduates will be able to construct operational startup systems that coordinate execution, prioritize resources, manage workflows, and maintain measurable progress across dynamic startup environments.",
  },
  {
    id: "TLO-5",
    title: "Venture Communication",
    verb: "Evaluate / Create",
    description:
      "Graduates will be able to communicate venture ideas, operational insights, and strategic decisions effectively to customers, teams, investors, mentors, and ecosystem stakeholders using structured storytelling and evidence-backed reasoning.",
  },
  {
    id: "TLO-6",
    title: "Ethical & Sustainable Entrepreneurship",
    verb: "Evaluate",
    description:
      "Graduates will be able to assess ethical, behavioral, operational, and long-term implications of startup decisions while designing sustainable and responsible entrepreneurial systems.",
  },
] as const;

export type TLOId = (typeof TLOS)[number]["id"];

export const FAILURE_PATTERNS: { cluster: string; items: string[] }[] = [
  {
    cluster: "Ideation",
    items: [
      "Solving non-problems",
      "Feature-first thinking",
      "No ICP clarity",
      "Weak problem definition",
      "Building without validation",
    ],
  },
  {
    cluster: "Product",
    items: [
      "Feature dumping",
      "No onboarding thinking",
      "Poor retention systems",
      "No user journey mapping",
      "Confusing UX",
    ],
  },
  {
    cluster: "GTM",
    items: [
      "No customer acquisition strategy",
      "Confusing CAC assumptions",
      "Weak organic acquisition",
      "Poor community strategy",
      "No positioning clarity",
    ],
  },
  {
    cluster: "Metrics",
    items: [
      "Vanity metrics",
      "Fake traction interpretation",
      "No retention analysis",
      "No activation analysis",
      "No funnel understanding",
    ],
  },
  {
    cluster: "Founder",
    items: [
      "Poor communication",
      "Weak execution consistency",
      "Team confusion",
      "Lack of accountability",
      "No prioritization ability",
    ],
  },
  {
    cluster: "Pitching",
    items: [
      "Long explanations",
      "No structured storytelling",
      "No market understanding",
      "No pricing understanding",
      "No competitive differentiation",
    ],
  },
  {
    cluster: "Operational",
    items: [
      "No task ownership",
      "Weak documentation",
      "Poor execution cadence",
      "No iteration systems",
      "No sprint structure",
    ],
  },
];

export type Course = {
  id: string;
  title: string;
  topics: string[];
  execution: string[];
  tags: (
    | "High Intensity"
    | "Market Facing"
    | "Technical Engineering"
    | "Strategic"
    | "Operational"
    | "Ethical"
  )[];
  clos: { id: string; statement: string; tlos: TLOId[] }[];
};

export type YearKey = "Year 1" | "Year 2" | "Year 3" | "Year 4";

export const YEARS: {
  key: YearKey;
  layer: string;
  tagline: string;
  highlights: string[];
  courses: Course[];
}[] = [
  {
    key: "Year 1",
    layer: "Foundation Layer",
    tagline: "Problem discovery, customer behavior, MVP fundamentals.",
    highlights: [
      "50+ Customer Interviews",
      "Problem Discovery",
      "First MVP Launch",
      "Live Acquisition Campaign",
    ],
    courses: [
      {
        id: "C1",
        title: "Introduction to Entrepreneurship & Startup Systems",
        topics: [
          "Startup ecosystem mapping",
          "Founder psychology",
          "Startup lifecycle",
          "Idea vs execution",
          "Market observation",
        ],
        execution: ["Founder interviews", "Problem observation logs", "Reflection journals"],
        tags: ["Strategic"],
        clos: [
          {
            id: "CLO-1",
            statement:
              "Explain startup models, lifecycles, and founder archetypes via structured analysis.",
            tlos: ["TLO-1", "TLO-5"],
          },
          {
            id: "CLO-2",
            statement:
              "Identify operational inefficiencies and market gaps through structured observation.",
            tlos: ["TLO-1", "TLO-6"],
          },
          {
            id: "CLO-3",
            statement:
              "Differentiate idea quality from execution quality when evaluating opportunities.",
            tlos: ["TLO-1"],
          },
        ],
      },
      {
        id: "C2",
        title: "Problem Discovery & Customer Behavior",
        topics: [
          "ICP",
          "User psychology",
          "Customer interviews",
          "Behavioral research",
          "Validation systems",
          "Research bias",
        ],
        execution: [
          "50 customer interviews",
          "Problem validation report",
          "Behavioral observation assignment",
        ],
        tags: ["High Intensity", "Market Facing"],
        clos: [
          {
            id: "CLO-1",
            statement: "Conduct customer interviews and extract actionable operational insights.",
            tlos: ["TLO-1", "TLO-5"],
          },
          {
            id: "CLO-2",
            statement: "Map ICPs and behavioral profiles using primary research.",
            tlos: ["TLO-1"],
          },
        ],
      },
      {
        id: "C3",
        title: "MVP Design & Product Thinking",
        topics: [
          "MVP philosophy",
          "UX basics",
          "User journey",
          "Onboarding",
          "Retention basics",
          "No-code & AI-assisted design",
        ],
        execution: ["Build MVP", "User onboarding testing", "Product iteration cycles"],
        tags: ["Technical Engineering"],
        clos: [
          {
            id: "CLO-1",
            statement: "Design MVPs with clear user journeys and onboarding loops.",
            tlos: ["TLO-2"],
          },
          {
            id: "CLO-2",
            statement: "Run product iteration cycles based on user feedback.",
            tlos: ["TLO-2", "TLO-3"],
          },
        ],
      },
      {
        id: "C4",
        title: "GTM Fundamentals & Community Building",
        topics: [
          "Customer acquisition",
          "Distribution",
          "Organic marketing",
          "Community building",
          "Funnel basics",
        ],
        execution: ["Run live campaign", "User acquisition sprint", "Activation analysis"],
        tags: ["Market Facing"],
        clos: [
          {
            id: "CLO-1",
            statement: "Run live acquisition campaigns and measure activation.",
            tlos: ["TLO-3"],
          },
          {
            id: "CLO-2",
            statement: "Design early community systems for organic distribution.",
            tlos: ["TLO-3", "TLO-5"],
          },
        ],
      },
    ],
  },
  {
    key: "Year 2",
    layer: "Execution Layer",
    tagline: "Analytics, product ops, sales simulations, founder communication.",
    highlights: [
      "Sales Simulations",
      "Product Ops Sprints",
      "Founder Standups",
      "Mock Investor Pitches",
    ],
    courses: [
      {
        id: "C5",
        title: "Startup Analytics & Metrics",
        topics: [
          "CAC",
          "LTV",
          "Retention",
          "Funnel analysis",
          "Cohort analysis",
          "Operational dashboards",
        ],
        execution: ["Build dashboard", "Analyze startup metrics", "Retention experiments"],
        tags: ["Technical Engineering", "Operational"],
        clos: [
          {
            id: "CLO-1",
            statement: "Analyze funnel metrics and identify acquisition bottlenecks.",
            tlos: ["TLO-3", "TLO-4"],
          },
          {
            id: "CLO-2",
            statement: "Build operational dashboards for retention and cohort tracking.",
            tlos: ["TLO-4"],
          },
        ],
      },
      {
        id: "C6",
        title: "Product Operations & Systems Management",
        topics: [
          "Sprint systems",
          "Team management",
          "Startup workflows",
          "Documentation",
          "Execution cadences",
        ],
        execution: ["Team sprint cycles", "Weekly execution reviews", "Founder standups"],
        tags: ["Operational", "High Intensity"],
        clos: [
          {
            id: "CLO-1",
            statement: "Operate weekly sprint cycles with measurable cadence.",
            tlos: ["TLO-4"],
          },
          {
            id: "CLO-2",
            statement: "Maintain documentation and execution traceability.",
            tlos: ["TLO-4", "TLO-6"],
          },
        ],
      },
      {
        id: "C7",
        title: "Startup Communication & Pitching",
        topics: ["Pitching", "Founder communication", "Storytelling", "Investor psychology"],
        execution: ["Investor mock pitches", "Founder reviews", "Ecosystem presentations"],
        tags: ["Strategic", "Market Facing"],
        clos: [
          {
            id: "CLO-1",
            statement: "Deliver structured investor pitches with evidence-backed reasoning.",
            tlos: ["TLO-5"],
          },
          {
            id: "CLO-2",
            statement: "Communicate operational insights to mentors and stakeholders.",
            tlos: ["TLO-5"],
          },
        ],
      },
      {
        id: "C8",
        title: "Sales, Negotiation & Customer Conversion",
        topics: [
          "B2B sales",
          "B2C conversion",
          "Negotiation",
          "Customer objections",
          "Trust systems",
        ],
        execution: ["Live outreach", "Sales simulations", "Conversion analysis"],
        tags: ["High Intensity", "Market Facing"],
        clos: [
          {
            id: "CLO-1",
            statement: "Run live sales outreach and convert qualified prospects.",
            tlos: ["TLO-3", "TLO-5"],
          },
          {
            id: "CLO-2",
            statement: "Negotiate and handle objections in simulated deal cycles.",
            tlos: ["TLO-5"],
          },
        ],
      },
    ],
  },
  {
    key: "Year 3",
    layer: "Scaling Layer",
    tagline: "Finance, growth engineering, fundraising, governance.",
    highlights: [
      "Viral Growth Loops",
      "Fundraising Simulations",
      "Pricing Models",
      "Governance Cases",
    ],
    courses: [
      {
        id: "C9",
        title: "Startup Finance & Business Models",
        topics: [
          "Pricing systems",
          "Unit economics",
          "Burn rate",
          "Revenue systems",
          "Financial planning",
        ],
        execution: ["Build startup financial model", "Pricing simulations"],
        tags: ["Strategic", "Operational"],
        clos: [
          {
            id: "CLO-1",
            statement: "Build a unit-economics-based financial model.",
            tlos: ["TLO-4"],
          },
          {
            id: "CLO-2",
            statement: "Run pricing experiments grounded in market evidence.",
            tlos: ["TLO-3", "TLO-4"],
          },
        ],
      },
      {
        id: "C10",
        title: "Growth Engineering & Scale Systems",
        topics: [
          "Viral systems",
          "Growth loops",
          "Automation",
          "AI workflows",
          "Operational scale",
        ],
        execution: ["Growth experiments", "Automation workflows", "Referral systems"],
        tags: ["Technical Engineering", "High Intensity"],
        clos: [
          { id: "CLO-1", statement: "Engineer viral and referral growth loops.", tlos: ["TLO-3"] },
          { id: "CLO-2", statement: "Automate operational workflows for scale.", tlos: ["TLO-4"] },
        ],
      },
      {
        id: "C11",
        title: "Venture Ecosystem & Fundraising",
        topics: [
          "Accelerators",
          "VC",
          "Angel investors",
          "Fundraising psychology",
          "Due diligence",
        ],
        execution: ["Fundraising simulations", "Investor memos", "Demo day prep"],
        tags: ["Strategic", "Market Facing"],
        clos: [
          {
            id: "CLO-1",
            statement: "Prepare investor memos and run fundraising simulations.",
            tlos: ["TLO-5"],
          },
          {
            id: "CLO-2",
            statement: "Navigate diligence with operational evidence.",
            tlos: ["TLO-4", "TLO-5"],
          },
        ],
      },
      {
        id: "C12",
        title: "Startup Law, Ethics & Governance",
        topics: [
          "Founder ethics",
          "Governance",
          "Compliance",
          "Contracts",
          "Responsible AI",
          "User protection",
        ],
        execution: ["Case studies", "Governance simulations"],
        tags: ["Ethical"],
        clos: [
          {
            id: "CLO-1",
            statement: "Apply ethical and governance frameworks to startup decisions.",
            tlos: ["TLO-6"],
          },
          {
            id: "CLO-2",
            statement: "Design responsible AI and data-handling practices.",
            tlos: ["TLO-6"],
          },
        ],
      },
    ],
  },
  {
    key: "Year 4",
    layer: "Real-World Execution Layer",
    tagline: "Founder residency and venture thesis defense.",
    highlights: [
      "Founder Residency",
      "Venture Thesis Defense",
      "Operational KPIs",
      "Mentor Reviews",
    ],
    courses: [
      {
        id: "C13",
        title: "Founder Residency (Semester 7)",
        topics: ["Build startups", "Join startups", "Accelerator placements", "Venture projects"],
        execution: ["Execution logs", "Mentor reviews", "Operational KPIs", "Founder growth"],
        tags: ["High Intensity", "Market Facing", "Operational"],
        clos: [
          {
            id: "CLO-1",
            statement: "Operate inside a real venture and report measurable progress.",
            tlos: ["TLO-4", "TLO-5"],
          },
          {
            id: "CLO-2",
            statement: "Demonstrate founder-level decision-making under uncertainty.",
            tlos: ["TLO-1", "TLO-4"],
          },
        ],
      },
      {
        id: "C14",
        title: "Venture Thesis / Startup Defense (Semester 8)",
        topics: [
          "Defend startup systems",
          "Defend products",
          "Defend GTM systems",
          "Execution theses",
        ],
        execution: ["Live cross-questioning", "Execution traceability review"],
        tags: ["Strategic", "High Intensity"],
        clos: [
          {
            id: "CLO-1",
            statement: "Defend a venture thesis with execution evidence and systems thinking.",
            tlos: ["TLO-5", "TLO-1"],
          },
          {
            id: "CLO-2",
            statement: "Demonstrate operational maturity and customer validation.",
            tlos: ["TLO-4", "TLO-2"],
          },
        ],
      },
    ],
  },
];

export const WEIGHTAGE = [
  { name: "Execution (MVPs, Launches)", value: 35, color: "var(--gold)" },
  { name: "Market Evidence (LOIs, Retention)", value: 25, color: "var(--chart-2)" },
  { name: "Operational Maturity (Sprints, Docs)", value: 20, color: "var(--chart-3)" },
  { name: "Conceptual Knowledge", value: 20, color: "var(--chart-5)" },
];

export const ANTI_GAMING = [
  {
    title: "Live Cross-Questioning",
    body: "Judges shift across ICP, CAC, onboarding, retention, pricing, and unit-economics in real time — surfacing rehearsed answers and exposing fake traction.",
  },
  {
    title: "Execution Traceability",
    body: "Every claim must trace back to interview logs, sprint artifacts, dashboards, outreach systems, and pricing tests. No artifact, no credit.",
  },
  {
    title: "Sprint-Level Audits",
    body: "Weekly execution is audited for cadence, ownership, and iteration quality — catching teams that backfill artifacts before reviews.",
  },
  {
    title: "Cohort Reality Checks",
    body: "Retention and activation numbers are validated against raw event logs, not curated dashboards.",
  },
];
