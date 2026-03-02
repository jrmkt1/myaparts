import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";

export default async function NovoProdutoPage() {
    // Fetch categories and brands from DB securely in Server Component
    const categories = await db.category.findMany({ select: { id: true, name: true } });
    const brands = await db.brand.findMany({ select: { id: true, name: true } });

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/painel/produtos" className="p-2 bg-white rounded-md border border-industrial-200 hover:bg-industrial-100 text-industrial-800 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight">Nova Peça</h1>
                    <p className="text-industrial-400 mt-1 font-medium text-sm">
                        Cadastre um novo item no catálogo. O campo "Part Number" é modificado para busca inteligente automaticamente.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-6 md:p-8">
                <ProductForm categories={categories} brands={brands} />
            </div>
        </div>
    );
}
