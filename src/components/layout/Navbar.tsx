import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Search, Sparkles, Plus, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, openJournalModal, openRandomizer } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/jurnal', label: 'Jurnal & Kenangan' },
    { to: '/bucket-list', label: 'Bucket List' },
    { to: '/dashboard', label: 'Kelola Data' },
  ];

  const handleSelectUser = (user: 'Januar' | 'Adel') => {
    setCurrentUser(user);
    const msg = user === 'Januar' 
      ? 'Mode Januar Aktif 💙 (Skor & Catatan Januar diutamakan)' 
      : 'Mode Adel Aktif 💗 (Skor & Catatan Adel diutamakan)';
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/jurnal?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      {/* Floating Animated Toast Feedback when Switching Persona */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-none">
          <div
            className={`px-5 py-2.5 rounded-full shadow-float text-xs font-bold text-white flex items-center gap-2 border transition-all ${
              currentUser === 'Januar'
                ? 'bg-blue-600 border-blue-400'
                : 'bg-pink-500 border-pink-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full glass-nav border-b border-cream-200/90 transition-all shadow-xs animate-slide-right">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Top Header Row (Logo, Pill Search, Dual Pink-Biru Toggle, CTA) */}
          <div className="h-16 flex items-center justify-between gap-3 sm:gap-6">
            {/* Brand / Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white" />
              </div>
              <div>
                <span className="font-serif font-black text-xl sm:text-2xl text-brand-800 tracking-tight block leading-none">
                  Ruang Kita
                </span>
                <span className="text-[10px] text-brand-700/70 font-semibold tracking-wider uppercase block mt-0.5">
                  Januar &amp; Adel
                </span>
              </div>
            </Link>

            {/* Center Pill Search Bar (Dakingo reference) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center flex-1 max-w-sm mx-auto relative"
            >
              <div className="w-full relative flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari kenangan, kuliner, kafe, impian..."
                  className="w-full bg-white text-neutral-800 placeholder-neutral-400 text-xs rounded-full pl-4 pr-10 py-2 border border-cream-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 w-7 h-7 rounded-full bg-brand-800 hover:bg-brand-900 text-white flex items-center justify-center transition-colors shadow-xs active:scale-95"
                  title="Cari"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Right Action Icons: Dual Pink-Biru Toggle Switch & CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* DUAL PINK-BIRU SEGMENTED TOGGLE SWITCH */}
              <div
                className="flex items-center p-1 rounded-full bg-white border border-cream-200 shadow-xs"
                title="Pilih Sudut Pandang Pengguna (Januar / Adel)"
              >
                {/* Januar Pill (Blue) */}
                <button
                  type="button"
                  onClick={() => handleSelectUser('Januar')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all active:scale-95 ${
                    currentUser === 'Januar'
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                      : 'text-blue-700/70 hover:text-blue-900 hover:bg-blue-50/70'
                  }`}
                  aria-pressed={currentUser === 'Januar'}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      currentUser === 'Januar' ? 'bg-white' : 'bg-blue-600'
                    }`}
                  />
                  <span>Januar</span>
                </button>

                {/* Adel Pill (Pink) */}
                <button
                  type="button"
                  onClick={() => handleSelectUser('Adel')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all active:scale-95 ${
                    currentUser === 'Adel'
                      ? 'bg-pink-500 text-white shadow-sm ring-2 ring-pink-300'
                      : 'text-pink-700/70 hover:text-pink-900 hover:bg-pink-50/70'
                  }`}
                  aria-pressed={currentUser === 'Adel'}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      currentUser === 'Adel' ? 'bg-white' : 'bg-pink-500'
                    }`}
                  />
                  <span>Adel</span>
                </button>
              </div>

              {/* Login / Passcode shortcut */}
              <Link
                to="/login"
                title="Pengaturan & Passcode"
                className="p-2 rounded-full text-brand-800 hover:bg-cream-100 transition-colors hidden sm:block"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Prominent Pill CTA Button */}
              <button
                onClick={() => openJournalModal()}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold tracking-wider uppercase shadow-sm transition-all active:scale-95 hover:shadow-md"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">TULIS CERITA</span>
                <span className="sm:hidden">TULIS</span>
              </button>
            </div>
          </div>

          {/* Sub-navigation Links Bar */}
          <div className="flex items-center justify-between border-t border-cream-200/60 py-2 overflow-x-auto no-scrollbar text-xs">
            <div className="flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-brand-100/70 text-brand-800 font-bold'
                        : 'text-neutral-600 hover:text-brand-800 hover:bg-cream-100/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Quick "Terserah" Pill */}
            <button
              onClick={openRandomizer}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 hover:bg-brand-100 text-brand-800 font-semibold text-xs border border-cream-200/80 transition-colors whitespace-nowrap ml-2 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Tombol "Terserah"</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
