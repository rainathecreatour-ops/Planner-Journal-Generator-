import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setSessionCookie, sha256 } from "@/lib/auth";

async function ensureDemoCode() {
  if (process.env.SEED_DEMO_CODE !== "true") return;

  const demo = "DEMO-1234";
  const hash = sha256(demo);

  const existing = await prisma.accessCode.findUnique({ where: { codeHash: hash } });
  if (existing) return;

  await prisma.accessCode.create({
    data: { codeHash: hash, plan: "pro", maxUses: 999 }
  });
}

export async function POST(req: Request) {
  await ensureDemoCode();

  const body = await req.json().catch(() => ({}));
  const code = String(body?.code ?? "").trim();

  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

  const codeHash = sha256(code);
  const record = await prisma.accessCode.findUnique({ where: { codeHash } });

  if (!record) return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  if (record.expiresAt && record.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "Code expired" }, { status: 401 });
  }
  if (record.uses >= record.maxUses) {
    return NextResponse.json({ error: "Code already used" }, { status: 401 });
  }

  const session = await prisma.session.create({ data: { accessCodeId: record.id } });

  await prisma.accessCode.update({
    where: { id: record.id },
    data: { uses: record.uses + 1 }
  });

  const res = NextResponse.json({ ok: true, plan: record.plan });
  setSessionCookie(res, session.id);
  return res;
}
