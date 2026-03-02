"use client";

import { useState } from "react";
import { toggleMaintenanceMode } from "@/actions/settings";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

interface Props {
    initialState: boolean;
}

export default function MaintenanceToggle({ initialState }: Props) {
    const [isMaintenance, setIsMaintenance] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        try {
            await toggleMaintenanceMode(isMaintenance);
            setIsMaintenance(!isMaintenance);
        } catch (e) {
            alert("Erro ao alterar modo de manutenção");
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-white border-2 border-industrial-100 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm w-full">
            <div className="flex items-start gap-4">
                <div className={`p-4 rounded-xl ${isMaintenance ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {isMaintenance ? <ShieldAlert size={28} /> : <CheckCircle2 size={28} />}
                </div>
                <div>
                    <h3 className="text-xl font-extrabold text-industrial-900 tracking-tight">Status da Loja: {isMaintenance ? 'Em Manutenção' : 'Loja Online'}</h3>
                    <p className="text-sm font-medium text-industrial-400 mt-1 max-w-md">
                        {isMaintenance
                            ? "Sua loja B2B está indisponível para clientes. Acesse pelo painel apenas para configuração."
                            : "Sua loja está aberta para o público. Clientes podem acessar e buscar peças."}
                    </p>
                </div>
            </div>

            <button
                onClick={handleToggle}
                disabled={isLoading}
                className={`w-full md:w-auto px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${isMaintenance
                        ? 'bg-industrial-900 hover:bg-industrial-800 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
            >
                {isLoading ? "Aguarde..." : isMaintenance ? "Abrir Loja (Online)" : "Fechar Loja (Manutenção)"}
            </button>
        </div>
    );
}
