import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle, Building2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Contato | MYA Parts",
    description: "Entre em contato com a MYA Parts. Atendimento comercial por WhatsApp, e-mail e telefone. Araras/SP.",
};

export default function ContatoPage() {
    return (
        <div className="min-h-screen bg-industrial-50 font-sans">
            {/* Header Hero */}
            <div className="bg-industrial-900 border-b border-industrial-800 text-white py-14 md:py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-action/10 blur-[100px] rounded-full pointer-events-none opacity-50" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <MessageCircle size={18} className="text-[#b0bec5]" />
                        </div>
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#b0bec5]">Atendimento</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                        Fale com a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-industrial-400">
                            MYA Parts
                        </span>
                    </h1>
                    <p className="text-industrial-300 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
                        Nossa equipe comercial está pronta para atender sua solicitação de peças e orçamentos.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-action hover:text-industrial-900 transition-colors mb-10"
                >
                    <ArrowLeft size={16} />
                    Voltar ao início
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-industrial-200 p-6 md:p-8 shadow-sm flex flex-col">
                        <div className="mb-6">
                            <h2 className="font-extrabold text-industrial-900 text-xl md:text-2xl tracking-tight mb-2">Envie uma mensagem</h2>
                            <p className="text-industrial-500 text-sm">Preencha o formulário abaixo e retornaremos o mais breve possível.</p>
                        </div>
                        
                        <form className="space-y-5" action="mailto:contato@myaparts.com.br" method="POST" encType="text/plain" autoComplete="off">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-industrial-700">Nome <span className="text-red-500">*</span></label>
                                    <input type="text" autoComplete="off" name="Nome" required placeholder="Seu nome completo" className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-industrial-700">Telefone / WhatsApp <span className="text-red-500">*</span></label>
                                    <input type="tel" autoComplete="off" name="Telefone" required placeholder="(19) 90000-0000" className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-industrial-700">E-mail <span className="text-red-500">*</span></label>
                                    <input type="email" autoComplete="off" name="Email" required placeholder="seu@email.com" className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-industrial-700">Empresa (Opcional)</label>
                                    <input type="text" autoComplete="off" name="Empresa" placeholder="Nome da empresa" className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-industrial-700">Mensagem <span className="text-red-500">*</span></label>
                                <textarea name="Mensagem" autoComplete="off" required rows={5} placeholder="Como podemos ajudar? Informe os Part Numbers se possuir." className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400 resize-none"></textarea>
                            </div>

                            <button type="submit" className="bg-action text-white hover:bg-action-hover px-8 py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-action uppercase tracking-widest w-full md:w-auto flex justify-center items-center gap-2">
                                <Mail size={18} />
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Info & CTAs */}
                    <div className="space-y-4">
                        <a
                            href="https://wa.me/5519971441580"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-5 bg-[#25D366] hover:bg-[#1ebe5b] rounded-2xl text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-extrabold text-base tracking-tight">WhatsApp Comercial</p>
                                <p className="text-green-100 text-sm font-medium">(19) 97144-1580</p>
                            </div>
                        </a>

                        <a
                            href="mailto:contato@myaparts.com.br"
                            className="group flex items-center gap-4 p-5 bg-white hover:bg-industrial-50 rounded-2xl border border-industrial-200 hover:border-industrial-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <div className="w-12 h-12 bg-industrial-100 group-hover:bg-industrial-200 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                                <Mail size={22} className="text-industrial-700" />
                            </div>
                            <div>
                                <p className="font-extrabold text-industrial-900 text-base tracking-tight">E-mail Direto</p>
                                <p className="text-industrial-500 text-sm font-medium">contato@myaparts.com.br</p>
                            </div>
                        </a>

                        <div className="bg-white rounded-2xl border border-industrial-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock size={16} className="text-industrial-400" />
                                <h3 className="font-extrabold text-industrial-900 text-xs uppercase tracking-widest">Horário de Atendimento</h3>
                            </div>
                            <div className="space-y-1.5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-industrial-500 font-medium">Segunda a Sexta</span>
                                    <span className="text-industrial-900 font-bold">08h – 18h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-industrial-500 font-medium">Sábado</span>
                                    <span className="text-industrial-900 font-bold">08h – 12h</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-industrial-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin size={16} className="text-industrial-400" />
                                <h3 className="font-extrabold text-industrial-900 text-xs uppercase tracking-widest">Localização</h3>
                            </div>
                            <address className="not-italic text-sm text-industrial-700 font-medium leading-relaxed">
                                Rua Eduardo Cesar Rocha, 276<br />
                                Parque Santa Candida<br />
                                Araras – SP<br />
                                CEP 13603-181
                            </address>
                        </div>
                    </div>
                </div>

                {/* Dados Fiscais */}
                <section className="bg-white rounded-2xl border border-industrial-200 p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-industrial-100 rounded-lg flex items-center justify-center">
                            <Building2 size={18} className="text-industrial-700" />
                        </div>
                        <h2 className="font-extrabold text-industrial-900 text-sm uppercase tracking-widest">Dados Fiscais para Emissão de NF</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <dt className="text-xs font-bold uppercase tracking-widest text-industrial-400 mb-1">Razão Social</dt>
                            <dd className="text-industrial-900 font-semibold text-sm">Mya Parts Material Handling Ltda</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold uppercase tracking-widest text-industrial-400 mb-1">CNPJ</dt>
                            <dd className="text-industrial-900 font-semibold font-mono text-sm">62.401.620/0001-90</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold uppercase tracking-widest text-industrial-400 mb-1">Inscrição Estadual</dt>
                            <dd className="text-industrial-900 font-semibold font-mono text-sm">182348309114</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold uppercase tracking-widest text-industrial-400 mb-1">Data de Abertura</dt>
                            <dd className="text-industrial-900 font-semibold text-sm">Agosto de 2025</dd>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
