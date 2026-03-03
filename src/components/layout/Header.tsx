"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu, X, Phone, User, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const NAV_LINKS = [
    { href: "/produtos", label: "Catálogo Completo" },
    { href: "/busca?q=motor", label: "Motor" },
    { href: "/busca?q=freio", label: "Freio" },
    { href: "/busca?q=hidraulico", label: "Hidráulico" },
    { href: "/busca?q=eletrico", label: "Elétrico" },
    { href: "/busca?q=transmissao", label: "Transmissão" },
    { href: "/busca?q=rolamento", label: "Rolamentos" },
];

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    const totalItems = useCartStore((state) => state.getTotalItems());
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [pathname]);

    if (pathname?.startsWith("/painel")) return null;

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const q = searchRef.current?.value.trim();
        if (q) router.push(`/busca?q=${encodeURIComponent(q)}`);
    };

    return (
        <>
            <header
                className={`w-full font-sans z-50 sticky top-0 transition-all duration-500 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg shadow-industrial-900/5 py-1 md:py-0"
                    : "bg-white shadow-sm"
                    }`}
            >
                {/* ── Top bar ── */}
                <div className="bg-industrial-900 text-industrial-200 py-1.5 px-4 md:px-8 flex justify-between items-center text-xs font-medium tracking-wide">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <Phone size={11} className="text-industrial-400" />
                            <span className="hidden md:inline text-industrial-400">Atendimento:</span>
                            (11) 9999-9999
                        </span>
                        <span className="hidden md:inline text-industrial-600">|</span>
                        <span className="hidden md:inline text-industrial-400">Peças Especiais para Empilhadeiras</span>
                    </div>
                    <Link
                        href="/painel"
                        className="flex items-center gap-1.5 text-industrial-400 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold"
                    >
                        <User size={11} />
                        <span className="hidden md:inline">Painel Administrativo</span>
                    </Link>
                </div>

                {/* ── Main header — WHITE ── */}
                <div className="bg-white border-b border-industrial-200">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[100px] md:min-h-[120px] py-6 md:py-5 flex items-center justify-between md:justify-start gap-4 md:gap-10">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex flex-col items-start shrink-0 group py-1"
                            aria-label="MYA Parts - Início"
                        >
                            <div className="relative w-[130px] h-[62px] md:w-[150px] md:h-[72px]">
                                <Image
                                    src="/mya-logo.png"
                                    alt="MYA Parts Logo"
                                    fill
                                    className="object-contain group-hover:opacity-80 transition-opacity"
                                    priority
                                />
                            </div>
                            <span className="text-[9px] md:text-[11px] text-industrial-900 font-extrabold tracking-[0.25em] whitespace-nowrap mt-1 group-hover:text-action transition-colors">
                                FORKLIFT PARTS
                            </span>
                        </Link>

                        {/* Search — flex-1 center (Desktop only in this row) */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden md:flex flex-1 max-w-2xl mx-auto items-center"
                        >
                            <div className="w-full flex items-center bg-industrial-100/60 border border-industrial-200 rounded-lg hover:border-industrial-400 focus-within:border-industrial-400 focus-within:bg-white focus-within:shadow-md transition-all">
                                <input
                                    ref={searchRef}
                                    type="text"
                                    name="q"
                                    placeholder="Buscar por código OEM, nome, marca..."
                                    className="w-full px-4 py-3 bg-transparent outline-none text-sm font-medium text-industrial-900 placeholder:text-industrial-400"
                                />
                                <button
                                    type="submit"
                                    aria-label="Buscar"
                                    className="mr-1.5 p-2 bg-industrial-900 hover:bg-action text-white rounded-md transition-colors shrink-0"
                                >
                                    <Search size={16} />
                                </button>
                            </div>
                        </form>

                        {/* Right — Actions */}
                        <div className="flex items-center gap-2 md:gap-3 shrink-0">
                            <Link href="/orcamento" className="group flex items-center gap-2.5" aria-label="Meu Orçamento">
                                <div className="relative p-2 md:p-2.5 bg-industrial-100 rounded-xl group-hover:bg-industrial-200 transition-colors border border-industrial-200/50">
                                    <ShoppingCart size={18} className="md:size-[20px] text-industrial-900" />
                                    {mounted && totalItems > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-industrial-900 text-white text-[9px] md:text-[10px] font-extrabold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border border-white shadow-sm">
                                            {totalItems > 99 ? "99+" : totalItems}
                                        </span>
                                    )}
                                </div>
                                <div className="hidden lg:flex flex-col leading-tight">
                                    <span className="text-[10px] text-industrial-400 font-bold uppercase tracking-wider">Meu Orçamento</span>
                                    <span className="text-sm font-extrabold text-industrial-900 group-hover:text-action transition-colors">Abrir Lista</span>
                                </div>
                            </Link>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                                aria-expanded={mobileOpen}
                                className="md:hidden p-2.5 rounded-xl text-industrial-600 hover:text-industrial-900 hover:bg-industrial-100 transition-all border border-transparent hover:border-industrial-200"
                            >
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Row */}
                    <div className="md:hidden px-6 pb-6">
                        <form
                            onSubmit={handleSearch}
                            className="w-full"
                        >
                            <div className="w-full flex items-center bg-industrial-100/60 border border-industrial-200 rounded-lg focus-within:border-industrial-400 focus-within:bg-white focus-within:shadow-md transition-all">
                                <Search size={14} className="ml-3 text-industrial-400" />
                                <input
                                    ref={pathname === '/' ? undefined : searchRef} // Avoid conflict for initial page
                                    type="text"
                                    name="q"
                                    placeholder="OEM, nome ou marca..."
                                    className="w-full px-2 py-2.5 bg-transparent outline-none text-xs font-medium text-industrial-900 placeholder:text-industrial-400"
                                />
                                <button
                                    type="submit"
                                    className="mr-1.5 px-3 py-1.5 bg-industrial-900 text-white rounded-md text-[10px] font-bold uppercase"
                                >
                                    Buscar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* ── Sub-nav — WHITE ── */}
                <nav className="hidden md:block bg-white border-b border-industrial-200">
                    <div className="max-w-7xl mx-auto px-6">
                        <ul className="flex items-center gap-0 overflow-x-auto hide-scrollbar py-0">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`block px-5 py-4 text-[11px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 ${pathname === link.href
                                            ? "text-industrial-900 border-action"
                                            : "text-industrial-500 border-transparent hover:text-industrial-900 hover:border-industrial-300"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header >

            {/* Mobile Drawer */}
            {
                mobileOpen && (
                    <div className="md:hidden fixed inset-0 z-40 flex">
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <nav className="relative ml-auto w-72 max-w-full h-full bg-white shadow-2xl flex flex-col overflow-y-auto">
                            <div className="flex items-center justify-between p-4 border-b border-industrial-200">
                                <span className="text-industrial-900 font-extrabold text-sm uppercase tracking-widest">Menu</span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-1.5 rounded-lg text-industrial-500 hover:text-industrial-900 hover:bg-industrial-100 transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <ul className="flex-1 py-4 px-2 space-y-0.5">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold text-industrial-600 hover:text-industrial-900 hover:bg-industrial-100 transition-all uppercase tracking-wider"
                                        >
                                            {link.label}
                                            <ChevronRight size={14} className="opacity-40" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-4 border-t border-industrial-200">
                                <a href="tel:+551199999999" className="flex items-center gap-2 text-industrial-500 text-sm font-medium">
                                    <Phone size={14} />
                                    (11) 9999-9999
                                </a>
                            </div>
                        </nav>
                    </div>
                )
            }
        </>
    );
}
