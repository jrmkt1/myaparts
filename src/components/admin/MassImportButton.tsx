"use client";

import { UploadCloud } from "lucide-react";
import { useState, useTransition } from "react";
import { importProductsAction } from "@/actions/import";

export default function MassImportButton() {
    const [isPending, startTransition] = useTransition();

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        startTransition(async () => {
            const formData = new FormData();
            formData.append("file", file);

            const result = await importProductsAction(formData);
            if (result.success) {
                alert(result.message);
            } else {
                alert(result.error);
            }
        });
    };

    return (
        <label className="inline-flex items-center gap-2 bg-industrial-200 hover:bg-industrial-300 text-industrial-900 px-6 py-3 rounded-md font-bold transition-colors shadow-sm whitespace-nowrap cursor-pointer">
            <UploadCloud size={18} />
            {isPending ? "Importando..." : "Importar Planilha"}
            <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleUpload}
                disabled={isPending}
                className="hidden"
            />
        </label>
    );
}
