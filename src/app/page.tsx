import Link from "next/link";
import { Wrench, Zap, Disc, Droplets, Cog, CircleDot, ArrowRight, Package } from "lucide-react";
import { db } from "@/lib/db";
import ProductCard from "@/components/catalog/ProductCard";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "MYA PARTS | Peças para Empilhadeiras",
    description: "Catálogo direto de peças e componentes para empilhadeiras Toyota, Hyster, Yale, Hangcha, Heli, Clark e Mitsubishi. Cotação rápida por Part Number.",
    alternates: {
        canonical: "/",
    },
};

const SYSTEM_FILTERS = [
    { href: "/busca?q=motor", icon: Wrench, label: "Motor" },
    { href: "/busca?q=freio", icon: Disc, label: "Freio" },
    { href: "/busca?q=hidraulico", icon: Droplets, label: "Hidráulico" },
    { href: "/busca?q=eletrico", icon: Zap, label: "Elétrico" },
    { href: "/busca?q=transmissao", icon: Cog, label: "Transmissão" },
    { href: "/busca?q=rolamento", icon: CircleDot, label: "Rolamentos" },
];

export default async function Home() {
    const [topBrands, productsWithPhoto, totalCount] = await Promise.all([
        db.brand.findMany({
            where: {
                products: { some: {} },
                name: { notIn: ["Genérica", "GENÉRICA", "Generica"] },
            },
            take: 12,
            orderBy: { products: { _count: "desc" } },
        }),
        db.product.findMany({
            where: { media: { some: {} } },
            take: 24,
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
                brand: true,
                media: { orderBy: { isMain: "desc" }, take: 1 },
            },
        }),
        db.product.count(),
    ]);

    let showcaseProducts = productsWithPhoto;
    if (showcaseProducts.length < 24) {
        const extraProducts = await db.product.findMany({
            where: {
                id: { notIn: showcaseProducts.map((p) => p.id) },
            },
            take: 24 - showcaseProducts.length,
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
                brand: true,
                media: { orderBy: { isMain: "desc" }, take: 1 },
            },
        });
        showcaseProducts = [...showcaseProducts, ...extraProducts];
    }

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50">
            {/* ─── COMPACT FILTER BAR (SISTEMAS & MARCAS) ─── */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 space-y-2.5">
                    {/* Quick System Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0 mr-1">
                            Sistemas:
                        </span>
                        {SYSTEM_FILTERS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[2px] text-xs font-extrabold text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors shrink-0 uppercase tracking-wider"
                                >
                                    <Icon size={13} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Brand Pills */}
                    {topBrands.length > 0 && (
                        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pt-0.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0 mr-1">
                                Marcas:
                            </span>
                            {topBrands.map((brand) => (
                                <Link
                                    key={brand.id}
                                    href={`/busca?q=${encodeURIComponent(brand.name)}`}
                                    className="px-2.5 py-1 bg-white border border-slate-200 rounded-[2px] text-[11px] font-bold text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-colors uppercase tracking-wider shrink-0"
                                >
                                    {brand.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ─── DIRECT PARTS SHOWCASE (ABOVE THE FOLD) ─── */}
            <section className="flex-1 py-6 md:py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                        <div className="flex items-baseline gap-3">
                            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
                                Peças em Destaque
                            </h1>
                            {totalCount > 0 && (
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    ({totalCount} cadastradas)
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href="https://wa.me/5519971441580?text=Ol%C3%A1%2C%20gostaria%20de%20cotar%20uma%20pe%C3%A7a%20para%20empilhadeira."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-[2px] font-extrabold text-xs uppercase tracking-wider transition-colors shadow-xs"
                            >
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Cotar no WhatsApp
                            </a>

                            <Link
                                href="/produtos"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:border-slate-900 text-slate-900 rounded-[2px] text-xs font-extrabold uppercase tracking-wider transition-colors"
                            >
                                Catálogo Completo
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {showcaseProducts.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-[2px] p-12 text-center">
                            <Package size={36} className="text-slate-400 mx-auto mb-3" />
                            <p className="text-slate-700 font-bold text-sm">Nenhuma peça cadastrada no momento.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                                {showcaseProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        part_number={product.part_number}
                                        brand={product.brand}
                                        category={product.category}
                                        media={product.media}
                                        priority={index < 2}
                                        eager={index >= 2 && index < 4}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Link
                                    href="/produtos"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-[2px] font-extrabold text-xs md:text-sm uppercase tracking-widest transition-colors"
                                >
                                    Ver Todas as Peças ({totalCount})
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* ─── DIRECT CONTACT BAR (LIGHT & CONCISE) ─── */}
            <section className="bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-base md:text-lg font-extrabold text-slate-900 tracking-tight">
                            Não encontrou o código da peça?
                        </h2>
                        <p className="text-slate-500 text-xs md:text-sm font-medium mt-0.5">
                            Envie o Part Number ou foto da peça direto para nosso atendimento comercial.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                        <a
                            href="https://wa.me/5519971441580?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20para%20identificar%20uma%20pe%C3%A7a."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-[2px] font-extrabold text-xs md:text-sm uppercase tracking-widest transition-colors shadow-sm"
                        >
                            WhatsApp (19) 97144-1580
                        </a>
                        <a
                            href="mailto:contato@myaparts.com.br"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-slate-50 border border-slate-300 hover:border-slate-900 text-slate-800 rounded-[2px] font-bold text-xs md:text-sm tracking-wide transition-colors"
                        >
                            contato@myaparts.com.br
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
