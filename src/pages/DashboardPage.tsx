import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, CheckSquare, Plus, Edit3, Trash2, Download, Upload, RotateCcw, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    journals,
    deleteJournal,
    openJournalModal,
    bucketList,
    deleteBucketItem,
    toggleBucketStatus,
    openBucketModal,
    stats,
    exportDataJson,
    importDataJson,
    resetToDefaultData,
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'jurnal' | 'bucket'>('jurnal');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJson(content);
      if (success) {
        setImportStatus('Data berhasil dipulihkan!');
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        alert('Format file JSON tidak valid.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Kembalikan semua data ke data bawaan awal? Data baru akan digantikan.')) {
      resetToDefaultData();
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-slide-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full bg-brand-100 text-brand-800">
              Panel Kontrol Pribadi
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-bold text-neutral-600 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-sage-600" />
              Login: <strong className="text-brand-800">{currentUser || 'Tamu'}</strong>
            </span>
          </div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-brand-800 tracking-tight leading-tight">
            Kelola Konten &amp; Aktivitas
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Ringkasan data, kelola semua entri jurnal, bucket list, dan cadangan data
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-white border border-cream-200 text-neutral-700 hover:bg-cream-100 text-xs font-bold transition-colors shadow-xs uppercase tracking-wider"
          >
            Ganti Profil / Passcode
          </Link>
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-3xl border border-cream-200/90 shadow-soft">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
            Total Jurnal
          </div>
          <div className="text-2xl font-black text-neutral-900">{journals.length}</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Kenangan tercatat</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-cream-200/90 shadow-soft">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
            Bucket Selesai
          </div>
          <div className="text-2xl font-black text-sage-600">
            {stats.bucketListAchieved} / {stats.totalBucketList}
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">
            {stats.totalBucketList > 0
              ? `${Math.round((stats.bucketListAchieved / stats.totalBucketList) * 100)}% tercapai`
              : '0%'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-cream-200/90 shadow-soft">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
            Rata-rata Januar
          </div>
          <div className="text-2xl font-black text-blue-600">
            ★ {stats.averageRatingJanuar}
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Skor kenangan</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-cream-200/90 shadow-soft">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
            Rata-rata Adel
          </div>
          <div className="text-2xl font-black text-pink-500">
            ★ {stats.averageRatingAdel}
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Skor kenangan</div>
        </div>
      </div>

      {/* CONTENT MANAGEMENT TABS */}
      <div className="bg-white rounded-3xl border border-cream-200/90 shadow-soft overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center justify-between border-b border-cream-200 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('jurnal')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'jurnal'
                  ? 'bg-brand-800 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-cream-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Daftar Jurnal ({journals.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bucket')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'bucket'
                  ? 'bg-brand-800 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-cream-100'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Bucket List ({bucketList.length})</span>
            </button>
          </div>

          <div>
            {activeTab === 'jurnal' ? (
              <button
                onClick={() => openJournalModal()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-800 text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-brand-900 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Tambah Jurnal</span>
              </button>
            ) : (
              <button
                onClick={() => openBucketModal()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-800 text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-brand-900 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Tambah Rencana</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Table Content */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          {activeTab === 'jurnal' ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cream-200 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  <th className="pb-3 pl-2">Foto &amp; Judul</th>
                  <th className="pb-3">Tempat</th>
                  <th className="pb-3">Kategori</th>
                  <th className="pb-3">Skor J / A</th>
                  <th className="pb-3 text-right pr-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {journals.map((j) => (
                  <tr key={j.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={j.photos[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=100&q=80'}
                          alt={j.title}
                          className="w-10 h-10 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <Link to={`/jurnal/${j.id}`} className="font-bold text-neutral-900 hover:text-brand-800">
                            {j.title}
                          </Link>
                          <div className="text-[10px] text-neutral-400">{j.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-neutral-600 font-medium">{j.placeName}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-cream-200 text-neutral-700">
                        {j.category}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">
                      <span className="text-blue-600">{j.ratingJanuar}</span>
                      <span className="text-neutral-400 mx-1">/</span>
                      <span className="text-pink-500">{j.ratingAdel}</span>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openJournalModal(j)}
                          className="p-1.5 rounded-full hover:bg-cream-100 text-neutral-600 hover:text-brand-800"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus kenangan "${j.title}"?`)) {
                              deleteJournal(j.id);
                            }
                          }}
                          className="p-1.5 rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-600"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cream-200 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  <th className="pb-3 pl-2">Status</th>
                  <th className="pb-3">Judul Rencana</th>
                  <th className="pb-3">Kategori</th>
                  <th className="pb-3">Estimasi Biaya</th>
                  <th className="pb-3 text-right pr-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {bucketList.map((item) => (
                  <tr key={item.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="py-3 pl-2">
                      <button
                        onClick={() => toggleBucketStatus(item.id)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          item.status === 'done'
                            ? 'bg-sage-100 text-sage-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'done' ? '✓ Selesai' : 'Wishlist'}
                      </button>
                    </td>
                    <td className="py-3 font-bold text-neutral-900">{item.title}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-cream-200 text-neutral-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-600">{item.budgetEstimate || '-'}</td>
                    <td className="py-3 text-right pr-2">
                      <button
                        onClick={() => {
                          if (confirm(`Hapus rencana "${item.title}"?`)) {
                            deleteBucketItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-600"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* BACKUP & RESTORE / DATA CONTROL BOX */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200/90 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-800" />
          <span>Cadangan Data &amp; Pemulihan</span>
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed">
          Semua kenangan dan daftar impian tersimpan di peramban ini. Unduh file JSON cadangan agar kenangan tetap aman, atau pulihkan data di HP lain.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportDataJson}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cream-100 hover:bg-brand-50 text-brand-800 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor JSON (Cadangkan)</span>
          </button>

          <label className="flex items-center gap-2 px-4 py-2 rounded-full bg-cream-100 hover:bg-brand-50 text-brand-800 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Impor JSON (Pulihkan)</span>
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider transition-colors ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset ke Contoh Awal</span>
          </button>
        </div>

        {importStatus && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-2xl animate-fade-in font-semibold">
            ✓ {importStatus}
          </div>
        )}
      </div>
    </div>
  );
};
