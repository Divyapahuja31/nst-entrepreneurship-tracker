import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Compass,
  Map,
  Gauge,
  Trophy,
  Sparkles,
  BookOpen,
  GitBranch,
  Activity,
  FlaskConical,
  CalendarRange,
  LogIn,
  LogOut,
  ShieldCheck,
  Briefcase,
  Scale,
  Users,
  Rocket,
  GraduationCap,
  Building2,
  CalendarClock,
  Camera,
  User,
  Award,
  Handshake,
  CheckCircle2,
  UserCog,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { ApplyNowButton } from "./ApplyNowButton";
import { useAuth } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/roles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

// --- STUDENT NAVIGATION SECTIONS ---
const studentDashboardsSection: NavSection = {
  id: "student-dashboards",
  label: "DASHBOARDS",
  items: [
    { title: "Overview", url: "/", icon: LayoutDashboard, exact: true },
    { title: "View Results", url: "/result", icon: CheckCircle2 },
  ],
};

const studentMasterFrameworkSection: NavSection = {
  id: "student-master-framework",
  label: "MASTER FRAMEWORK",
  items: [
    { title: "Proposal", url: "/proposal", icon: FileText },
    { title: "Philosophy", url: "/philosophy", icon: Compass },
    { title: "4-Year Roadmap", url: "/roadmap", icon: Map },
    { title: "Evaluation Logic", url: "/evaluation", icon: Gauge },
    { title: "Track Outcomes", url: "/outcomes", icon: Trophy },
  ],
};

const studentGovernanceSection: NavSection = {
  id: "student-governance",
  label: "GOVERNANCE & OUTCOMES",
  items: [
    { title: "Career Outcomes", url: "/career-outcomes", icon: Briefcase },
    { title: "Founder Review", url: "/founder-review", icon: Award },
    { title: "Startup Residency", url: "/startup-residency", icon: Rocket },
    { title: "Industry Readiness", url: "/industry-readiness", icon: GraduationCap },
    { title: "Program Governance", url: "/program-governance", icon: Building2 },
  ],
};

const studentSections: NavSection[] = [
  studentDashboardsSection,
  studentMasterFrameworkSection,
  studentGovernanceSection,
];

// --- ADMIN NAVIGATION SECTIONS ---
const adminQuickAccessSection: NavSection = {
  id: "admin-quick-access",
  label: "ADMIN / QUICK ACCESS",
  items: [
    { title: "Manage Results", url: "/manageResult", icon: Camera },
    { title: "Command Center", url: "/command-center", icon: Activity },
    { title: "Cohort Planner", url: "/cohort-planner", icon: CalendarRange },
  ],
};

const adminDashboardsSection: NavSection = {
  id: "admin-dashboards",
  label: "DASHBOARDS",
  items: [
    { title: "Overview", url: "/", icon: LayoutDashboard, exact: true },
  ],
};

const adminMasterFrameworkSection: NavSection = {
  id: "admin-master-framework",
  label: "MASTER FRAMEWORK",
  items: [
    { title: "Proposal", url: "/proposal", icon: FileText },
    { title: "Philosophy", url: "/philosophy", icon: Compass },
    { title: "4-Year Roadmap", url: "/roadmap", icon: Map },
    { title: "Evaluation Logic", url: "/evaluation", icon: Gauge },
    { title: "Track Outcomes", url: "/outcomes", icon: Trophy },
    { title: "Syllabus Overview", url: "/syllabus-overview", icon: GitBranch },
    { title: "Full Syllabus", url: "/syllabus", icon: BookOpen },
    { title: "Weekly Execution Framework", url: "/weekly-framework", icon: CalendarClock },
  ],
};

const adminCoursesSection: NavSection = {
  id: "admin-courses",
  label: "COURSE DESIGNER",
  items: [{ title: "Entrepreneurship 1", url: "/course/entrepreneurship-1", icon: FlaskConical }],
};

const adminGovernanceSection: NavSection = {
  id: "admin-governance",
  label: "GOVERNANCE & OUTCOMES",
  items: [
    { title: "Career Outcomes", url: "/career-outcomes", icon: Briefcase },
    { title: "Credit Architecture", url: "/credit-mapping", icon: Scale },
    { title: "Founder Review", url: "/founder-review", icon: Award },
    { title: "Mentor Framework", url: "/mentor-framework", icon: Users },
    { title: "Startup Residency", url: "/startup-residency", icon: Rocket },
    { title: "Industry Readiness", url: "/industry-readiness", icon: GraduationCap },
    { title: "Program Governance", url: "/program-governance", icon: Building2 },
    { title: "Industry Partner (TPF)", url: "/industry-partner", icon: Handshake },
  ],
};

