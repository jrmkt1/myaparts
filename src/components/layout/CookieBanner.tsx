"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie, Shield } from "lucide-react";

const STORAGE_KEY = "mya_cookie_consent";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(STORAGE_KEY);
        if (!consent) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem(STORAGE_KEY, "accepted");
        setVisible(false);
    };

    const reject = () => {
        localStorage.setItem(STORAGE_KEY, "rejected");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-label="Aviso de cookies e privacidade"
            className="fixed bottom-0 left-0 right-0 z-[999] px-4 pb-4 md:px-6 md:pb-5 animate-[slideUp_0.35s_ease]"
        >
            <div className="max-w-5xl mx-auto bg-industrial-900 border border-industrial-700 rounded-2xl shadow-2xl shadow-black/40 p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">

                    {/* Icon */}
                    <div className="hidden md:flex shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center">
                        <Cookie size={22} className="text-[#b0bec5]" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Shield size={13} className="text-[#4caf50] shrink-0" />
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#4caf50]">
                                Privacidade &amp; LGPD
                            </span>
                        </div>
                        <p className="text-sm text-industrial-300 leading-relaxed">
                            Usamos cookies essenciais para o funcionamento do site e, com o seu consentimento, cookies analíticos para melhorar a experiência. Em conformidade com a{" "}
                            <strong className="text-white font-semibold">Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>, você pode aceitar ou recusar cookies não essenciais. Leia nossa{" "}
                            <Link href="/politica-de-privacidade" className="text-[#b0bec5] hover:text-white underline underline-offset-2 transition-colors">
                                Política de Privacidade
                            </Link>{" "}
                            e{" "}
                            <Link href="/politica-de-cookies" className="text-[#b0bec5] hover:text-white underline underline-offset-2 transition-colors">
                                Política de Cookies
                            </Link>.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={reject}
                            className="px-4 py-2.5 rounded-lg border border-white/15 text-industrial-400 text-xs font-bold uppercase tracking-widest hover:border-white/30 hover:text-white transition-all"
                        >
                            Recusar
                        </button>
                        <button
                            onClick={accept}
                            className="px-5 py-2.5 rounded-lg bg-white text-industrial-900 text-xs font-extrabold uppercase tracking-widest hover:bg-industrial-100 transition-all shadow-lg"
                        >
                            Aceitar Tudo
                        </button>
                        <button
                            onClick={reject}
                            aria-label="Fechar"
                            className="p-2 rounded-lg text-industrial-500 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
