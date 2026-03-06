import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Step 1: Protect admin routes (except login page)
    // Check for the session cookie — the actual auth validation happens
    // in the (admin)/layout.tsx server component which has full Prisma access.
    // This middleware is a fast guard to redirect unauthenticated browsers
    // before they even hit the page render.
    if (pathname.startsWith("/painel") && !pathname.startsWith("/painel/login")) {
        const sessionCookie =
            request.cookies.get("authjs.session-token") ||
            request.cookies.get("__Secure-authjs.session-token");

        if (!sessionCookie) {
            const loginUrl = new URL("/painel/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Step 2: Clone headers and inject x-pathname for Layout usage
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
}
