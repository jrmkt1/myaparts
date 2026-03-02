import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    // Passe a URL para ser interceptada caso necessário pelo Layout do Servidor.
    response.headers.set('x-pathname', request.nextUrl.pathname);
    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Corre em tudo menos recursos estáticos
}
