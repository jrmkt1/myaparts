import type { Metadata } from "next";
import { db } from "@/lib/db";
import ProductCard from "@/components/catalog/ProductCard";
import { Package } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Todos os Produtos | MYA Parts",
    description: "Navegue pelo catálogo completo de peças para empilhadeiras. Códigos OEM de diversas marcas prontos para cotação.",
    alternates: {
        canonical: "/produtos",
    },
    openGraph: {
        title: "Todos os Produtos | MYA Parts",
        description: "Navegue pelo catálogo completo de peças para empilhadeiras. Códigos OEM de diversas marcas prontos para cotação.",
        type: "website",
        images: [
            {
                url: "/mya-logo.png",
                width: 400,
                height: 160,
                alt: "MYA PARTS",
            },
        ],
    },
};

export default async function TodosProdutosPage() {
    const [products, totalCount, topBrands] = await Promise.all([
        db.product.findMany({
            include: {
                category: true,
                brand: true,
                media: { orderBy: { isMain: "desc" }, take: 1 },
            },
            orderBy: { createdAt: "desc" },
        }),
        db.product.count(),
        db.brand.findMany({
            where: {
                products: { some: {} },
                name: { notIn: ["Genérica", "GENÉRICA", "Generica"] },
            },
            take: 20,
            orderBy: { products: { _count: "desc" } },
        }),
    ]);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 min-h-[60vh]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#121b33] tracking-tight uppercase">
                    Catálogo Completo
                </h1>
                <p className="text-slate-500 mt-1 text-sm font-medium">
                    {totalCount > 0
                        ? `${totalCount.toLocaleString("pt-BR")} peça${totalCount !== 1 ? "s" : ""} disponíve${totalCount !== 1 ? "is" : "l"}`
                        : "Navegue por todas as peças disponíveis"}
                </p>
            </div>

            {/* BRANDS */}
            {topBrands.length > 0 && (
                <div className="mb-6 bg-white p-4 rounded-[2px] border border-slate-200">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mr-1">
                            Marcas:
                        </span>
                        {topBrands.map((brand) => (
                            <Link
                                key={brand.id}
                                href={`/busca?q=${encodeURIComponent(brand.name)}`}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[2px] text-xs font-bold text-slate-700 hover:text-white hover:bg-[#121b33] hover:border-[#121b33] transition-colors uppercase tracking-wider"
                            >
                                {brand.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty state */}
            {products.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-[2px] p-12 text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-[2px] flex items-center justify-center mx-auto mb-4">
                        <Package size={28} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-800 mb-1">Catálogo Vazio</h3>
                    <p className="text-slate-400 text-sm">
                        Entre no Painel Admin para cadastrar as primeiras peças.
                    </p>
                </div>
            )}

            {/* Grid */}
            {products.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                    {products.map((product, index) => (
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
            )}
        </div>
    );
}
