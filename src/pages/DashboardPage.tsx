import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, CheckSquare, Plus, Edit3, Trash2, Download, Upload, RotateCcw, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
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
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cream-200 text-neutral-700">
              Panel Kontrol Pribadi
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-bold text-neutral-600 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-sage-600" />
              Login: <strong>{currentUser || 'Tamu'}</strong>
            </span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-neutral-900 tracking-tight">
            Kelola Konten &amp; Aktivitas
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Ringkasan data, kelola semua entri jurnal, bucket list, dan cadangan data
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-3.5 py-2 rounded-xl bg-white border border-cream-200 text-neutral-700 hover:bg-cream-100 text-xs font-semibold transition-colors shadow-xs"
          >
            Ganti Profil / Passcode
          </Link>
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-cream-200/80 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            Total Jurnal
          </div>
          <div className="text-2xl font-bold font-serif text-neutral-900">{journals.length}</div>
          <div className="text-[11px] text-neutral-400 mt-1">Kenangan tercatat</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-200/80 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            Bucket Selesai
          </div>
          <div className="text-2xl font-bold font-serif text-sage-600">
            {stats.bucketListAchieved} / {stats.totalBucketList}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            {stats.totalBucketList > 0
              ? `${Math.round((stats.bucketListAchieved / stats.totalBucketList) * 100)}% tercapai`
              : '0%'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-200/80 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            Rata-rata Januar
          </div>
          <div className="text-2xl font-bold font-serif text-blue-600">
            ★ {stats.averageRatingJanuar}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Skor kenangan</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-200/80 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            Rata-rata Adel
          </div>
          <div className="text-2xl font-bold font-serif text-pink-500">
            ★ {stats.averageRatingAdel}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Skor kenangan</div>
        </div>
      </div>

      {/* CONTENT MANAGEMENT TABS */}
      <div className="bg-white rounded-3xl border border-cream-200/80 shadow-soft overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center justify-between border-b border-cream-200 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('jurnal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'jurnal'
                  ? 'bg-rosewood-500 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-cream-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Daftar Jurnal ({journals.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bucket')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'bucket'
                  ? 'bg-rosewood-500 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-cream-100'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Daftar Bucket List ({bucketList.length})</span>
            </button>
          </div>

          <div>
            {activeTab === 'jurnal' ? (
              <button
                onClick={() => openJournalModal()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rosewood-50 text-rosewood-700 hover:bg-rosewood-100 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Jurnal Baru</span>
              </button>
            ) : (
              <button
                onClick={() => openBucketModal()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Bucket List Baru</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content: Jurnal Table */}
        {activeTab === 'jurnal' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-50 border-b border-cream-200 text-neutral-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Tempat / Judul</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4 text-center">Skor Berdua</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {journals.map((entry) => (
                  <tr key={entry.id} className="hover:bg-cream-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-neutral-900 font-serif text-sm">
                        {entry.title}
                      </div>
                      <div className="text-neutral-500">{entry.placeName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cream-200 text-neutral-700">
                        {entry.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-500 whitespace-nowrap">
                      {entry.date}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-blue-600 font-bold">J: {entry.ratingJanuar.toFixed(1)}</span>
                        <span className="text-neutral-300">|</span>
                        <span className="text-pink-600 font-bold">A: {entry.ratingAdel.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                      <Link
                        to={`/jurnal/${entry.id}`}
                        className="px-2.5 py-1 rounded-lg text-neutral-600 hover:bg-cream-200 font-semibold"
                      >
                        Lihat
                      </Link>
                      <button
                        onClick={() => openJournalModal(entry)}
                        className="px-2.5 py-1 rounded-lg text-rosewood-600 hover:bg-rosewood-50 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus "${entry.title}"?`)) {
                            deleteJournal(entry.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-50 font-semibold"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content: Bucket List Table */}
        {activeTab === 'bucket' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-50 border-b border-cream-200 text-neutral-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Rencana</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Estimasi Budget</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {bucketList.map((item) => (
                  <tr key={item.id} className="hover:bg-cream-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className={`font-bold font-serif text-sm ${item.status === 'done' ? 'line-through text-neutral-400' : 'text-neutral-900'}`}>
                        {item.title}
                      </div>
                      {item.placeName && (
                        <div className="text-neutral-500 text-[11px]">{item.placeName}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cream-200 text-neutral-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleBucketStatus(item.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                          item.status === 'done'
                            ? 'bg-sage-100 text-sage-700 hover:bg-sage-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {item.status === 'done' ? '✓ Sudah Tercapai' : '○ Wishlist'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      {item.budgetEstimate || '—'}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => openBucketModal(item)}
                        className="px-2.5 py-1 rounded-lg text-neutral-600 hover:bg-cream-200 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus "${item.title}"?`)) {
                            deleteBucketItem(item.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-50 font-semibold"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DATA BACKUP & RESTORE SECTION */}
      <div className="bg-cream-100/70 rounded-3xl p-6 border border-cream-200 space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-neutral-900">
            Cadangan &amp; Pemulihan Data (Backup &amp; Restore)
          </h3>
          <p className="text-xs text-neutral-500">
            Semua catatan tersimpan aman di browser kalian. Unduh file cadangan untuk memindahkannya ke HP lain.
          </p>
        </div>

        {importStatus && (
          <div className="p-3 bg-green-100 text-green-800 rounded-xl text-xs font-semibold">
            {importStatus}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportDataJson}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-cream-300 hover:bg-cream-50 text-neutral-800 text-xs font-bold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-neutral-600" />
            <span>Ekspor Data (Unduh JSON)</span>
          </button>

          <label className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-cream-300 hover:bg-cream-50 text-neutral-800 text-xs font-bold shadow-xs transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-neutral-600" />
            <span>Impor Data Cadangan</span>
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset ke Data Demo Awal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
