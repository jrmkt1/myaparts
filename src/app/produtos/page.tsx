import { db } from "@/lib/db";
import ProductCard from "@/components/catalog/ProductCard";
import { Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TodosProdutosPage() {
    const products = await db.product.findMany({
        include: {
            category: true,
            brand: true,
            media: { where: { isMain: true }, take: 1 }
        },
        orderBy: { createdAt: "desc" },
        take: 100,
    });

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 min-h-[60vh]">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-extrabold text-industrial-900 tracking-tight">
                    Catálogo Completo
                </h1>
                <p className="text-industrial-400 mt-1.5 text-sm font-medium">
                    {products.length > 0
                        ? `${products.length} peça${products.length !== 1 ? "s" : ""} disponíve${products.length !== 1 ? "is" : "l"}`
                        : "Navegue por todas as peças disponíveis"}
                </p>
            </div>

            {/* Empty state */}
            {products.length === 0 && (
                <div className="bg-white border border-industrial-200 rounded-xl p-12 text-center">
                    <div className="w-14 h-14 bg-industrial-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Package size={28} className="text-industrial-400" />
                    </div>
                    <h3 className="text-lg font-extrabold text-industrial-800 mb-1">Catálogo Vazio</h3>
                    <p className="text-industrial-400 text-sm">
                        Entre no Painel Admin para cadastrar as primeiras peças.
                    </p>
                </div>
            )}

            {/* Grid */}
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
