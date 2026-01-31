import { prisma } from "@/lib/db";
import { PLAN_LIMITS, normalizePlan, type Plan } from "@/lib/plans";

export async function getPlanForSession(sessionId: string): Promise<Plan> {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { accessCode: true }
  });
  return normalizePlan(session?.accessCode?.plan);
}

export function clampPages(requestedPages: number, plan: Plan) {
  return Math.min(requestedPages, PLAN_LIMITS[plan].maxPages);
}

export async function enforceProjectLimit(sessionId: string, plan: Plan) {
  const count = await prisma.project.count({ where: { sessionId } });
  const max = PLAN_LIMITS[plan].maxProjects;
  if (count >= max) throw new Error(`Project limit reached for ${plan} plan (${max}).`);
}
