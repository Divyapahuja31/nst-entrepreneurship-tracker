import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Loader2,
  FolderPlus,
  Lock,
  ShieldAlert,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ResultSearch {
  studentId?: string;
}

export const Route = createFileRoute("/result")({
  validateSearch: (search: Record<string, unknown>): ResultSearch => {
    return {
      studentId: search.studentId ? String(search.studentId) : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Venture KPIs & Evaluation · NST Entrepreneurship" },
      {
        name: "description",
        content: "Manage and view venture KPIs, subgrades, and evaluation metrics.",
      },
    ],
  }),
  component: RouteComponent,
});

interface Subcategory {
  id?: string;
  name: string;
  obtainGrade: string;
  totalGrade: number;
}

interface KPI {
  id: string;
  name: string;
  obtainGrade: string;
  totalGrade: number;
  subcategories?: Subcategory[];
}

interface Venture {
  id: string;
  subject: string;
  studentName?: string;
  rollNo?: string;
  kpis: KPI[];
}

function RouteComponent() {
  const { studentId } = Route.useSearch();
  const { isAdmin, isSuperAdmin, user, loading: authLoading } = useAuth();
  const canEdit = isAdmin || isSuperAdmin;

  const [ventures, setVentures] = useState<Venture[]>([]);
  const [loading, setLoading] = useState(true);
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [accessDeniedMessage, setAccessDeniedMessage] = useState<string | null>(null);

  // Add Venture Modal State
  const [ventureModalOpen, setVentureModalOpen] = useState(false);
  const [ventureSubject, setVentureSubject] = useState("");
  const [ventureStudentName, setVentureStudentName] = useState("");
  const [ventureRollNo, setVentureRollNo] = useState("");
  const [submittingVenture, setSubmittingVenture] = useState(false);

  // Add KPI Modal State
  const [kpiModalOpen, setKpiModalOpen] = useState(false);
  const [targetVentureId, setTargetVentureId] = useState<string>("");
  const [kpiName, setKpiName] = useState("");
  const [kpiObtain, setKpiObtain] = useState("");
  const [kpiTotal, setKpiTotal] = useState<number>(10);
  const [subgradesList, setSubgradesList] = useState<Subcategory[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchVentureData();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading, studentId, canEdit]);

  const fetchVentureData = async () => {
    setLoading(true);
    setAccessDeniedMessage(null);
    try {
      let userRollNo: string | null = null;
      if (user) {
        const { data: userRole } = await supabase
          .from("user_roles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();
        userRollNo = (userRole as any)?.roll_no || null;
      }

      let query = supabase
        .from("ventures")
        .select(`
          id,
          subject,
          student_name,
          roll_no,
          user_id,
          created_at,
          venture_kpis (
            id,
            name,
            obtain_grade,
            total_grade,
            created_at,
            kpi_subcategories (
              id,
              name,
              obtain_grade,
              total_grade,
              created_at
            )
          )
        `)
        .order("created_at", { ascending: true });

      if (!canEdit && user) {
        const orConditions: string[] = [`user_id.eq.${user.id}`];

        if (userRollNo && userRollNo.trim()) {
          orConditions.push(`roll_no.ilike.${userRollNo.trim()}`);
          orConditions.push(`student_name.ilike.${userRollNo.trim()}`);
        }
        if (user.email && user.email.trim()) {
          orConditions.push(`roll_no.ilike.${user.email.trim()}`);
          orConditions.push(`student_name.ilike.${user.email.trim()}`);
        }
        if (user.user_metadata?.roll_no) {
          orConditions.push(`roll_no.ilike.${String(user.user_metadata.roll_no).trim()}`);
        }
        if (user.user_metadata?.full_name) {
          orConditions.push(`student_name.ilike.${String(user.user_metadata.full_name).trim()}`);
        }

        query = query.or(orConditions.join(","));
      }

      if (studentId) {
        query = query.eq("id", studentId);
      }

      const { data: venturesData, error: vError } = await query;

      if (vError) {
        console.error("Supabase ventures query error:", vError);
        toast.error("Failed to load ventures from database");
        setVentures([]);
        setLoading(false);
        return;
      }

      if (!venturesData || venturesData.length === 0) {
        if (studentId && !canEdit) {
          setAccessDeniedMessage(
            "Access Denied: You are only authorized to view your own result.",
          );
          toast.error("Access Denied: You can only view your own result.");
        }
        setVentures([]);
        setLoading(false);
        return;
      }

      if (!canEdit && user) {
        for (const v of venturesData) {
          if (!v.user_id && user.id) {
            supabase
              .from("ventures")
              .update({ user_id: user.id })
              .eq("id", v.id)
              .then(({ error }) => {
                if (error) console.error("Auto-linking venture user_id error:", error);
              });
          }
        }
      }

      const formattedVentures: Venture[] = (venturesData as any[]).map((v) => {
        const sortedKpis = (v.venture_kpis || []).sort(
          (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );

        const vKpis: KPI[] = sortedKpis.map((k: any) => {
          const sortedSubs = (k.kpi_subcategories || []).sort(
            (a: any, b: any) =>
              new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
          );

          const kSubs: Subcategory[] = sortedSubs.map((s: any) => ({
            id: s.id,
            name: s.name,
            obtainGrade: s.obtain_grade,
            totalGrade: Number(s.total_grade),
          }));

          return {
            id: k.id,
            name: k.name,
            obtainGrade: k.obtain_grade,
            totalGrade: Number(k.total_grade),
            subcategories: kSubs.length > 0 ? kSubs : undefined,
          };
        });

        return {
          id: v.id,
          subject: v.subject,
          studentName: v.student_name,
          rollNo: v.roll_no || "",
          kpis: vKpis,
        };
      });

      setVentures(formattedVentures);
    } catch (err) {
      console.error("Error fetching ventures from Supabase:", err);
      setVentures([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddVentureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ventureSubject.trim() || !ventureStudentName.trim()) {
      toast.error("Please fill in subject and student name.");
      return;
    }

    setSubmittingVenture(true);
    try {
      let linkedUserId: string | null = null;
      const searchKey = (ventureRollNo.trim() || ventureStudentName.trim()).toLowerCase();

      if (searchKey) {
        const { data: matchedRoles } = await supabase
          .from("user_roles")
          .select("user_id")
          .ilike("roll_no", searchKey)
          .maybeSingle();

        if (matchedRoles?.user_id) {
          linkedUserId = matchedRoles.user_id;
        }
      }

      const { data, error } = await supabase
        .from("ventures")
        .insert([
          {
            user_id: linkedUserId,
            subject: ventureSubject.trim(),
            student_name: ventureStudentName.trim(),
            roll_no: ventureRollNo.trim() || null,
          },
        ])
        .select()
        .single();

      if (error) {
        toast.error(`Error creating venture: ${error.message}`);
      } else if (data) {
        toast.success(`Venture "${data.subject}" created successfully.`);
        setVentureModalOpen(false);
        setVentureSubject("");
        setVentureStudentName("");
        setVentureRollNo("");
        fetchVentureData();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message || "Failed to create venture");
    } finally {
      setSubmittingVenture(false);
    }
  };

  const handleDeleteVenture = async (ventureId: string, subject: string) => {
    if (!confirm(`Are you sure you want to delete venture "${subject}" and all its KPIs?`)) return;

    try {
      const { error } = await supabase.from("ventures").delete().eq("id", ventureId);
      if (error) {
        toast.error(`Delete failed: ${error.message}`);
      } else {
        toast.success(`Venture "${subject}" deleted.`);
        setVentures((prev) => prev.filter((v) => v.id !== ventureId));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      toast.error(message || "Failed to delete venture");
    }
  };

  const handleOpenAddKpi = (ventureId: string) => {
    setTargetVentureId(ventureId);
    setKpiName("");
    setKpiObtain("");
    setKpiTotal(10);
    setSubgradesList([]);
    setKpiModalOpen(true);
  };

  const handleAddDraftSubgrade = () => {
    setSubgradesList((prev) => [...prev, { name: "", obtainGrade: "", totalGrade: 10 }]);
  };

  const handleUpdateDraftSubgrade = (
    index: number,
    field: keyof Subcategory,
    value: string | number,
  ) => {
    setSubgradesList((prev) =>
      prev.map((sub, i) => (i === index ? { ...sub, [field]: value } : sub)),
    );
  };

  const handleRemoveDraftSubgrade = (index: number) => {
    setSubgradesList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddKpiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiName.trim()) {
      toast.error("Please enter a valid KPI name.");
      return;
    }

    setSubmitting(true);
    const validSubgrades = subgradesList
      .filter((s) => s.name.trim().length > 0)
      .map((s) => ({
        name: s.name.trim(),
        obtainGrade: s.obtainGrade.trim() || `${s.totalGrade}/${s.totalGrade}`,
        totalGrade: Number(s.totalGrade) || 10,
      }));

    try {
      const obtainGradeVal = kpiObtain.trim() || `${kpiTotal}/${kpiTotal}`;
      const { data: kpiInsertData, error: kpiErr } = await supabase
        .from("venture_kpis")
        .insert([
          {
            venture_id: targetVentureId,
            name: kpiName.trim(),
            obtain_grade: obtainGradeVal,
            total_grade: Number(kpiTotal) || 10,
          },
        ])
        .select()
        .single();

      if (kpiErr) {
        toast.error(`KPI insert error: ${kpiErr.message}`);
        return;
      }

      const createdKpiId = kpiInsertData.id;

      if (validSubgrades.length > 0) {
        await supabase.from("kpi_subcategories").insert(
          validSubgrades.map((sub) => ({
            kpi_id: createdKpiId,
            name: sub.name,
            obtain_grade: sub.obtainGrade,
            total_grade: sub.totalGrade,
          })),
        );
      }

      // Update local state instantly
      const newKpi: KPI = {
        id: createdKpiId,
        name: kpiName.trim(),
        obtainGrade: obtainGradeVal,
        totalGrade: Number(kpiTotal) || 10,
        subcategories: validSubgrades,
      };

      setVentures((prev) =>
        prev.map((v) =>
          v.id === targetVentureId
            ? {
                ...v,
                kpis: [...v.kpis, newKpi],
              }
            : v,
        ),
      );

      if (validSubgrades.length > 0) {
        setOpenRows((prev) => ({ ...prev, [createdKpiId]: true }));
      }

      setKpiModalOpen(false);
      toast.success(
        `KPI "${newKpi.name}" added successfully${
          validSubgrades.length > 0 ? ` with ${validSubgrades.length} subgrades` : ""
        }.`,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      toast.error(message || "Failed to add KPI");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteKpi = async (kpiId: string, kpiNameStr: string, ventureId: string) => {
    if (!confirm(`Are you sure you want to delete KPI "${kpiNameStr}"?`)) return;

    try {
      const { error } = await supabase.from("venture_kpis").delete().eq("id", kpiId);
      if (error) {
        toast.error(`Delete KPI error: ${error.message}`);
      } else {
        setVentures((prev) =>
          prev.map((v) =>
            v.id === ventureId ? { ...v, kpis: v.kpis.filter((k) => k.id !== kpiId) } : v,
          ),
        );
        toast.success(`KPI "${kpiNameStr}" deleted.`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message || "Failed to delete KPI");
    }
  };

  if (authLoading) {
    return (
      <main className="flex-1 flex items-center justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    );
  }

  if (!user) {
    return (
      <>
        <TopBar title="Credit & Evaluation Architecture" breadcrumb="Governance & Outcomes" />
        <main className="flex-1 px-6 py-12 lg:px-10">
          <div className="glass-strong max-w-xl mx-auto rounded-2xl p-10 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-mono text-xl tracking-tight text-foreground font-semibold">
              Sign In Required
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Student results and evaluation KPIs are private to individual students. Please sign in with your student account to view your evaluation result.
            </p>
            <div className="pt-2">
              <Link to="/auth">
                <Button className="font-mono text-xs uppercase tracking-wider">
                  Sign In to View Result
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopBar title="Credit & Evaluation Architecture" breadcrumb="Governance & Outcomes" />
      <main className="flex-1 space-y-8 px-6 py-8 lg:px-10 lg:py-10">
        {/* Banner Section */}
        <section className="glass-strong rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-mono text-xl tracking-tight">Venture Evaluation & KPIs</h2>
                  {canEdit ? (
                    <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-[10px]">
                      <ShieldCheck className="mr-1 h-3 w-3" />
                      Admin Control Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] text-muted-foreground"
                    >
                      Private Student Mode ({user.email})
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Track performance indicators, grades, and granular subgrades across your registered ventures.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {canEdit && studentId && (
                <Link to="/result">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-mono text-xs border-primary/30 text-primary"
                  >
                    <X className="mr-1.5 h-3.5 w-3.5" /> Show All Student Results
                  </Button>
                </Link>
              )}
              {canEdit && (
                <Button
                  onClick={() => setVentureModalOpen(true)}
                  className="font-mono text-xs uppercase tracking-wider shrink-0"
                >
                  <FolderPlus className="mr-1.5 h-4 w-4" />
                  Add Venture
                </Button>
              )}
            </div>
          </div>
        </section>

        {accessDeniedMessage ? (
          <div className="glass-strong rounded-2xl p-10 text-center space-y-4 border border-destructive/30">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/15 ring-1 ring-destructive/30">
              <ShieldAlert className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="font-mono text-lg font-semibold text-foreground">Access Restricted</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">{accessDeniedMessage}</p>
            <div className="pt-2">
              <Link to="/result">
                <Button variant="outline" className="font-mono text-xs uppercase tracking-wider">
                  View My Result
                </Button>
              </Link>
            </div>
          </div>
        ) : loading ? (
          <div className="flex h-40 items-center justify-center font-mono text-xs text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
            Connecting & loading venture KPIs from Supabase...
          </div>
        ) : ventures.length === 0 ? (
          <div className="glass-strong rounded-2xl p-12 text-center space-y-3">
            <p className="font-mono text-sm text-muted-foreground">
              No registered venture records found for your account.
            </p>
            {canEdit ? (
              <Button
                variant="outline"
                onClick={() => setVentureModalOpen(true)}
                className="font-mono text-xs border-primary/30 text-primary"
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Create First Venture
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground/70">
                Please wait for faculty to publish your venture evaluations.
              </p>
            )}
          </div>
        ) : (
          /* Ventures List */
          ventures.map((venture) => (
            <div key={venture.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-mono text-lg font-semibold tracking-tight text-foreground">
                    {venture.subject}
                  </h2>
                  {venture.studentName && (
                    <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
                      Student: {venture.studentName} {venture.rollNo && `(Roll: ${venture.rollNo})`}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {canEdit && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenAddKpi(venture.id)}
                        className="font-mono text-xs border-primary/30 hover:bg-primary/10 text-primary"
                      >
                        <Plus className="mr-1.5 h-3.5 w-3.5" />
                        Add KPI
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteVenture(venture.id, venture.subject)}
                        className="font-mono text-xs text-muted-foreground hover:text-destructive"
                        title="Delete Venture"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <section className="glass-strong overflow-hidden rounded-2xl">
                <div>
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-3 border-b border-border/50 bg-background/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <div className="col-span-7 sm:col-span-8">KPI</div>
                    <div className="col-span-2">Obtained Marks</div>
                    <div className="col-span-2 sm:col-span-1">Total</div>
                    {canEdit && <div className="col-span-1 text-right">Action</div>}
                  </div>

                  {/* KPI List */}
                  {venture.kpis.length === 0 ? (
                    <div className="p-6 text-center text-xs font-mono text-muted-foreground">
                      No KPIs added for this venture yet.
                      {canEdit && (
                        <span
                          className="block mt-1 text-primary cursor-pointer hover:underline"
                          onClick={() => handleOpenAddKpi(venture.id)}
                        >
                          + Add the first KPI
                        </span>
                      )}
                    </div>
                  ) : (
                    venture.kpis.map((kpi, kpiIdx) => {
                      const hasSubcategories = Boolean(
                        kpi.subcategories && kpi.subcategories.length > 0,
                      );
                      const isOpen = Boolean(openRows[kpi.id]);

                      return (
                        <div
                          key={kpi.id || kpiIdx}
                          className="border-b border-border/30 last:border-b-0"
                        >
                          {/* Main KPI Row */}
                          <div
                            onClick={() => hasSubcategories && toggleRow(kpi.id)}
                            className={`grid grid-cols-12 items-center gap-3 px-5 py-4 transition-colors ${
                              hasSubcategories
                                ? "cursor-pointer hover:bg-background/60"
                                : "cursor-default"
                            }`}
                          >
                            {/* Name + Toggle Icon */}
                            <div className="col-span-7 sm:col-span-8">
                              <div className="flex items-center gap-2">
                                {hasSubcategories ? (
                                  <button
                                    type="button"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                    aria-label={
                                      isOpen ? "Collapse subcategories" : "Expand subcategories"
                                    }
                                  >
                                    {isOpen ? (
                                      <ChevronDown className="h-4 w-4 shrink-0 text-primary" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 shrink-0" />
                                    )}
                                  </button>
                                ) : (
                                  <span className="w-4" />
                                )}
                                <p className="font-mono text-sm font-medium">{kpi.name}</p>
                                {hasSubcategories && (
                                  <Badge
                                    variant="secondary"
                                    className="font-mono text-[9px] py-0 px-1.5"
                                  >
                                    {kpi.subcategories?.length} subgrade
                                    {kpi.subcategories!.length > 1 ? "s" : ""}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Grades */}
                            <div className="col-span-2 text-xs font-mono text-muted-foreground">
                              {kpi.obtainGrade}
                            </div>
                            <div className="col-span-2 sm:col-span-1 text-xs font-mono text-muted-foreground">
                              {kpi.totalGrade}
                            </div>

                            {canEdit && (
                              <div className="col-span-1 text-right">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteKpi(kpi.id, kpi.name, venture.id);
                                  }}
                                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                  title="Delete KPI"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Dropdown Subcategories / Subgrades */}
                          {hasSubcategories && isOpen && (
                            <div className="border-t border-border/20 bg-background/20 pl-6">
                              {kpi.subcategories?.map((sub, subIdx) => (
                                <div
                                  key={sub.id || subIdx}
                                  className="grid grid-cols-12 items-center gap-3 border-b border-border/10 px-5 py-3 last:border-b-0"
                                >
                                  <div className="col-span-7 sm:col-span-8 flex items-center gap-2">
                                    <span className="text-muted-foreground/40 font-mono text-xs">
                                      └
                                    </span>
                                    <p className="text-xs font-mono text-muted-foreground">
                                      {sub.name}
                                    </p>
                                  </div>
                                  <div className="col-span-2 text-xs font-mono text-muted-foreground/80">
                                    {sub.obtainGrade}
                                  </div>
                                  <div className="col-span-2 sm:col-span-1 text-xs font-mono text-muted-foreground/80">
                                    {sub.totalGrade}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            </div>
          ))
        )}

        {/* Modal: Add Venture */}
        <Dialog open={ventureModalOpen} onOpenChange={setVentureModalOpen}>
          <DialogContent className="glass-strong border-border/60 max-w-md">
            <DialogHeader>
              <DialogTitle className="font-mono text-lg flex items-center gap-2">
                <FolderPlus className="h-4 w-4 text-primary" />
                Add New Venture Project
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleAddVentureSubmit} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="vSub"
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Venture / Project Subject
                </Label>
                <Input
                  id="vSub"
                  placeholder="e.g. FinTech Payments App"
                  value={ventureSubject}
                  onChange={(e) => setVentureSubject(e.target.value)}
                  className="bg-background/40 font-mono text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="vStud"
                    className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Student Name
                  </Label>
                  <Input
                    id="vStud"
                    placeholder="e.g. Aditya Sharma"
                    value={ventureStudentName}
                    onChange={(e) => setVentureStudentName(e.target.value)}
                    className="bg-background/40 font-mono text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="vRoll"
                    className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Roll No. (Optional)
                  </Label>
                  <Input
                    id="vRoll"
                    placeholder="e.g. 43"
                    value={ventureRollNo}
                    onChange={(e) => setVentureRollNo(e.target.value)}
                    className="bg-background/40 font-mono text-sm"
                  />
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setVentureModalOpen(false)}
                  className="font-mono text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submittingVenture}
                  className="font-mono text-xs uppercase tracking-wider"
                >
                  {submittingVenture && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                  Create Venture
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal: Add KPI */}
        <Dialog open={kpiModalOpen} onOpenChange={setKpiModalOpen}>
          <DialogContent className="glass-strong border-border/60 max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-mono text-lg flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" />
                Add New KPI
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleAddKpiSubmit} className="space-y-5 py-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="kpiName"
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  KPI / Metric Name
                </Label>
                <Input
                  id="kpiName"
                  placeholder="e.g. Market Research & Validation"
                  value={kpiName}
                  onChange={(e) => setKpiName(e.target.value)}
                  className="bg-background/40 font-mono text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="kpiObtain"
                    className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Obtained Grade / Marks
                  </Label>
                  <Input
                    id="kpiObtain"
                    placeholder="e.g. 8.5/10"
                    value={kpiObtain}
                    onChange={(e) => setKpiObtain(e.target.value)}
                    className="bg-background/40 font-mono text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="kpiTotal"
                    className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Total Marks
                  </Label>
                  <Input
                    id="kpiTotal"
                    type="number"
                    value={kpiTotal}
                    onChange={(e) => setKpiTotal(Number(e.target.value))}
                    className="bg-background/40 font-mono text-sm"
                    required
                  />
                </div>
              </div>

              {/* Subgrades Section Inside Modal */}
              <div className="space-y-3 pt-2 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Subgrades / Subcategories (Optional)
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddDraftSubgrade}
                    className="h-7 font-mono text-[11px] border-primary/30 hover:bg-primary/10 text-primary"
                  >
                    <Plus className="mr-1 h-3 w-3" /> Add Subgrade
                  </Button>
                </div>

                {subgradesList.length === 0 ? (
                  <p className="text-[11px] font-mono text-muted-foreground/70 italic">
                    No subgrades added. Click "+ Add Subgrade" above to add sub-metrics to this KPI.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {subgradesList.map((sub, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 gap-2 items-center rounded-lg border border-border/40 bg-background/30 p-2.5"
                      >
                        <div className="col-span-5">
                          <Input
                            placeholder="Subgrade Name (e.g. Theory)"
                            value={sub.name}
                            onChange={(e) => handleUpdateDraftSubgrade(idx, "name", e.target.value)}
                            className="h-8 bg-background/50 font-mono text-xs"
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            placeholder="Obtained (e.g. 9/10)"
                            value={sub.obtainGrade}
                            onChange={(e) =>
                              handleUpdateDraftSubgrade(idx, "obtainGrade", e.target.value)
                            }
                            className="h-8 bg-background/50 font-mono text-xs"
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            placeholder="Total Marks"
                            value={sub.totalGrade}
                            onChange={(e) =>
                              handleUpdateDraftSubgrade(idx, "totalGrade", Number(e.target.value))
                            }
                            className="h-8 bg-background/50 font-mono text-xs"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveDraftSubgrade(idx)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            aria-label="Remove subgrade"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setKpiModalOpen(false)}
                  className="font-mono text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="font-mono text-xs uppercase tracking-wider"
                >
                  {submitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                  Save KPI
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
