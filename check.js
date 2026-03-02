const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany();
    console.log("Products in DB:", products.length);
    console.log(products.map(p => p.name));
}

main().catch(console.error).finally(() => prisma.$disconnect());
