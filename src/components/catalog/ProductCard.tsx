import Link from "next/link";
import { ImageIcon, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
    id: string;
    name: string;
    part_number: string;
    brand: { name: string };
    category: { name: string };
    media: { url: string }[];
    priority?: boolean;
    eager?: boolean;
}

export default function ProductCard({
    id,
    name,
    part_number,
    brand,
    category,
    media,
    priority = false,
    eager = false,
}: ProductCardProps) {
    const hasImage = media.length > 0;

    return (
        <Link
            href={`/produto/${id}`}
            className="product-card-reveal group bg-white rounded-[2px] border border-slate-200 hover:border-slate-900 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col h-full"
        >
            {/* Photo stage — pure white uncropped showcase */}
            <div className="w-full aspect-square bg-white flex items-center justify-center relative border-b border-slate-100 p-3 overflow-hidden">
                {hasImage ? (
                    <img
                        src={media[0].url}
                        alt={`${name} - Cód. ${part_number}`}
                        width={400}
                        height={400}
                        fetchPriority={priority ? "high" : undefined}
                        loading={priority || eager ? undefined : "lazy"}
                        decoding={priority ? "sync" : "async"}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
                        <ImageIcon size={38} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Sem Foto</span>
                    </div>
                )}

                {/* Brand tag */}
                <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
                    {brand.name}
                </span>
            </div>

            {/* Technical specs */}
            <div className="p-3.5 md:p-4 flex-1 flex flex-col gap-1.5 bg-white">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                    {category.name}
                </span>

                <h3 className="font-extrabold text-slate-900 text-xs md:text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 flex-1">
                    {name}
                </h3>

                <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">
                            Cód. OEM
                        </span>
                        <span className="inline-block bg-slate-100 border border-slate-200 text-slate-900 px-2 py-0.5 rounded-[2px] font-mono font-extrabold text-xs truncate max-w-full">
                            {part_number}
                        </span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[2px] bg-slate-100 text-slate-800 text-[11px] font-extrabold uppercase tracking-wider group-hover:bg-[#16a34a] group-hover:text-white transition-colors duration-200 shrink-0">
                        Ver
                        <ArrowUpRight size={13} />
                    </span>
                </div>
            </div>
        </Link>
    );
}
