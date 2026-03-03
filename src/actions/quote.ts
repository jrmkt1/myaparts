"use server";

import { db } from "@/lib/db";


export async function submitQuoteAction(formData: FormData) {
    try {
        const customerName = formData.get("customerName") as string;
        const companyName = formData.get("companyName") as string;
        const customerEmail = formData.get("customerEmail") as string;
        const customerPhone = formData.get("customerPhone") as string;
        const itemsRaw = formData.get("items") as string;

        if (!customerName || !customerEmail || !customerPhone || !itemsRaw) {
            return { error: "Por favor, preencha todos os campos obrigatórios." };
        }

        const items = JSON.parse(itemsRaw);

        if (items.length === 0) {
            return { error: "Seu carrinho de orçamento está vazio." };
        }

        // Insert quote into Database
        const quote = await db.quote.create({
            data: {
                customerName,
                customerEmail,
                customerPhone,
                companyName,
                status: "PENDING",
                items: {
                    create: items.map((item: { productId: string; quantity: number }) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            }
        });

        // We can also trigger an email here using Resend/Nodemailer later

        return { success: true, quoteId: quote.id };
    } catch (error) {
        console.error("[SUBMIT_QUOTE_ERROR]", error);
        return { error: "Ocorreu um erro interno ao enviar seu orçamento. Tente novamente." };
    }
}
