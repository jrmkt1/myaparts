"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchAutocomplete } from "@/actions/search";

interface AutocompleteSearchProps {
    variant?: "desktop" | "mobile";
}

interface SearchResult {
    id: string;
    name: string;
    part_number: string;
    slug: string;
    brand: string | null;
    category: string | null;
    image: string | null;
}

export default function AutocompleteSearch({ variant = "desktop" }: AutocompleteSearchProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounce typing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    // Fetch results
    useEffect(() => {
        if (!debouncedQuery || debouncedQuery.trim().length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await searchAutocomplete(debouncedQuery);
                setResults(res);
                setIsOpen(true);
            } catch (error) {
                console.error("Erro na busca relampago:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const isDesktop = variant === "desktop";

    return (
        <div ref={containerRef} className={`relative ${isDesktop ? "hidden md:flex flex-1 max-w-2xl mx-auto items-center" : "w-full"}`}>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full flex items-center bg-slate-100/80 border border-slate-200 rounded-[2px] hover:border-slate-400 focus-within:border-[#121b33] focus-within:bg-white focus-within:shadow-md transition-all">
                    {!isDesktop && <Search size={14} className="ml-3 text-slate-400" />}

                    <input
                        type="text"
                        name="q"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => {
                            if (query.trim().length >= 2) setIsOpen(true);
                        }}
                        autoComplete="off"
                        placeholder={isDesktop ? "Buscar por código OEM, nome, marca..." : "OEM, nome ou marca..."}
                        className={`w-full bg-transparent outline-none font-medium text-slate-900 placeholder:text-slate-400 ${isDesktop ? "px-4 py-3 text-sm" : "px-2 py-2.5 text-xs"}`}
                    />

                    <button
                        type="submit"
                        aria-label="Buscar"
                        className={
                            isDesktop
                                ? "mr-1.5 p-2 bg-[#121b33] hover:bg-[#1a264a] text-white rounded-[2px] transition-colors shrink-0"
                                : "mr-1.5 px-3 py-1.5 bg-[#121b33] text-white rounded-[2px] text-[10px] font-bold uppercase shrink-0"
                        }
                    >
                        {isDesktop ? <Search size={16} /> : "Buscar"}
                    </button>
                </div>
            </form>

            {/* Dropdown Autocomplete */}
            {isOpen && debouncedQuery.trim().length >= 2 && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-slate-200 rounded-[2px] shadow-2xl overflow-hidden z-[100] flex flex-col">
                    {loading && (
                        <div className="flex items-center gap-2 p-4 text-sm text-slate-500 justify-center">
                            <Loader2 size={16} className="animate-spin" /> Buscando...
                        </div>
                    )}

                    {!loading && results.length === 0 && (
                        <div className="p-4 text-center text-sm text-slate-500">
                            Nenhuma peça encontrada para <span className="font-bold text-slate-900">&ldquo;{debouncedQuery}&rdquo;</span>
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <div className="max-h-[340px] overflow-y-auto w-full hide-scrollbar">
                            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50">
                                <span>Peças Encontradas</span>
                                <span>{results.length} resultado{results.length !== 1 ? "s" : ""}</span>
                            </div>
                            <ul className="divide-y divide-slate-100">
                                {results.map((product) => (
                                    <li key={product.id}>
                                        <Link
                                            href={`/produto/${product.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="group flex flex-row items-center gap-3 p-3 hover:bg-slate-50 transition-colors"
                                        >
                                            {/* Thumbnail image */}
                                            <div className="w-12 h-12 shrink-0 bg-white border border-slate-200 rounded-[2px] p-1 flex items-center justify-center overflow-hidden">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={44}
                                                        height={44}
                                                        loading="lazy"
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <Package size={18} className="text-slate-300" />
                                                )}
                                            </div>

                                            {/* Product info */}
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <span className="text-xs font-extrabold text-slate-900 truncate group-hover:text-[#121b33] transition-colors">
                                                    {product.name}
                                                </span>
                                                <span className="text-[11px] text-slate-500 truncate mt-0.5">
                                                    Cód. OEM: <strong className="font-mono text-slate-800">{product.part_number}</strong>
                                                </span>
                                            </div>

                                            {/* Brand badge */}
                                            {product.brand && (
                                                <div className="shrink-0 hidden sm:flex items-center">
                                                    <span className="text-[10px] uppercase font-extrabold text-white bg-[#121b33] px-2 py-0.5 rounded-[2px]">
                                                        {product.brand}
                                                    </span>
                                                </div>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full text-center py-3 bg-slate-50 hover:bg-[#121b33] text-xs font-extrabold text-[#121b33] hover:text-white uppercase tracking-widest border-t border-slate-200 transition-colors"
                        >
                            Ver todos os resultados →
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
