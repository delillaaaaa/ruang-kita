import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Trash2, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Category } from '../../types';

export const JournalFormModal: React.FC = () => {
  const { isJournalModalOpen, closeJournalModal, editingJournal, addJournal, updateJournal, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<Category>('Kuliner');
  const [story, setStory] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Dual Rating
  const [ratingJanuar, setRatingJanuar] = useState(5.0);
  const [verdictJanuar, setVerdictJanuar] = useState('');
  const [ratingAdel, setRatingAdel] = useState(5.0);
  const [verdictAdel, setVerdictAdel] = useState('');
  const [costEstimate, setCostEstimate] = useState('');

  useEffect(() => {
    if (editingJournal) {
      setTitle(editingJournal.title || '');
      setPlaceName(editingJournal.placeName || '');
      setLocation(editingJournal.location || '');
      setDate(editingJournal.date || new Date().toISOString().slice(0, 10));
      setCategory(editingJournal.category || 'Kuliner');
      setStory(editingJournal.story || '');
      setPhotos(editingJournal.photos ? [...editingJournal.photos] : []);
      setRatingJanuar(editingJournal.ratingJanuar ?? 5);
      setVerdictJanuar(editingJournal.verdictJanuar || '');
      setRatingAdel(editingJournal.ratingAdel ?? 5);
      setVerdictAdel(editingJournal.verdictAdel || '');
      setCostEstimate(editingJournal.costEstimate || '');
    } else {
      setTitle('');
      setPlaceName('');
      setLocation('');
      setDate(new Date().toISOString().slice(0, 10));
      setCategory('Kuliner');
      setStory('');
      setPhotos([]);
      setRatingJanuar(5.0);
      setVerdictJanuar('');
      setRatingAdel(5.0);
      setVerdictAdel('');
      setCostEstimate('');
    }
  }, [editingJournal, isJournalModalOpen]);

  if (!isJournalModalOpen) return null;

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    if (photos.length >= 3) {
      alert('Maksimal 3 foto per jurnal.');
      return;
    }
    setPhotos([...photos, newPhotoUrl.trim()]);
    setNewPhotoUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photos.length >= 3) {
      alert('Maksimal 3 foto per jurnal.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotos([...photos, reader.result]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !placeName.trim()) {
      alert('Mohon isi judul dan nama tempat.');
      return;
    }

    const payload = {
      title: title.trim(),
      placeName: placeName.trim(),
      location: location.trim(),
      date,
      category,
      story: story.trim(),
      photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
      ratingJanuar: Number(ratingJanuar),
      verdictJanuar: verdictJanuar.trim(),
      ratingAdel: Number(ratingAdel),
      verdictAdel: verdictAdel.trim(),
      costEstimate: costEstimate.trim(),
    };

    if (editingJournal && editingJournal.id) {
      updateJournal(editingJournal.id, payload);
    } else {
      addJournal(payload);
    }

    closeJournalModal();
  };

  const categories: Category[] = ['Kuliner', 'Trip', 'Aktivitas', 'Lainnya'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div
        className="bg-cream-50 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-float border border-cream-200 my-8 text-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cream-200">
          <div>
            <h3 className="font-serif font-bold text-xl text-neutral-900">
              {editingJournal && editingJournal.id ? 'Edit Kenangan Jurnal' : 'Tulis Jurnal Baru'}
            </h3>
            <p className="text-xs text-neutral-500">
              Abadikan momen berdua, cerita perjalanan, dan penilaian masing-masing
            </p>
          </div>
          <button
            onClick={closeJournalModal}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Persona Banner */}
        <div className="mt-3 p-2.5 rounded-2xl bg-cream-100 border border-cream-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${currentUser === 'Januar' ? 'bg-blue-600' : 'bg-pink-500'}`} />
            <span className="text-neutral-700 font-medium">
              Menulis sebagai: <strong className={currentUser === 'Januar' ? 'text-blue-700' : 'text-pink-600'}>{currentUser || 'Tamu'}</strong>
            </span>
          </div>
          <span className="text-[10px] font-semibold text-neutral-500">
            {currentUser === 'Januar' ? '💙 Sudut Pandang Cowok' : '💗 Sudut Pandang Cewek'}
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          {/* Judul & Nama Tempat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Judul Kenangan <span className="text-rosewood-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Kencan Croissant di Senopati"
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Nama Tempat / Lokasi <span className="text-rosewood-500">*</span>
              </label>
              <input
                type="text"
                required
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="Contoh: Bakehouse Panglima Polim"
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500"
              />
            </div>
          </div>

          {/* Kategori, Tanggal, Lokasi detail */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Tanggal Kunjungan</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Total Biaya / Budget</label>
              <input
                type="text"
                value={costEstimate}
                onChange={(e) => setCostEstimate(e.target.value)}
                placeholder="Contoh: Rp 120.000"
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500"
              />
            </div>
          </div>

          {/* Detail Alamat / Kota */}
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Kota / Alamat Singkat</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Contoh: Jakarta Selatan / Bandung"
              className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500"
            />
          </div>

          {/* Cerita Momen */}
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Cerita Singkat Momen</label>
            <textarea
              rows={3}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Ceritakan kejadian lucu, suasana tempat, obrolan seru, atau kesan mendalam kalian berdua..."
              className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500 leading-relaxed font-sans"
            />
          </div>

          {/* Foto (1 - 3 foto) */}
          <div className="bg-cream-100/60 p-3.5 rounded-2xl border border-cream-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-neutral-700">Foto Dokumentasi (1–3 Foto)</span>
              <span className="text-[11px] text-neutral-500">{photos.length}/3 Foto</span>
            </div>

            {/* Photo preview list */}
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {photos.map((src, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden group border border-cream-300">
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(i)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {photos.length < 3 && (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="Tempel URL gambar (Unsplash / Link foto)..."
                  className="flex-1 px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-3 py-2 rounded-xl bg-neutral-800 text-white font-medium hover:bg-neutral-900 transition-colors shrink-0"
                >
                  Tambah URL
                </button>
                <label className="px-3 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-neutral-700 font-medium cursor-pointer transition-colors shrink-0 text-center flex items-center justify-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            )}
          </div>

          {/* DUAL RATING SECTION */}
          <div className="border-t border-cream-200 pt-4">
            <h4 className="font-bold text-sm text-neutral-800 mb-3 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Dual Rating (Skor &amp; Verdict Versi Berdua)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Rating Januar */}
              <div
                className={`p-3.5 rounded-2xl border space-y-2 transition-all ${
                  currentUser === 'Januar'
                    ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/30 shadow-xs'
                    : 'bg-blue-50/40 border-blue-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                      J
                    </span>
                    Rating Januar
                    {currentUser === 'Januar' && (
                      <span className="text-[9px] uppercase font-black bg-blue-600 text-white px-2 py-0.2 rounded-full">
                        Aktif
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={ratingJanuar}
                      onChange={(e) => setRatingJanuar(parseFloat(e.target.value) || 1)}
                      className="w-14 px-2 py-1 rounded-lg border border-blue-200 bg-white font-bold text-blue-700 text-center"
                    />
                    <span className="text-neutral-400">/ 5</span>
                  </div>
                </div>
                <input
                  type="text"
                  value={verdictJanuar}
                  onChange={(e) => setVerdictJanuar(e.target.value)}
                  placeholder="Satu kalimat verdict versi Januar..."
                  className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs placeholder:text-neutral-400"
                />
              </div>

              {/* Rating Adel */}
              <div
                className={`p-3.5 rounded-2xl border space-y-2 transition-all ${
                  currentUser === 'Adel'
                    ? 'bg-pink-50 border-pink-400 ring-2 ring-pink-500/30 shadow-xs'
                    : 'bg-pink-50/40 border-pink-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pink-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold">
                      A
                    </span>
                    Rating Adel
                    {currentUser === 'Adel' && (
                      <span className="text-[9px] uppercase font-black bg-pink-500 text-white px-2 py-0.2 rounded-full">
                        Aktif
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={ratingAdel}
                      onChange={(e) => setRatingAdel(parseFloat(e.target.value) || 1)}
                      className="w-14 px-2 py-1 rounded-lg border border-pink-200 bg-white font-bold text-pink-600 text-center"
                    />
                    <span className="text-neutral-400">/ 5</span>
                  </div>
                </div>
                <input
                  type="text"
                  value={verdictAdel}
                  onChange={(e) => setVerdictAdel(e.target.value)}
                  placeholder="Satu kalimat verdict versi Adel..."
                  className="w-full px-3 py-2 rounded-xl border border-pink-200 bg-white text-xs placeholder:text-neutral-400"
                />
              </div>
            </div>
          </div>

          {/* Submit & Cancel */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-cream-200">
            <button
              type="button"
              onClick={closeJournalModal}
              className="px-5 py-2.5 rounded-full border border-cream-300 text-neutral-600 font-bold text-xs uppercase tracking-wider hover:bg-cream-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
            >
              Simpan Kenangan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
