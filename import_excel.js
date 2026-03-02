const fs = require('fs');
const xlsx = require('xlsx');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Função para limpar Part Number para Busca Tolerante
const cleanPN = (pn) => {
    if (!pn) return null;
    return String(pn).replace(/[-.\s+_]/g, "").toUpperCase();
};

async function main() {
    // 1. Defina aqui o caminho do seu arquivo Excel. Exemplo: './meus_produtos.xlsx' ou '.xls' 
    const EXCEL_FILE_PATH = './meus_produtos.xls'; // Pode mudar para .xlsx também

    if (!fs.existsSync(EXCEL_FILE_PATH)) {
        console.error(`❌ O arquivo "${EXCEL_FILE_PATH}" não foi encontrado.`);
        console.log("Por favor, cole o arquivo Excel na pasta principal (h:\\PROJETOS\\myaparts) e mude o nome dele para 'meus_produtos.xls', ou altere o nome na linha 14 do script import_excel.js.");
        process.exit(1);
    }

    console.log(`Lendo o arquivo EXCEL: ${EXCEL_FILE_PATH} ...`);

    try {
        // Lendo a planilha (Workbook)
        const workbook = xlsx.readFile(EXCEL_FILE_PATH);

        // Pegando a Primeira Aba da planilha
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convertendo a aba para Array de Objetos JSON (Ex: [ { 'Part Number': '123', 'Nome': 'Filtro' } ])
        const productList = xlsx.utils.sheet_to_json(worksheet);

        if (!productList || productList.length === 0) {
            console.error("❌ Não consegui ler nada. A planilha parece estar vazia na primeira Aba.");
            process.exit(1);
        }

        console.log(`Encontradas ${productList.length} linhas na planilha. Cadastrando no Banco de Dados (MYA PARTS)...`);

        // Vamos mostrar algumas chaves da primeira linha para ajudar você a mapear
        console.log("🔎 Nomes das Colunas Detectadas na Planilha:");
        console.log(Object.keys(productList[0]));
        console.log("-------------------------------------------------");

        // Tratando categorias automáticas
        let defaultBrand = await prisma.brand.findFirst();
        if (!defaultBrand) {
            defaultBrand = await prisma.brand.create({ data: { name: "Genérica", slug: "generica" } });
        }

        let defaultCategory = await prisma.category.findFirst();
        if (!defaultCategory) {
            defaultCategory = await prisma.category.create({ data: { name: "Outros", slug: "outros" } });
        }

        let sucs = 0;
        let errs = 0;

        for (const item of productList) {

            // Limpando espaços esquecidos no Excel no nome das colunas
            const cleanItem = {};
            for (const key in item) {
                cleanItem[key.trim().toLowerCase()] = item[key];
            }

            // ==============================================
            const name = cleanItem["descricao"] || cleanItem["produto"] || cleanItem["nome"] || "Produto Sem Nome Definido";
            const partNumber = cleanItem["codigo oem"] || cleanItem["sku"] || cleanItem["codigo mya"] || cleanItem["codigo"];
            const partNumberSec = cleanItem["codigo mya"] || cleanItem["sku"];
            const brandString = cleanItem["marca"];
            // ==============================================

            if (!partNumber || String(partNumber).trim() === "") {
                console.warn(`⚠️ Linha ignorada: Faltou Código / Part Number.`);
                errs++;
                continue;
            }

            try {
                const cleanPartNumber = cleanPN(partNumber);
                const cleanSec = cleanPN(partNumberSec);

                // Criar ou Buscar Marca Dinâmica da Planilha
                let targetBrandId = defaultBrand.id;
                if (brandString && typeof brandString === 'string' && brandString.trim() !== '') {
                    const localBrandSlug = brandString.trim().toLowerCase().replace(/\s+/g, '-');

                    const foundBrand = await prisma.brand.upsert({
                        where: { slug: localBrandSlug },
                        update: {},
                        create: { name: brandString.trim().toUpperCase(), slug: localBrandSlug }
                    });
                    if (foundBrand) {
                        targetBrandId = foundBrand.id;
                    }
                }

                // AI Keyword Detection para Categorias Automáticas
                const nameLower = String(name).toLowerCase();
                let categoryName = "Outros";

                if (nameLower.includes("filtro")) categoryName = "Filtros";
                else if (nameLower.includes("bomba") || nameLower.includes("cilindro")) categoryName = "Sistema Hidráulico";
                else if (nameLower.includes("correia") || nameLower.includes("polia")) categoryName = "Correias e Polias";
                else if (nameLower.includes("rolamento") || nameLower.includes("mancal")) categoryName = "Rolamentos";
                else if (nameLower.includes("freio") || nameLower.includes("patim") || nameLower.includes("sapata") || nameLower.includes("tambor")) categoryName = "Sistema de Freio";
                else if (nameLower.includes("motor")) categoryName = "Motor";
                else if (nameLower.includes("contator") || nameLower.includes("sensor") || nameLower.includes("rele") || nameLower.includes("chave") || nameLower.includes("botao") || nameLower.includes("alternador") || nameLower.includes("farol") || nameLower.includes("lanterna")) categoryName = "Sistema Elétrico";
                else if (nameLower.includes("vedacao") || nameLower.includes("reparo") || nameLower.includes("anel") || nameLower.includes("oring") || nameLower.includes("junta") || nameLower.includes("retentor")) categoryName = "Vedações e Reparos";
                else if (nameLower.includes("mangueira")) categoryName = "Mangueiras";

                let targetCategoryId = defaultCategory.id;
                if (categoryName !== "Outros") {
                    const categorySlug = categoryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
                    const foundCategory = await prisma.category.upsert({
                        where: { slug: categorySlug },
                        update: {},
                        create: { name: categoryName, slug: categorySlug },
                    });
                    if (foundCategory) {
                        targetCategoryId = foundCategory.id;
                    }
                }

                await prisma.product.upsert({
                    where: { part_number: String(partNumber).trim() },
                    update: {
                        name: String(name).trim() || "Produto Sem Nome Definido",
                        part_number_sec: cleanSec && cleanSec !== cleanPartNumber ? String(partNumberSec).trim() : null,
                        brandId: targetBrandId, // Set the brand
                        categoryId: targetCategoryId // Set the dynamic category
                    },
                    create: {
                        name: String(name).trim() || "Produto Sem Nome Definido",
                        part_number: String(partNumber).trim(),
                        clean_part_number: cleanPartNumber,
                        part_number_sec: cleanSec && cleanSec !== cleanPartNumber ? String(partNumberSec).trim() : null,
                        description: `Importado de planilha Excel.`,
                        brandId: targetBrandId,
                        categoryId: targetCategoryId
                    }
                });
                sucs++;
            } catch (error) {
                console.error(`Erro ao salvar PN [${partNumber}]:`, error.message);
                errs++;
            }
        }

        console.log(`\n🎉 Processo de Importação Excel Finalizado!`);
        console.log(`✅ ${sucs} Produtos Salvos ou Atualizados`);
        console.log(`❌ ${errs} Produtos Identificados com Erros em Células Vazias`);

    } catch (err) {
        console.error("Falha ao organizar o EXCEL. Certifique de que o arquivo não está corrompido ou aberto em outro programa:", err);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
