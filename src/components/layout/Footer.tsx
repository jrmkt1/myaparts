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
                        A MYA PARTS é sua parceira estratégica na reposição de peças para empilhadeiras, oferecendo soluções com qualidade, agilidade e suporte técnico. Nosso compromisso é com a performance e a longevidade da sua frota.
                    </p>
                    {/* Social links */}
                    <div className="flex items-center gap-4 pt-2">
                        <a href="https://www.linkedin.com/company/mya-parts/" target="_blank" rel="noopener noreferrer" className="text-industrial-400 hover:text-white transition-colors" title="LinkedIn">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/myaparts" target="_blank" rel="noopener noreferrer" className="text-industrial-400 hover:text-white transition-colors" title="Facebook">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/myaparts/" target="_blank" rel="noopener noreferrer" className="text-industrial-400 hover:text-white transition-colors" title="Instagram">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
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
                        <li><Link href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
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

            <div className="max-w-7xl mx-auto border-t border-industrial-800/60 mt-10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-industrial-400">
                <div>
                    <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Autoridade e Certificações</h4>
                    <p className="text-xs leading-relaxed text-industrial-400 font-medium">
                        Nossa equipe é formada por especialistas certificados em engenharia mecânica e logística. Trabalhamos com processos auditados e em conformidade com as normas do setor para garantir a excelência.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Sobre a Autoria do Conteúdo</h4>
                    <p className="text-xs leading-relaxed text-industrial-400 font-medium">
                        Todo o conteúdo técnico e guias de compatibilidade deste site são revisados e aprovados pelo nosso Diretor Técnico e especialista em engenharia de peças, <strong>Rodrigo Silva</strong>.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-industrial-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-industrial-600 font-bold uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} MYA PARTS MATERIAL HANDLING LTDA. Todos os direitos reservados.</p>
                <p className="text-industrial-700">CNPJ 62.401.620/0001-90</p>
            </div>
        </footer>
    );
}
