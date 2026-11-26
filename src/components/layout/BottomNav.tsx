import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, BookOpen, CheckSquare, LayoutDashboard, Plus, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { openJournalModal, openBucketModal, openRandomizer } = useApp();
  const [isFabOpen, setIsFabOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Beranda', icon: Heart },
    { to: '/jurnal', label: 'Jurnal', icon: BookOpen },
    // Center is FAB
    { to: '/bucket-list', label: 'Bucket', icon: CheckSquare },
    { to: '/dashboard', label: 'Kelola', icon: LayoutDashboard },
  ];

  return (
    <>
      {/* Floating Action Menu Popover when FAB is opened */}
      {isFabOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end p-4 pb-24 animate-fade-in"
          onClick={() => setIsFabOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-5 shadow-float border border-cream-200 max-w-sm mx-auto w-full space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-cream-200">
              <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">
                Aksi Cepat Ruang Kita
              </span>
              <button
                onClick={() => setIsFabOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:bg-cream-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setIsFabOpen(false);
                openJournalModal();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-800 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-800 text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Tulis Jurnal &amp; Review</div>
                <div className="text-[11px] text-neutral-500">Catat kenangan kuliner, foto &amp; skor</div>
              </div>
            </button>

            <button
              onClick={() => {
                setIsFabOpen(false);
                openBucketModal();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Tambah Bucket List</div>
                <div className="text-[11px] text-neutral-500">Simpan rencana impian tempat &amp; trip</div>
              </div>
            </button>

            <button
              onClick={() => {
                setIsFabOpen(false);
                openRandomizer();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-900 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-700 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Tombol "Terserah"</div>
                <div className="text-[11px] text-neutral-500">Pilihkan tujuan kencan secara acak!</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-cream-200/90 px-3 py-1.5 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around relative">
          {/* Left items */}
          <NavLink
            to={navItems[0].to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 text-[11px] font-medium transition-colors ${
                isActive ? 'text-brand-800 font-bold' : 'text-neutral-400 hover:text-neutral-700'
              }`
            }
          >
            <Heart className="w-5 h-5 mb-0.5" />
            <span>{navItems[0].label}</span>
          </NavLink>

          <NavLink
            to={navItems[1].to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 text-[11px] font-medium transition-colors ${
                isActive ? 'text-brand-800 font-bold' : 'text-neutral-400 hover:text-neutral-700'
              }`
            }
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span>{navItems[1].label}</span>
          </NavLink>

          {/* Center Floating Action Button (FAB) */}
          <div className="relative -top-5 flex flex-col items-center">
            <button
              onClick={() => setIsFabOpen(!isFabOpen)}
              className={`w-13 h-13 rounded-full bg-brand-800 text-white shadow-float flex items-center justify-center transition-transform active:scale-95 ${
                isFabOpen ? 'rotate-45' : ''
              }`}
              aria-label="Aksi Cepat"
            >
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </button>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 mt-1">Tambah</span>
          </div>

          {/* Right items */}
          <NavLink
            to={navItems[2].to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 text-[11px] font-medium transition-colors ${
                isActive ? 'text-brand-800 font-bold' : 'text-neutral-400 hover:text-neutral-700'
              }`
            }
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span>{navItems[2].label}</span>
          </NavLink>

          <NavLink
            to={navItems[3].to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 text-[11px] font-medium transition-colors ${
                isActive ? 'text-brand-800 font-bold' : 'text-neutral-400 hover:text-neutral-700'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span>{navItems[3].label}</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};
