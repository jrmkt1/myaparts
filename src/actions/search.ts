"use server";

import { db } from "@/lib/db";
import { cleanPartNumber } from "@/lib/utils/search";

export async function searchAutocomplete(q: string) {
    if (!q || q.trim() === "") {
        return [];
    }

    const rawQuery = q.trim();
    const cleanedQuery = cleanPartNumber(rawQuery);

    try {
        const results = await db.product.findMany({
            where: {
                OR: [
                    { name: { contains: rawQuery } },
                    { part_number: { contains: rawQuery } },
                    { part_number_sec: { contains: rawQuery } },
                    { clean_part_number: { contains: cleanedQuery } },
                    { category: { name: { contains: rawQuery } } },
                    { brand: { name: { contains: rawQuery } } },
                ]
            },
            include: {
                media: { where: { isMain: true }, take: 1 },
                category: true,
                brand: true
            },
            take: 5,
        });

        // We only return what we need to minimize wire size
        return results.map(r => ({
            id: r.id,
            name: r.name,
            part_number: r.part_number,
            slug: r.part_number, // We need slug or pn to redirect
            brand: r.brand?.name || null,
            category: r.category?.name || null,
            image: r.media[0]?.url || null,
        }));
    } catch (e) {
        console.error("Autocomplete err:", e);
        return [];
    }
}
