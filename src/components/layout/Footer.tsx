"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/painel")) return null;

    return (
        <footer className="bg-slate-900 font-sans text-slate-200 pt-10 pb-6 px-4 md:px-6 border-t border-slate-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo + direct one-liner */}
                <div className="space-y-3">
                    <Link href="/" className="inline-flex items-start shrink-0 group">
                        <Image
                            src="/mya-logo.png"
                            alt="MYA Parts Logo"
                            width={130}
                            height={64}
                            className="w-[130px] h-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    </Link>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Peças e componentes para empilhadeiras.
                    </p>
                </div>

                {/* Catálogo */}
                <div>
                    <h3 className="font-extrabold mb-3 text-white uppercase tracking-widest text-xs">Catálogo</h3>
                    <ul className="space-y-2 text-xs text-slate-400 font-medium tracking-wide">
                        <li><Link href="/busca?q=motor" className="hover:text-white transition-colors">Sistema de Motor</Link></li>
                        <li><Link href="/busca?q=freio" className="hover:text-white transition-colors">Sistema de Freio</Link></li>
                        <li><Link href="/busca?q=hidraulico" className="hover:text-white transition-colors">Sistema Hidráulico</Link></li>
                        <li><Link href="/busca?q=eletrico" className="hover:text-white transition-colors">Sistema Elétrico</Link></li>
                        <li><Link href="/produtos" className="hover:text-white transition-colors">Todas as Peças</Link></li>
                    </ul>
                </div>

                {/* Institucional */}
                <div>
                    <h3 className="font-extrabold mb-3 text-white uppercase tracking-widest text-xs">Informações</h3>
                    <ul className="space-y-2 text-xs text-slate-400 font-medium tracking-wide">
                        <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                        <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
                        <li><Link href="/como-orcamento" className="hover:text-white transition-colors">Como Cotar</Link></li>
                        <li><Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
                        <li><Link href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                    </ul>
                </div>

                {/* Contato Direto */}
                <div>
                    <h3 className="font-extrabold mb-3 text-white uppercase tracking-widest text-xs">Contato</h3>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                        <li className="flex items-center gap-2.5">
                            <Phone className="shrink-0 text-[#25D366]" size={15} />
                            <a
                                href="https://wa.me/5519971441580"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-white hover:text-[#25D366] transition-colors"
                            >
                                (19) 97144-1580
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Mail className="shrink-0 text-slate-400" size={15} />
                            <a href="mailto:contato@myaparts.com.br" className="hover:text-white transition-colors">
                                contato@myaparts.com.br
                            </a>
                        </li>
                        <li className="flex items-start gap-2.5 pt-1 text-slate-400">
                            <MapPin className="shrink-0 text-slate-400 mt-0.5" size={15} />
                            <span>
                                Rua Eduardo Cesar Rocha, 276<br />
                                Parque Santa Candida — Araras/SP<br />
                                CEP 13603-181
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                <p>&copy; {new Date().getFullYear()} MYA PARTS MATERIAL HANDLING LTDA.</p>
                <p>CNPJ 62.401.620/0001-90</p>
            </div>
        </footer>
    );
}
