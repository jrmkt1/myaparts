"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
        <div ref={containerRef} className={`relative ${isDesktop ? 'hidden md:flex flex-1 max-w-2xl mx-auto items-center' : 'w-full'}`}>
            <form onSubmit={handleSubmit} className="w-full">
                <div className={`w-full flex items-center bg-industrial-100/60 border border-industrial-200 rounded-lg hover:border-industrial-400 focus-within:border-industrial-400 focus-within:bg-white focus-within:shadow-md transition-all ${!isDesktop ? 'focus-within:border-industrial-400 focus-within:bg-white focus-within:shadow-md' : ''}`}>

                    {!isDesktop && <Search size={14} className="ml-3 text-industrial-400" />}

                    <input
                        type="text"
                        name="q"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true); // Re-open on type
                        }}
                        onFocus={() => {
                            if (query.trim().length >= 2) setIsOpen(true);
                        }}
                        autoComplete="off"
                        placeholder={isDesktop ? "Buscar por código OEM, nome, marca..." : "OEM, nome ou marca..."}
                        className={`w-full bg-transparent outline-none font-medium text-industrial-900 placeholder:text-industrial-400 ${isDesktop ? 'px-4 py-3 text-sm' : 'px-2 py-2.5 text-xs'}`}
                    />

                    <button
                        type="submit"
                        aria-label="Buscar"
                        className={isDesktop
                            ? "mr-1.5 p-2 bg-industrial-900 hover:bg-action text-white rounded-md transition-colors shrink-0"
                            : "mr-1.5 px-3 py-1.5 bg-industrial-900 text-white rounded-md text-[10px] font-bold uppercase shrink-0"
                        }
                    >
                        {isDesktop ? <Search size={16} /> : "Buscar"}
                    </button>
                </div>
            </form>

            {/* Modal Autocomplete Dropper */}
            {isOpen && (debouncedQuery.trim().length >= 2) && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-industrial-200 rounded-xl shadow-2xl overflow-hidden z-[100] flex flex-col">

                    {loading && (
                        <div className="flex items-center gap-2 p-4 text-sm text-industrial-500 justify-center">
                            <Loader2 size={16} className="animate-spin" /> Buscando...
                        </div>
                    )}

                    {!loading && results.length === 0 && (
                        <div className="p-4 text-center text-sm text-industrial-500">
                            Nenhuma peça encontrada para <span className="font-bold text-industrial-900">"{debouncedQuery}"</span>
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <div className="max-h-[300px] overflow-y-auto w-full hide-scrollbar">
                            <div className="p-2 border-b border-industrial-100 flex items-center justify-between text-[10px] font-bold text-industrial-400 uppercase tracking-wider">
                                <span>Peças Encontradas</span>
                            </div>
                            <ul className="divide-y divide-industrial-100/50">
                                {results.map((product) => (
                                    <li key={product.id}>
                                        <Link
                                            href={`/produto/${product.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="group flex flex-row items-center gap-3 p-3 hover:bg-industrial-50/80 transition-colors"
                                        >
                                            {/* Imagem */}
                                            <div className="w-12 h-12 shrink-0 bg-white border border-industrial-200 rounded-lg p-1 flex items-center justify-center overflow-hidden">
                                                {product.image ? (
                                                    <Image src={product.image} alt={product.name} width={40} height={40} className="w-full h-full object-contain" />
                                                ) : (
                                                    <Search size={16} className="text-industrial-300" />
                                                )}
                                            </div>
                                            {/* Infos p */}
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <span className="text-xs font-bold text-industrial-900 truncate group-hover:text-action transition-colors">{product.name}</span>
                                                <span className="text-[11px] text-industrial-500 truncate">PN: <strong className="text-industrial-700">{product.part_number}</strong></span>
                                            </div>
                                            {/* Tag Marca */}
                                            {product.brand && (
                                                <div className="shrink-0 hidden sm:flex items-center">
                                                    <span className="text-[10px] uppercase font-bold text-industrial-500 bg-industrial-100 px-2 py-0.5 rounded-md">{product.brand}</span>
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
                            onClick={handleSubmit}
                            className="w-full text-center py-3 bg-industrial-50 hover:bg-industrial-100 text-xs font-extrabold text-industrial-900 uppercase tracking-widest border-t border-industrial-200 transition-colors"
                        >
                            Ver todos os resultados →
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
