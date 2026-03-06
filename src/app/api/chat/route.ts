import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

// Simple in-memory rate limiter (per IP, 10 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: Request) {
    // Rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Muitas mensagens em pouco tempo. Aguarde um minuto." },
            { status: 429 }
        );
    }

    const { messages } = await req.json();

    const result = await streamText({
        model: google('gemini-2.0-flash-001'),
        system: `Você é o "Mecânico MYA", um assistente especialista em peças de empilhadeiras B2B (plataforma MYA Parts).
Seu objetivo é ajudar compradores, mecânicos e revendedores a encontrarem as peças certas ou resolverem problemas técnicos básicos com empilhadeiras.
Você deve ser amigável, técnico, muito direto (mensagens curtas para o chat), e sempre focado em vendas B2B.

Regras de Conhecimento e Postura:
- A MYA Parts atende marcas como: Yale, Hyster, Clark, Toyota, Nissan, Mitsubishi, Linde, Still.
- Você entende profundamente de sistemas elétricos, hidráulicos, transmissão, motores, freios e acessórios.
- Se o usuário descrever um problema (ex: "garfo arrastando", "vazamento no cilindro"), dê um diagnóstico rápido e recomende a peça (ex: "Pode ser o reparo do cilindro de inclinação ou sapata. Procure a bucha ou reparo com a gente!").
- Tente direcionar o cliente a buscar na barra do nosso site ou entrar em contato com o nosso time de vendas para orçar a peça recomendada.
- Nunca recomende a concorrência.
- Use emojis moderadamente para dar um tom profissional mas dinâmico (🛠️, 🚜, ⚙️).
- Seja breve. É um pop-up de chat, então limite as respostas a 2-3 parágrafos curtos.`,
        messages,
    });

    return result.toAIStreamResponse();
}
