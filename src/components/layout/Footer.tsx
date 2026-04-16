"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/painel")) return null;

    return (
        <footer className="bg-industrial-900 font-sans text-industrial-100 pt-12 mt-12 pb-6 px-4 md:px-8 border-t border-industrial-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Branding matching MYA Logo closely */}
                <div className="space-y-4">
                    <Link href="/" className="flex flex-col items-start shrink-0 group">
                        <Image src="/mya-logo.png" alt="MYA Parts Logo" width={140} height={70} className="w-[140px] h-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" priority />
                    </Link>
                    <p className="text-sm text-industrial-400 leading-relaxed mt-4">
                        Especialistas em reposição de peças para maquinário industrial e empilhadeiras. Oferecemos o portfólio completo com busca imediata de códigos.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-widest text-sm">Catálogo</h3>
                    <ul className="space-y-2 text-sm text-industrial-400 font-medium tracking-wide">
                        <li><Link href="/busca?q=motor" className="hover:text-white transition-colors">Sistema de Motor</Link></li>
                        <li><Link href="/busca?q=freio" className="hover:text-white transition-colors">Sistema de Freio</Link></li>
                        <li><Link href="/busca?q=hidraulico" className="hover:text-white transition-colors">Sistema Hidráulico</Link></li>
                        <li><Link href="/busca?q=eletrico" className="hover:text-white transition-colors">Sistema Elétrico</Link></li>
                        <li><Link href="/produtos" className="hover:text-white transition-colors">Ver todas as Peças</Link></li>
                    </ul>
                </div>

                {/* Institucional */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-widest text-sm">Institucional</h3>
                    <ul className="space-y-2 text-sm text-industrial-400 font-medium tracking-wide">
                        <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                        <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
                        <li><Link href="/como-orcamento" className="hover:text-white transition-colors">Como enviar orçamento?</Link></li>
                        <li><Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
                        <li><Link href="/politica-de-cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-widest text-sm">Fale Conosco</h3>
                    <ul className="space-y-3 text-sm text-industrial-400">
                        <li className="flex items-start gap-3">
                            <Phone className="shrink-0 text-white mt-0.5" size={16} />
                            <span>
                                <strong className="text-white font-medium uppercase tracking-wider text-xs block mb-0.5">Atendimento Comercial</strong>
                                <a href="https://wa.me/5519971441580" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">(19) 97144-1580</a>
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="shrink-0 text-white" size={16} />
                            <a href="mailto:contato@myaparts.com.br" className="hover:text-white transition-colors">contato@myaparts.com.br</a>
                        </li>
                        <li className="flex items-start gap-3 mt-2">
                            <MapPin className="shrink-0 text-white mt-0.5" size={16} />
                            <span>
                                Rua Eduardo Cesar Rocha, 276<br />
                                Parque Santa Candida — Araras/SP<br />
                                CEP 13603-181
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-industrial-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-industrial-600 font-bold uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} MYA PARTS MATERIAL HANDLING LTDA. Todos os direitos reservados.</p>
                <p className="text-industrial-700">CNPJ 62.401.620/0001-90</p>
            </div>
        </footer>
    );
}
