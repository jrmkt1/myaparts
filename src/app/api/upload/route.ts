import { NextRequest, NextResponse } from "next/server";
import Client from "ftp";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        // Apenas ADMIN pode enviar fotos
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Nenhum arquivo recebido." }, { status: 400 });
        }

        // Ler arquivo como Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Criar nome único para o arquivo
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

        // Obter credenciais via variaveis (ou usar direto se quiser, mas é melhor var)
        const host = process.env.FTP_HOST || "82.25.67.181";
        const user = process.env.FTP_USER || "u187455536";
        const password = process.env.FTP_PASSWORD || "byd24VEay@74KbH";

        // Conectar via FTP
        const uploadedUrl = await new Promise<string>((resolve, reject) => {
            const client = new Client();

            client.on("ready", () => {
                // Coloca na raiz public_html ou em /public_html/uploads
                const remotePath = `public_html/uploads/${fileName}`;

                client.put(buffer, remotePath, (err) => {
                    if (err) {
                        client.end();
                        reject(err);
                    } else {
                        client.end();
                        // URL que vai ficar no banco (hostinger publico apontando pro arquivo)
                        resolve(`https://myaparts.com.br/uploads/${fileName}`);
                    }
                });
            });

            client.on("error", (err) => {
                reject(err);
            });

            client.connect({
                host: host,
                user: user,
                password: password,
                port: 21
            });
        });

        return NextResponse.json({ success: true, url: uploadedUrl });

    } catch (error) {
        console.error("[UPLOAD_FTP_ERROR]", error);
        return NextResponse.json({ error: "Falha ao enviar arquivo via FTP." }, { status: 500 });
    }
}
