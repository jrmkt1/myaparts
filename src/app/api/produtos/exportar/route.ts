import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await db.product.findMany({
            include: {
                category: true,
                brand: true,
            },
            orderBy: { createdAt: "desc" }
        });

        // Setup CSV Headers
        const headers = ["ID_SISTEMA", "NOME_DO_PRODUTO", "PART_NUMBER", "PN_SECUNDARIO", "CATEGORIA", "MARCA", "PESO", "PRECO"];

        // Format rows
        const rows = products.map((p) => {
            return [
                p.id,
                `"${(p.name || "").replace(/"/g, '""')}"`,
                `"${(p.part_number || "").replace(/"/g, '""')}"`,
                `"${(p.part_number_sec || "").replace(/"/g, '""')}"`,
                `"${(p.category?.name || "").replace(/"/g, '""')}"`,
                `"${(p.brand?.name || "").replace(/"/g, '""')}"`,
                `"${(p.weight || "").replace(/"/g, '""')}"`,
                `"${p.price ? p.price.toString().replace('.', ',') : ""}"`
            ].join(";");
        });

        const csvContent = [headers.join(";"), ...rows].join("\n");

        // Use UTF-8 BOM to ensure Excel opens special characters correctly
        const bom = "\uFEFF";
        const csvWithBom = bom + csvContent;

        return new NextResponse(csvWithBom, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": 'attachment; filename="produtos_myaparts.csv"',
            },
        });
    } catch (error) {
        console.error("[EXPORTAR_PRODUTOS_ERRO]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
