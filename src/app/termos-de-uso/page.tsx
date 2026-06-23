import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Termos de Uso | MYA Parts",
    description: "Termos e condições de uso do site e da plataforma de orçamentos de peças para empilhadeiras MYA Parts.",
    alternates: {
        canonical: "/termos-de-uso",
    },
};

const sections = [
    {
        title: "1. Aceitação dos Termos",
        content: `Ao acessar e utilizar o site da MYA Parts (myaparts.com.br), você concorda de forma expressa em cumprir e estar vinculado a estes Termos de Uso. Caso não concorde com qualquer parte destes termos, você não deve utilizar nossa plataforma ou solicitar nossos serviços.`,
    },
    {
        title: "2. Descrição dos Serviços",
        content: `A MYA Parts disponibiliza um catálogo digital inteligente de peças de reposição e componentes para empilhadeiras. 

A plataforma funciona em modelo de cotação (B2B). O usuário navega, adiciona peças ao seu orçamento e envia a solicitação de valores e disponibilidade comercial por meio do nosso canal de atendimento via WhatsApp ou e-mail. Não realizamos venda direta ou transações financeiras integradas diretamente no site.`,
    },
    {
        title: "3. Uso Correto do Catálogo",
        content: `O catálogo de produtos, descrições, imagens e códigos OEM (Part Numbers) destinam-se exclusivamente para auxílio na identificação e cotação de peças. 

É terminantemente proibido:
• Copiar, reproduzir ou extrair dados do site de forma automatizada (web scraping, crawler ou assemelhados).
• Utilizar as informações da plataforma para criar serviços ou bancos de dados concorrentes.
• Apresentar-se falsamente como representante oficial ou distribuidor exclusivo da MYA Parts.`,
    },
    {
        title: "4. Limitação de Responsabilidade",
        content: `Trabalhamos diligentemente para manter todos os dados, códigos secundários e descrições de compatibilidade corretos e atualizados. No entanto, devido à diversidade de modelos de empilhadeiras (como Toyota, Hyster, Yale, Still, Linde), o usuário mecânico ou gestor de frota é co-responsável pela conferência física e técnica da peça desejada.

A MYA Parts não se responsabiliza por prejuízos operacionais causados por inatividade da máquina decorrente de atraso logístico ou por montagem inadequada dos componentes adquiridos.`,
    },
    {
        title: "5. Direitos Autorais e Propriedade Intelectual",
        content: `Todos os textos, layouts, logotipos, códigos de software e algoritmos desenvolvidos para a plataforma são propriedade intelectual da MYA Parts. 

As marcas de empilhadeiras citadas no catálogo (Hyster, Yale, Toyota, etc.) pertencem a seus respectivos proprietários e são mencionadas estritamente para indicação de compatibilidade técnica das peças oferecidas.`,
    },
    {
        title: "6. Modificações nos Termos",
        content: `Reservamo-nos o direito de revisar estes Termos de Uso a qualquer momento, sem aviso prévio. Ao continuar navegando na plataforma após a publicação de novos termos, você concorda com as atualizações vigentes.`,
    },
    {
        title: "7. Legislação e Foro",
        content: `Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de Araras/SP para dirimir quaisquer controvérsias decorrentes do uso desta plataforma.`,
    },
];

export default function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-industrial-50 font-sans">
            {/* Header hero */}
            <div className="bg-industrial-900 text-white py-12 md:py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <FileText size={18} className="text-[#b0bec5]" />
                        </div>
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#b0bec5]">Institucional · Termos</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                        Termos de Uso
                    </h1>
                    <p className="text-industrial-400 text-base leading-relaxed max-w-2xl">
                        Condições e normas de navegação e solicitação de orçamentos na plataforma B2B da MYA Parts.
                    </p>
                    <p className="mt-4 text-xs text-industrial-500 font-medium">
                        Última atualização: 23 de junho de 2026
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
                    <Link href="/politica-de-privacidade" className="font-bold text-industrial-700 hover:text-industrial-900 underline underline-offset-2 transition-colors">
                        ← Política de Privacidade
                    </Link>
                    <span className="text-industrial-300">|</span>
                    <Link href="/politica-de-cookies" className="font-bold text-industrial-700 hover:text-industrial-900 underline underline-offset-2 transition-colors">
                        Política de Cookies →
                    </Link>
                </div>
            </div>
        </div>
    );
}
