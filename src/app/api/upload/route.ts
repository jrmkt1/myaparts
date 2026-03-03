import { NextRequest, NextResponse } from "next/server";
import * as ftp from "basic-ftp";
import { auth } from "@/auth";
import { Readable } from "stream";

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

        // Obter credenciais via variaveis
        const host = process.env.FTP_HOST || "82.25.67.181";
        const user = process.env.FTP_USER || "u187455536";
        const password = process.env.FTP_PASSWORD || "Byd24VEay74KbH";

        // Conectar via FTP Moderno (basic-ftp)
        const client = new ftp.Client();
        client.ftp.verbose = false;

        try {
            await client.access({
                host: host,
                user: user,
                password: password,
                secure: false // Hostinger FTP costuma ser unsecure por default na porta 21
            });

            // Vai para a pasta correta dentro do servidor Hostinger (mude se ele cair no root errado)
            await client.ensureDir("public_html/uploads/").catch(() => { });

            const remotePath = `public_html/uploads/${fileName}`;
            const stream = Readable.from(buffer);

            await client.uploadFrom(stream, remotePath);

        } catch (ftpError) {
            console.error("Erro interno do Client FTP:", ftpError);
            throw ftpError;
        } finally {
            client.close();
        }

        const uploadedUrl = `https://myaparts.com.br/uploads/${fileName}`;
        return NextResponse.json({ success: true, url: uploadedUrl });

    } catch (error) {
        console.error("[UPLOAD_FTP_ERROR]", error);
        return NextResponse.json({ error: "Falha ao enviar arquivo via FTP interno." }, { status: 500 });
    }
}
