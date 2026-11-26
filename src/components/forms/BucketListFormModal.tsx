import React, { useState, useEffect } from 'react';
import { X, CheckSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Category } from '../../types';

export const BucketListFormModal: React.FC = () => {
  const { isBucketModalOpen, closeBucketModal, editingBucketItem, addBucketItem, updateBucketItem } = useApp();

  const [title, setTitle] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [category, setCategory] = useState<Category>('Kuliner');
  const [budgetEstimate, setBudgetEstimate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editingBucketItem) {
      setTitle(editingBucketItem.title || '');
      setPlaceName(editingBucketItem.placeName || '');
      setCategory(editingBucketItem.category || 'Kuliner');
      setBudgetEstimate(editingBucketItem.budgetEstimate || '');
      setNotes(editingBucketItem.notes || '');
    } else {
      setTitle('');
      setPlaceName('');
      setCategory('Kuliner');
      setBudgetEstimate('');
      setNotes('');
    }
  }, [editingBucketItem, isBucketModalOpen]);

  if (!isBucketModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Mohon isi judul rencana.');
      return;
    }

    const payload = {
      title: title.trim(),
      placeName: placeName.trim() || undefined,
      category,
      budgetEstimate: budgetEstimate.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    if (editingBucketItem && editingBucketItem.id) {
      updateBucketItem(editingBucketItem.id, payload);
    } else {
      addBucketItem(payload);
    }

    closeBucketModal();
  };

  const categories: Category[] = ['Kuliner', 'Trip', 'Aktivitas', 'Lainnya'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-cream-50 rounded-3xl max-w-md w-full p-6 shadow-float border border-cream-200 text-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-neutral-900">
                {editingBucketItem ? 'Edit Rencana' : 'Tambah Bucket List'}
              </h3>
              <p className="text-xs text-neutral-500">
                Daftar impian &amp; tempat yang ingin dikunjungi bersama
              </p>
            </div>
          </div>
          <button
            onClick={closeBucketModal}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Rencana / Aktivitas <span className="text-rosewood-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Belajar Surfing Bareng di Bali"
              className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Nama Tempat / Lokasi Spesifik
            </label>
            <input
              type="text"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              placeholder="Contoh: Pantai Batu Bolong, Canggu"
              className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Estimasi Budget</label>
              <input
                type="text"
                value={budgetEstimate}
                onChange={(e) => setBudgetEstimate(e.target.value)}
                placeholder="Contoh: Rp 500.000"
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Catatan Tambahan</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan kecil: outfit yang cocok, tips reservasi, atau alasan pengen ke sini..."
              className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 leading-relaxed font-sans"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-cream-200">
            <button
              type="button"
              onClick={closeBucketModal}
              className="px-5 py-2 rounded-full border border-cream-300 text-neutral-600 font-bold text-xs uppercase tracking-wider hover:bg-cream-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
            >
              Simpan Rencana
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
