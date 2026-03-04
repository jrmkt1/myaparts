import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Passo 1: Clona os cabeçalhos recebidos
    const requestHeaders = new Headers(request.headers);
    // Passo 2: Define o cabeçalho novo com o caminho atual
    requestHeaders.set('x-pathname', request.nextUrl.pathname);

    // Passo 3: Retorna a resposta passando essa "nova Request" pra frente pra o Layout conseguir ler!
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Corre em tudo menos recursos estáticos
}
