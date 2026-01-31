import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionIdFromRequest } from "@/lib/auth";
import { SettingsSchema } from "@/lib/validation";
import { buildPlannerDesignImagePrompts } from "@/lib/buildPlannerDesignImagePrompts";
import { buildBlueprint } from "@/lib/buildBlueprint";

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const sessionId = getSessionIdFromRequest(req as any);
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const project = await prisma.project.findFirst({
    where: { id: ctx.params.id, sessionId }
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const parsed = SettingsSchema.parse(project.settings);
    const imagePrompts = buildPlannerDesignImagePrompts(parsed);
    const blueprint = buildBlueprint(parsed);

    await prisma.project.update({
      where: { id: project.id },
      data: { imagePrompts, blueprint, status: "generated" }
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "Generation failed", detail: String(e?.message ?? e) }, { status: 500 });
  }
}
