import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "pg_session";

export function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function getSessionIdFromRequest(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

export function setSessionCookie(res: NextResponse, sessionId: string) {
  res.cookies.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
}
