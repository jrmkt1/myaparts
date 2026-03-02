const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    console.log("Inserindo produtos manuais...");

    const toyId = await prisma.brand.findUnique({ where: { slug: "toyota" } });
    const hysId = await prisma.brand.findUnique({ where: { slug: "hyster" } });

    const motId = await prisma.category.findUnique({ where: { slug: "motor" } });
    const freId = await prisma.category.findUnique({ where: { slug: "freio" } });
    const hidId = await prisma.category.findUnique({ where: { slug: "hidraulico" } });

    if (!toyId || !motId) {
        console.log("Faltam marcas ou categorias!");
        return;
    }

    const cleanPN = (pn) => pn.replace(/[-.\s+_]/g, "").toUpperCase();

    const demoProducts = [
        {
            name: "Bomba Hidráulica Principal Hyster 155",
            part_number: "HY-992-001",
            clean_part_number: cleanPN("HY-992-001"),
            description: "Bomba hidráulica genuína Hyster para modelos 155. Alta pressão de escoamento e durabilidade industrial.",
            categoryId: hidId.id,
            brandId: hysId.id,
            imageUrl: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?q=80&w=1974&auto=format&fit=crop"
        },
        {
            name: "Motor de Partida Toyota 24V",
            part_number: "TY-24V-START",
            clean_part_number: cleanPN("TY-24V-START"),
            description: "Motor de partida elétrico para empilhadeiras Toyota. Tensão de operação de 24V. Inclui pinhão de engate.",
            categoryId: motId.id,
            brandId: toyId.id,
            imageUrl: "https://images.unsplash.com/photo-1486262715619-6708146bc41c?q=80&w=1964&auto=format&fit=crop"
        },
        {
            name: "Lona de Freio Traseira",
            part_number: "BK-LN-004",
            clean_part_number: cleanPN("BK-LN-004"),
            description: "Conjunto de lonas de freio traseiras de alto atrito.",
            categoryId: freId.id,
            brandId: toyId.id,
            imageUrl: "https://images.unsplash.com/photo-1579693952774-9f75ec53e206?q=80&w=1974&auto=format&fit=crop"
        }
    ];

    for (const prod of demoProducts) {
        const { imageUrl, ...prodData } = prod;
        await prisma.product.upsert({
            where: { part_number: prodData.part_number },
            update: {},
            create: {
                ...prodData,
                media: {
                    create: [{
                        url: imageUrl,
                        type: "IMAGE_2D",
                        isMain: true
                    }]
                }
            }
        });
    }
    console.log("Deu certo!!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
