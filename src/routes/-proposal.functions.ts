import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const fetchProposals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: proposals, error } = await context.supabase
      .from("proposal")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to load proposals: ${error.message}`);
    }

    if (!proposals || proposals.length === 0) return [];

    // Gather unique user_ids from proposals
    const userIds = Array.from(
      new Set(proposals.map((p) => p.user_id).filter((id): id is string => Boolean(id)))
    );

    const rolesMap: Record<string, { user_id: string; roll_no: string | null; email: string | null }> = {};

    if (userIds.length > 0) {
      const { data: rolesData } = await context.supabase
        .from("user_roles")
        .select("user_id, roll_no, email")
        .in("user_id", userIds);

      if (rolesData) {
        for (const r of rolesData) {
          rolesMap[r.user_id] = r;
        }
      }
    }

    return proposals.map((p) => ({
      ...p,
      user_roles: p.user_id ? rolesMap[p.user_id] ?? null : null,
    }));
  });

export const fetchMentors = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("user_id, email")
      .eq("role", "mentor")
      .order("email");

    if (error) {
      throw new Error(`Failed to load mentors: ${error.message}`);
    }
    return data ?? [];
  });
