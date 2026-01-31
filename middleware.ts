import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionIdFromRequest } from "@/lib/session";


export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith("/dashboard")) {
    const sessionId = getSessionIdFromRequest(req);
    if (!sessionId) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