const administrationSection: NavSection = {
  id: "administration",
  label: "ADMINISTRATION",
  items: [{ title: "Accounts & Roles", url: "/admin", icon: UserCog }],
};

const adminSections: NavSection[] = [
  adminQuickAccessSection,
  adminDashboardsSection,
  adminMasterFrameworkSection,
  adminCoursesSection,
  adminGovernanceSection,
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, role, isStaff, isAdmin, signOut, status } = useAuth();

  // Active state checker
  const isItemActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.url;
    }
    if (item.url === "/") {
      return pathname === "/";
    }
    return pathname === item.url;
  };

  const sections: NavSection[] = isStaff
    ? isAdmin
      ? [...adminSections, administrationSection]
      : adminSections
    : studentSections;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-stone-800/60 bg-[#11100F] text-stone-200"
    >
      {/* Header Branding */}
      <SidebarHeader className="px-4 pb-4 pt-5 border-b border-stone-800/50">
        <Link to="/" className="flex items-center gap-3 px-1 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-stone-800/90 text-stone-200 border border-stone-700/60 font-mono text-xs font-bold transition-colors group-hover:bg-stone-700 group-hover:text-white shadow-xs">
            N
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-sans text-xs font-bold tracking-tight text-stone-100 group-hover:text-white transition-colors">
              NST Entrepreneurship
            </span>
            <span className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-stone-400">
              STARTUP TRACK
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Main Navigation Content */}
      <SidebarContent className="px-2 py-3 space-y-4 overflow-y-auto">
        {status !== "loading" &&
          sections.map((section) => (
            <SidebarGroup key={section.id} className="p-0">
              {/* Section Header */}
              <SidebarGroupLabel className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 px-3 py-1.5 mb-1 select-none">
                {section.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = isItemActive(item);
                    return (
                      <SidebarMenuItem key={item.title + item.url}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          className={`group relative flex items-center px-3 py-2 rounded-lg font-sans text-sm tracking-tight transition-all duration-150 ${
                            active
                              ? "bg-white/[0.09] text-white font-semibold border-l-2 border-[#C85A32] shadow-xs"
                              : "text-stone-400 hover:bg-white/[0.04] hover:text-stone-200 font-medium"
                          }`}
                        >
                          <Link to={item.url}>
                            <span className="truncate">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
      </SidebarContent>

      {/* Footer Account Section */}
      <SidebarFooter className="p-3 border-t border-stone-800/50 space-y-2.5">
        {/* Account Info Box */}
        <div className="rounded-xl border border-stone-800/80 bg-white/[0.03] p-3 space-y-2 shadow-xs">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C85A32]/20 text-[#C85A32]">
                    <User className="h-3 w-3" />
                  </div>
                  <p className="truncate font-sans text-xs text-stone-200 font-medium">
                    {user.email}
                  </p>
                </div>
                {isStaff ? (
                  <Badge className="bg-[#C85A32]/15 border border-[#C85A32]/30 font-mono text-[9px] text-[#C85A32] shrink-0 px-1.5 py-0.5">
                    <ShieldCheck className="mr-1 h-2.5 w-2.5 text-[#C85A32]" />
                    {role ? ROLE_LABELS[role] : "Staff"}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="font-mono text-[9px] text-stone-400 border-stone-700 shrink-0 px-1.5 py-0.5">
                    {role ? ROLE_LABELS[role] : "Student"}
                  </Badge>
                )}
              </div>

              {/* Sign Out Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="h-7 w-full justify-start px-2 font-sans text-xs text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer rounded-md font-medium"
              >
                <LogOut className="mr-2 h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 h-8 w-full rounded-lg bg-[#C85A32]/15 border border-[#C85A32]/30 px-3 font-sans text-xs font-semibold text-[#C85A32] hover:bg-[#C85A32]/25 transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" /> Sign in
            </Link>
          )}
        </div>

        {/* Apply Now Button for students only */}
        {status !== "loading" && !isStaff && <ApplyNowButton className="w-full justify-center shadow-xs" />}

        {/* Footer Version Tag */}
        <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 select-none">
          v1 · master framework
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
