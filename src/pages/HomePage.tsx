import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, MapPin, Calendar, Plus, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DualRatingDisplay } from '../components/ui/DualRatingDisplay';

export const HomePage: React.FC = () => {
  const { journals, bucketList, stats, openJournalModal, openBucketModal, openRandomizer, toggleBucketStatus } = useApp();

  const recentJournals = journals.slice(0, 3);
  const activeBucketItems = bucketList.filter((b) => b.status === 'wishlist').slice(0, 3);

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-cream-100 via-rosewood-50/40 to-cream-50 border border-cream-200/80 p-6 sm:p-10 shadow-soft">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rosewood-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-100/50 rounded-full blur-2xl -z-10 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-cream-300/70 text-xs font-semibold text-terracotta-600 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rosewood-500 text-rosewood-500" />
            <span>Ruang Digital Dokumentasi Berdua</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Menyimpan Jejak, Merayakan Cerita <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rosewood-600 to-terracotta-500">
              Januar &amp; Adel
            </span>
          </h1>

          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Setiap sudut kafe yang kita singgahi, jalanan baru yang kita susuri, dan impian kecil yang kita centang satu per satu.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openJournalModal()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rosewood-500 hover:bg-rosewood-600 text-white font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Cerita Baru</span>
            </button>

            <button
              onClick={openRandomizer}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-cream-100 text-neutral-800 border border-cream-300 font-semibold text-sm shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Tombol "Terserah"</span>
            </button>
          </div>
        </div>

        {/* STATISTIK MINI COUNTER */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-cream-200/80">
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-cream-200/60 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-serif">
              {stats.totalPlacesVisited}
            </div>
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mt-0.5">
              Tempat Dikunjungi
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-cream-200/60 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-sage-600 font-serif">
              {stats.bucketListAchieved} / {stats.totalBucketList}
            </div>
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mt-0.5">
              Bucket List Tercapai
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-cream-200/60 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-serif">
              ★ {stats.averageRatingJanuar}
            </div>
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mt-0.5">
              Avg Skor Januar
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-cream-200/60 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-pink-500 font-serif">
              ★ {stats.averageRatingAdel}
            </div>
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mt-0.5">
              Avg Skor Adel
            </div>
          </div>
        </div>
      </section>

      {/* SECTION KENANGAN TERBARU */}
      <section className="space-y-4">
        <div className="flex items-end justify-between px-1">
          <div>
            <h2 className="font-serif text-2xl font-bold text-neutral-900">
              Kenangan Terbaru
            </h2>
            <p className="text-xs text-neutral-500">
              Dokumentasi tempat dan rasa yang baru saja kita kunjungi
            </p>
          </div>
          <Link
            to="/jurnal"
            className="flex items-center gap-1 text-xs font-semibold text-rosewood-600 hover:text-rosewood-700 transition-colors"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {recentJournals.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-cream-200 text-neutral-500 text-sm">
            Belum ada jurnal kenangan. Yuk tambahkan tempat pertama kalian!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentJournals.map((journal) => (
              <Link
                key={journal.id}
                to={`/jurnal/${journal.id}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-cream-200/80 shadow-soft hover:shadow-float transition-all hover:-translate-y-1"
              >
                {/* Image cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                  <img
                    src={journal.photos[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'}
                    alt={journal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">
                      {journal.category}
                    </span>
                  </div>
                  {journal.costEstimate && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[10px] font-bold text-neutral-700">
                      {journal.costEstimate}
                    </div>
                  )}
                </div>

                {/* Content body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{journal.date}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3 text-rosewood-500" />
                      <span className="truncate">{journal.placeName}</span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-neutral-900 group-hover:text-rosewood-600 transition-colors line-clamp-1">
                      {journal.title}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed font-sans">
                      {journal.story}
                    </p>
                  </div>

                  {/* Dual Rating Mini Preview */}
                  <DualRatingDisplay
                    compact
                    ratingJanuar={journal.ratingJanuar}
                    ratingAdel={journal.ratingAdel}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* SECTION BUCKET LIST PREVIEW */}
      <section className="bg-cream-100/70 rounded-3xl p-6 sm:p-8 border border-cream-200 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-terracotta-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rencana Mendatang</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-neutral-900">
              Daftar Impian Berdua (Bucket List)
            </h2>
          </div>
          <Link
            to="/bucket-list"
            className="flex items-center gap-1 text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 transition-colors"
          >
            <span>Semua Rencana ({bucketList.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {activeBucketItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl border border-cream-200/80 shadow-xs flex flex-col justify-between hover:border-terracotta-200 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                    {item.category}
                  </span>
                  {item.budgetEstimate && (
                    <span className="text-[11px] font-semibold text-neutral-500">
                      {item.budgetEstimate}
                    </span>
                  )}
                </div>

                <h4 className="font-serif font-bold text-sm text-neutral-800 line-clamp-2 mb-1">
                  {item.title}
                </h4>

                {item.notes && (
                  <p className="text-xs text-neutral-500 line-clamp-2 italic font-sans">
                    "{item.notes}"
                  </p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-cream-100 flex items-center justify-between">
                <button
                  onClick={() => toggleBucketStatus(item.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-sage-600 hover:text-sage-700 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tandai Selesai</span>
                </button>
              </div>
            </div>
          ))}

          {/* Card shortcut to add new */}
          <div
            onClick={() => openBucketModal()}
            className="border-2 border-dashed border-cream-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-terracotta-500/50 hover:bg-cream-50 transition-all min-h-[140px]"
          >
            <div className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center text-neutral-600 mb-2">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-neutral-700">Tambah Impian Baru</div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Mau pergi ke mana lagi kita?</div>
          </div>
        </div>
      </section>
    </div>
  );
};
