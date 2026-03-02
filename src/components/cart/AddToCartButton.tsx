"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, CheckCircle2 } from "lucide-react";

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        part_number: string;
        brand: string;
        image?: string;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={added}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-md font-extrabold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${added
                    ? "bg-green-600 text-white cursor-default hover:translate-y-0 hover:shadow-lg"
                    : "bg-action hover:bg-action-hover text-white"
                }`}
        >
            {added ? (
                <>
                    <CheckCircle2 size={20} className="animate-in zoom-in" />
                    Adicionado
                </>
            ) : (
                <>
                    <ShoppingCart size={20} />
                    Adicionar ao Orçamento
                </>
            )}
        </button>
    );
}
