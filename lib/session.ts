import type { NextRequest } from "next/server";

const COOKIE_NAME = "pg_session";

export function getSessionIdFromRequest(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
