"use server";

import { db } from "@/lib/db";


export async function submitQuoteAction(formData: FormData) {
    try {
        const customerName = formData.get("customerName") as string;
        const companyName = formData.get("companyName") as string;
        const customerEmail = formData.get("customerEmail") as string;
        const customerPhone = formData.get("customerPhone") as string;
        const itemsRaw = formData.get("items") as string;

        if (!customerName || !customerEmail || !customerPhone || !itemsRaw) {
            return { error: "Por favor, preencha todos os campos obrigatórios." };
        }

        const items = JSON.parse(itemsRaw);

        if (items.length === 0) {
            return { error: "Seu carrinho de orçamento está vazio." };
        }

        // Insert quote into Database
        const quote = await db.quote.create({
            data: {
                customerName,
                customerEmail,
                customerPhone,
                companyName,
                status: "PENDING",
                items: {
                    create: items.map((item: { productId: string; quantity: number }) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            }
        });

        // Enviar E-mail via Nodemailer (Hostinger SMTP)
        try {
            const nodemailer = await import("nodemailer");
            const transporter = nodemailer.createTransport({
                host: "smtp.hostinger.com",
                port: 465,
                secure: true,
                auth: {
                    user: "contato@myaparts.com.br",
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            const mailOptions = {
                from: '"MYA Parts Orçamentos" <contato@myaparts.com.br>',
                to: customerEmail,
                bcc: "contato@myaparts.com.br",
                subject: `Orçamento Recebido #${quote.id.substring(0, 6).toUpperCase()} - MYA Parts`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
                        <img src="https://myaparts.com.br/logo-mya.png" alt="MYA Parts" style="width: 150px; margin-bottom: 20px;" />
                        <h2 style="color: #0b1f3f;">Olá, ${customerName}!</h2>
                        <p>Recebemos o seu pedido de orçamento com sucesso. Nossa equipe comercial está analisando as peças solicitadas e entrará em contato em breve através do seu WhatsApp (<strong>${customerPhone}</strong>) ou por este e-mail.</p>
                        <p><strong>Nº de Controle:</strong> #${quote.id}</p>
                        <br/>
                        <p>Atenciosamente,</p>
                        <p><strong>Equipe MYA Parts</strong></p>
                        <p><a href="https://myaparts.com.br" style="color: #ff6600;">www.myaparts.com.br</a></p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("[EMAIL_SEND_ERROR]", emailError);
            // We don't throw here to not break the quote submission if email fails
        }

        return { success: true, quoteId: quote.id };
    } catch (error) {
        console.error("[SUBMIT_QUOTE_ERROR]", error);
        return { error: "Ocorreu um erro interno ao enviar seu orçamento. Tente novamente." };
    }
}
