import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search, PlusCircle, ShoppingCart, Send, ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "Como enviar orçamento? | MYA Parts",
    description: "Aprenda a realizar cotações e orçamentos na MYA Parts de forma rápida e segura para sua indústria.",
};

const steps = [
    {
        icon: <Search className="w-8 h-8 text-white" />,
        title: "1. Encontre suas Peças",
        description: "Utilize nossa barra de pesquisa inteligente ou navegue pelas categorias. Você pode buscar rapidamente digitando o Número da Peça (PN), código OEM ou o nome do componente.",
        bg: "bg-industrial-800"
    },
    {
        icon: <PlusCircle className="w-8 h-8 text-white" />,
        title: "2. Adicione ao Orçamento",
        description: "Encontrou o que precisava? Na página do produto, defina a quantidade exata desejada e clique no botão 'Adicionar ao Orçamento'. Repita o processo para todas as peças que sua frota precisa.",
        bg: "bg-action"
    },
    {
        icon: <ShoppingCart className="w-8 h-8 text-white" />,
        title: "3. Revise sua Lista",
        description: "A qualquer momento, clique no botão 'Meu Orçamento' ou no ícone da sacola no topo do site para visualizar e gerenciar as peças que você já selecionou.",
        bg: "bg-industrial-600"
    },
    {
        icon: <Send className="w-8 h-8 text-white" />,
        title: "4. Envie a Solicitação",
        description: "Na tela do seu orçamento, preencha rapidamente os dados da sua empresa e de contato e clique em 'Enviar Solicitação de Orçamento'.",
        bg: "bg-green-600"
    },
    {
        icon: <ClipboardCheck className="w-8 h-8 text-white" />,
        title: "5. Retorno Imediato",
        description: "Pronto! Nossa equipe receberá sua lista com os códigos e quantidades exatas no mesmo instante. Retornaremos via e-mail ou WhatsApp com a precificação e prazos de entrega.",
        bg: "bg-blue-600"
    }
];

export default function ComoOrcamentoPage() {
    return (
        <div className="min-h-screen bg-industrial-50 font-sans">
            {/* Header hero */}
            <div className="bg-industrial-900 border-b border-industrial-800 text-white py-14 md:py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Como enviar um orçamento?
                    </h1>
                    <p className="text-industrial-300 text-lg md:text-xl leading-relaxed font-medium">
                        Um guia passo a passo simples e rápido para solicitar cotações diretamente da nossa plataforma.
                    </p>
                </div>
            </div>

            {/* Content gap */}
            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative -mt-10 md:-mt-16 z-10">
                <div className="bg-white rounded-3xl shadow-xl border border-industrial-200 p-8 md:p-12 mb-10">
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative">
                                {index !== steps.length - 1 && (
                                    <div className="hidden md:block absolute top-[60px] left-[39px] bottom-[-48px] w-0.5 bg-industrial-200 z-0" />
                                )}

                                <div className={`w-20 h-20 rounded-full flex items-center justify-center shrink-0 shadow-lg relative z-10 border-4 border-white ${step.bg}`}>
                                    {step.icon}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-xl md:text-2xl font-extrabold text-industrial-900 mb-3">{step.title}</h3>
                                    <p className="text-industrial-600 leading-relaxed text-base md:text-lg">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-10 border-t border-industrial-100 flex flex-col items-center justify-center text-center">
                        <p className="text-industrial-500 font-bold uppercase tracking-widest text-sm mb-6">Pronto para começar?</p>
                        <Link href="/" className="px-8 py-4 bg-action text-white hover:bg-action-hover rounded-xl text-lg font-extrabold shadow-md transition-all uppercase tracking-wider">
                            Ir para o Catálogo
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-industrial-500 hover:text-industrial-900 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Voltar ao início
                    </Link>
                </div>
            </div>
        </div>
    );
}
