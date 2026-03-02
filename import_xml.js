const fs = require('fs');
const xml2js = require('xml2js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Função para limpar Part Number para Busca Tolerante
const cleanPN = (pn) => {
    if (!pn) return null;
    return String(pn).replace(/[-.\s+_]/g, "").toUpperCase();
};

async function main() {
    // 1. Defina aqui o caminho do seu arquivo XML. Exemplo: './meus_produtos.xml'
    const XML_FILE_PATH = './seu_arquivo.xml';

    if (!fs.existsSync(XML_FILE_PATH)) {
        console.error(`❌ O arquivo "${XML_FILE_PATH}" não foi encontrado.`);
        console.log("Por favor, cole o arquivo XML na pasta do projeto e troque o nome na linha 13 deste script, ou cole o nome correto.");
        process.exit(1);
    }

    console.log(`Lendo o arquivo XML: ${XML_FILE_PATH} ...`);
    const xmlData = fs.readFileSync(XML_FILE_PATH, 'utf-8');

    // Mapeamento do XML (Ajustar de acordo com a estrutura real do seu arquivo)
    const parser = new xml2js.Parser({ explicitArray: false });

    try {
        const result = await parser.parseStringPromise(xmlData);

        // ⚠️ ATENÇÃO: Verifique onde está a "lista" no seu XML.
        // Se o seu XML for <produtos><produto>...</produto></produtos>, a variável de array fica assim:
        let productList = result?.produtos?.produto;

        if (!productList) {
            // Tenta pegar o nó principal caso não tenha uma tag pai
            const keys = Object.keys(result);
            if (keys.length > 0 && Array.isArray(result[keys[0]])) {
                productList = result[keys[0]];
            } else if (keys.length > 0 && result[keys[0]][keys[0].slice(0, -1)]) {
                productList = result[keys[0]][keys[0].slice(0, -1)];
            }
        }

        // Converte para array forçadamente caso tenha apenas 1 produto
        if (productList && !Array.isArray(productList)) {
            productList = [productList];
        }

        if (!productList || productList.length === 0) {
            console.error("❌ Não consegui encontrar os produtos dentro do XML (lista vazia).");
            console.log("Estrutura encontrada:", JSON.stringify(result).substring(0, 500) + "...");
            process.exit(1);
        }

        console.log(`Encontrados ${productList.length} produtos no XML. Cadastrando no Banco...`);

        // Buscando uma Categoria Genérica e Marca Genérica se não enviada no XML
        // ou você pode mandar procurar a categoria pelo nome no campo original.
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
            // Mapeie aqui para o Título (ex: <nome>, <titulo>, <descricao>) do seu XML
            const name = item.nome || item.name || item.titulo || item.descricao || "Produto Sem Nome";

            // Mapeie aqui o Código / Part Number (ex: <codigo>, <pn>, <sku>)
            const partNumber = item.codigo || item.sku || item.part_number || item.referencia;

            // Ignorado sem codigo
            if (!partNumber) {
                console.warn(`⚠️ Produto Pulado: "${name}" não tem código válido no XML.`);
                errs++;
                continue;
            }

            try {
                const cleanPartNumber = cleanPN(partNumber);

                await prisma.product.upsert({
                    where: { part_number: String(partNumber) },
                    update: {
                        name: String(name),
                        // Você pode tentar extrair o preço: price: item.preco ? parseFloat(item.preco) : null
                    },
                    create: {
                        name: String(name),
                        part_number: String(partNumber),
                        clean_part_number: cleanPartNumber,
                        description: `Importado de lote XML automaticamente. Nome original do sistema: ${name}`,
                        brandId: defaultBrand.id,
                        categoryId: defaultCategory.id
                    }
                });
                sucs++;
            } catch (error) {
                console.error(`Erro ao inserir o item PN[${partNumber}]:`, error.message);
                errs++;
            }
        }

        console.log(`\n🎉 Processo Finalizado!`);
        console.log(`✅ ${sucs} Produtos Inseridos/Atualizados`);
        console.log(`❌ ${errs} Produtos Ignorados com Erro`);

    } catch (err) {
        console.error("Falha ao organizar o XML:", err);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
