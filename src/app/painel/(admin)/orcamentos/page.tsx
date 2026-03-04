import { db } from "@/lib/db";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, Eye, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import QuoteStatusSelect from "@/components/admin/QuoteStatusSelect";

export default async function OrcamentosPage() {
    const quotes = await db.quote.findMany({
        include: {
            items: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight">Orçamentos Recebidos</h1>
                    <p className="text-industrial-400 mt-1 font-medium text-sm">
                        Visualize e gerencie as solicitações de orçamento recebidas pelo portal B2B.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-industrial-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-industrial-800">
                        <thead className="bg-industrial-100 text-industrial-900 font-bold uppercase text-xs tracking-wider border-b border-industrial-200">
                            <tr>
                                <th scope="col" className="px-6 py-4">Data</th>
                                <th scope="col" className="px-6 py-4">Cliente / Empresa</th>
                                <th scope="col" className="px-6 py-4">Contato</th>
                                <th scope="col" className="px-6 py-4 text-center">Itens</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                                <th scope="col" className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-industrial-200">
                            {quotes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-industrial-400 font-medium opacity-80 border-dashed border-2 border-industrial-200 m-4 rounded-lg">
                                        Nenhum orçamento recebido ainda.<br />
                                        <span className="text-xs mt-2 block">As solicitações feitas no site aparecerão aqui.</span>
                                    </td>
                                </tr>
                            ) : (
                                quotes.map((quote) => (
                                    <tr key={quote.id} className="hover:bg-industrial-50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-mono font-bold text-industrial-600">
                                            {format(new Date(quote.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                                            <span className="block text-industrial-400 font-normal">{format(new Date(quote.createdAt), "HH:mm")}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-industrial-900">
                                            {quote.customerName}
                                            {quote.companyName && (
                                                <span className="block text-xs text-industrial-500 font-medium">Empresa: {quote.companyName}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                                            <span className="block text-industrial-600 font-bold">{quote.customerEmail}</span>
                                            <span className="block text-industrial-500">{quote.customerPhone}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-industrial-100 text-industrial-800 text-xs font-bold border border-industrial-200">
                                                <FileText size={12} />
                                                {quote.items.reduce((acc, item) => acc + item.quantity, 0)} Pçs ({quote.items.length} tipos)
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <QuoteStatusSelect quoteId={quote.id} currentStatus={quote.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/painel/orcamentos/${quote.id}`} className="inline-flex items-center gap-2 text-action hover:text-industrial-900 transition-colors" title="Ver Detalhes">
                                                <Eye size={18} />
                                                <span className="text-xs font-bold uppercase tracking-wider">Ver</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
