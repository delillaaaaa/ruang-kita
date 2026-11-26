import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Edit3, Trash2, Share2, Tag, DollarSign, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DualRatingDisplay } from '../components/ui/DualRatingDisplay';

export const JournalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { journals, deleteJournal, openJournalModal } = useApp();

  const journal = journals.find((j) => j.id === id);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!journal) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-4 animate-fade-in">
        <h2 className="font-serif text-2xl font-bold text-neutral-800">
          Kenangan tidak ditemukan
        </h2>
        <p className="text-xs text-neutral-500">
          Entri jurnal ini mungkin telah dihapus atau tautan tidak valid.
        </p>
        <Link
          to="/jurnal"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rosewood-500 text-white font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Jurnal</span>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Yakin ingin menghapus kenangan "${journal.title}"?`)) {
      deleteJournal(journal.id);
      navigate('/jurnal');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const photos = journal.photos && journal.photos.length > 0
    ? journal.photos
    : ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'];

  return (
    <article className="max-w-3xl mx-auto space-y-8 pb-16 animate-fade-in">
      {/* Top Nav actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white px-3 py-2 rounded-xl border border-cream-200 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            title="Salin Tautan"
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-cream-200 text-neutral-700 hover:bg-cream-100 text-xs font-medium shadow-xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600 font-semibold">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-neutral-500" />
                <span>Bagikan</span>
              </>
            )}
          </button>

          <button
            onClick={() => openJournalModal(journal)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-cream-100 border border-cream-200 text-neutral-700 hover:bg-cream-200 text-xs font-semibold transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-xl bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 transition-colors"
            title="Hapus Entri"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* PHOTO GALLERY */}
      <div className="space-y-3">
        {/* Main active photo */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-float bg-neutral-900 border border-cream-200">
          <img
            src={photos[activePhotoIndex]}
            alt={journal.title}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Navigation arrows if multiple photos */}
          {photos.length > 1 && (
            <>
              <button
                onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                aria-label="Foto Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActivePhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                aria-label="Foto Selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Photo indicator badge */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full text-xs text-white font-medium">
              {activePhotoIndex + 1} / {photos.length}
            </div>
          )}
        </div>

        {/* Thumbnail selector */}
        {photos.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {photos.map((src, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIndex(i)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activePhotoIndex === i
                    ? 'border-rosewood-500 ring-2 ring-rosewood-500/20 scale-102'
                    : 'border-cream-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* HEADER & METADATA */}
      <header className="space-y-3 border-b border-cream-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rosewood-100 text-rosewood-700">
            {journal.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{journal.date}</span>
          </div>
          {journal.costEstimate && (
            <div className="flex items-center gap-1 text-xs text-terracotta-600 font-semibold bg-terracotta-50 px-2.5 py-0.5 rounded-full border border-terracotta-200/60">
              <DollarSign className="w-3 h-3" />
              <span>{journal.costEstimate}</span>
            </div>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">
          {journal.title}
        </h1>

        <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-700">
          <MapPin className="w-4 h-4 text-rosewood-500 shrink-0" />
          <span>{journal.placeName}</span>
          {journal.location && (
            <>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500 font-normal">{journal.location}</span>
            </>
          )}
        </div>
      </header>

      {/* DUAL RATING SECTION (Highlight of the PRD) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl text-neutral-900">
            Dual Rating &amp; Verdict Berdua
          </h2>
          <span className="text-xs text-neutral-500">Perbandingan skor objektif</span>
        </div>

        <DualRatingDisplay
          ratingJanuar={journal.ratingJanuar}
          verdictJanuar={journal.verdictJanuar}
          ratingAdel={journal.ratingAdel}
          verdictAdel={journal.verdictAdel}
        />
      </section>

      {/* CERITA MOMEN */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200/80 shadow-soft space-y-4">
        <h3 className="font-serif font-bold text-lg text-neutral-900 flex items-center gap-2">
          <Heart className="w-4 h-4 text-rosewood-500 fill-rosewood-500" />
          <span>Catatan Momen &amp; Cerita</span>
        </h3>

        <div className="text-sm sm:text-base text-neutral-700 font-sans leading-relaxed whitespace-pre-line">
          {journal.story || 'Tidak ada catatan cerita untuk kenangan ini.'}
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div className="text-center text-xs text-neutral-400 italic pt-4">
        Tercatat di Ruang Kita pada {new Date(journal.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </article>
  );
};
