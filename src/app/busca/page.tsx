import type { Metadata } from "next";
import { db } from "@/lib/db";
import { cleanPartNumber } from "@/lib/utils/search";
import ProductCard from "@/components/catalog/ProductCard";
import { SearchX } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Busca de Peças | MYA Parts",
    description: "Busque peças para empilhadeiras por nome, código OEM ou marca no catálogo MYA Parts.",
    robots: {
        index: false,
        follow: true,
    },
};

export default async function BuscaPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const rawQuery = q || "";
    const trimmedQuery = rawQuery.trim();
    const cleanedQuery = trimmedQuery ? cleanPartNumber(trimmedQuery) : "";

    const products = trimmedQuery
        ? await db.product.findMany({
              where: {
                  OR: [
                      { name: { contains: trimmedQuery } },
                      { part_number: { contains: trimmedQuery } },
                      { part_number_sec: { contains: trimmedQuery } },
                      { clean_part_number: { contains: cleanedQuery } },
                      { category: { name: { contains: trimmedQuery } } },
                      { brand: { name: { contains: trimmedQuery } } },
                  ],
              },
              include: {
                  category: true,
                  brand: true,
                  media: { orderBy: { isMain: "desc" }, take: 1 },
              },
              orderBy: { createdAt: "desc" },
          })
        : [];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 min-h-[60vh]">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#121b33] tracking-tight">
                    {rawQuery ? (
                        <>
                            Resultados para <span className="text-[#1a264a]">&ldquo;{rawQuery}&rdquo;</span>
                        </>
                    ) : (
                        "Busca de Peças"
                    )}
                </h1>
                {products.length > 0 && (
                    <p className="text-slate-500 mt-1.5 text-sm font-medium">
                        {products.length.toLocaleString("pt-BR")} peça{products.length !== 1 ? "s" : ""} encontrada{products.length !== 1 ? "s" : ""}
                    </p>
                )}
            </div>

            {/* Empty state — no query */}
            {!trimmedQuery && (
                <div className="bg-white border border-slate-200 rounded-[2px] p-12 text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-[2px] flex items-center justify-center mx-auto mb-4">
                        <SearchX size={28} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-800 mb-1">Use a busca no topo</h3>
                    <p className="text-slate-400 text-sm">
                        Digite um Part Number, nome de peça ou marca na barra de pesquisa.
                    </p>
                </div>
            )}

            {/* Empty state — no results */}
            {trimmedQuery && products.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-[2px] p-12 text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-[2px] flex items-center justify-center mx-auto mb-4">
                        <SearchX size={28} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-800 mb-1">Nenhuma peça encontrada</h3>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto">
                        Tente buscar por outro Part Number, nome da peça ou fabricante.
                    </p>
                </div>
            )}

            {/* Results grid */}
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
