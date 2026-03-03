import Link from "next/link";
import { ImageIcon, ArrowRight } from "lucide-react";

interface ProductCardProps {
    id: string;
    name: string;
    part_number: string;
    brand: { name: string };
    category: { name: string };
    media: { url: string }[];
}

export default function ProductCard({ id, name, part_number, brand, category, media }: ProductCardProps) {
    const hasImage = media.length > 0;

    return (
        <Link
            href={`/produto/${id}`}
            className="group bg-white rounded-xl border border-industrial-200 shadow-sm hover:shadow-lg hover:border-industrial-400 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col h-full"
        >
            {/* Image */}
            <div className="w-full aspect-[4/3] bg-industrial-100 flex items-center justify-center relative border-b border-industrial-200 overflow-hidden">
                {hasImage ? (
                    <img
                        src={media[0].url}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-industrial-300 gap-2">
                        <ImageIcon size={40} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Sem Imagem</span>
                    </div>
                )}

                {/* Brand badge */}
                <div className="absolute top-2 left-2 bg-industrial-900/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest backdrop-blur-sm">
                    {brand.name}
                </div>
            </div>

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest">
                    {category.name}
                </span>
                <h3 className="font-extrabold text-industrial-900 text-sm leading-snug group-hover:text-action transition-colors line-clamp-2 flex-1">
                    {name}
                </h3>

                <div className="mt-3 pt-3 border-t border-industrial-100 flex items-center justify-between">
                    <span className="bg-industrial-100 text-industrial-800 px-2 py-1 rounded font-mono font-bold text-xs">
                        {part_number}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-industrial-100 flex items-center justify-center text-industrial-600 group-hover:bg-industrial-900 group-hover:text-white transition-all duration-200 shrink-0">
                        <ArrowRight size={13} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
