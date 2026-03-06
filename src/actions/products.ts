"use server";

import { db } from "@/lib/db";
import { cleanPartNumber } from "@/lib/utils/search";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createProductAction(formData: FormData) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return { error: "Não autorizado." };
        }

        const name = formData.get("name") as string;
        const part_number = formData.get("part_number") as string;
        const part_number_sec = formData.get("part_number_sec") as string | null;
        const description = formData.get("description") as string;
        const price = formData.get("price") ? parseFloat(formData.get("price") as string) : null;
        const categoryId = formData.get("categoryId") as string;
        const brandId = formData.get("brandId") as string;

        // We expect the image to be uploaded via some specialized tool later, but for now we create the entity
        // We will save fake data for photos to let the layout work as an MVP.
        const fakeImageURL = formData.get("imageUrl") as string | null;

        if (!name || !part_number || !categoryId || !brandId) {
            return { error: "Campos obrigatórios: Nome, Part Number, Categoria e Marca." };
        }

        // 1. Process Tolerant Search Query automatically inside the Action
        const clean_part_number = cleanPartNumber(part_number);

        // 2. Insert into DB
        const newProduct = await db.product.create({
            data: {
                name,
                part_number,
                part_number_sec,
                clean_part_number,
                description,
                price,
                categoryId,
                brandId,
                media: fakeImageURL ? {
                    create: [{
                        url: fakeImageURL, // Note: In real life, use S3/Hostinger bucket. Here we accept standard URL for testing MVP
                        type: "IMAGE_2D",
                        isMain: true
                    }]
                } : undefined
            }
        });

        revalidatePath("/painel/produtos");
        return { success: true, productId: newProduct.id };

    } catch (error) {
        console.error("[CREATE_PRODUCT_ERROR]", error);
        return { error: "Erro interno no servidor ao cadastrar produto." };
    }
}

export async function updateProductAction(productId: string, formData: FormData) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return { error: "Não autorizado." };
        }

        const name = formData.get("name") as string;
        const part_number = formData.get("part_number") as string;
        const part_number_sec = formData.get("part_number_sec") as string | null;
        const description = formData.get("description") as string;
        const price = formData.get("price") ? parseFloat(formData.get("price") as string) : null;
        const categoryId = formData.get("categoryId") as string;
        const brandId = formData.get("brandId") as string;

        const fakeImageURL = formData.get("imageUrl") as string | null;

        if (!name || !part_number || !categoryId || !brandId) {
            return { error: "Campos obrigatórios: Nome, Part Number, Categoria e Marca." };
        }

        const clean_part_number = cleanPartNumber(part_number);

        // Update basic text data
        await db.product.update({
            where: { id: productId },
            data: {
                name,
                part_number,
                part_number_sec,
                clean_part_number,
                description,
                price,
                categoryId,
                brandId,
            }
        });

        // Only update image if a new one was uploaded
        if (fakeImageURL) {
            // we delete previous ones for simplicity in this MVP
            await db.productMedia.deleteMany({ where: { productId } });
            await db.productMedia.create({
                data: {
                    productId,
                    url: fakeImageURL,
                    type: "IMAGE_2D",
                    isMain: true
                }
            });
        }

        revalidatePath("/painel/produtos");
        return { success: true, productId };

    } catch (error) {
        console.error("[UPDATE_PRODUCT_ERROR]", error);
        return { error: "Erro interno no servidor ao atualizar o produto." };
    }
}

export async function deleteProductAction(productId: string) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return { error: "Não autorizado." };
        }

        await db.product.delete({
            where: { id: productId }
        });
        revalidatePath("/painel/produtos");
        return { success: true };
    } catch (error) {
        console.error("[DELETE_PRODUCT_ERROR]", error);
        return { error: "Erro interno no servidor ao excluir o produto." };
    }
}
