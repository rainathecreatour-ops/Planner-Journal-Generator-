import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SettingsSchema } from "@/lib/validation";
import { getSessionIdFromRequest } from "@/lib/session";
import { getPlanForSession, clampPages, enforceProjectLimit } from "@/lib/entitlements";

export async function GET(req: Request) {
  const sessionId = getSessionIdFromRequest(req as any);
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { sessionId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, type: true, status: true, updatedAt: true }
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const sessionId = getSessionIdFromRequest(req as any);
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const plan = await getPlanForSession(sessionId);

  const body = await req.json().catch(() => ({}));
  const parsed = SettingsSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  try {
    await enforceProjectLimit(sessionId, plan);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Limit reached" }, { status: 403 });
  }

  const settings = parsed.data;
  const clampedPages = clampPages(settings.pages, plan);

  const project = await prisma.project.create({
    data: {
      sessionId,
      type: settings.format,
      title: settings.title,
      settings: { ...settings, pages: clampedPages }
    },
    select: { id: true }
  });

  return NextResponse.json({ id: project.id, plan, pages: clampedPages });
}
