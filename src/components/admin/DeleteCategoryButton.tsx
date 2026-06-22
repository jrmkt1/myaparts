"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteCategoryAction } from "@/actions/taxonomies";

export default function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() => {
                if (confirm("Tem certeza que deseja excluir esta categoria?")) {
                    startTransition(async () => {
                        const res = await deleteCategoryAction(categoryId);
                        if (res?.error) {
                            alert(res.error);
                        }
                    });
                }
            }}
            className="text-industrial-400 hover:text-red-500 transition-colors disabled:opacity-50"
            title="Excluir"
        >
            <Trash2 size={18} />
        </button>
    );
}
