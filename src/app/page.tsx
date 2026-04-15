import Link from "next/link";
import { Wrench, Zap, Disc, Droplets, ArrowRight, Package } from "lucide-react";
import { db } from "@/lib/db";

export const revalidate = 3600;

const QUICK_LINKS = [
  { href: "/busca?q=motor", icon: <Wrench size={24} />, label: "Motor", sub: "Sistemas de propulsão" },
  { href: "/busca?q=freio", icon: <Disc size={24} />, label: "Freio", sub: "Pastilhas, discos e tambores" },
  { href: "/busca?q=hidraulico", icon: <Droplets size={24} />, label: "Hidráulico", sub: "Mangueiras e vedações" },
  { href: "/busca?q=eletrico", icon: <Zap size={24} />, label: "Elétrico", sub: "Alternadores e sensores" },
];

export default async function Home() {
  const [topBrands, recentProducts] = await Promise.all([
    db.brand.findMany({
      where: {
        products: { some: {} },
        name: { notIn: ["Genérica", "GENÉRICA", "Generica"] }
      },
      take: 20,
      orderBy: { products: { _count: "desc" } }
    }),
    db.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        brand: true,
        media: { where: { isMain: true }, take: 1 }
      }
    })
  ]);

  return (
    <div className="flex flex-col min-h-screen font-sans">

      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden min-h-[380px] md:min-h-[420px] flex flex-col justify-center"
        style={{
          backgroundImage: "url('/bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay — makes bg image subtle texture */}
        <div className="absolute inset-0 z-0 bg-industrial-900/92" />

        {/* Vignette edges */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-industrial-900/80 via-industrial-900/30 to-industrial-900/70 pointer-events-none" />

        {/* Diagonal accent stripe */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] z-0 pointer-events-none hidden lg:block">
          <div
            className="absolute inset-0 bg-gradient-to-br from-action/25 via-action/10 to-transparent"
            style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
          {/* Vertical accent line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
            style={{ left: "14.5%" }}
          />
        </div>

        {/* Bottom edge separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-industrial-600/50 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full pb-10 pt-6 md:pt-10 md:pb-16">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">

            {/* Left — copy */}
            <div className="w-full lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Live badge */}
              <div className="hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#b0bec5]/30 bg-white/5 text-[#b0bec5] text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.2em] mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-[#4caf50] shadow-[0_0_6px_2px_rgba(76,175,80,0.5)] animate-pulse" />
                Catálogo online · Atualizado agora
              </div>

              {/* Headline */}
              <div className="max-w-md mx-auto lg:max-w-none lg:mx-0">
                <h1 className="font-extrabold text-white tracking-tight leading-[1.1] md:leading-[1.0]">
                  <span className="hero-line-1 block text-3xl md:text-5xl lg:text-6xl">Peças para</span>
                  <span className="hero-line-2 block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#8aa1ba] to-[#b0bec5] mt-1">
                    Empilhadeiras
                  </span>
                  <span className="hero-line-3 block text-2xl md:text-4xl lg:text-5xl text-white/70 mt-1 font-bold">
                    na hora certa.
                  </span>
                </h1>
              </div>

              {/* Sub */}
              <p className="hero-sub text-industrial-400 text-sm md:text-lg leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
                Catálogo B2B com <strong className="text-white font-extrabold">+50 mil referências OEM</strong> para Toyota, Hyster e outras marcas. Consulte agora.
              </p>

              {/* CTAs */}
              <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/produtos"
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white text-industrial-900 rounded-lg font-extrabold text-xs md:text-sm uppercase tracking-widest hover:bg-industrial-100 transition-all shadow-xl shadow-industrial-900/30"
                >
                  Catálogo Completo
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/5519971441580"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-white/20 text-white/80 rounded-lg font-bold text-xs md:text-sm uppercase tracking-widest hover:border-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  WhatsApp
                </a>
              </div>

              {/* Trust indicators */}
              <div className="hero-trust flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 pt-1">
                {["Faturamento CNPJ", "Estoque próprio"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-[10px] md:text-xs text-industrial-400 font-medium whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-[#4caf50]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Stats grid */}
            <div className="w-full lg:col-span-5 lg:pl-12 grid grid-cols-3 lg:grid-cols-1 gap-2 md:gap-3">
              {[
                { number: "50K+", label: "Peças", accent: true, cls: "hero-stat-1" },
                { number: "24h", label: "Online", accent: false, cls: "hero-stat-2" },
                { number: "B2B", label: "CNPJ", accent: false, cls: "hero-stat-3" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`${stat.cls} flex flex-col md:flex-row items-center justify-center lg:justify-start gap-1 md:gap-4 p-3 md:p-5 rounded-xl border transition-colors ${stat.accent
                    ? "bg-action/20 border-action/30"
                    : "bg-white/5 border-white/10 hover:bg-white/8"
                    }`}
                >
                  <div className={`text-xl md:text-3xl lg:text-4xl font-extrabold tracking-tight shrink-0 ${stat.accent ? "text-white" : "text-[#b0bec5]"}`}>
                    {stat.number}
                  </div>
                  <div className="text-[8px] md:text-xs text-industrial-400 font-bold uppercase tracking-widest text-center md:text-left leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Scroll Indicator ─── */}
        <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-bold text-white/35 uppercase tracking-[0.25em]">Scroll</span>
          <div className="scroll-bounce flex flex-col items-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/25 -mt-3">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      {/* ─── QUICK ACCESS CATEGORIES ─── */}
      <section className="bg-white border-b border-industrial-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 p-4 md:p-5 rounded-xl border border-industrial-200 hover:border-industrial-400 hover:bg-industrial-100/50 transition-all duration-200"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-industrial-100 group-hover:bg-industrial-200 flex items-center justify-center text-industrial-700 group-hover:text-industrial-900 transition-colors shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-extrabold text-industrial-900 text-sm md:text-base group-hover:text-action transition-colors">
                    {item.label}
                  </div>
                  <div className="text-industrial-400 text-xs font-medium leading-snug hidden md:block mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      {topBrands.length > 0 && (
        <section className="bg-industrial-100/50 border-b border-industrial-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <h2 className="text-sm font-extrabold text-industrial-900 uppercase tracking-wider mb-4">
              Peças para as principais marcas de empilhadeiras do mercado
            </h2>
            <div className="flex flex-wrap gap-2">
              {topBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/busca?q=${encodeURIComponent(brand.name)}`}
                  className="px-4 py-2 bg-white border border-industrial-200 rounded-lg text-xs font-bold text-industrial-600 hover:text-industrial-900 hover:border-industrial-400 hover:shadow-sm transition-all uppercase tracking-wider"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── RECENT PRODUCTS ─── */}
      {recentProducts.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-industrial-900 tracking-tight">
                  Adicionados Recentemente
                </h2>
                <p className="text-industrial-400 text-sm font-medium mt-1">
                  Últimas peças cadastradas no catálogo
                </p>
              </div>
              <Link
                href="/produtos"
                className="hidden md:flex items-center gap-1.5 text-sm font-bold text-industrial-600 hover:text-action transition-colors uppercase tracking-widest"
              >
                Ver tudo <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/produto/${product.id}`}
                  className="group bg-white rounded-xl border border-industrial-200 shadow-sm hover:shadow-lg hover:border-industrial-400 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/3] bg-industrial-100 flex items-center justify-center relative overflow-hidden">
                    {product.media.length > 0 ? (
                      <img
                        src={product.media[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-industrial-300 gap-2">
                        <Package size={32} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Sem Imagem</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-industrial-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {product.brand.name}
                    </div>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest">{product.category.name}</span>
                    <h3 className="font-extrabold text-industrial-900 text-xs leading-snug group-hover:text-action transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="font-mono text-[11px] text-industrial-600 font-bold mt-1">{product.part_number}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-industrial-900 text-white rounded-lg font-extrabold text-sm uppercase tracking-widest hover:bg-action transition-colors"
              >
                Ver Catálogo Completo <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA STRIP ─── */}
      <section className="bg-industrial-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Precisa de uma peça específica?
            </h2>
            <p className="text-industrial-400 text-sm font-medium mt-1">
              Nossa equipe técnica responde em até 2 horas úteis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://wa.me/5519971441580"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-lg font-extrabold text-sm uppercase tracking-widest hover:bg-[#1ebe5b] transition-colors shadow-lg"
            >
              WhatsApp
            </a>
            <a
              href="mailto:myapartsforklift@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-white/80 rounded-lg font-bold text-sm uppercase tracking-widest hover:border-white/40 hover:text-white transition-colors"
            >
              E-mail
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
