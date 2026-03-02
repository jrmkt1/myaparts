import { db } from "@/lib/db";
import { Tag } from "lucide-react";
import BrandForm from "@/components/admin/BrandForm";

export default async function MarcasPage() {
    const brands = await db.brand.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { products: true }
            }
        }
    });

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight flex items-center gap-3">
                    <Tag className="text-action text-2xl" />
                    Montadoras (Marcas)
                </h1>
                <p className="text-industrial-400 mt-1 font-medium text-sm">
                    Ex: Toyota, Hyster, Yale, Mitsubishi...
                </p>
            </div>

            <BrandForm />

            <div className="bg-white rounded-xl shadow-sm border border-industrial-200 overflow-hidden">
                <table className="w-full text-left text-sm text-industrial-800">
                    <thead className="bg-industrial-100 text-industrial-900 font-bold uppercase text-xs tracking-wider border-b border-industrial-200">
                        <tr>
                            <th scope="col" className="px-6 py-4">Nome da Montadora</th>
                            <th scope="col" className="px-6 py-4">Slug URL</th>
                            <th scope="col" className="px-6 py-4 text-center">Peças Vinculadas</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-industrial-200">
                        {brands.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-industrial-400 font-medium opacity-80 border-dashed border-2 border-industrial-200 m-4 rounded-lg">
                                    Nenhuma marca cadastrada ainda no seu sistema.<br />
                                </td>
                            </tr>
                        ) : (
                            brands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-industrial-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-industrial-900">
                                        {brand.name}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-industrial-400">
                                        /{brand.slug}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-full text-xs font-bold bg-industrial-200 text-industrial-800">
                                            {brand._count.products}
                                        </span>
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
