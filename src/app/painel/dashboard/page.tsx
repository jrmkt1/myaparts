import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Package, Search, Tag, Users } from "lucide-react";
import MaintenanceToggle from "@/components/admin/MaintenanceToggle";
import { getMaintenanceMode } from "@/actions/settings";

export default async function DashboardPage() {
    const session = await auth();

    // Dashboard Analytics Example Data fetching from Prisma Server Component
    const totalProducts = await db.product.count();
    const totalQuotesPending = await db.quote.count({ where: { status: "PENDING" } });
    const totalCategories = await db.category.count();

    // Check maintenance status
    const isMaintenance = await getMaintenanceMode();

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-industrial-900 tracking-tight">Visão Geral</h1>
                    <p className="text-industrial-400 mt-1 font-medium">
                        Bem-vindo de volta, {session?.user?.name || "Administrador"}. Aqui está o resumo atual do seu catálogo.
                    </p>
                </div>
            </div>

            <MaintenanceToggle initialState={isMaintenance} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-6 flex flex-col justify-between hover:border-action transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-industrial-400 uppercase tracking-widest">Peças</p>
                            <h3 className="text-3xl font-extrabold text-industrial-900 mt-2">{totalProducts}</h3>
                        </div>
                        <div className="p-3 bg-industrial-100 rounded-lg text-industrial-800"><Package size={20} /></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-6 flex flex-col justify-between hover:border-action transition-all ring-2 ring-transparent hover:ring-action/20">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-industrial-400 uppercase tracking-widest leading-tight">Orçamentos<br />Pendentes</p>
                            <h3 className="text-3xl font-extrabold text-action mt-2">{totalQuotesPending}</h3>
                        </div>
                        <div className="p-3 bg-action/10 rounded-lg text-action"><Search size={20} /></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-6 flex flex-col justify-between hover:border-action transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-industrial-400 uppercase tracking-widest">Categorias</p>
                            <h3 className="text-3xl font-extrabold text-industrial-900 mt-2">{totalCategories}</h3>
                        </div>
                        <div className="p-3 bg-industrial-100 rounded-lg text-industrial-800"><Tag size={20} /></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-6 flex flex-col justify-between hover:border-action transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-industrial-400 uppercase tracking-widest">Administradores</p>
                            <h3 className="text-3xl font-extrabold text-industrial-900 mt-2">1</h3>
                        </div>
                        <div className="p-3 bg-industrial-100 rounded-lg text-industrial-800"><Users size={20} /></div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-2 border-dashed border-industrial-200 rounded-xl h-64 flex items-center justify-center p-8 mt-12 opacity-80">
                <div className="text-center space-y-4">
                    <h3 className="text-industrial-800 font-bold text-lg">Comece a preencher o seu catálogo</h3>
                    <p className="text-industrial-400 font-medium">Para as peças aparecerem na Busca Inteligente, acesse o menu de Produtos.</p>
                </div>
            </div>

        </div>
    );
}
