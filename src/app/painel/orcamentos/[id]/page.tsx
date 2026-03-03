import { db } from "@/lib/db";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, User, Building, Mail, Phone, Clock, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";
import QuoteStatusSelect from "@/components/admin/QuoteStatusSelect";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function DetalhesOrcamentoPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    const quote = await db.quote.findUnique({
        where: { id },
        include: {
            items: {
                include: { product: { include: { media: { where: { isMain: true }, take: 1 } } } }
            }
        }
    });

    if (!quote) return notFound();

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/painel/orcamentos" className="p-2 bg-white rounded-md border border-industrial-200 hover:bg-industrial-100 text-industrial-800 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight">Detalhes do Orçamento</h1>
                        <p className="text-industrial-400 mt-1 font-medium text-sm flex items-center gap-2">
                            <Clock size={14} /> Solicitado em {format(new Date(quote.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-industrial-500 tracking-widest uppercase">Mudar Status:</span>
                    <QuoteStatusSelect quoteId={quote.id} currentStatus={quote.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-6 space-y-6">
                        <h2 className="text-xs font-bold text-industrial-500 uppercase tracking-widest border-b border-industrial-100 pb-3">Informações do Cliente</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center text-industrial-500 shrink-0">
                                    <User size={16} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-industrial-400 uppercase tracking-widest">Nome</span>
                                    <span className="block font-bold text-industrial-900">{quote.customerName}</span>
                                </div>
                            </div>

                            {quote.companyName && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center text-industrial-500 shrink-0">
                                        <Building size={16} />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-industrial-400 uppercase tracking-widest">Empresa/CNPJ</span>
                                        <span className="block font-bold text-industrial-900">{quote.companyName}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center text-industrial-500 shrink-0">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-industrial-400 uppercase tracking-widest">E-mail</span>
                                    <a href={`mailto:${quote.customerEmail}`} className="block font-bold text-action hover:underline">{quote.customerEmail}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center text-industrial-500 shrink-0">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-industrial-400 uppercase tracking-widest">Telefone / WhatsApp</span>
                                    <a href={`https://wa.me/55${quote.customerPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="block font-bold text-action hover:underline">{quote.customerPhone}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {quote.message && (
                        <div className="bg-industrial-100 rounded-xl border border-industrial-200 p-6 space-y-3">
                            <h2 className="text-xs font-bold text-industrial-500 uppercase tracking-widest flex items-center gap-2"><FileText size={14} /> Mensagem Opcional</h2>
                            <p className="text-sm text-industrial-800 italic bg-white p-4 rounded shadow-sm border border-industrial-200">
                                "{quote.message}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Items List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-industrial-200 overflow-hidden">
                        <div className="p-6 border-b border-industrial-200 bg-industrial-50">
                            <h2 className="text-sm font-bold text-industrial-900 uppercase tracking-widest flex items-center gap-2">
                                <PackageWrapper /> Lista de Peças Solicitadas
                                <span className="ml-auto bg-action/10 text-action px-3 py-1 rounded-full text-xs font-extrabold border border-action/20">
                                    {quote.items.reduce((acc, item) => acc + item.quantity, 0)} Itens no Total
                                </span>
                            </h2>
                        </div>

                        <div className="divide-y divide-industrial-100">
                            {quote.items.map((item) => {
                                const mainImage = item.product.media[0]?.url || "/mya-logo.png";
                                return (
                                    <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-industrial-50 transition-colors">
                                        <div className="w-16 h-16 bg-white border border-industrial-200 rounded-lg shrink-0 relative overflow-hidden flex items-center justify-center p-2">
                                            <Image src={mainImage} alt={item.product.name} fill className="object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <Link href={`/painel/produtos/${item.productId}/editar`} className="font-extrabold text-industrial-900 hover:text-action transition-colors block text-base leading-tight">
                                                {item.product.name}
                                            </Link>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-industrial-500">
                                                <span className="font-mono font-bold bg-industrial-100 px-2 py-0.5 rounded text-xs text-industrial-800 border border-industrial-200">
                                                    PN: {item.product.part_number}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-industrial-100 px-4 py-3 rounded-lg border border-industrial-200 mt-2 sm:mt-0 shadow-inner">
                                            <div className="text-right">
                                                <span className="block text-[10px] font-bold text-industrial-400 uppercase tracking-widest">Quantidade Requerida</span>
                                                <span className="block text-2xl font-black text-industrial-900 leading-none">{item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <a href={`mailto:${quote.customerEmail}?subject=Cotação de Peças MYA Parts&body=Olá ${quote.customerName},`} className="bg-action text-white hover:bg-action-hover px-6 py-3 rounded text-sm font-bold flex items-center gap-2 shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-action uppercase tracking-widest">
                            <Mail size={16} />
                            Responder por Email
                        </a>
                        <a href={`https://wa.me/55${quote.customerPhone.replace(/\D/g, '')}?text=Olá ${quote.customerName}, aqui é da MYA Parts, estou analisando o orçamento que você enviou pelo nosso site.`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white hover:bg-[#128C7E] px-6 py-3 rounded text-sm font-bold flex items-center gap-2 shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] uppercase tracking-widest">
                            <CheckCircle size={16} />
                            Ligar / WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Just a quick wrapper to avoid importing Package from lucide if it causes conflict
function PackageWrapper() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
    )
}
