"use client";

import { useActionState, useEffect } from "react";
import { createProductAction } from "@/actions/products";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductFormProps = {
    categories: { id: string; name: string }[];
    brands: { id: string; name: string }[];
};

export default function ProductForm({ categories, brands }: ProductFormProps) {
    const router = useRouter();

    // In React 19, useActionState manages the transition
    // state is the returned object from our createProductAction action
    const [state, formAction, isPending] = useActionState(
        async (prevState: unknown, formData: FormData) => {
            const result = await createProductAction(formData);
            return result;
        },
        null
    );

    useEffect(() => {
        if (state?.success) {
            // Form succeeded, redirect back to products list
            router.push("/painel/produtos");
            router.refresh();
        }
    }, [state, router]);

    return (
        <form action={formAction} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Nome da Peça*</label>
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Ex: Bomba Hidráulica Auxiliar"
                        className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 placeholder:text-industrial-400 outline-none transition-all shadow-inner"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Part Number (OEM)*</label>
                    <input
                        required
                        type="text"
                        name="part_number"
                        placeholder="Ex: 5800-449-33"
                        className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 font-mono font-bold placeholder:text-industrial-400 outline-none transition-all shadow-inner"
                    />
                    <p className="text-xs text-industrial-400 font-medium">
                        Insira exatamente como no manual. O motor busca com ou sem traço.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Part Number Secundário</label>
                    <input
                        type="text"
                        name="part_number_sec"
                        placeholder="Opcional"
                        className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 font-mono font-bold placeholder:text-industrial-400 outline-none transition-all shadow-inner"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-industrial-100">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Sistema / Categoria*</label>
                    <select
                        required
                        name="categoryId"
                        defaultValue=""
                        className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 font-bold outline-none transition-all shadow-inner appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Selecione o Sistema...</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Montadora*</label>
                    <select
                        required
                        name="brandId"
                        defaultValue=""
                        className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 font-bold outline-none transition-all shadow-inner appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Selecione a Montadora...</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2 pt-6 border-t border-industrial-100">
                <label className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Descrição Técnica (Opcional)</label>
                <textarea
                    name="description"
                    rows={3}
                    placeholder="Informações adicionais da peça..."
                    className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 placeholder:text-industrial-400 outline-none transition-all shadow-inner resize-y"
                />
            </div>

            <div className="space-y-2 pt-6 border-t border-industrial-100 bg-industrial-50 p-6 rounded-lg border-2 border-dashed border-industrial-300">
                <h4 className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Mídia do Produto</h4>
                <p className="text-xs text-action font-semibold block mb-4">
                    MVP: Insira uma URL de imagem direta. Mais tarde ligaremos nosso uploader Hostinger nativo.
                </p>
                <input
                    type="url"
                    name="imageUrl"
                    placeholder="https://sua-imagem.com/foto.jpg"
                    className="w-full px-4 py-3 bg-white border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 placeholder:text-industrial-400 outline-none transition-all shadow-inner"
                />
            </div>

            {state?.error && (
                <div className="text-red-600 bg-red-50 font-semibold p-4 rounded-md border border-red-200">
                    Ocorreu um erro: {state.error}
                </div>
            )}

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="group relative flex justify-center items-center gap-2 py-3 px-8 text-sm font-extrabold rounded-md text-white bg-industrial-900 hover:bg-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-800 transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>Salvando...</>
                    ) : (
                        <>
                            <Save size={18} />
                            Salvar Nova Peça
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
