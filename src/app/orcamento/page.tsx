"use client";

import { useCartStore } from "@/store/useCartStore";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OrcamentoClient() {
    const { items, removeItem, updateQuantity, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-[60vh] flex items-center justify-center font-bold text-industrial-400">Carregando itens...</div>;

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="bg-industrial-100 p-8 rounded-full mb-6 text-industrial-300">
                    <ShoppingCart size={64} />
                </div>
                <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight text-center mb-4">
                    Seu Orçamento está vazio
                </h1>
                <p className="text-industrial-400 mb-8 text-center max-w-md">
                    Você ainda não adicionou nenhuma peça para cotação. Acesse nosso catálogo ou use a busca para encontrar o que precisa.
                </p>
                <Link href="/buscar" className="bg-industrial-900 hover:bg-black text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest transition-all">
                    Explorar Catálogo
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 font-sans min-h-[60vh]">
            <h1 className="text-3xl md:text-4xl font-extrabold text-industrial-900 tracking-tight mb-8">
                Lista de Cotação
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product List */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.product.id} className="bg-white border border-industrial-200 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
                            {/* Image */}
                            <div className="w-24 h-24 bg-industrial-50 rounded-md border border-industrial-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                {item.product.image ? (
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[10px] font-bold text-industrial-400 uppercase">Sem Foto</span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col justify-center w-full">
                                <span className="text-[10px] font-bold bg-industrial-100 text-industrial-800 px-2 py-1 rounded w-fit uppercase tracking-widest mb-2">
                                    {item.product.brand}
                                </span>
                                <Link href={`/produto/${item.product.id}`} className="font-extrabold text-industrial-900 hover:text-action truncate w-full sm:w-auto">
                                    {item.product.name}
                                </Link>
                                <span className="text-sm font-mono text-industrial-500 mt-1">PN: {item.product.part_number}</span>
                            </div>

                            {/* Quantity & Delete */}
                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="flex items-center border border-industrial-200 rounded-md bg-white">
                                    <button
                                        className="px-3 py-1 font-bold text-industrial-600 hover:bg-industrial-100 transition-colors"
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 border-x border-industrial-200 font-bold text-sm min-w-[40px] text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="px-3 py-1 font-bold text-industrial-600 hover:bg-industrial-100 transition-colors"
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeItem(item.product.id)}
                                    className="p-2 text-industrial-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                    title="Remover peça"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={clearCart}
                            className="text-sm font-bold text-industrial-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                        >
                            Limpar Lista
                        </button>
                    </div>
                </div>

                {/* Form to Submit Quote */}
                <div className="lg:col-span-1">
                    <div className="bg-industrial-900 rounded-xl p-6 md:p-8 text-white shadow-xl sticky top-24">
                        <h2 className="text-2xl font-extrabold mb-6 tracking-tight">Finalizar Cotação</h2>
                        <form
                            action={async (formData) => {
                                // Add JSON of items to the form
                                formData.append("items", JSON.stringify(items.map(i => ({
                                    productId: i.product.id,
                                    quantity: i.quantity
                                }))));

                                const { submitQuoteAction } = await import("@/actions/quote");
                                const result = await submitQuoteAction(formData);

                                if (result.success) {
                                    alert("Orçamento enviado com Sucesso! Estaremos redirecionando para o nosso WhatsApp.");

                                    // Generate WhatsApp Message
                                    const baseUrl = "https://wa.me/5519971441580";
                                    let message = `Olá, vim do site MYA Parts e acabei de solicitar um orçamento (Pedido #${result.quoteId}).\n\n*Meu Cadastro:*\n- Nome: ${formData.get("customerName")}\n- Empresa: ${formData.get("companyName") || "N/A"}\n- E-mail: ${formData.get("customerEmail")}\n\n*Minhas Peças:*\n`;

                                    items.forEach(i => {
                                        message += `- ${i.quantity}x ${i.product.name} (PN: ${i.product.part_number})\n`;
                                    });

                                    const encodedMessage = encodeURIComponent(message);
                                    window.open(`${baseUrl}?text=${encodedMessage}`, "_blank");

                                    clearCart();
                                } else if (result.error) {
                                    alert(result.error);
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-industrial-400 mb-2">Nome Completo</label>
                                <input name="customerName" required type="text" className="w-full bg-industrial-800 border-2 border-transparent focus:border-action rounded-md py-3 px-4 text-white outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-industrial-400 mb-2">CNPJ ou Empresa</label>
                                <input name="companyName" type="text" className="w-full bg-industrial-800 border-2 border-transparent focus:border-action rounded-md py-3 px-4 text-white outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-industrial-400 mb-2">E-mail Profissional</label>
                                <input name="customerEmail" required type="email" className="w-full bg-industrial-800 border-2 border-transparent focus:border-action rounded-md py-3 px-4 text-white outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-industrial-400 mb-2">WhatsApp</label>
                                <input name="customerPhone" required type="tel" className="w-full bg-industrial-800 border-2 border-transparent focus:border-action rounded-md py-3 px-4 text-white outline-none" />
                            </div>
                            <button type="submit" className="w-full mt-6 bg-action hover:bg-action-hover text-white py-4 rounded-md font-extrabold tracking-widest uppercase transition-colors flex items-center justify-center gap-2">
                                Enviar Pedido <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
