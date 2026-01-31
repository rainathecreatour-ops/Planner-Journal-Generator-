export type Plan = "free" | "pro" | "studio";

export const PLAN_LIMITS: Record<Plan, { maxPages: number; maxProjects: number }> = {
  free: { maxPages: 10, maxProjects: 3 },
  pro: { maxPages: 60, maxProjects: 200 },
  studio: { maxPages: 200, maxProjects: 2000 }
};

export function normalizePlan(plan: string | null | undefined): Plan {
  const p = (plan ?? "").toLowerCase();
  if (p === "studio") return "studio";
  if (p === "pro") return "pro";
  return "free";
}
