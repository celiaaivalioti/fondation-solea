import { NextResponse, type NextRequest } from "next/server";

// Until launch, the main domain shows only the coming-soon page; the full
// site stays reachable on preview.fondation-solea.ch. Remove this gate (or
// empty the set) to go live on the main domain.
const gatedHosts = new Set(["fondation-solea.ch", "www.fondation-solea.ch"]);

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (!gatedHosts.has(host)) {
    return NextResponse.next();
  }

  const response = request.nextUrl.pathname.startsWith("/bientot")
    ? NextResponse.next()
    : NextResponse.rewrite(new URL("/bientot", request.url));

  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  return response;
}

export const config = {
  // Static assets keep working so the coming-soon page can use the logo.
  matcher: ["/((?!_next/|images/|favicon.ico).*)"]
};
