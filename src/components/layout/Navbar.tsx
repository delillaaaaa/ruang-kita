import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, BookOpen, CheckSquare, LayoutDashboard, Plus, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, setCurrentUser, openJournalModal, openBucketModal, openRandomizer } = useApp();

  const navLinks = [
    { to: '/', label: 'Beranda', icon: Heart },
    { to: '/jurnal', label: 'Jurnal & Ulasan', icon: BookOpen },
    { to: '/bucket-list', label: 'Bucket List', icon: CheckSquare },
    { to: '/dashboard', label: 'Kelola Data', icon: LayoutDashboard },
  ];

  const switchUser = () => {
    if (currentUser === 'Januar') {
      setCurrentUser('Adel');
    } else {
      setCurrentUser('Januar');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-cream-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rosewood-500 to-terracotta-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg sm:text-xl text-neutral-800 tracking-tight">
                Ruang Kita
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-terracotta-500/10 text-terracotta-600">
                J & A
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-medium hidden sm:block">
              Januar & Adel's Shared Memories
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-rosewood-50 text-rosewood-600 font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-cream-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-rosewood-500' : 'text-neutral-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action buttons & Persona switcher */}
        <div className="flex items-center gap-2">
          {/* Tombol Terserah shortcut */}
          <button
            onClick={openRandomizer}
            title="Bingung mau ke mana? Tombol Terserah!"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60 hover:bg-amber-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Terserah</span>
          </button>

          {/* Quick Add Dropdown or Buttons */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => openJournalModal()}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-rosewood-500 hover:bg-rosewood-600 text-white shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tulis Jurnal</span>
            </button>
            <button
              onClick={() => openBucketModal()}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-cream-200 hover:bg-cream-300 text-neutral-700 transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Bucket List</span>
            </button>
          </div>

          {/* Persona Switcher Pill */}
          <button
            onClick={switchUser}
            title="Klik untuk beralih mode Januar / Adel"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              currentUser === 'Januar'
                ? 'bg-januar-light text-januar-text border-blue-200 hover:bg-blue-100'
                : 'bg-adel-light text-adel-text border-pink-200 hover:bg-pink-100'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                currentUser === 'Januar' ? 'bg-januar' : 'bg-adel'
              }`}
            />
            <span>{currentUser || 'Tamu'}</span>
            <span className="text-[10px] text-neutral-400">⇄</span>
          </button>
        </div>
      </div>
    </header>
  );
};
