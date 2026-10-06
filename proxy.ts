import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // The former preview and www aliases use the canonical live address once the
  // server has loaded production credentials. API routes stay direct for Stripe.
  const primaryOrigin = process.env.SOLEA_PRIMARY_SITE_ORIGIN;
  const host = request.headers.get("host")?.toLowerCase().split(":")[0] || request.nextUrl.hostname;
  if (primaryOrigin === "https://fondation-solea.ch" &&
      (host === "preview.fondation-solea.ch" || host === "www.fondation-solea.ch")) {
    const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, primaryOrigin);
    return NextResponse.redirect(destination, 307);
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.png|images|api).*)"]
};
