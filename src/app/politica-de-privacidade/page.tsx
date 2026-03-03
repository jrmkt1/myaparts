import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Política de Privacidade | MYA Parts",
    description: "Conheça nossa Política de Privacidade e como protegemos seus dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018).",
};

const sections = [
    {
        title: "1. Quem somos",
        content: `A MYA Parts é uma empresa especializada na comercialização de peças para empilhadeiras, atuante no mercado B2B nacional. Este site é operado com fins comerciais e de catálogo de produtos.

Para dúvidas relacionadas à privacidade, entre em contato: contato@myaparts.com.br`,
    },
    {
        title: "2. Quais dados coletamos",
        content: `Coletamos apenas os dados estritamente necessários para o funcionamento do serviço:

• **Dados de navegação**: páginas visitadas, tempo de sessão, dispositivo e navegador — coletados de forma anônima e agregada para fins estatísticos.
• **Dados de identificação empresarial**: CNPJ, razão social e e-mail, fornecidos voluntariamente ao solicitar orçamento.
• **Dados de contato**: telefone e nome do responsável, quando fornecidos via formulário ou WhatsApp.
• **Cookies**: conforme detalhado em nossa Política de Cookies.

Não coletamos dados sensíveis (art. 11 da LGPD) nem realizamos tratamento automatizado para decisões individuais.`,
    },
    {
        title: "3. Por que usamos seus dados (base legal)",
        content: `Tratamos dados com base nas seguintes hipóteses legais previstas na LGPD (art. 7º):

• **Execução de contrato** (inciso V): para processar pedidos e orçamentos B2B.
• **Legítimo interesse** (inciso IX): para melhorar a experiência de navegação e comunicação comercial, garantindo que não prevaleça sobre seus direitos fundamentais.
• **Consentimento** (inciso I): para uso de cookies não essenciais, obtido via banner na primeira visita.`,
    },
    {
        title: "4. Por quanto tempo mantemos seus dados",
        content: `• Dados de orçamento e contato: **até 5 anos** após o último contato, para fins de cumprimento de obrigações legais e contábeis.
• Logs de navegação anonimizados: **até 12 meses**.
• Cookies: conforme prazo definido em nossa Política de Cookies.

Após o prazo, os dados são excluídos ou anonimizados de forma segura.`,
    },
    {
        title: "5. Compartilhamento de dados",
        content: `Não vendemos nem alugamos seus dados. Podemos compartilhá-los somente em casos específicos:

• **Prestadores de serviço** (operadores conforme LGPD): hospedagem, plataformas de e-mail transacional, analítica web — sempre sob contrato com cláusulas de proteção de dados.
• **Cumprimento legal**: quando exigido por autoridade competente ou determinação judicial.
• **Proteção de direitos**: para exercer direitos contratuais ou prevenir fraudes.`,
    },
    {
        title: "6. Seus direitos como titular",
        content: `Conforme os artigos 17 a 22 da LGPD, você tem direito a:

• **Confirmação** da existência de tratamento dos seus dados.
• **Acesso** aos dados que temos sobre você.
• **Correção** de dados incompletos, inexatos ou desatualizados.
• **Anonimização, bloqueio ou eliminação** de dados desnecessários ou tratados em desconformidade.
• **Portabilidade** dos dados a outro fornecedor.
• **Eliminação** dos dados tratados com base em consentimento, ressalvadas as hipóteses de guarda legal.
• **Revogação do consentimento** a qualquer momento.
• **Oposição** ao tratamento em caso de descumprimento da lei.

Para exercer seus direitos, envie e-mail para: **contato@myaparts.com.br** com o assunto "Direitos LGPD".`,
    },
    {
        title: "7. Segurança dos dados",
        content: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, divulgação ou alteração indevida, incluindo:

• Comunicação via HTTPS/TLS.
• Controle de acesso restrito aos dados.
• Monitoramento de atividades suspeitas.

Em caso de incidente de segurança que possa acarretar risco ou dano relevante, notificaremos a ANPD e os titulares afetados conforme exigido pela LGPD (art. 48).`,
    },
    {
        title: "8. Encarregado de Proteção de Dados (DPO)",
        content: `Em conformidade com o art. 41 da LGPD, nosso encarregado pelo tratamento de dados pessoais pode ser contatado por:

• **E-mail**: contato@myaparts.com.br
• **Assunto**: "DPO - Proteção de Dados"

Responderemos às solicitações em até **15 dias úteis**.`,
    },
    {
        title: "9. Alterações nesta política",
        content: `Podemos atualizar esta Política periodicamente. Quando realizarmos alterações relevantes, notificaremos via banner no site. A data da última atualização estará sempre indicada no rodapé desta página. Recomendamos a consulta periódica.`,
    },
    {
        title: "10. Contato e reclamações",
        content: `Se não estiver satisfeito com nossas práticas de privacidade, você pode recorrer à **Autoridade Nacional de Proteção de Dados (ANPD)**: www.gov.br/anpd

Para contato direto conosco:
• **E-mail**: contato@myaparts.com.br
• **WhatsApp**: (19) 97144-1580`,
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-industrial-50 font-sans">
            {/* Header hero */}
            <div className="bg-industrial-900 text-white py-12 md:py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <Shield size={18} className="text-[#b0bec5]" />
                        </div>
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#b0bec5]">LGPD · Lei nº 13.709/2018</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                        Política de Privacidade
                    </h1>
                    <p className="text-industrial-400 text-base leading-relaxed max-w-2xl">
                        Estamos comprometidos com a proteção e transparência no tratamento dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais do Brasil.
                    </p>
                    <p className="mt-4 text-xs text-industrial-500 font-medium">
                        Última atualização: 03 de março de 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-industrial-500 hover:text-industrial-900 transition-colors mb-8"
                >
                    <ArrowLeft size={14} />
                    Voltar ao início
                </Link>

                <div className="space-y-8">
                    {sections.map((section) => (
                        <section key={section.title} className="bg-white rounded-2xl border border-industrial-200 p-6 md:p-8">
                            <h2 className="text-lg font-extrabold text-industrial-900 mb-4 pb-3 border-b border-industrial-100">
                                {section.title}
                            </h2>
                            <div className="text-sm text-industrial-600 leading-relaxed space-y-3">
                                {section.content.split("\n").map((line, i) =>
                                    line.trim() ? (
                                        <p key={i} dangerouslySetInnerHTML={{
                                            __html: line
                                                .replace(/\*\*(.*?)\*\*/g, "<strong class=\"text-industrial-900 font-semibold\">$1</strong>")
                                                .replace(/^•/, "—"),
                                        }} />
                                    ) : null
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Footer nav */}
                <div className="mt-10 pt-8 border-t border-industrial-200 flex flex-wrap items-center gap-4 text-sm text-industrial-500">
                    <Link href="/politica-de-cookies" className="font-bold text-industrial-700 hover:text-industrial-900 underline underline-offset-2 transition-colors">
                        Política de Cookies →
                    </Link>
                    <Link href="/" className="hover:text-industrial-900 transition-colors">
                        Voltar ao site
                    </Link>
                </div>
            </div>
        </div>
    );
}
