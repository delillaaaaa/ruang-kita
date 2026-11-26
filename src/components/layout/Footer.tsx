import React, { useState } from 'react';
import { Heart, Sparkles, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [wishlistIdea, setWishlistIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (wishlistIdea.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setWishlistIdea('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <footer className="border-t border-cream-200/90 bg-[#FAF4ED] pt-12 pb-24 md:pb-12 px-4 sm:px-8 lg:px-12 text-neutral-600 mt-20 animate-slide-right delay-200">
      <div className="w-full max-w-[1536px] mx-auto space-y-10">
        {/* Main Footer Row (Dakingo style: Brand, Columns, Newsletter/Quick Note Input) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-4 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-white shadow-xs">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-serif font-black text-2xl text-brand-800 tracking-tight">
                Ruang Kita
              </span>
            </Link>

            <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-sm">
              Dokumentasi digital perjalanan, ulasan kuliner, tempat singgah, dan impian manis bersama antara Januar &amp; Adel.
            </p>

            <div className="pt-2 text-xs font-semibold text-neutral-500 flex items-center gap-1.5">
              <span>Made with love for</span>
              <span className="text-blue-700 font-bold">Januar</span>
              <span>&amp;</span>
              <span className="text-pink-600 font-bold">Adel</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-800">
              KNOW US
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li><Link to="/" className="hover:text-brand-800 transition-colors">Beranda</Link></li>
              <li><Link to="/jurnal" className="hover:text-brand-800 transition-colors">Jurnal &amp; Kenangan</Link></li>
              <li><Link to="/bucket-list" className="hover:text-brand-800 transition-colors">Bucket List</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-800 transition-colors">Kelola Data</Link></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-800">
              MORE INFO
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li><Link to="/jurnal?category=Kuliner" className="hover:text-brand-800 transition-colors">Classic (Kuliner)</Link></li>
              <li><Link to="/jurnal?category=Trip" className="hover:text-brand-800 transition-colors">Gourmet (Trip)</Link></li>
              <li><Link to="/jurnal?category=Aktivitas" className="hover:text-brand-800 transition-colors">Desserts (Aktivitas)</Link></li>
              <li><Link to="/login" className="hover:text-brand-800 transition-colors">Passcode &amp; Profil</Link></li>
            </ul>
          </div>

          {/* Col 4: Quick Subscribe / Quick Idea Box (Dakingo 'Enter Email Address' -> 'SUBSCRIBE') */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-800">
              KIRIM IDE KENCAN / CATATAN CEPAT
            </h4>
            <p className="text-xs text-neutral-500">
              Punya ide tempat makan atau destinasi liburan baru?
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={wishlistIdea}
                  onChange={(e) => setWishlistIdea(e.target.value)}
                  placeholder="Ketik ide kafe atau destinasi..."
                  className="flex-1 bg-white text-xs rounded-full px-4 py-2 border border-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 text-neutral-800 placeholder-neutral-400 shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors shrink-0"
                >
                  SUBSCRIBE
                </button>
              </div>

              {submitted && (
                <div className="text-[11px] text-brand-700 font-semibold animate-fade-in">
                  ✓ Ide dicatat! Jangan lupa masukkan ke Bucket List ya.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-cream-200 text-center text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Ruang Kita. Inspired by Dakingo Minimalist Design.</span>
          <span>Ruang Dokumentasi Eksklusif Januar &amp; Adel</span>
        </div>
      </div>
    </footer>
  );
};
