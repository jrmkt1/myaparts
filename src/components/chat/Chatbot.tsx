"use client";

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Wrench, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Do not show on admin panel
    if (pathname?.startsWith("/painel")) return null;

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    return (
        <>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 md:bottom-6 right-4 md:right-6 bg-industrial-900 text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-action transition-all transform hover:scale-110 z-50 flex items-center justify-center animate-bounce group"
                    aria-label="Falar com Especialista Técnico"
                >
                    <MessageCircle size={28} />
                    {/* Tooltip Hover */}
                    <span className="absolute -top-10 right-0 bg-white text-industrial-900 border border-industrial-200 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        Dúvida Técnica? Fale com a MYA 🚜
                        <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white border-b border-r border-industrial-200 rotate-45"></div>
                    </span>
                </button>
            )}

            {/* Chatbox */}
            {isOpen && (
                <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 w-[calc(100vw-32px)] md:w-[380px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-industrial-200 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
                    {/* Header */}
                    <div className="bg-industrial-900 text-white p-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 overflow-hidden">
                                <Image src="/mya-logo.png" alt="MYA Bot" width={32} height={32} className="object-contain" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-industrial-900 rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm tracking-wide">Mecânico MYA</span>
                                <span className="text-[10px] text-action/90 font-semibold uppercase tracking-widest flex items-center gap-1">
                                    <Wrench size={10} /> IA Especialista
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 text-industrial-400 hover:text-white hover:bg-industrial-800 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-industrial-50/50 space-y-4">
                        {/* Mensagem Inicial */}
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-4">
                                <div className="w-16 h-16 bg-white border border-industrial-200 shadow-sm rounded-full flex items-center justify-center p-2">
                                    <Image src="/mya-logo.png" alt="Logo" width={48} height={48} className="opacity-80 object-contain" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-industrial-900 mb-1">Dúvida em Peças B2B?</h4>
                                    <p className="text-xs text-industrial-500 font-medium">Me descreva o defeito da sua empilhadeira ou o part number que você quer, eu sou treinado pra te dar orçamentos certeiros.</p>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                                    <button onClick={() => handleInputChange({ target: { value: "Meu garfo Hyster tá solto" } } as any)} className="bg-white border border-industrial-200 px-3 py-1.5 rounded-full text-[10px] font-bold text-industrial-600 hover:border-action hover:text-action transition-colors shadow-sm">Meu garfo Hyster tá solto</button>
                                    <button onClick={() => handleInputChange({ target: { value: "O que comprar na revisão Yale?" } } as any)} className="bg-white border border-industrial-200 px-3 py-1.5 rounded-full text-[10px] font-bold text-industrial-600 hover:border-action hover:text-action transition-colors shadow-sm">O que comprar na revisão Yale?</button>
                                </div>
                            </div>
                        )}

                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-end gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {m.role === 'assistant' ? (
                                        <div className="w-6 h-6 shrink-0 bg-industrial-900 rounded-full flex items-center justify-center mb-1">
                                            <Bot size={14} className="text-white" />
                                        </div>
                                    ) : null}

                                    <div
                                        className={`p-3 rounded-2xl text-[13px] shadow-sm leading-relaxed ${m.role === 'user'
                                            ? 'bg-industrial-900 text-white rounded-br-none'
                                            : 'bg-white text-industrial-800 border border-industrial-200 rounded-bl-none'
                                            }`}
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: m.content.replace(/\n(.*)/g, '<br/>$1') }} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex items-end gap-2 max-w-[85%] flex-row">
                                    <div className="w-6 h-6 shrink-0 bg-industrial-900 rounded-full flex items-center justify-center mb-1">
                                        <Bot size={14} className="text-white" />
                                    </div>
                                    <div className="p-3 bg-white border border-industrial-200 rounded-2xl rounded-bl-none flex items-center gap-1.5 px-4">
                                        <Loader2 size={14} className="animate-spin text-industrial-500" />
                                        <span className="text-xs text-industrial-500 font-bold tracking-widest uppercase">Digitando</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-industrial-200 shrink-0">
                        <div className="relative flex items-center">
                            <input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Pergunte sobre sua empilhadeira..."
                                className="w-full pl-4 pr-12 py-3 bg-industrial-100/50 border border-industrial-200 rounded-xl text-sm text-industrial-900 placeholder:text-industrial-400 focus:outline-none focus:ring-2 focus:ring-action/50 focus:border-action transition-all"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 p-2 bg-industrial-900 hover:bg-action text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={16} className={input.trim() ? "translate-x-0" : "-translate-x-0.5"} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[9px] text-industrial-400 font-medium uppercase tracking-[0.2em]">IA Especialista em Peças B2B</span>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
