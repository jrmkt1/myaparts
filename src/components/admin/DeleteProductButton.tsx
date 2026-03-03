"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteProductAction } from "@/actions/products";

export default function DeleteProductButton({ productId }: { productId: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() => {
                if (confirm("Tem certeza que deseja excluir esta peça?")) {
                    startTransition(() => {
                        deleteProductAction(productId);
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
