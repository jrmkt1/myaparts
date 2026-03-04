import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

        // Ler arquivo como Buffer e converter para base64 data URI
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const mimeType = file.type || "image/png";
        const dataUri = `data:${mimeType};base64,${base64}`;

        // Upload para o Cloudinary
        const result = await cloudinary.uploader.upload(dataUri, {
            folder: "myaparts/produtos",
            resource_type: "auto",
        });

        return NextResponse.json({ success: true, url: result.secure_url });

    } catch (error) {
        console.error("[UPLOAD_CLOUDINARY_ERROR]", error);
        return NextResponse.json(
            { error: "Falha ao enviar imagem. Tente novamente." },
            { status: 500 }
        );
    }
}
