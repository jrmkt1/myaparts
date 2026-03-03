"use client";

import { useActionState, useEffect, useState } from "react";
import { createProductAction, updateProductAction } from "@/actions/products";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the shape of initialData for type safety
type InitialProductData = {
    id: string;
    name: string;
    part_number: string;
    part_number_sec?: string | null;
    categoryId: string;
    brandId: string;
    description?: string | null;
    price?: number | null;
    media?: { url: string }[];
};

type ProductFormProps = {
    categories: { id: string; name: string }[];
    brands: { id: string; name: string }[];
    initialData?: InitialProductData | null;
};

export default function ProductForm({ categories, brands, initialData }: ProductFormProps) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    // If we have initialData, try to find a main image to pre-populate
    const initialImageUrl = initialData?.media?.[0]?.url || "";
    const [uploadedUrl, setUploadedUrl] = useState(initialImageUrl);

    // In React 19, useActionState manages the transition
    // state is the returned object from our createProductAction action
    const [state, formAction, isPending] = useActionState(
        async (prevState: unknown, formData: FormData) => {
            if (initialData?.id) {
                // Edit mode
                return await updateProductAction(initialData.id, formData);
            } else {
                // Create mode
                return await createProductAction(formData);
            }
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
                        defaultValue={initialData?.name || ""}
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
                        defaultValue={initialData?.part_number || ""}
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
                        defaultValue={initialData?.part_number_sec || ""}
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
                        defaultValue={initialData?.categoryId || ""}
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
                        defaultValue={initialData?.brandId || ""}
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
                    defaultValue={initialData?.description || ""}
                    placeholder="Informações adicionais da peça..."
                    className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 placeholder:text-industrial-400 outline-none transition-all shadow-inner resize-y"
                />
            </div>

            <div className="space-y-4 pt-6 border-t border-industrial-100 bg-industrial-50 p-6 rounded-lg border-2 border-dashed border-industrial-300">
                <h4 className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Mídia do Produto</h4>
                <p className="text-xs text-industrial-500 font-semibold block">
                    Faça o upload da foto diretamente para o servidor da MYA Parts (Hostinger).
                </p>

                <div className="flex flex-col gap-2">
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setIsUploading(true);
                            setUploadError("");

                            try {
                                const formData = new FormData();
                                formData.append("file", file);

                                const res = await fetch("/api/upload", {
                                    method: "POST",
                                    body: formData
                                });

                                const data = await res.json();
                                if (data.success) {
                                    setUploadedUrl(data.url);
                                } else {
                                    setUploadError(data.error || "Erro no upload");
                                }
                            } catch (err) {
                                setUploadError("Falha de rede ao tentar subir a foto.");
                            } finally {
                                setIsUploading(false);
                            }
                        }}
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-industrial-200 file:text-industrial-900 hover:file:bg-industrial-300 focus:outline-none"
                    />

                    {isUploading && <span className="text-sm text-action font-bold animate-pulse">Aguarde, enviando foto para a nuvem...</span>}
                    {uploadError && <span className="text-sm text-red-600 font-bold">{uploadError}</span>}
                    {uploadedUrl && (
                        <div className="mt-2 text-sm text-green-600 font-bold flex flex-col gap-2">
                            <span>✅ Imagem salva com sucesso!</span>
                            <img src={uploadedUrl} alt="Preview" className="w-24 h-24 object-cover border border-industrial-200 rounded-md shadow-sm" />
                        </div>
                    )}

                    {/* Hidden input para mandar a URL na string do form original */}
                    <input type="hidden" name="imageUrl" value={uploadedUrl} />
                </div>
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
                            {initialData ? "Atualizar Peça" : "Salvar Nova Peça"}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
