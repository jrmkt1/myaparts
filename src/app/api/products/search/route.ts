import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanPartNumber } from "@/lib/utils/search";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query || query.trim() === "") {
            return NextResponse.json({ products: [] }, { status: 200 });
        }

        const rawQuery = query.trim();
        // 1. Process for Tolerant Search algorithm
        const cleanedQuery = cleanPartNumber(rawQuery);

        // 2. Query the Product catalog
        // We search the raw word in traditional fields (names, descriptions, brands)
        // AND we search the cleaned Query STRICTLY in the clean_part_number column for high precision.
        const products = await db.product.findMany({
            where: {
                OR: [
                    { name: { contains: rawQuery } },
                    { part_number: { contains: rawQuery } },
                    { part_number_sec: { contains: rawQuery } },
                    // Magic Tolerant Search (Even if user types 'C 123-B', it finds 'C123B')
                    { clean_part_number: { contains: cleanedQuery } },
                    { category: { name: { contains: rawQuery } } },
                    { brand: { name: { contains: rawQuery } } },
                ]
            },
            include: {
                category: true,
                brand: true,
                media: {
                    where: { isMain: true }, // Grab the main photo for the catalog list
                    take: 1
                }
            },
            take: 20, // Limit to 20 immediate results to keep the UI fast
        });

        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        console.error("[SEARCH_API_ERROR]", error);
        return NextResponse.json(
            { error: "Internal Error in Search Engine" },
            { status: 500 }
        );
    }
}
