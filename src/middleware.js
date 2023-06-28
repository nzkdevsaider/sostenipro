import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const appPath = "/app";

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const redirectUrl = req.nextUrl.clone();

  if (!session) {
    if (req.nextUrl.pathname.startsWith(appPath)) {
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  }
  return res;
}

export const config = {
  matcher: [`/app/:path*`],
};
