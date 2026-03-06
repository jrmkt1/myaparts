"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createCategoryAction(prevState: unknown, formData: FormData) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return { error: "Não autorizado." };
        }

        const name = formData.get("name") as string;
        if (!name || name.trim() === "") {
            return { error: "O nome da categoria é obrigatório." };
        }

        // Cria um slug simples (ex: "Sistema de Motor" -> "sistema-de-motor")
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/[^\w-]+/g, "");

        // Verifica se já existe
        const existing = await db.category.findUnique({ where: { slug } });
        if (existing) {
            return { error: "Uma categoria com este nome ou slug já existe." };
        }

        await db.category.create({
            data: { name, slug },
        });

        revalidatePath("/painel/categorias");
        revalidatePath("/painel/produtos/novo"); // Atualiza as opções do select no form de produto
        return { success: true };
    } catch (error) {
        console.error("[CREATE_CATEGORY_ERROR]", error);
        return { error: "Erro interno ao criar categoria." };
    }
}

export async function createBrandAction(prevState: unknown, formData: FormData) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return { error: "Não autorizado." };
        }

        const name = formData.get("name") as string;
        if (!name || name.trim() === "") {
            return { error: "O nome da marca é obrigatório." };
        }

        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/[^\w-]+/g, "");

        const existing = await db.brand.findUnique({ where: { slug } });
        if (existing) {
            return { error: "Uma marca com este nome ou slug já existe." };
        }

        await db.brand.create({
            data: { name, slug },
        });

        revalidatePath("/painel/marcas");
        revalidatePath("/painel/produtos/novo");
        return { success: true };
    } catch (error) {
        console.error("[CREATE_BRAND_ERROR]", error);
        return { error: "Erro interno ao criar marca." };
    }
}
