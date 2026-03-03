import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, Target, History, Settings } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Sobre Nós | MYA Parts",
    description: "Conheça a história e a missão da MYA Parts, especialistas em reposição de peças para maquinário industrial e empilhadeiras.",
};

export default function SobrePage() {
    return (
        <div className="min-h-screen bg-industrial-50 font-sans">
            {/* Header hero */}
            <div className="bg-industrial-900 border-b border-industrial-800 text-white py-14 md:py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-action/10 blur-[100px] rounded-full pointer-events-none opacity-50" />
                <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                                <Building2 size={18} className="text-[#b0bec5]" />
                            </div>
                            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#b0bec5]">Institucional</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                            Sobre a <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-industrial-400">MYA Parts</span>
                        </h1>
                        <p className="text-industrial-300 text-lg md:text-xl leading-relaxed font-medium">
                            Soluções rápidas e precisas em peças para maquinário industrial e empilhadeiras para o setor B2B brasileiro.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-action hover:text-industrial-900 transition-colors mb-10"
                >
                    <ArrowLeft size={16} />
                    Voltar ao início
                </Link>

                <div className="space-y-12">
                    <section className="bg-white rounded-3xl border border-industrial-200 p-8 md:p-12 shadow-sm">
                        <h2 className="text-2xl font-extrabold text-industrial-900 mb-6 flex items-center gap-3">
                            <History size={24} className="text-action" />
                            Nossa História
                        </h2>
                        <div className="space-y-4 text-industrial-600 text-base md:text-lg leading-relaxed">
                            <p>
                                A <strong>MYA Parts</strong> nasceu da necessidade do mercado industrial brasileiro por um fornecimento ágil e confiável de peças de reposição para maquinário pesado, com foco especial em empilhadeiras.
                            </p>
                            <p>
                                Sabemos que maquinário parado significa perda de produtividade e faturamento. Por isso, estruturamos nossa operação para atender empresas de norte a sul do Brasil com máxima velocidade no rastreamento e entrega do código exato que seu equipamento precisa.
                            </p>
                            <p>
                                Do nosso estoque aos galpões de nossos parceiros, trabalhamos incansavelmente para manter a intralogística nacional em constante movimento.
                            </p>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-white rounded-3xl border border-industrial-200 p-8 shadow-sm hover:border-industrial-300 transition-colors">
                            <h2 className="text-xl font-extrabold text-industrial-900 mb-4 flex items-center gap-3 border-b border-industrial-100 pb-4">
                                <Target size={24} className="text-action" />
                                Nossa Missão
                            </h2>
                            <p className="text-industrial-600 leading-relaxed font-medium">
                                Fornecer peças de reposição com qualidade garantida e agilidade comercial inigualável, reduzindo o tempo de ociosidade das frotas industriais de nossos clientes e parceiros de negócios.
                            </p>
                        </section>

                        <section className="bg-white rounded-3xl border border-industrial-200 p-8 shadow-sm hover:border-industrial-300 transition-colors">
                            <h2 className="text-xl font-extrabold text-industrial-900 mb-4 flex items-center gap-3 border-b border-industrial-100 pb-4">
                                <Settings size={24} className="text-action" />
                                Nosso Diferencial
                            </h2>
                            <p className="text-industrial-600 leading-relaxed font-medium">
                                Operamos com um catálogo inteligente. Desenvolvemos esta plataforma focada na identificação rápida de Códigos OEM (Part Numbers), garantindo que os mecânicos e gestores de frota enviem a cotação correta, com zero margem para erros.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
