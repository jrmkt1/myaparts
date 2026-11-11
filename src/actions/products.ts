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

        const fakeImageURL = formData.get("imageUrl") as string | null;

        if (!name || !part_number || !categoryId || !brandId) {
            return { error: "Campos obrigatórios: Nome, Part Number, Categoria e Marca." };
        }

        const clean_part_number = cleanPartNumber(part_number);

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
                media: fakeImageURL
                    ? {
                          create: [
                              {
                                  url: fakeImageURL,
                                  type: "IMAGE_2D",
                                  isMain: true,
                              },
                          ],
                      }
                    : undefined,
            },
        });

        revalidatePath("/");
        revalidatePath("/produtos");
        revalidatePath("/busca");
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
            },
        });

        if (fakeImageURL) {
            await db.productMedia.deleteMany({ where: { productId } });
            await db.productMedia.create({
                data: {
                    productId,
                    url: fakeImageURL,
                    type: "IMAGE_2D",
                    isMain: true,
                },
            });
        }

        revalidatePath("/");
        revalidatePath("/produtos");
        revalidatePath("/busca");
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
            where: { id: productId },
        });
        revalidatePath("/");
        revalidatePath("/produtos");
        revalidatePath("/busca");
        revalidatePath("/painel/produtos");
        return { success: true };
    } catch (error) {
        console.error("[DELETE_PRODUCT_ERROR]", error);
        return { error: "Erro interno no servidor ao excluir o produto." };
    }
}
