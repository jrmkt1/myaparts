"use server";

import { db } from "@/lib/db";
import * as xlsx from "xlsx";
import { revalidatePath } from "next/cache";

export async function importProductsAction(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            return { error: "Nenhum arquivo enviado." };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ler a planilha
        const workbook = xlsx.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Converter para JSON
        const data = xlsx.utils.sheet_to_json(worksheet) as any[];

        if (data.length === 0) {
            return { error: "A planilha está vazia ou num formato inválido." };
        }

        let successCount = 0;
        let errorCount = 0;

        // Vamos pegar o fallback para Categoria/Marca genérica (ou tentar achar as enviadas na planilha)
        // Para simplificar essa primeira importação, vamos assumir que tentaremos buscar pelo nome exato, 
        // ou criar caso não exista.
        for (const row of data) {
            try {
                // Mapear campos baseados nas colunas comuns de mercado (adapte a string key se sua planilha tiver colunas diferentes)
                const name = row["Nome"] || row["name"] || row["Descrição"] || row["description"];
                const pn = row["Part Number"] || row["PN"] || row["part_number"];
                const brandName = row["Marca"] || row["brand"] || "Genérica";
                const catName = row["Categoria"] || row["category"] || "Peças de Reposição";
                const desc = row["Descrição Longa"] || row["Detalhes"] || null;
                const pnSec = row["Código Secundário"] || null;

                if (!name || !pn) {
                    errorCount++;
                    continue; // Pula linha sem Nome ou PN
                }

                // 1. Achar ou Criar Categoria
                const catSlug = catName.toLowerCase().replace(/[^a-z0-9]/g, "-");
                const category = await db.category.upsert({
                    where: { slug: catSlug },
                    update: {},
                    create: { name: catName, slug: catSlug }
                });

                // 2. Achar ou Criar Marca
                const brandSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, "-");
                const brand = await db.brand.upsert({
                    where: { slug: brandSlug },
                    update: {},
                    create: { name: brandName, slug: brandSlug }
                });

                // Limpar o Part Number = remove traços e espaços (Search algorythm MYA)
                const cleanPn = String(pn).replace(/[-.\s+_]/g, "").toUpperCase();

                // 3. Inserir ou Atualizar Produto
                await db.product.upsert({
                    where: { part_number: String(pn) },
                    update: {
                        name: String(name),
                        categoryId: category.id,
                        brandId: brand.id,
                        description: desc ? String(desc) : undefined,
                        part_number_sec: pnSec ? String(pnSec) : undefined,
                        clean_part_number: cleanPn,
                    },
                    create: {
                        name: String(name),
                        part_number: String(pn),
                        clean_part_number: cleanPn,
                        categoryId: category.id,
                        brandId: brand.id,
                        description: desc ? String(desc) : null,
                        part_number_sec: pnSec ? String(pnSec) : null,
                    }
                });

                successCount++;
            } catch (err) {
                console.error("Erro na linha:", row, err);
                errorCount++;
            }
        }

        revalidatePath("/painel/produtos");
        return { success: true, message: `Importação concluída: ${successCount} salvos, ${errorCount} erros.` };

    } catch (e) {
        console.error("[IMPORT_ERROR]", e);
        return { error: "Erro fatal ao ler o arquivo Excel." };
    }
}
