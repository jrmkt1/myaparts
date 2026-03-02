import { db } from "@/lib/db";
import { cleanPartNumber } from "@/lib/utils/search";
import Link from "next/link";
import { ArrowRight, Box, Image as ImageIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BuscaPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const rawQuery = q || "";

    // Se a busca estiver vazia, retorna array limpo
    let products: any[] = [];

    if (rawQuery.trim() !== "") {
        const cleanedQuery = cleanPartNumber(rawQuery);

        // A mesma lógica poderosa que usamos na API de Busca, só que processada direto no lado servidor do React (Server Component) para zero latência Client-Side.
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
                media: {
                    where: { isMain: true },
                    take: 1
                }
            },
            take: 40,
        });
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 font-sans min-h-[60vh]">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight">
                    Resultados da Busca
                </h1>
                <p className="text-industrial-400 mt-2 font-medium">
                    {rawQuery ? (
                        <>Você buscou por: <strong className="text-industrial-900">"{rawQuery}"</strong></>
                    ) : (
                        "Digite algo na barra de pesquisa no topo."
                    )}
                </p>
            </div>

            {products.length === 0 && rawQuery.trim() !== "" ? (
                <div className="bg-white border-2 border-dashed border-industrial-200 rounded-xl p-12 text-center">
                    <h3 className="text-xl font-bold text-industrial-800 mb-2">Nenhuma peça encontrada :(</h3>
                    <p className="text-industrial-400">Tente buscar por outro Part Number, nome da peça ou fabricante.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link key={product.id} href={`/produto/${product.id}`} className="group bg-white rounded-xl border border-industrial-200 shadow-sm hover:shadow-md hover:border-action transition-all overflow-hidden flex flex-col h-full">
                            {/* Product Media (Placeholder or Actual Image) */}
                            <div className="w-full h-48 bg-industrial-100 flex items-center justify-center relative border-b border-industrial-200">
                                {product.media.length > 0 ? (
                                    <img
                                        src={product.media[0].url}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-industrial-400 gap-2 opacity-50">
                                        <ImageIcon size={48} />
                                        <span className="text-xs font-bold uppercase tracking-widest">Sem Imagem</span>
                                    </div>
                                )}

                                <div className="absolute top-2 right-2 bg-industrial-900 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                                    {product.brand.name}
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <span className="text-xs font-bold text-industrial-400 uppercase tracking-widest mb-1">{product.category.name}</span>
                                <h3 className="font-extrabold text-industrial-900 text-lg leading-tight group-hover:text-action transition-colors line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="mt-4 pt-4 border-t border-industrial-100 flex items-end justify-between mt-auto">
                                    <div>
                                        <span className="block text-[10px] text-industrial-400 font-bold uppercase tracking-widest mb-1">Part Number</span>
                                        <span className="bg-industrial-100 text-industrial-800 px-2 py-1 rounded font-mono font-bold text-sm">
                                            {product.part_number}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center text-industrial-800 group-hover:bg-action group-hover:text-white transition-colors">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
