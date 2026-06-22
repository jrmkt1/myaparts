"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCategoryAction, updateCategoryAction } from "@/actions/taxonomies";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CategoryFormProps {
    categoryToEdit?: {
        id: string;
        name: string;
    };
}

export default function CategoryForm({ categoryToEdit }: CategoryFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
        categoryToEdit ? updateCategoryAction : createCategoryAction,
        null
    );

    useEffect(() => {
        if (state?.success) {
            if (categoryToEdit) {
                router.push("/painel/categorias");
            } else if (formRef.current) {
                formRef.current.reset();
            }
        }
    }, [state, categoryToEdit, router]);

    return (
        <form ref={formRef} action={formAction} className="bg-white p-6 rounded-xl border border-industrial-200 shadow-sm flex flex-col md:flex-row gap-4 items-end relative mb-12">
            {categoryToEdit && (
                <input type="hidden" name="id" value={categoryToEdit.id} />
            )}

            <div className="flex-1 w-full space-y-2">
                <label className="text-sm font-bold text-industrial-800 uppercase tracking-widest">
                    {categoryToEdit ? "Editar Categoria / Sistema" : "Nova Categoria / Sistema"}
                </label>
                <input
                    key={categoryToEdit?.id || "new"}
                    required
                    type="text"
                    name="name"
                    defaultValue={categoryToEdit?.name || ""}
                    placeholder="Ex: Sistema Elétrico"
                    className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 placeholder:text-industrial-400 outline-none transition-all shadow-inner"
                />
            </div>

            <div className="flex w-full md:w-auto gap-2">
                {categoryToEdit && (
                    <Link
                        href="/painel/categorias"
                        className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 text-sm font-extrabold rounded-md text-industrial-600 bg-industrial-100 hover:bg-industrial-200 transition-all uppercase tracking-wider h-[46px]"
                    >
                        <X size={18} /> Cancelar
                    </Link>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 md:flex-none group relative flex justify-center items-center gap-2 px-8 text-sm font-extrabold rounded-md text-white bg-industrial-900 hover:bg-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-800 transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed h-[46px]"
                >
                    {isPending ? (
                        categoryToEdit ? "Salvando..." : "Cadastrando..."
                    ) : (
                        <><Save size={18} /> {categoryToEdit ? "Salvar" : "Cadastrar"}</>
                    )}
                </button>
            </div>

            {state?.error && (
                <div className="absolute -bottom-2 translate-y-full left-0 right-0 text-red-600 bg-red-50 text-sm font-semibold p-2 rounded-md border border-red-200 z-10 text-center shadow-md">
                    {state.error}
                </div>
            )}
            {state?.success && (
                <div className="absolute -bottom-2 translate-y-full left-0 right-0 text-green-700 bg-green-50 text-sm font-semibold p-2 rounded-md border border-green-200 z-10 text-center shadow-md">
                    Categoria salva com sucesso!
                </div>
            )}
        </form>
    );
}

