import Link from "next/link";
import { Wrench, Zap, Disc, Droplets, Cog, CircleDot, ArrowRight, Package, ChevronRight } from "lucide-react";
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
    { href: "/busca?q=motor", icon: Wrench, label: "Motor", sub: "Blocos, pistões e filtros" },
    { href: "/busca?q=freio", icon: Disc, label: "Freio", sub: "Sapatas, cilindros e lonas" },
    { href: "/busca?q=hidraulico", icon: Droplets, label: "Hidráulico", sub: "Bombas, cilindros e reparos" },
    { href: "/busca?q=eletrico", icon: Zap, label: "Elétrico", sub: "Partida, sensores e chicotes" },
    { href: "/busca?q=transmissao", icon: Cog, label: "Transmissão", sub: "Discos, conversores e eixos" },
    { href: "/busca?q=rolamento", icon: CircleDot, label: "Rolamentos", sub: "Mastros, torres e rodas" },
];

export default async function Home() {
    const [topBrands, productsWithPhoto, totalCount] = await Promise.all([
        db.brand.findMany({
            where: {
                products: { some: {} },
                name: { notIn: ["Genérica", "GENÉRICA", "Generica"] },
            },
            take: 9,
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
            {/* ─── FULL-WIDTH STRUCTURED SYSTEMS & BRANDS SECTION ─── */}
            <section className="bg-white border-b border-slate-200 shadow-2xs">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 space-y-4">
                    {/* Row 1: 6 Full-Width Industrial System Cards */}
                    <div>
                        <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#121b33] flex items-center gap-2">
                                <span className="w-1.5 h-3.5 bg-[#121b33] inline-block" />
                                Filtrar por Sistema
                            </span>
                            <Link
                                href="/produtos"
                                className="text-[11px] font-bold text-slate-500 hover:text-[#121b33] uppercase tracking-wider transition-colors"
                            >
                                Ver todas as categorias →
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                            {SYSTEM_FILTERS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group flex items-center gap-3 p-3 bg-slate-50/90 hover:bg-[#121b33] border border-slate-200 hover:border-[#121b33] rounded-[2px] transition-all duration-200 shadow-2xs hover:shadow-md"
                                    >
                                        <div className="w-9 h-9 rounded-[2px] bg-[#121b33] group-hover:bg-white text-white group-hover:text-[#121b33] flex items-center justify-center shrink-0 transition-colors">
                                            <Icon size={17} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-1">
                                                <span className="text-xs font-extrabold text-[#121b33] group-hover:text-white uppercase tracking-wider truncate transition-colors">
                                                    {item.label}
                                                </span>
                                                <ChevronRight
                                                    size={13}
                                                    className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                                                />
                                            </div>
                                            <span className="block text-[10px] font-medium text-slate-500 group-hover:text-slate-300 truncate mt-0.5 transition-colors">
                                                {item.sub}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Row 2: Full-Width Uniform Brand Grid */}
                    {topBrands.length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 lg:gap-4">
                                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#121b33] shrink-0 flex items-center gap-2">
                                    <span className="w-1.5 h-3.5 bg-[#1a264a] inline-block" />
                                    Principais Marcas:
                                </span>

                                <div className="flex-1 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                                    {topBrands.map((brand) => (
                                        <Link
                                            key={brand.id}
                                            href={`/busca?q=${encodeURIComponent(brand.name)}`}
                                            className="flex items-center justify-center px-3 py-2 bg-white hover:bg-[#121b33] border border-slate-200 hover:border-[#121b33] rounded-[2px] text-[11px] font-extrabold text-slate-700 hover:text-white uppercase tracking-wider text-center transition-all shadow-2xs"
                                        >
                                            <span className="truncate">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── DIRECT PARTS SHOWCASE (ABOVE THE FOLD) ─── */}
            <section className="flex-1 py-6 md:py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                        <div className="flex items-baseline gap-3">
                            <h1 className="text-xl md:text-2xl font-extrabold text-[#121b33] tracking-tight uppercase">
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
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:border-[#121b33] text-[#121b33] rounded-[2px] text-xs font-extrabold uppercase tracking-wider transition-colors"
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
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border-2 border-[#121b33] text-[#121b33] hover:bg-[#121b33] hover:text-white rounded-[2px] font-extrabold text-xs md:text-sm uppercase tracking-widest transition-colors"
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
                        <h2 className="text-base md:text-lg font-extrabold text-[#121b33] tracking-tight">
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
                            className="inline-flex items-center gap-2 px-5 py-3 bg-slate-50 border border-slate-300 hover:border-[#121b33] text-[#121b33] rounded-[2px] font-bold text-xs md:text-sm tracking-wide transition-colors"
                        >
                            contato@myaparts.com.br
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
