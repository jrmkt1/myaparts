"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateQuoteStatusAction(quoteId: string, status: "PENDING" | "RESPONDED" | "CANCELLED") {
    try {
        await db.quote.update({
            where: { id: quoteId },
            data: { status }
        });

        revalidatePath("/painel/orcamentos");
        revalidatePath(`/painel/orcamentos/${quoteId}`);
        return { success: true };
    } catch (error) {
        console.error("[UPDATE_QUOTE_STATUS_ERROR]", error);
        return { error: "Erro interno no servidor ao atualizar o status do orçamento." };
    }
}
