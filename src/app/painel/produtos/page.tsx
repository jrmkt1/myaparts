import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Image as ImageIcon, Search, Download } from "lucide-react";
import MassImportButton from "@/components/admin/MassImportButton";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function ProdutosPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const q = searchParams?.q || "";

    // Fetch products, with optional filtering
    const products = await db.product.findMany({
        where: q ? {
            OR: [
                { name: { contains: q } },
                { part_number: { contains: q } },
                { clean_part_number: { contains: q.replace(/[-.\s+_]/g, "").toUpperCase() } },
            ]
        } : undefined,
        include: {
            category: true,
            brand: true,
            media: {
                where: { isMain: true },
                take: 1
            }
        },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight">Catálogo de Peças</h1>
                    <p className="text-industrial-400 mt-1 font-medium text-sm">
                        Gerencie todas as peças. Adicione fotos 2D e Modelos 3D interativos.
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <a
                        href="/api/produtos/exportar"
                        className="inline-flex items-center gap-2 bg-white hover:bg-industrial-100 text-industrial-900 border border-industrial-200 px-4 py-3 rounded-md font-bold transition-colors shadow-sm whitespace-nowrap text-sm"
                        title="Baixar Planilha (CSV)"
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Exportar Produtos</span>
                    </a>
                    <MassImportButton />
                    <Link
                        href="/painel/produtos/novo"
                        className="inline-flex items-center gap-2 bg-action hover:bg-action-hover text-white px-6 py-3 rounded-md font-bold transition-colors shadow-sm whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Nova Peça
                    </Link>
                </div>
            </div>

            {/* FIlter and Search Bar */}
            <form method="GET" action="/painel/produtos" className="bg-white rounded-xl shadow-sm border border-industrial-200 p-4 flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-industrial-400" size={18} />
                    <input
                        type="text"
                        name="q"
                        defaultValue={q}
                        placeholder="Buscar por nome ou part number..."
                        className="w-full pl-10 pr-4 py-2 border border-industrial-200 rounded-md focus:outline-none focus:ring-2 focus:ring-action focus:border-action transition-all"
                    />
                </div>
                <button type="submit" className="bg-industrial-900 hover:bg-black text-white px-6 py-2 rounded-md font-bold transition-all uppercase tracking-widest text-sm">
                    Buscar
                </button>
                {q && (
                    <Link href="/painel/produtos" className="bg-industrial-100 hover:bg-industrial-200 text-industrial-800 px-6 py-2 rounded-md font-bold transition-all uppercase tracking-widest text-sm flex items-center justify-center">
                        Limpar
                    </Link>
                )}
            </form>

            <div className="bg-white rounded-xl shadow-sm border border-industrial-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-industrial-800">
                        <thead className="bg-industrial-100 text-industrial-900 font-bold uppercase text-xs tracking-wider border-b border-industrial-200">
                            <tr>
                                <th scope="col" className="px-6 py-4">Mídia</th>
                                <th scope="col" className="px-6 py-4">Peça / Nome</th>
                                <th scope="col" className="px-6 py-4">Part Number</th>
                                <th scope="col" className="px-6 py-4">Categoria/Marca</th>
                                <th scope="col" className="px-6 py-4 text-center">Status</th>
                                <th scope="col" className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-industrial-200">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-industrial-400 font-medium opacity-80 border-dashed border-2 border-industrial-200 m-4 rounded-lg">
                                        Nenhuma peça cadastrada ainda no seu sistema.<br />
                                        <span className="text-xs mt-2 block">Clique em "Nova Peça" para começar a alimentar o motor de busca.</span>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-industrial-50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-12 h-12 bg-industrial-200 rounded text-industrial-400 border border-industrial-300 flex items-center justify-center relative overflow-hidden">
                                                {product.media.length > 0 ? (
                                                    <span className="text-xs font-bold text-industrial-800">1+</span> // Placeholder until we load actual images
                                                ) : (
                                                    <ImageIcon size={18} />
                                                )}
                                                {/* If 3D models exist we would show 3D badge here */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-industrial-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="bg-industrial-100 text-industrial-800 px-2 py-1 rounded text-xs font-mono font-bold tracking-tight">
                                                {product.part_number}
                                            </span>
                                            {product.part_number_sec && (
                                                <span className="block text-[10px] text-industrial-400 mt-1 font-mono">{product.part_number_sec}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                                            <span className="block text-industrial-900 font-bold">{product.category.name}</span>
                                            <span className="block text-industrial-400">{product.brand.name}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-widest border border-green-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Publicado
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/painel/produtos/${product.id}/editar`} className="text-industrial-400 hover:text-action transition-colors" title="Editar">
                                                    <Edit size={18} />
                                                </Link>

                                                <DeleteProductButton productId={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {products.length > 0 && (
                    <div className="bg-industrial-100 border-t border-industrial-200 p-4 text-xs font-bold text-industrial-800 uppercase tracking-widest text-center">
                        Mostrando {products.length} peça(s)
                    </div>
                )}
            </div>
        </div>
    );
}
