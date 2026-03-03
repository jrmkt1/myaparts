"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const totalItems = useCartStore((state) => state.getTotalItems());

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
        // eslint-disable-next-line react-hooks/set-state-in-effect
    }, []);

    const pathname = usePathname();
    if (pathname?.startsWith("/painel")) return null;

    return (
        <header className="w-full bg-white shadow-sm font-sans flex flex-col z-50 relative">
            {/* Top Bar - Contacts & Actions */}
            <div className="bg-industrial-900 text-industrial-100 py-1.5 px-4 md:px-8 flex justify-between items-center text-xs font-medium tracking-wide">
                <div className="flex items-center space-x-4">
                    <span className="flex items-center gap-2">
                        <Phone size={12} className="text-industrial-400" />
                        <span className="hidden md:inline text-industrial-200">Atendimento:</span> (11) 9999-9999
                    </span>
                    <span className="hidden md:inline-block text-industrial-600">|</span>
                    <span className="hidden md:inline text-industrial-200">Peças Especiais para Empilhadeiras</span>
                </div>
                <div className="flex items-center space-x-6">
                    <Link href="/painel" className="text-industrial-400 hover:text-white transition-colors flex items-center gap-1.5 uppercase text-[10px] tracking-widest font-bold">
                        <User size={12} /> <span className="hidden md:inline">Painel Administrativo</span>
                    </Link>
                </div>
            </div>

            {/* Main Header */}
            <div className="py-5 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                {/* Logo - Embedded Image */}
                <Link href="/" className="flex flex-col items-center md:items-start shrink-0 group">
                    <Image src="/mya-logo.png" alt="MYA Parts Logo" width={110} height={60} className="object-contain group-hover:opacity-80 transition-opacity" priority />
                    <span className="text-[10px] text-industrial-900 font-extrabold tracking-[0.25em] whitespace-nowrap mt-1 group-hover:text-action transition-colors">FORKLIFT PARTS</span>
                </Link>

                {/* Search Engine Center */}
                <div className="flex-1 w-full max-w-2xl px-4">
                    <form action="/busca" method="GET" className="relative flex items-center group">
                        <input
                            type="text"
                            name="q"
                            placeholder="Buscar por código OEM, nome, marca..."
                            className="w-full pl-5 pr-14 py-3 bg-industrial-100/50 border border-industrial-200 focus:border-industrial-400 focus:bg-white rounded-xl text-industrial-900 placeholder:text-industrial-400 outline-none transition-all shadow-inner text-sm font-medium"
                        />
                        <button
                            type="submit"
                            className="absolute right-1.5 p-1.5 bg-industrial-900 hover:bg-action text-white rounded-lg transition-colors shadow-sm"
                            aria-label="Buscar"
                        >
                            <Search size={18} />
                        </button>
                    </form>
                </div>

                {/* Quote Cart */}
                <div className="flex shrink-0">
                    <Link href="/orcamento" className="group flex items-center gap-3">
                        <div className="relative p-2.5 bg-industrial-100 rounded-xl group-hover:bg-industrial-200 transition-colors border border-industrial-200/50 shadow-sm">
                            <ShoppingCart size={22} className="text-industrial-900" />
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-industrial-900 text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border border-white shadow-sm">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <span className="text-[10px] text-industrial-400 font-bold uppercase tracking-wider">Meu Orçamento</span>
                            <span className="text-sm font-extrabold text-industrial-900 group-hover:text-action transition-colors">Abrir Lista</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Categories Navigation */}
            <nav className="bg-industrial-100/50 border-y border-industrial-200 px-4 md:px-8">
                <ul className="flex items-center justify-center md:justify-start gap-8 overflow-x-auto whitespace-nowrap py-2.5 hide-scrollbar text-xs font-bold text-industrial-600 uppercase tracking-widest">
                    <li><Link href="/produtos" className="hover:text-industrial-900 transition-colors">Catálogo Completo</Link></li>
                    <li className="w-px h-3 bg-industrial-300"></li>
                    <li><Link href="/busca?q=motor" className="hover:text-industrial-900 transition-colors">Motor</Link></li>
                    <li><Link href="/busca?q=freio" className="hover:text-industrial-900 transition-colors">Freio</Link></li>
                    <li><Link href="/busca?q=hidraulico" className="hover:text-industrial-900 transition-colors">Hidráulico</Link></li>
                    <li><Link href="/busca?q=eletrico" className="hover:text-industrial-900 transition-colors">Elétrico</Link></li>
                    <li className="w-px h-3 bg-industrial-300"></li>
                    <li><Link href="/busca?q=toyota" className="hover:text-industrial-900 transition-colors">Toyota</Link></li>
                    <li><Link href="/busca?q=hyster" className="hover:text-industrial-900 transition-colors">Hyster</Link></li>
                    <li><Link href="/busca?q=yale" className="hover:text-industrial-900 transition-colors">Yale</Link></li>
                </ul>
            </nav>
        </header>
    );
}
