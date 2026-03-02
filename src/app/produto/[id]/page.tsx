import { db } from "@/lib/db";
import { ArrowLeft, CheckCircle2, ShoppingCart, Info, Check, Package } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await db.product.findUnique({
        where: { id },
        include: {
            category: true,
            brand: true,
            media: {
                orderBy: { order: "asc" }
            }
        }
    });

    if (!product) {
        notFound();
    }

    const mainMedia = product.media.find(m => m.isMain) || product.media[0];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 font-sans">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center text-sm font-semibold text-industrial-400">
                <Link href="/" className="hover:text-action transition-colors">Início</Link>
                <span className="mx-2">/</span>
                <Link href="/busca" className="hover:text-action transition-colors">Catálogo</Link>
                <span className="mx-2">/</span>
                <span className="text-industrial-900 truncate">{product.name}</span>
            </nav>

            <div className="bg-white rounded-2xl shadow-sm border border-industrial-200 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Imagens / 3D Viewer */}
                    <div className="bg-industrial-50 p-6 md:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-industrial-200 min-h-[400px]">
                        {mainMedia ? (
                            <img
                                src={mainMedia.url}
                                alt={product.name}
                                className="w-full h-auto max-h-[500px] object-contain drop-shadow-xl"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-industrial-400 opacity-50 space-y-4">
                                <Package size={120} />
                                <span className="font-extrabold tracking-widest uppercase text-xl">Sem Foto Disponível</span>
                            </div>
                        )}
                    </div>

                    {/* Detalhes do Produto */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="space-y-6">

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-industrial-800 text-white uppercase tracking-widest">
                                    {product.brand.name}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-industrial-100 text-industrial-800 uppercase tracking-widest border border-industrial-200">
                                    {product.category.name}
                                </span>
                            </div>

                            {/* Título */}
                            <h1 className="text-3xl md:text-5xl font-extrabold text-industrial-900 tracking-tight leading-none">
                                {product.name}
                            </h1>

                            {/* PN Box */}
                            <div className="bg-industrial-100 border-2 border-industrial-200 rounded-lg p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-industrial-500 uppercase tracking-widest mb-1">Part Number (OEM)</p>
                                        <p className="text-xl font-mono font-bold text-industrial-900">{product.part_number}</p>
                                    </div>
                                    {product.part_number_sec && (
                                        <div>
                                            <p className="text-xs font-bold text-industrial-500 uppercase tracking-widest mb-1">Cód. Secundário</p>
                                            <p className="text-xl font-mono text-industrial-600">{product.part_number_sec}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="prose prose-industrial prose-sm max-w-none text-industrial-500">
                                {product.description ? (
                                    <p className="leading-relaxed">{product.description}</p>
                                ) : (
                                    <p className="italic opacity-70">A equipe técnica ainda não adicionou uma descrição estendida para este item.</p>
                                )}
                            </div>

                            {/* Benefícios Fixos (B2B Appeal) */}
                            <ul className="space-y-3 py-4">
                                <li className="flex items-center gap-3 text-sm font-semibold text-industrial-800">
                                    <CheckCircle2 className="text-action shrink-0" size={18} /> Garantia de Qualidade MYA
                                </li>
                                <li className="flex items-center gap-3 text-sm font-semibold text-industrial-800">
                                    <CheckCircle2 className="text-action shrink-0" size={18} /> Compatibilidade Verificada ({product.brand.name})
                                </li>
                            </ul>

                            {/* Ações (Add Quote) */}
                            <div className="pt-6 border-t border-industrial-200">
                                <AddToCartButton product={{
                                    id: product.id,
                                    name: product.name,
                                    part_number: product.part_number,
                                    brand: product.brand.name,
                                    image: mainMedia?.url
                                }} />
                                <p className="text-xs text-industrial-400 mt-4 flex items-center gap-1 font-medium">
                                    <Info size={14} /> Faturamentos mensais para CNPJ disponíveis.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
