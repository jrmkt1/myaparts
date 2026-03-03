import { db } from "@/lib/db";
import { cleanPartNumber } from "@/lib/utils/search";
import ProductCard from "@/components/catalog/ProductCard";
import { SearchX } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BuscaPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const rawQuery = q || "";
    let products: any[] = [];

    if (rawQuery.trim() !== "") {
        const cleanedQuery = cleanPartNumber(rawQuery);
        products = await db.product.findMany({
            where: {
                OR: [
                    { name: { contains: rawQuery } },
                    { part_number: { contains: rawQuery } },
                    { part_number_sec: { contains: rawQuery } },
                    { clean_part_number: { contains: cleanedQuery } },
                    { category: { name: { contains: rawQuery } } },
                    { brand: { name: { contains: rawQuery } } },
                ]
            },
            include: {
                category: true,
                brand: true,
                media: { where: { isMain: true }, take: 1 }
            },
            take: 48,
        });
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 min-h-[60vh]">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-extrabold text-industrial-900 tracking-tight">
                    {rawQuery ? (
                        <>Resultados para <span className="text-action">&ldquo;{rawQuery}&rdquo;</span></>
                    ) : (
                        "Busca de Peças"
                    )}
                </h1>
                {products.length > 0 && (
                    <p className="text-industrial-400 mt-1.5 text-sm font-medium">
                        {products.length} peça{products.length !== 1 ? "s" : ""} encontrada{products.length !== 1 ? "s" : ""}
                    </p>
                )}
            </div>

            {/* Empty state — no query */}
            {!rawQuery.trim() && (
                <div className="bg-white border border-industrial-200 rounded-xl p-12 text-center">
                    <div className="w-14 h-14 bg-industrial-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <SearchX size={28} className="text-industrial-400" />
                    </div>
                    <h3 className="text-lg font-extrabold text-industrial-800 mb-1">Use a busca no topo</h3>
                    <p className="text-industrial-400 text-sm">
                        Digite um Part Number, nome de peça ou marca na barra de pesquisa.
                    </p>
                </div>
            )}

            {/* Empty state — no results */}
            {rawQuery.trim() && products.length === 0 && (
                <div className="bg-white border border-industrial-200 rounded-xl p-12 text-center">
                    <div className="w-14 h-14 bg-industrial-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <SearchX size={28} className="text-industrial-400" />
                    </div>
                    <h3 className="text-lg font-extrabold text-industrial-800 mb-1">Nenhuma peça encontrada</h3>
                    <p className="text-industrial-400 text-sm max-w-sm mx-auto">
                        Tente buscar por outro Part Number, nome da peça ou fabricante.
                    </p>
                </div>
            )}

            {/* Results grid */}
            {products.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            part_number={product.part_number}
                            brand={product.brand}
                            category={product.category}
                            media={product.media}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
