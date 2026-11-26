import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { useApp } from '../../context/AppContext';

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
  const { currentUser } = useApp();

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
      <div className="flex items-center gap-2.5 bg-cream-50/90 p-2 rounded-2xl border border-cream-200/80 text-xs shadow-2xs">
        {/* Januar mini */}
        <div
          className={`flex items-center gap-1.5 flex-1 min-w-0 p-1 rounded-xl transition-all ${
            currentUser === 'Januar' ? 'bg-blue-50/90 ring-1 ring-blue-300' : ''
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              currentUser === 'Januar' ? 'bg-blue-600 text-white shadow-2xs' : 'bg-blue-100 text-blue-700'
            }`}
          >
            J
          </span>
          <div className="truncate">
            <span className={`font-bold mr-1 ${currentUser === 'Januar' ? 'text-blue-900 font-black' : 'text-neutral-800'}`}>
              {ratingJanuar.toFixed(1)}
            </span>
            <span className="text-[10px] text-neutral-400">/5</span>
          </div>
        </div>

        <div className="w-[1px] h-4 bg-cream-300" />

        {/* Adel mini */}
        <div
          className={`flex items-center gap-1.5 flex-1 min-w-0 p-1 rounded-xl transition-all ${
            currentUser === 'Adel' ? 'bg-pink-50/90 ring-1 ring-pink-300' : ''
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              currentUser === 'Adel' ? 'bg-pink-500 text-white shadow-2xs' : 'bg-pink-100 text-pink-700'
            }`}
          >
            A
          </span>
          <div className="truncate">
            <span className={`font-bold mr-1 ${currentUser === 'Adel' ? 'text-pink-900 font-black' : 'text-neutral-800'}`}>
              {ratingAdel.toFixed(1)}
            </span>
            <span className="text-[10px] text-neutral-400">/5</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 my-2">
      {/* Box Skor Januar */}
      <div
        className={`relative rounded-3xl bg-white p-4 sm:p-5 transition-all shadow-soft border ${
          currentUser === 'Januar'
            ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/20 shadow-md'
            : 'border-blue-100/90'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              J
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-blue-950">Skor Januar</h4>
                {currentUser === 'Januar' && (
                  <span className="text-[9px] uppercase font-black bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                    Aktif
                  </span>
                )}
              </div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-blue-600/80">Versi Cowok</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
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
      <div
        className={`relative rounded-3xl bg-white p-4 sm:p-5 transition-all shadow-soft border ${
          currentUser === 'Adel'
            ? 'ring-2 ring-pink-500 border-pink-400 bg-pink-50/20 shadow-md'
            : 'border-pink-100/90'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-pink-950">Skor Adel</h4>
                {currentUser === 'Adel' && (
                  <span className="text-[9px] uppercase font-black bg-pink-500 text-white px-2 py-0.5 rounded-full shadow-2xs">
                    Aktif
                  </span>
                )}
              </div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-pink-600/80">Versi Cewek</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
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
