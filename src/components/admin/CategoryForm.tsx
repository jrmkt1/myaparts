"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCategoryAction } from "@/actions/taxonomies";
import { Save } from "lucide-react";

export default function CategoryForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(createCategoryAction, null);

    useEffect(() => {
        if (state?.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction} className="bg-white p-6 rounded-xl border border-industrial-200 shadow-sm flex flex-col md:flex-row gap-4 items-end relative mb-12">
            <div className="flex-1 w-full space-y-2">
                <label className="text-sm font-bold text-industrial-800 uppercase tracking-widest">Nova Categoria / Sistema</label>
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Ex: Sistema Elétrico"
                    className="w-full px-4 py-3 bg-industrial-100 border border-transparent focus:bg-white focus:border-action rounded-md text-industrial-900 placeholder:text-industrial-400 outline-none transition-all shadow-inner"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto mt-4 md:mt-0 group relative flex justify-center items-center gap-2 px-8 text-sm font-extrabold rounded-md text-white bg-industrial-900 hover:bg-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-800 transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed h-[46px]"
            >
                {isPending ? "Cadastrando..." : <><Save size={18} /> Cadastrar</>}
            </button>

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
