import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cream-200 bg-cream-100/60 py-8 px-4 mt-16 pb-24 md:pb-8 text-neutral-600">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-rosewood-500 text-white flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 fill-white" />
          </div>
          <div>
            <span className="font-serif font-bold text-neutral-800 text-sm">Ruang Kita</span>
            <span className="text-neutral-400 ml-1.5">— Dokumentasi Momen Berdua</span>
          </div>
        </div>

        <p className="text-neutral-500 flex items-center justify-center gap-1">
          Dibuat khusus untuk <strong className="text-januar-text">Januar</strong> &amp; <strong className="text-adel-text">Adel</strong>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 ml-0.5" />
        </p>

        <div className="flex items-center gap-3 text-neutral-400">
          <Link to="/" className="hover:text-neutral-800">Beranda</Link>
          <span>•</span>
          <Link to="/jurnal" className="hover:text-neutral-800">Jurnal</Link>
          <span>•</span>
          <Link to="/bucket-list" className="hover:text-neutral-800">Bucket List</Link>
          <span>•</span>
          <Link to="/dashboard" className="hover:text-neutral-800">Kelola Data</Link>
        </div>
      </div>
    </footer>
  );
};
