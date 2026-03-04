import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
    try {
        // Verificar se as variáveis do Cloudinary estão presentes
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            console.error("[UPLOAD] Variáveis Cloudinary ausentes:", {
                cloudName: !!cloudName,
                apiKey: !!apiKey,
                apiSecret: !!apiSecret,
            });
            return NextResponse.json(
                { error: `Configuração do Cloudinary incompleta. Verifique as variáveis de ambiente.` },
                { status: 500 }
            );
        }

        // Configurar Cloudinary dentro do handler (garante leitura em runtime na Vercel)
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        });

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

        // Ler arquivo como Buffer e converter para base64 data URI
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const mimeType = file.type || "image/png";
        const dataUri = `data:${mimeType};base64,${base64}`;

        // Upload para o Cloudinary COM marca d'água do logo MYA
        const result = await cloudinary.uploader.upload(dataUri, {
            folder: "myaparts/produtos",
            resource_type: "auto",
            transformation: [
                {
                    overlay: "myaparts:watermark-logo",
                    width: "0.35",
                    flags: "relative",
                    opacity: 40,
                    gravity: "center",
                },
            ],
        });

        return NextResponse.json({ success: true, url: result.secure_url });

    } catch (error: any) {
        console.error("[UPLOAD_CLOUDINARY_ERROR]", error);
        const message = error?.message || "Erro desconhecido";
        return NextResponse.json(
            { error: `Falha no upload: ${message}` },
            { status: 500 }
        );
    }
}
