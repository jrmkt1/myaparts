require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando injeção de dados (Seed)...");

    // 1. Criar o Administrador Padrão
    const adminEmail = "admin@myaparts.com.br";
    const passwordHash = await bcrypt.hash("MYA@Adm1n#2026!", 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            name: "Administrador Geral",
            password_hash: passwordHash,
            role: "ADMIN" // If enum, make sure it matches "ADMIN", but we are back to enum Role
        },
    });

    console.log("Administrador criado ou atualizado:", admin.email);

    // 2. Criar Categorias Base (Sistemas)
    const categories = [
        { name: "Sistema de Motor", slug: "motor" },
        { name: "Sistema de Freio", slug: "freio" },
        { name: "Sistema Hidráulico", slug: "hidraulico" },
        { name: "Sistema Elétrico", slug: "eletrico" },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: { name: cat.name, slug: cat.slug },
        });
    }
    console.log("Categorias inseridas!");

    // 3. Criar Marcas Base
    const brands = [
        { name: "Toyota", slug: "toyota" },
        { name: "Hyster", slug: "hyster" },
        { name: "Yale", slug: "yale" },
        { name: "Mitsubishi", slug: "mitsubishi" },
    ];

    for (const brand of brands) {
        await prisma.brand.upsert({
            where: { slug: brand.slug },
            update: {},
            create: { name: brand.name, slug: brand.slug },
        });
    }
    console.log("Marcas inseridas!");

    // 4. Criar Produtos de Demonstração (Catálogo MVP)
    const toyId = await prisma.brand.findUnique({ where: { slug: "toyota" } });
    const hysId = await prisma.brand.findUnique({ where: { slug: "hyster" } });

    const motId = await prisma.category.findUnique({ where: { slug: "motor" } });
    const freId = await prisma.category.findUnique({ where: { slug: "freio" } });
    const hidId = await prisma.category.findUnique({ where: { slug: "hidraulico" } });

    // Função limpadora igual ao utils/search.ts para não quebrar a Seed se usarmos outro script
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
    console.log("Produtos de Demonstração INSERIDOS com Sucesso!");

    console.log("Seed completado com sucesso! Você pode logar no painel com admin@myaparts.com.br / MYA@Adm1n#2026!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
