import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sha256 } from "@/lib/auth";

export async function POST(req: Request) {
  const admin = req.headers.get("x-admin-secret");
  if (!admin || admin !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  const rawCode = String(body?.code ?? "").trim(); // you supply the code you want
  const plan = String(body?.plan ?? "pro").toLowerCase();
  const maxUses = Number(body?.maxUses ?? 1);
  const note = body?.note ? String(body.note) : null;

  if (!rawCode) return NextResponse.json({ error: "code required" }, { status: 400 });

  const codeHash = sha256(rawCode);

  const created = await prisma.accessCode.upsert({
    where: { codeHash },
    update: { plan: plan === "studio" ? "studio" : plan === "free" ? "free" : "pro", maxUses, note },
    create: { codeHash, plan: plan === "studio" ? "studio" : plan === "free" ? "free" : "pro", maxUses, note }
  });

  return NextResponse.json({ ok: true, id: created.id, plan: created.plan, maxUses: created.maxUses });
}
