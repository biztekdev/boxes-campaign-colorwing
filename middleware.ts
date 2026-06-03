import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rewrite root `/` to `/campaign` only in production deployments.
// During local development (`NODE_ENV !== 'production'`) the root will remain unchanged.
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (process.env.NODE_ENV === "production" && url.pathname === "/") {
    url.pathname = "/campaign";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
