import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

interface DualRatingDisplayProps {
  ratingJanuar: number;
  verdictJanuar?: string;
  ratingAdel: number;
  verdictAdel?: string;
  compact?: boolean;
}

export const DualRatingDisplay: React.FC<DualRatingDisplayProps> = ({
  ratingJanuar,
  verdictJanuar,
  ratingAdel,
  verdictAdel,
  compact = false,
}) => {
  const renderStars = (rating: number, colorClass: string) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? `${colorClass} fill-current`
                : 'text-neutral-200'
            }`}
          />
        ))}
      </div>
    );
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-cream-50/80 p-2 rounded-2xl border border-cream-200/70 text-xs shadow-2xs">
        {/* Januar mini */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0">
            J
          </span>
          <div className="truncate">
            <span className="font-bold text-neutral-800 mr-1">{ratingJanuar.toFixed(1)}</span>
            <span className="text-[10px] text-neutral-400">/5</span>
          </div>
        </div>

        <div className="w-[1px] h-4 bg-cream-300" />

        {/* Adel mini */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-[10px] font-bold shrink-0">
            A
          </span>
          <div className="truncate">
            <span className="font-bold text-neutral-800 mr-1">{ratingAdel.toFixed(1)}</span>
            <span className="text-[10px] text-neutral-400">/5</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 my-2">
      {/* Box Skor Januar */}
      <div className="relative rounded-3xl bg-white border border-blue-100/90 p-4 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              J
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-950">Skor Januar</h4>
              <p className="text-[10px] uppercase font-bold tracking-wider text-blue-600/80">Versi Cowok</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1 bg-blue-50/60 px-2.5 py-1 rounded-full border border-blue-100">
            <span className="text-base font-black text-blue-600">{ratingJanuar.toFixed(1)}</span>
            <span className="text-[10px] text-neutral-400 font-semibold">/ 5</span>
          </div>
        </div>

        <div className="mb-2">
          {renderStars(ratingJanuar, 'text-blue-500')}
        </div>

        {verdictJanuar ? (
          <div className="flex items-start gap-1.5 text-xs text-neutral-700 bg-cream-50/60 p-2.5 rounded-2xl border border-cream-200/60 italic">
            <MessageSquareQuote className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span className="font-serif">"{verdictJanuar}"</span>
          </div>
        ) : (
          <div className="text-xs text-neutral-400 italic">Belum ada komentar dari Januar.</div>
        )}
      </div>

      {/* Box Skor Adel */}
      <div className="relative rounded-3xl bg-white border border-pink-100/90 p-4 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              A
            </div>
            <div>
              <h4 className="text-sm font-bold text-pink-950">Skor Adel</h4>
              <p className="text-[10px] uppercase font-bold tracking-wider text-pink-600/80">Versi Cewek</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1 bg-pink-50/60 px-2.5 py-1 rounded-full border border-pink-100">
            <span className="text-base font-black text-pink-500">{ratingAdel.toFixed(1)}</span>
            <span className="text-[10px] text-neutral-400 font-semibold">/ 5</span>
          </div>
        </div>

        <div className="mb-2">
          {renderStars(ratingAdel, 'text-pink-500')}
        </div>

        {verdictAdel ? (
          <div className="flex items-start gap-1.5 text-xs text-neutral-700 bg-cream-50/60 p-2.5 rounded-2xl border border-cream-200/60 italic">
            <MessageSquareQuote className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            <span className="font-serif">"{verdictAdel}"</span>
          </div>
        ) : (
          <div className="text-xs text-neutral-400 italic">Belum ada komentar dari Adel.</div>
        )}
      </div>
    </div>
  );
};
