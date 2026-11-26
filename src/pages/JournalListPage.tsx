import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Calendar, MapPin, Grid, List, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';
import { DualRatingDisplay } from '../components/ui/DualRatingDisplay';

export const JournalListPage: React.FC = () => {
  const { journals, openJournalModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Semua'>('Semua');
  const [sortBy, setSortBy] = useState<'terbaru' | 'terlama' | 'skor-januar' | 'skor-adel'>('terbaru');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: (Category | 'Semua')[] = ['Semua', 'Kuliner', 'Trip', 'Aktivitas', 'Lainnya'];

  const filteredJournals = useMemo(() => {
    return journals
      .filter((entry) => {
        const matchesCategory = selectedCategory === 'Semua' || entry.category === selectedCategory;
        const matchesQuery =
          entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (entry.location && entry.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (entry.story && entry.story.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'terbaru') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === 'terlama') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === 'skor-januar') {
          return b.ratingJanuar - a.ratingJanuar;
        }
        if (sortBy === 'skor-adel') {
          return b.ratingAdel - a.ratingAdel;
        }
        return 0;
      });
  }, [journals, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-neutral-900 tracking-tight">
            Jurnal &amp; Ulasan Berdua
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Katalog semua tempat yang pernah dikunjungi beserta cerita dan skor versi Januar vs Adel
          </p>
        </div>

        <button
          onClick={() => openJournalModal()}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-rosewood-500 hover:bg-rosewood-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Jurnal Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tempat, judul kenangan, kota..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-cream-300 bg-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500 transition-colors"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 text-neutral-700 font-medium"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
              <option value="skor-januar">Rating Tertinggi Januar</option>
              <option value="skor-adel">Rating Tertinggi Adel</option>
            </select>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-cream-100 p-1 rounded-xl border border-cream-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-rosewood-600' : 'text-neutral-500'
                }`}
                title="Tampilan Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-xs text-rosewood-600' : 'text-neutral-500'
                }`}
                title="Tampilan List"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rosewood-500 text-white shadow-xs'
                  : 'bg-cream-100 text-neutral-600 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <span>Menampilkan {filteredJournals.length} kenangan</span>
        {selectedCategory !== 'Semua' && (
          <span>Kategori: <strong>{selectedCategory}</strong></span>
        )}
      </div>

      {/* Grid or List View */}
      {filteredJournals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-cream-200 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-cream-200 text-neutral-500 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-neutral-800">
            Tidak ditemukan kenangan
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau ganti filter kategori yang dipilih.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJournals.map((journal) => (
            <Link
              key={journal.id}
              to={`/jurnal/${journal.id}`}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-cream-200/80 shadow-soft hover:shadow-float transition-all hover:-translate-y-1"
            >
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
                {journal.photos.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[10px] text-white font-medium">
                    {journal.photos.length} Foto
                  </div>
                )}
              </div>

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

                  <p className="text-xs text-neutral-600 line-clamp-2 mt-1 leading-relaxed font-sans">
                    {journal.story}
                  </p>
                </div>

                <DualRatingDisplay
                  compact
                  ratingJanuar={journal.ratingJanuar}
                  ratingAdel={journal.ratingAdel}
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredJournals.map((journal) => (
            <Link
              key={journal.id}
              to={`/jurnal/${journal.id}`}
              className="group flex flex-col sm:flex-row items-center gap-4 bg-white p-3.5 rounded-2xl border border-cream-200/80 shadow-soft hover:shadow-float transition-all hover:border-rosewood-300"
            >
              <div className="w-full sm:w-44 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden shrink-0 bg-cream-100">
                <img
                  src={journal.photos[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'}
                  alt={journal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0 w-full space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cream-200 text-neutral-700">
                    {journal.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <Calendar className="w-3 h-3" />
                    <span>{journal.date}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3 text-rosewood-500" />
                    <span className="truncate">{journal.placeName}</span>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-base text-neutral-900 group-hover:text-rosewood-600 transition-colors truncate">
                  {journal.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-sans">
                  {journal.story}
                </p>

                <div className="max-w-xs pt-1">
                  <DualRatingDisplay
                    compact
                    ratingJanuar={journal.ratingJanuar}
                    ratingAdel={journal.ratingAdel}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
