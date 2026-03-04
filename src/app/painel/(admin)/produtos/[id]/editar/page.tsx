import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditarProdutoPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    const categories = await db.category.findMany({ select: { id: true, name: true } });
    const brands = await db.brand.findMany({ select: { id: true, name: true } });

    const product = await db.product.findUnique({
        where: { id },
        include: { media: true }
    });

    if (!product) {
        return notFound();
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/painel/produtos" className="p-2 bg-white rounded-md border border-industrial-200 hover:bg-industrial-100 text-industrial-800 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight">Editar Peça</h1>
                    <p className="text-industrial-400 mt-1 font-medium text-sm">
                        Atualize os dados desta peça no catálogo.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-6 md:p-8">
                <ProductForm
                    categories={categories}
                    brands={brands}
                    initialData={{
                        id: product.id,
                        name: product.name,
                        part_number: product.part_number,
                        part_number_sec: product.part_number_sec,
                        categoryId: product.categoryId,
                        brandId: product.brandId,
                        description: product.description,
                        price: product.price ? product.price.toNumber() : null,
                        media: product.media.map(m => ({ url: m.url }))
                    }}
                />
            </div>
        </div>
    );
}
