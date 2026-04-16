"use client";

import { Mail } from "lucide-react";
import { FormEvent } from "react";

export default function ContatoForm() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const nome = formData.get("Nome");
        const telefone = formData.get("Telefone");
        const email = formData.get("Email");
        const empresa = formData.get("Empresa");
        const mensagem = formData.get("Mensagem");

        const subject = encodeURIComponent("Contato pelo site MYA Parts");
        const body = encodeURIComponent(
            `Nome: ${nome}\n` +
            `Telefone: ${telefone}\n` +
            `E-mail: ${email}\n` +
            `Empresa: ${empresa || 'Não informado'}\n\n` +
            `Mensagem:\n${mensagem}`
        );

        window.location.href = `mailto:contato@myaparts.com.br?subject=${subject}&body=${body}`;
    };

    // Usar onSubmite + e.preventDefault evita os alertas do navegador sobre "Formulário Inseguro" e action vazia
    return (
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-industrial-700">Nome <span className="text-red-500">*</span></label>
                    <input type="text" name="Nome" required placeholder="Seu nome completo" className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-industrial-700">Telefone / WhatsApp <span className="text-red-500">*</span></label>
                    <input type="tel" name="Telefone" required placeholder="(19) 90000-0000" className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-industrial-700">E-mail <span className="text-red-500">*</span></label>
                    <input type="email" name="Email" required placeholder="seu@email.com" className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-industrial-700">Empresa (Opcional)</label>
                    <input type="text" name="Empresa" placeholder="Nome da empresa" className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400" />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-bold text-industrial-700">Mensagem <span className="text-red-500">*</span></label>
                <textarea name="Mensagem" required rows={5} placeholder="Como podemos ajudar? Informe os Part Numbers se possuir." className="w-full px-4 py-3 rounded-xl border border-industrial-200 focus:border-action focus:ring-1 focus:ring-action outline-none transition-all placeholder:text-industrial-400 resize-none"></textarea>
            </div>

            <button type="submit" className="bg-action text-white hover:bg-action-hover px-8 py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-action uppercase tracking-widest w-full md:w-auto flex justify-center items-center gap-2">
                <Mail size={18} />
                Enviar Mensagem
            </button>
        </form>
    );
}
