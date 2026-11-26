import React, { useState } from 'react';
import { Sparkles, X, Shuffle, CheckCircle, MapPin, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { BucketListItem, Category } from '../../types';

export const RandomizerModal: React.FC = () => {
  const { isRandomizerOpen, closeRandomizer, bucketList, openJournalModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Semua'>('Kuliner');
  const [isSpinning, setIsSpinning] = useState(false);
  const [chosenItem, setChosenItem] = useState<BucketListItem | null>(null);

  if (!isRandomizerOpen) return null;

  // Filter pending items
  const candidates = bucketList.filter((item) => {
    const isPending = item.status === 'wishlist';
    if (selectedCategory === 'Semua') return isPending;
    return isPending && item.category === selectedCategory;
  });

  const handleSpin = () => {
    if (candidates.length === 0) return;

    setIsSpinning(true);
    setChosenItem(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * candidates.length);
      setChosenItem(candidates[randomIndex]);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * candidates.length);
        const finalPick = candidates[finalIndex];
        setChosenItem(finalPick);
        setIsSpinning(false);

        // Fire celebration confetti!
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore if canvas not supported
        }
      }
    }, 100);
  };

  const categories: (Category | 'Semua')[] = ['Semua', 'Kuliner', 'Trip', 'Aktivitas', 'Lainnya'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-cream-50 rounded-3xl max-w-md w-full p-6 shadow-float border border-cream-200 relative overflow-hidden text-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cream-200 mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-neutral-800">
                Tombol "Terserah"
              </h3>
              <p className="text-xs text-neutral-500">
                Pilihkan tujuan dari Bucket List saat bingung mau ke mana!
              </p>
            </div>
          </div>
          <button
            onClick={closeRandomizer}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category selector */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-neutral-600 mb-2">
            Pilih Kategori Rencana:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setChosenItem(null);
                }}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-cream-200/80 text-neutral-700 hover:bg-cream-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Display Box */}
        <div className="my-6 min-h-[140px] flex flex-col items-center justify-center text-center p-5 rounded-2xl bg-white/80 border border-cream-200 shadow-xs relative">
          {chosenItem ? (
            <div className="space-y-2 animate-fade-in w-full">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700 mb-1">
                {chosenItem.category}
              </span>
              <h4 className="font-serif font-bold text-xl text-neutral-800 leading-snug">
                {chosenItem.title}
              </h4>
              {chosenItem.placeName && (
                <div className="flex items-center justify-center gap-1 text-xs text-neutral-500">
                  <MapPin className="w-3.5 h-3.5 text-rosewood-500" />
                  <span>{chosenItem.placeName}</span>
                </div>
              )}
              {chosenItem.budgetEstimate && (
                <div className="text-xs font-semibold text-terracotta-600">
                  Est. Budget: {chosenItem.budgetEstimate}
                </div>
              )}
              {chosenItem.notes && (
                <p className="text-xs text-neutral-600 italic bg-cream-100/60 p-2 rounded-lg">
                  "{chosenItem.notes}"
                </p>
              )}
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-neutral-400 text-xs">
              Tidak ada wishlist yang tersedia di kategori ini.
            </div>
          ) : (
            <div className="text-neutral-400 text-xs space-y-1">
              <p className="font-semibold text-neutral-600">
                Ada {candidates.length} pilihan wishlist siap dieksplor!
              </p>
              <p>Tekan tombol di bawah untuk mengacak pilihan takdir kita hari ini ✨</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="space-y-2">
          <button
            type="button"
            disabled={isSpinning || candidates.length === 0}
            onClick={handleSpin}
            className="w-full py-3 px-4 rounded-full bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-50"
          >
            <Shuffle className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Mengacak Tempat...' : 'Acak Sekarang (Terserah!)'}</span>
          </button>

          {chosenItem && !isSpinning && (
            <button
              type="button"
              onClick={() => {
                closeRandomizer();
                // Pre-fill journal from this bucket item
                openJournalModal({
                  title: chosenItem.title,
                  placeName: chosenItem.placeName || chosenItem.title,
                  category: chosenItem.category,
                  story: chosenItem.notes ? `Berangkat dari bucket list: ${chosenItem.notes}` : '',
                  costEstimate: chosenItem.budgetEstimate || '',
                });
              }}
              className="w-full py-2.5 px-4 rounded-full bg-cream-200 hover:bg-cream-300 text-neutral-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-sage-600" />
              <span>Sudah Kunjung &amp; Buat Jurnalnya</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
