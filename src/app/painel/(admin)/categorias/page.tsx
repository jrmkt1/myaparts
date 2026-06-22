import { db } from "@/lib/db";
import { Edit2, Layers } from "lucide-react";
import CategoryForm from "@/components/admin/CategoryForm";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
import Link from "next/link";

interface PageProps {
    searchParams: Promise<{ edit?: string }>;
}

export default async function CategoriasPage({ searchParams }: PageProps) {
    const { edit } = await searchParams;

    const categories = await db.category.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { products: true }
            }
        }
    });

    const categoryToEdit = edit ? categories.find((cat) => cat.id === edit) : undefined;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight flex items-center gap-3">
                    <Layers className="text-action" />
                    Categorias (Sistemas)
                </h1>
                <p className="text-industrial-400 mt-1 font-medium text-sm">
                    Cadastre os sistemas das empilhadeiras (Ex: Motor, Transmissão, Elétrico).
                </p>
            </div>

            <CategoryForm categoryToEdit={categoryToEdit} />

            <div className="bg-white rounded-xl shadow-sm border border-industrial-200 overflow-hidden">
                <table className="w-full text-left text-sm text-industrial-800">
                    <thead className="bg-industrial-100 text-industrial-900 font-bold uppercase text-xs tracking-wider border-b border-industrial-200">
                        <tr>
                            <th scope="col" className="px-6 py-4">Nome da Categoria</th>
                            <th scope="col" className="px-6 py-4">Slug URL</th>
                            <th scope="col" className="px-6 py-4 text-center">Itens Vinculados</th>
                            <th scope="col" className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-industrial-200">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-industrial-400 font-medium opacity-80 border-dashed border-2 border-industrial-200 m-4 rounded-lg">
                                    Nenhuma categoria cadastrada ainda no seu sistema.<br />
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-industrial-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-industrial-900">
                                        {cat.name}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-industrial-400">
                                        /{cat.slug}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-full text-xs font-bold bg-industrial-200 text-industrial-800">
                                            {cat._count.products}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-4">
                                            <Link
                                                href={`/painel/categorias?edit=${cat.id}`}
                                                className="text-industrial-400 hover:text-industrial-900 transition-colors"
                                                title="Editar"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                            <DeleteCategoryButton categoryId={cat.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

