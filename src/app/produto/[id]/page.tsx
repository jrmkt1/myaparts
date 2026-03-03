import { db } from "@/lib/db";
import { ArrowLeft, CheckCircle2, Package, Info, Tag, Hash } from "lucide-react";
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
            media: { orderBy: { order: "asc" } }
        }
    });

    if (!product) notFound();

    const mainMedia = product.media.find((m) => m.isMain) || product.media[0];

    return (
        <div className="min-h-[70vh] font-sans">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">

                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-xs font-bold text-industrial-400 uppercase tracking-widest">
                    <Link href="/" className="hover:text-action transition-colors">Início</Link>
                    <span>/</span>
                    <Link href="/produtos" className="hover:text-action transition-colors">Catálogo</Link>
                    <span>/</span>
                    <span className="text-industrial-600 truncate max-w-[200px]">{product.name}</span>
                </nav>

                {/* Back button */}
                <Link
                    href="/produtos"
                    className="inline-flex items-center gap-2 text-sm font-bold text-industrial-500 hover:text-action transition-colors mb-6 group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                    Voltar ao Catálogo
                </Link>

                {/* Main card */}
                <div className="bg-white rounded-2xl border border-industrial-200 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Image panel */}
                        <div className="bg-industrial-50 flex items-center justify-center p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-industrial-200 min-h-[320px] md:min-h-[480px] relative">
                            {mainMedia ? (
                                <img
                                    src={mainMedia.url}
                                    alt={product.name}
                                    className="w-full h-auto max-h-[480px] object-contain drop-shadow-xl"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-industrial-300 gap-3">
                                    <Package size={96} />
                                    <span className="font-extrabold tracking-widest uppercase text-sm text-industrial-400">
                                        Sem Foto Disponível
                                    </span>
                                </div>
                            )}

                            {/* Gallery strip (if multiple images) */}
                            {product.media.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {product.media.map((m, i) => (
                                        <div
                                            key={m.id}
                                            className={`w-2 h-2 rounded-full transition-all ${m.isMain ? "bg-action scale-125" : "bg-industrial-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details panel */}
                        <div className="p-6 md:p-10 flex flex-col justify-between gap-6">

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold bg-industrial-900 text-white uppercase tracking-widest">
                                    {product.brand.name}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold bg-industrial-100 text-industrial-700 uppercase tracking-widest border border-industrial-200">
                                    <Tag size={10} />
                                    {product.category.name}
                                </span>
                            </div>

                            {/* Title */}
                            <div>
                                <h1 className="text-2xl md:text-4xl font-extrabold text-industrial-900 tracking-tight leading-tight">
                                    {product.name}
                                </h1>

                                {product.description && (
                                    <p className="text-industrial-500 text-sm leading-relaxed mt-3">
                                        {product.description}
                                    </p>
                                )}
                            </div>

                            {/* Part Numbers */}
                            <div className="bg-industrial-50 border border-industrial-200 rounded-xl p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] font-extrabold text-industrial-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                                            <Hash size={10} />
                                            Part Number (OEM)
                                        </p>
                                        <p className="text-xl font-mono font-extrabold text-industrial-900">
                                            {product.part_number}
                                        </p>
                                    </div>
                                    {product.part_number_sec && (
                                        <div>
                                            <p className="text-[10px] font-extrabold text-industrial-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                                                <Hash size={10} />
                                                Cód. Secundário
                                            </p>
                                            <p className="text-xl font-mono text-industrial-600 font-bold">
                                                {product.part_number_sec}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Benefits */}
                            <ul className="space-y-2.5">
                                {[
                                    "Garantia de Qualidade MYA",
                                    `Compatibilidade Verificada (${product.brand.name})`,
                                    "Faturamento para CNPJ disponível",
                                ].map((benefit) => (
                                    <li key={benefit} className="flex items-center gap-2.5 text-sm font-semibold text-industrial-700">
                                        <CheckCircle2 className="text-action shrink-0" size={16} />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            {/* CTAs */}
                            <div className="space-y-3 pt-2 border-t border-industrial-200">
                                <AddToCartButton product={{
                                    id: product.id,
                                    name: product.name,
                                    part_number: product.part_number,
                                    brand: product.brand.name,
                                    image: mainMedia?.url
                                }} />

                                <a
                                    href={`https://wa.me/5519971441580?text=${encodeURIComponent(
                                        `Olá, vim do site MYA Parts e tenho interesse nesta peça:\n\n*${product.name}*\n*Part Number:* ${product.part_number}\n\nGostaria de saber o valor e disponibilidade.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-lg font-extrabold text-sm uppercase tracking-widest text-white bg-[#25D366] hover:bg-[#1ebe5b] transition-colors shadow-sm"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Comprar pelo WhatsApp
                                </a>

                                <p className="text-xs text-industrial-400 flex items-center gap-1.5 font-medium">
                                    <Info size={12} />
                                    Faturamentos mensais para CNPJ disponíveis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
