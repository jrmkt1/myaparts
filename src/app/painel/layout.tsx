import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Tag, Layers, FileText, LogOut, Settings } from "lucide-react";
import { logoutAction } from "@/actions/auth";

export default async function PainelLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    // For /painel/login we return raw children (layout is handled there)
    // We can't use headers() reliably for pathname, so we assume if there's no session, Next.js Middleware already handled it,
    // EXCEPT when the user is explicitly on /painel/login (middleware lets it pass).
    // This layout wraps EVERY route in /painel. To avoid showing the sidebar on the login page:
    if (!session) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-industrial-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-industrial-900 text-white flex flex-col shadow-2xl z-10 hidden md:flex">
                <div className="p-6 border-b border-industrial-800 flex flex-col">
                    <h2 className="text-2xl font-extrabold tracking-tight">MYA <span className="text-action">PARTS</span></h2>
                    <span className="text-xs text-industrial-400 font-semibold tracking-widest mt-1">SISTEMA ADMIN</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 text-sm font-medium overflow-y-auto">
                    <Link href="/painel/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-industrial-800 transition-colors">
                        <Settings size={18} className="text-industrial-400" /> Dashboard
                    </Link>
                    <div className="pt-4 pb-2">
                        <span className="px-3 text-xs uppercase tracking-widest text-industrial-400 font-bold">Catálogo</span>
                    </div>
                    <Link href="/painel/produtos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-industrial-800 transition-colors">
                        <Package size={18} className="text-action" /> Produtos
                    </Link>
                    <Link href="/painel/categorias" className="flex items-center gap-3 p-3 rounded-lg hover:bg-industrial-800 transition-colors">
                        <Layers size={18} className="text-industrial-400" /> Categorias
                    </Link>
                    <Link href="/painel/marcas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-industrial-800 transition-colors">
                        <Tag size={18} className="text-industrial-400" /> Marcas
                    </Link>

                    <div className="pt-4 pb-2">
                        <span className="px-3 text-xs uppercase tracking-widest text-industrial-400 font-bold">Vendas</span>
                    </div>
                    <Link href="/painel/orcamentos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-industrial-800 transition-colors">
                        <FileText size={18} className="text-industrial-400" /> Orçamentos <span className="bg-action text-white text-[10px] px-2 py-0.5 rounded-full ml-auto">Novo</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-industrial-800 bg-industrial-900">
                    <div className="flex items-center gap-3 px-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-industrial-800 flex items-center justify-center font-bold text-action text-sm">
                            {session.user.name?.[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold truncate max-w-[130px]">{session.user.name}</span>
                            <span className="text-xs text-industrial-400 truncate max-w-[130px]">{session.user.email}</span>
                        </div>
                    </div>
                    <form action={logoutAction}>
                        <button className="flex w-full items-center gap-3 p-3 text-red-400 rounded-lg hover:bg-red-400/10 hover:text-red-300 transition-colors text-sm font-bold">
                            <LogOut size={18} /> Sair do Sistema
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-16 bg-white border-b border-industrial-200 flex items-center justify-between px-6 shadow-sm md:hidden">
                    <h2 className="font-bold text-industrial-900">MYA PARTS Admin</h2>
                    <form action={logoutAction}><button className="text-sm text-red-500 font-bold">Sair</button></form>
                </header>

                <div className="flex-1 overflow-auto p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
