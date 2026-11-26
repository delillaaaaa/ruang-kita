import React, { useState } from 'react';
import { CheckSquare, Plus, Sparkles, CheckCircle2, RotateCcw, MapPin, DollarSign, Tag, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Category, BucketListItem } from '../types';

export const BucketListPage: React.FC = () => {
  const { bucketList, toggleBucketStatus, deleteBucketItem, openBucketModal, openJournalModal, openRandomizer } = useApp();

  const [activeTab, setActiveTab] = useState<'wishlist' | 'done'>('wishlist');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Semua'>('Semua');

  const categories: (Category | 'Semua')[] = ['Semua', 'Kuliner', 'Trip', 'Aktivitas', 'Lainnya'];

  const filteredItems = bucketList.filter((item) => {
    const matchesStatus = item.status === activeTab;
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  const handleCheckOff = (item: BucketListItem) => {
    toggleBucketStatus(item.id);

    // If marking as done, trigger confetti
    if (item.status === 'wishlist') {
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.65 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleConvertToJournal = (item: BucketListItem) => {
    // If not done, mark it done first
    if (item.status === 'wishlist') {
      toggleBucketStatus(item.id);
    }
    // Open journal form prefilled
    openJournalModal({
      title: item.title,
      placeName: item.placeName || item.title,
      category: item.category,
      story: item.notes ? `Berangkat dari bucket list: ${item.notes}` : '',
      costEstimate: item.budgetEstimate || '',
    });
  };

  const wishlistCount = bucketList.filter((b) => b.status === 'wishlist').length;
  const doneCount = bucketList.filter((b) => b.status === 'done').length;

  return (
    <div className="space-y-6 pb-16 animate-slide-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-brand-800 tracking-tight leading-tight">
            Bucket List Impian Berdua
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Daftar tempat, kuliner, dan petualangan yang ingin kita wujudkan bersama
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={openRandomizer}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-cream-100 hover:bg-brand-50 border border-cream-200 text-brand-800 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Tombol "Terserah"</span>
          </button>

          <button
            onClick={() => openBucketModal()}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah Rencana</span>
          </button>
        </div>
      </div>

      {/* Tabs & Filter Bar (Dakingo pill styling) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-cream-200/90 shadow-soft space-y-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 border-b border-cream-200 pb-3">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'wishlist'
                ? 'bg-brand-800 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-cream-100'
            }`}
          >
            <span>Belum Tercapai</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-cream-200 text-neutral-700'
              }`}
            >
              {wishlistCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('done')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'done'
                ? 'bg-sage-600 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-cream-100'
            }`}
          >
            <span>Sudah Terwujud</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === 'done' ? 'bg-white/20 text-white' : 'bg-cream-200 text-neutral-700'
              }`}
            >
              {doneCount}
            </span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-800 text-white shadow-xs'
                  : 'bg-cream-100 text-neutral-600 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bucket List Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-cream-200 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-cream-200 text-neutral-500 flex items-center justify-center mx-auto">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-neutral-800">
            {activeTab === 'wishlist' ? 'Belum ada daftar impian' : 'Belum ada impian yang terwujud'}
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {activeTab === 'wishlist'
              ? 'Tulis rencana baru dan mulai kumpulkan destinasi idaman berdua!'
              : 'Centang rencana yang sudah berhasil kalian kunjungi bersama!'}
          </p>
          {activeTab === 'wishlist' && (
            <button
              onClick={() => openBucketModal()}
              className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Tambah Rencana Pertama</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                item.status === 'done'
                  ? 'bg-sage-100/40 border-sage-200 shadow-xs'
                  : 'bg-white border-cream-200/90 shadow-soft hover:shadow-dakingo hover:-translate-y-0.5'
              }`}
            >
              <div>
                {/* Badge & Category */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full bg-brand-100 text-brand-800">
                    {item.category}
                  </span>
                  {item.budgetEstimate && (
                    <div className="flex items-center gap-1 text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100">
                      <DollarSign className="w-3 h-3" />
                      <span>{item.budgetEstimate}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  className={`text-base font-bold mb-1.5 ${
                    item.status === 'done' ? 'line-through text-neutral-400' : 'text-neutral-900'
                  }`}
                >
                  {item.title}
                </h3>

                {/* Place name */}
                {item.placeName && (
                  <div className="flex items-center gap-1 text-xs text-neutral-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                    <span>{item.placeName}</span>
                  </div>
                )}

                {/* Notes */}
                {item.notes && (
                  <p className="text-xs text-neutral-600 italic bg-cream-50/80 p-3 rounded-2xl border border-cream-200/60 font-sans mt-2">
                    "{item.notes}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-cream-200/60 flex items-center justify-between gap-2">
                {item.status === 'wishlist' ? (
                  <>
                    <button
                      onClick={() => handleCheckOff(item)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sage-100 hover:bg-sage-200 text-sage-700 font-bold text-xs transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sage-600" />
                      <span>Tandai Selesai</span>
                    </button>

                    <button
                      onClick={() => handleConvertToJournal(item)}
                      className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs transition-colors"
                      title="Ubah ke Jurnal dan tulis review"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Buat Jurnal</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleBucketStatus(item.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-800 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Kembalikan ke Wishlist</span>
                    </button>

                    <span className="text-[11px] font-bold text-sage-700 bg-sage-200/60 px-3 py-1 rounded-full">
                      ✓ Terwujud
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
