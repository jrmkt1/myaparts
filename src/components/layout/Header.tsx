"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    ShoppingCart,
    Menu,
    X,
    Phone,
    Mail,
    ChevronRight,
    LayoutGrid,
    Wrench,
    Disc,
    Droplets,
    Zap,
    Cog,
    CircleDot,
    MessageSquare,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import AutocompleteSearch from "./AutocompleteSearch";

const NAV_LINKS = [
    { href: "/produtos", label: "Catálogo Completo", icon: LayoutGrid },
    { href: "/busca?q=motor", label: "Motor", icon: Wrench },
    { href: "/busca?q=freio", label: "Freio", icon: Disc },
    { href: "/busca?q=hidraulico", label: "Hidráulico", icon: Droplets },
    { href: "/busca?q=eletrico", label: "Elétrico", icon: Zap },
    { href: "/busca?q=transmissao", label: "Transmissão", icon: Cog },
    { href: "/busca?q=rolamento", label: "Rolamentos", icon: CircleDot },
    { href: "/contato", label: "Contato", icon: MessageSquare },
];

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const totalItems = useCartStore((state) => state.getTotalItems());
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    if (pathname?.startsWith("/painel")) return null;

    return (
        <>
            <header
                className={`w-full font-sans z-50 sticky top-0 transition-shadow duration-300 bg-white ${
                    scrolled ? "shadow-lg" : "shadow-xs"
                }`}
            >
                {/* ── Slim light top bar ── */}
                <div className="bg-slate-100 border-b border-slate-200 text-slate-600 py-1 px-4 md:px-6 text-[11px] font-semibold">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <a
                                href="https://wa.me/5519971441580"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 hover:text-[#121b33] transition-colors"
                            >
                                <Phone size={11} className="text-[#16a34a]" />
                                <span>WhatsApp: (19) 97144-1580</span>
                            </a>
                            <span className="hidden md:inline text-slate-300">|</span>
                            <a
                                href="mailto:contato@myaparts.com.br"
                                className="hidden md:flex items-center gap-1.5 hover:text-[#121b33] transition-colors"
                            >
                                <Mail size={11} className="text-slate-400" />
                                <span>contato@myaparts.com.br</span>
                            </a>
                        </div>
                        <span className="hidden sm:inline text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                            Peças para Empilhadeiras
                        </span>
                    </div>
                </div>

                {/* ── Main header — WHITE (Logo + Search + Cart) ── */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 min-h-[72px] md:min-h-[82px] py-3 flex items-center justify-between md:justify-start gap-4 md:gap-8">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex flex-col items-start shrink-0 group py-0.5"
                            aria-label="MYA Parts - Início"
                        >
                            <Image
                                src="/mya-logo.png"
                                alt="MYA Parts Logo"
                                width={125}
                                height={50}
                                className="w-[98px] md:w-[125px] h-auto object-contain group-hover:opacity-85 transition-opacity"
                                priority
                            />
                        </Link>

                        {/* Search — flex-1 center (Desktop) */}
                        <AutocompleteSearch variant="desktop" />

                        {/* Right — Actions */}
                        <div className="flex items-center gap-2 md:gap-3 shrink-0">
                            <Link href="/orcamento" className="group flex items-center gap-2.5" aria-label="Meu Orçamento">
                                <div className="relative p-2 md:p-2.5 bg-slate-100 rounded-[2px] group-hover:bg-[#121b33] group-hover:text-white transition-colors border border-slate-200">
                                    <ShoppingCart size={18} className="md:size-[20px] text-[#121b33] group-hover:text-white transition-colors" />
                                    {mounted && totalItems > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-[#16a34a] text-white text-[9px] md:text-[10px] font-extrabold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border border-white shadow-xs">
                                            {totalItems > 99 ? "99+" : totalItems}
                                        </span>
                                    )}
                                </div>
                                <div className="hidden lg:flex flex-col leading-tight">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Meu Orçamento</span>
                                    <span className="text-sm font-extrabold text-[#121b33]">Abrir Lista</span>
                                </div>
                            </Link>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                                aria-expanded={mobileOpen}
                                className="md:hidden p-2.5 rounded-[2px] text-white bg-[#121b33] hover:bg-[#1a264a] transition-all"
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Row */}
                    <div className="md:hidden px-4 pb-3">
                        <AutocompleteSearch variant="mobile" />
                    </div>
                </div>

                {/* ── Sub-nav — BRAND NAVY BLUE (#121b33) WITH WHITE TEXT ── */}
                <nav className="hidden md:block bg-[#121b33] border-b border-[#0c1224] shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <ul className="flex items-center justify-between overflow-x-auto hide-scrollbar">
                            {NAV_LINKS.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href} className="shrink-0">
                                        <Link
                                            href={link.href}
                                            className={`flex items-center gap-2 px-4 py-3 text-[11px] font-extrabold uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${
                                                isActive
                                                    ? "text-white bg-white/15 border-white"
                                                    : "text-white hover:text-white hover:bg-white/10 border-transparent hover:border-white/60"
                                            }`}
                                        >
                                            <Icon size={13} className="text-white/80 shrink-0" />
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-[60] flex">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileOpen(false)}
                    />
                    <nav className="relative ml-auto w-72 max-w-full h-full bg-white shadow-2xl flex flex-col overflow-y-auto">
                        <div className="flex items-center justify-between p-4 bg-[#121b33] text-white">
                            <span className="font-extrabold text-sm uppercase tracking-widest">Menu de Categorias</span>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-1.5 rounded-[2px] text-white/80 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <ul className="flex-1 py-3 px-2 space-y-1">
                            {NAV_LINKS.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center justify-between px-4 py-3 rounded-[2px] text-xs font-extrabold text-[#121b33] hover:text-white hover:bg-[#121b33] transition-all uppercase tracking-wider group"
                                        >
                                            <span className="flex items-center gap-2.5">
                                                <Icon size={15} className="text-slate-500 group-hover:text-white transition-colors" />
                                                {link.label}
                                            </span>
                                            <ChevronRight size={14} className="opacity-40 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="p-4 border-t border-slate-200">
                            <a
                                href="https://wa.me/5519971441580"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[#16a34a] text-sm font-bold"
                            >
                                <Phone size={14} />
                                (19) 97144-1580
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
