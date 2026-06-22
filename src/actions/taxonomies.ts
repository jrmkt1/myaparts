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

export async function updateCategoryAction(prevState: unknown, formData: FormData) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return { error: "Não autorizado." };
        }

        const id = formData.get("id") as string;
        const name = formData.get("name") as string;

        if (!id) {
            return { error: "ID da categoria não fornecido." };
        }
        if (!name || name.trim() === "") {
            return { error: "O nome da categoria é obrigatório." };
        }

        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/[^\w-]+/g, "");

        const existing = await db.category.findFirst({
            where: {
                slug,
                NOT: { id }
            }
        });
        if (existing) {
            return { error: "Uma categoria com este nome ou slug já existe." };
        }

        await db.category.update({
            where: { id },
            data: { name, slug },
        });

        revalidatePath("/painel/categorias");
        revalidatePath("/painel/produtos/novo");
        return { success: true };
    } catch (error) {
        console.error("[UPDATE_CATEGORY_ERROR]", error);
        return { error: "Erro interno ao atualizar categoria." };
    }
}

export async function deleteCategoryAction(id: string) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return { error: "Não autorizado." };
        }

        const productsCount = await db.product.count({
            where: { categoryId: id }
        });

        if (productsCount > 0) {
            return { error: "Não é possível excluir uma categoria que possui itens vinculados." };
        }

        await db.category.delete({
            where: { id }
        });

        revalidatePath("/painel/categorias");
        revalidatePath("/painel/produtos/novo");
        return { success: true };
    } catch (error) {
        console.error("[DELETE_CATEGORY_ERROR]", error);
        return { error: "Erro interno ao excluir categoria." };
    }
}

