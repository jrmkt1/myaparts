"use client";

import { useTransition } from "react";
import { updateQuoteStatusAction } from "@/actions/quotes";

type QuoteStatusSelectProps = {
    quoteId: string;
    currentStatus: "PENDING" | "RESPONDED" | "CANCELLED";
};

export default function QuoteStatusSelect({ quoteId, currentStatus }: QuoteStatusSelectProps) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as "PENDING" | "RESPONDED" | "CANCELLED";
        startTransition(() => {
            updateQuoteStatusAction(quoteId, newStatus);
        });
    };

    let bgColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (currentStatus === "RESPONDED") bgColor = "bg-green-100 text-green-800 border-green-200";
    if (currentStatus === "CANCELLED") bgColor = "bg-red-100 text-red-800 border-red-200";

    return (
        <select
            value={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className={`text-[10px] font-bold uppercase tracking-widest px-2-5 py-1-5 rounded-md border outline-none cursor-pointer appearance-none ${bgColor} ${isPending ? 'opacity-50' : ''}`}
            style={{ padding: '0.25rem 0.5rem', backgroundPosition: 'right 0.25rem center', paddingRight: '1.25rem' }}
        >
            <option className="bg-white text-industrial-900" value="PENDING">🕒 Pendente</option>
            <option className="bg-white text-industrial-900" value="RESPONDED">✅ Respondido</option>
            <option className="bg-white text-industrial-900" value="CANCELLED">❌ Cancelado</option>
        </select>
    );
}
