import Link from "next/link";
import { Wrench, Zap, Disc, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";

export const revalidate = 3600; // Cache revalidation for 1 hour for performance

export default async function Home() {
  // Puxar as principais marcas diretamente do banco, ignorando as genéricas e ordenando por quantidade de produtos
  const topBrands = await db.brand.findMany({
    where: {
      products: { some: {} },
      name: { notIn: ["Genérica", "GENÉRICA", "Generica"] }
    },
    take: 6,
    orderBy: {
      products: { _count: 'desc' }
    }
  });

  return (
    <div className="flex flex-col min-h-screen font-sans bg-industrial-100">
      {/* Sleek Hero Section */}
      <section className="bg-gradient-to-br from-[#0c1324] to-[#121b33] pt-24 pb-32 px-4 text-center relative overflow-hidden">
        {/* Abstract Background Element for Modern Feel */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[70%] bg-industrial-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-industrial-100 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-industrial-100 border border-white/20 uppercase tracking-widest mb-4 shadow-sm backdrop-blur-md">
            O Catálogo Definitivo de Peças
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Precisão e Qualidade em <br className="hidden md:block" /> <span className="text-industrial-400">Reposição Industrial</span>
          </h1>
          <p className="text-lg md:text-xl text-industrial-200/80 font-medium max-w-2xl mx-auto mt-4">
            Digite o código OEM ou o nome da peça. Nós trazemos o resultado na hora.
          </p>

          <div className="mt-12">
            <form action="/busca" method="GET" className="relative max-w-2xl mx-auto flex items-center group backdrop-blur-md rounded-xl p-2 bg-white/10 border border-white/20 shadow-2xl focus-within:border-industrial-400 focus-within:bg-white/15 transition-all">
              <input
                name="q"
                type="text"
                placeholder="Busque por produto, código, marca..."
                className="w-full pl-6 pr-32 py-4 bg-transparent text-white placeholder:text-industrial-200/60 outline-none text-lg font-medium"
              />
              <button
                type="submit"
                className="absolute right-2 p-3 bg-white hover:bg-industrial-100 text-industrial-900 rounded-lg transition-colors flex items-center gap-2 font-extrabold text-sm uppercase tracking-widest shadow-md"
                aria-label="Buscar Peças"
              >
                <span>Buscar</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Access Categories - Modern Cards */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full -mt-16 z-20 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/busca?q=motor" className="group block">
            <div className="bg-white/80 backdrop-blur-lg border border-industrial-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-5 shadow-lg shadow-industrial-900/5 hover:border-industrial-400 hover:-translate-y-1 transition-all h-56 cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-industrial-100 rounded-bl-full opacity-50 z-0 group-hover:scale-110 transition-transform" />
              <div className="w-16 h-16 bg-gradient-to-br from-industrial-100 to-industrial-200 rounded-2xl flex items-center justify-center text-industrial-800 z-10 shadow-sm">
                <Wrench size={28} />
              </div>
              <h3 className="font-extrabold text-industrial-900 text-lg z-10">Motor</h3>
            </div>
          </Link>

          <Link href="/busca?q=freio" className="group block">
            <div className="bg-white/80 backdrop-blur-lg border border-industrial-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-5 shadow-lg shadow-industrial-900/5 hover:border-industrial-400 hover:-translate-y-1 transition-all h-56 cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-industrial-100 rounded-bl-full opacity-50 z-0 group-hover:scale-110 transition-transform" />
              <div className="w-16 h-16 bg-gradient-to-br from-industrial-100 to-industrial-200 rounded-2xl flex items-center justify-center text-industrial-800 z-10 shadow-sm">
                <Disc size={28} />
              </div>
              <h3 className="font-extrabold text-industrial-900 text-lg z-10">Freio</h3>
            </div>
          </Link>

          <Link href="/busca?q=hidraulico" className="group block">
            <div className="bg-white/80 backdrop-blur-lg border border-industrial-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-5 shadow-lg shadow-industrial-900/5 hover:border-industrial-400 hover:-translate-y-1 transition-all h-56 cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-industrial-100 rounded-bl-full opacity-50 z-0 group-hover:scale-110 transition-transform" />
              <div className="w-16 h-16 bg-gradient-to-br from-industrial-100 to-industrial-200 rounded-2xl flex items-center justify-center text-industrial-800 z-10 shadow-sm">
                <div className="w-7 h-7 rounded-sm border-[2px] border-industrial-800 rotate-45" />
              </div>
              <h3 className="font-extrabold text-industrial-900 text-lg z-10">Hidráulico</h3>
            </div>
          </Link>

          <Link href="/busca?q=eletrico" className="group block">
            <div className="bg-white/80 backdrop-blur-lg border border-industrial-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-5 shadow-lg shadow-industrial-900/5 hover:border-industrial-400 hover:-translate-y-1 transition-all h-56 cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-industrial-100 rounded-bl-full opacity-50 z-0 group-hover:scale-110 transition-transform" />
              <div className="w-16 h-16 bg-gradient-to-br from-industrial-100 to-industrial-200 rounded-2xl flex items-center justify-center text-industrial-800 z-10 shadow-sm">
                <Zap size={28} />
              </div>
              <h3 className="font-extrabold text-industrial-900 text-lg z-10">Elétrico</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Modern Brands Horizontal List */}
      <section className="bg-transparent py-12 px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-sm font-extrabold text-industrial-400 uppercase tracking-[0.2em] relative">
              <span className="hidden md:inline-block w-8 h-[2px] bg-industrial-200 absolute left-[-40px] top-1/2 -translate-y-1/2" />
              Marcas Homologadas MYA
              <span className="hidden md:inline-block w-8 h-[2px] bg-industrial-200 absolute right-[-40px] top-1/2 -translate-y-1/2" />
            </h2>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {topBrands.map((brand) => (
                <Link href={`/busca?q=${brand.name}`} key={brand.id} className="px-6 py-3 bg-white border border-industrial-200 rounded-xl text-sm font-bold text-industrial-600 hover:text-industrial-900 hover:border-industrial-400 hover:shadow-sm cursor-pointer transition-all uppercase tracking-wider">
                  {brand.name}
                </Link>
              ))}
              {topBrands.length === 0 && (
                <p className="text-industrial-400 font-bold uppercase tracking-widest text-sm">Nenhuma marca catalogada ainda.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
