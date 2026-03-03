import Link from "next/link";
import Image from "next/image";
import { Wrench } from "lucide-react";

export default function MaintenanceScreen() {
    return (
        <div className="flex flex-col min-h-screen bg-industrial-900 font-sans items-center justify-center p-4 text-center">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-400 rounded-bl-full opacity-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-action rounded-tr-full opacity-10 pointer-events-none" />

                <div className="flex flex-col items-center justify-center gap-1">
                    <Image src="/mya-logo.png" alt="MYA Parts Logo" width={140} height={80} className="object-contain brightness-0 invert opacity-90" priority />
                </div>

                <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-industrial-400">
                    <Wrench size={32} className="animate-pulse" />
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-extrabold text-white">Site em Atualização</h2>
                    <p className="text-industrial-400 font-medium text-sm leading-relaxed">
                        Nossa plataforma B2B de catálogo de peças está recebendo novos produtos e melhorias.
                        Voltaremos ao ar em instantes.
                    </p>
                </div>

                <div className="pt-4 flex flex-col items-center gap-4">
                    <p className="text-xs text-industrial-600 font-bold uppercase tracking-widest">
                        Acesso Restrito
                    </p>
                    <Link href="/painel" className="px-5 py-2.5 bg-industrial-800 hover:bg-industrial-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-colors w-full border border-white/5">
                        Login Administrativo
                    </Link>
                </div>
            </div>
        </div>
    );
}
