import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  ChevronRight, 
  Utensils, 
  Compass, 
  Palette, 
  CheckSquare, 
  ArrowRight,
  Ticket,
  Star,
  Award,
  Clock,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { currentUser, journals, bucketList, stats, openJournalModal, openBucketModal, openRandomizer, toggleBucketStatus } = useApp();

  const recentJournals = journals.slice(0, 4);
  const activeBucketItems = bucketList.filter((b) => b.status === 'wishlist').slice(0, 3);

  // Bento collage memories images
  const bentoMemories = [
    {
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      title: 'Decadent Strawberry Cake',
      subtitle: 'Celebration Date',
    },
    {
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      title: 'Romantic Dining Vibe',
      subtitle: 'Januar & Adel',
    },
    {
      img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      title: 'Kopi & Croissant Almond',
      subtitle: 'Panglima Polim',
    },
    {
      img: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      title: 'Sunrise Bromo Magic',
      subtitle: 'Bromo 7°C',
    },
    {
      img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      title: 'Ceramic Pottery Date',
      subtitle: 'Kemang Studio',
    },
    {
      img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      title: 'Artisan Latte Art',
      subtitle: 'Weekend Brunch',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 w-full">
      {/* 1. HERO SECTION (Immersive Full-Width Wine gradient, circular cake showcase, bold headline, floating previews) */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#8A1F33] via-[#741627] to-[#4D0D19] text-white p-6 sm:p-10 md:p-12 lg:p-16 shadow-dakingo animate-slide-right delay-75 w-full">
        {/* Subtle decorative circles (matching Dakingo hero background) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-black/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 border border-white/5 rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Circular Cake Frame */}
          <div className="lg:col-span-4 xl:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="w-60 h-60 sm:w-72 sm:h-72 xl:w-80 xl:h-80 rounded-full p-2.5 bg-white/15 backdrop-blur-md border-2 border-white/30 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
                  alt="Decadent Chocolate Bliss Cake"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-2 right-4 bg-white text-brand-800 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg border border-brand-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Sweetest Memory</span>
              </div>
            </div>
          </div>

          {/* Center Column: Big Bold Typography & CTA */}
          <div className="lg:col-span-5 xl:col-span-5 text-center lg:text-left space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider uppercase text-pink-100">
              <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
              <span>Dokumentasi Berdua Januar &amp; Adel</span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tight leading-none text-white drop-shadow-sm">
                Decadent <br />
                <span className="text-white">Memories</span> <br />
                <span className="text-pink-200">Bliss!</span>
              </h1>
              {/* Swirly flourish accent */}
              <div className="text-pink-200/80 font-serif italic text-xl sm:text-2xl pt-1">
                Satisfy Your Sweetest Moments
              </div>
            </div>

            {/* Pill Offer / Highlight Badge (like 'Special Offer! SAVE 20%') */}
            <div className="inline-block bg-[#A1273D] text-white px-5 py-2 rounded-full border border-white/20 shadow-xs">
              <span className="text-[10px] tracking-wider uppercase opacity-80 block font-bold">Ruang Kenangan</span>
              <span className="text-xs sm:text-sm font-extrabold tracking-wide">100% CINTA &amp; CERITA KITA</span>
            </div>

            <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 font-sans">
              Setiap sudut kafe yang kita singgahi, cita rasa manis yang kita nikmati, dan impian kecil yang kita wujudkan bersama.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => openJournalModal()}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-brand-800 hover:bg-cream-100 font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Tulis Jurnal</span>
              </button>

              <button
                onClick={openRandomizer}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#5D101C]/80 hover:bg-[#5D101C] text-white border border-white/20 font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Tombol Terserah</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Secondary Food/Place Cards (Matching Dakingo Lava cake & Brownie) */}
          <div className="lg:col-span-3 xl:col-span-3 flex lg:flex-col items-center justify-center gap-4 pt-4 lg:pt-0">
            {/* Floating Card 1 */}
            <Link
              to="/jurnal"
              className="flex items-center lg:flex-row gap-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-2.5 sm:p-3 rounded-3xl transition-all hover:scale-105 group w-full max-w-xs"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-white/50 shrink-0 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80"
                  alt="Kopi & Croissant"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-left pr-2">
                <div className="text-[10px] text-pink-200 uppercase tracking-wider font-bold">Croissant &amp; Kopi</div>
                <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">Panglima Polim</div>
                <div className="text-[11px] text-amber-300 font-bold">★ 4.9 / 5.0</div>
              </div>
            </Link>

            {/* Floating Card 2 */}
            <Link
              to="/jurnal"
              className="flex items-center lg:flex-row gap-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-2.5 sm:p-3 rounded-3xl transition-all hover:scale-105 group w-full max-w-xs"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-3xl overflow-hidden border-2 border-white/50 shrink-0 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=400&q=80"
                  alt="Bromo Sunrise"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-left pr-2">
                <div className="text-[10px] text-pink-200 uppercase tracking-wider font-bold">Sunrise Bromo</div>
                <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">Lautan Pasir</div>
                <div className="text-[11px] text-amber-300 font-bold">★ 5.0 / 5.0</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MENU / CATEGORY CARDS SECTION (Spacious and Wide) */}
      <section className="space-y-5 animate-slide-right delay-150 w-full">
        <div>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-brand-800 tracking-tight leading-tight">
            Menu
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-0.5">
            What will you wish for?
          </p>
        </div>

        {/* 4 Category squircle cards matching CLASSIC, GOURMET, DESSERTS, COOKIES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Category 1: Kuliner (Classic) */}
          <Link
            to="/jurnal?category=Kuliner"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-cream-200/90 text-center shadow-soft hover:shadow-dakingo hover:border-brand-200 transition-all flex flex-col items-center justify-center gap-3 hover:-translate-y-1.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-800 group-hover:text-white transition-all shadow-xs">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-black text-sm sm:text-base uppercase tracking-wider text-brand-800 block">
                CLASSIC
              </span>
              <span className="text-xs text-neutral-500 block mt-0.5">Kuliner &amp; Kafe</span>
            </div>
          </Link>

          {/* Category 2: Trip (Gourmet) */}
          <Link
            to="/jurnal?category=Trip"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-cream-200/90 text-center shadow-soft hover:shadow-dakingo hover:border-brand-200 transition-all flex flex-col items-center justify-center gap-3 hover:-translate-y-1.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-800 group-hover:text-white transition-all shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-black text-sm sm:text-base uppercase tracking-wider text-brand-800 block">
                GOURMET
              </span>
              <span className="text-xs text-neutral-500 block mt-0.5">Trip &amp; Liburan</span>
            </div>
          </Link>

          {/* Category 3: Aktivitas (Desserts) */}
          <Link
            to="/jurnal?category=Aktivitas"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-cream-200/90 text-center shadow-soft hover:shadow-dakingo hover:border-brand-200 transition-all flex flex-col items-center justify-center gap-3 hover:-translate-y-1.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-800 group-hover:text-white transition-all shadow-xs">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-black text-sm sm:text-base uppercase tracking-wider text-brand-800 block">
                DESSERTS
              </span>
              <span className="text-xs text-neutral-500 block mt-0.5">Date &amp; Aktivitas</span>
            </div>
          </Link>

          {/* Category 4: Bucket List (Cookies) */}
          <Link
            to="/bucket-list"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-cream-200/90 text-center shadow-soft hover:shadow-dakingo hover:border-brand-200 transition-all flex flex-col items-center justify-center gap-3 hover:-translate-y-1.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-800 group-hover:text-white transition-all shadow-xs">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-black text-sm sm:text-base uppercase tracking-wider text-brand-800 block">
                COOKIES
              </span>
              <span className="text-xs text-neutral-500 block mt-0.5">Bucket List Impian</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. BESTSELLERS SECTION (Wide Product Cards Grid & 'VIEW ALL' button) */}
      <section className="space-y-5 animate-slide-right delay-200 w-full">
        <div className="flex items-end justify-between px-1">
          <div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-brand-800 tracking-tight leading-tight">
              Bestsellers from Our Memories
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Koleksi kenangan dan kuliner terfavorit pilihan Januar &amp; Adel
            </p>
          </div>

          <Link
            to="/jurnal"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            <span>VIEW ALL</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {recentJournals.map((journal) => (
            <div
              key={journal.id}
              className="group relative bg-white rounded-3xl p-4 sm:p-5 border border-cream-200/90 shadow-soft hover:shadow-dakingo hover:-translate-y-1.5 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top badge: Heart favorite icon */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-brand-700">
                    <Heart className="w-3.5 h-3.5 fill-brand-700" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cream-100 text-neutral-600">
                    {journal.category}
                  </span>
                </div>

                {/* Circular/Rounded Image Cutout */}
                <Link to={`/jurnal/${journal.id}`} className="block relative aspect-square my-2.5 rounded-2xl overflow-hidden bg-cream-50 shadow-inner">
                  <img
                    src={journal.photos[0] || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80'}
                    alt={journal.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </Link>

                {/* Product Title */}
                <Link to={`/jurnal/${journal.id}`}>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-brand-800 transition-colors line-clamp-1 mb-0.5">
                    {journal.title}
                  </h3>
                </Link>

                <p className="text-xs text-neutral-400 line-clamp-1 mb-2.5">
                  {journal.placeName}
                </p>

                {/* Price / Cost estimate */}
                <div className="text-sm font-black text-brand-800 mb-2.5">
                  {journal.costEstimate || 'Momen Berharga'}
                </div>
              </div>

              {/* Bottom: Stars Rating + Add/Arrow Circle Button */}
              <div className="pt-2.5 border-t border-cream-100 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-neutral-800">
                      {((journal.ratingJanuar + journal.ratingAdel) / 2).toFixed(1)}
                    </span>
                    <span className="text-[10px] text-neutral-400">/5</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-medium">
                    J: {journal.ratingJanuar} • A: {journal.ratingAdel}
                  </div>
                </div>

                <Link
                  to={`/jurnal/${journal.id}`}
                  className="w-8 h-8 rounded-full bg-brand-800 hover:bg-brand-900 text-white flex items-center justify-center transition-colors shadow-xs"
                  title="Lihat Detail Kenangan"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden text-center pt-2">
          <Link
            to="/jurnal"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-brand-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            <span>VIEW ALL ({journals.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 4. 'OUR PROMISE' & BENTO COLLAGE SECTION (Expansive layout) */}
      <section className="space-y-5 animate-slide-right delay-300 w-full">
        <div>
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-brand-800 tracking-tight leading-tight">
            Our Promise
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-0.5">
            There's no secret spell — only honest memories and sweet adventures!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: Features Stats Box, Magical Ticket, Social Proof */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-4 sm:space-y-5">
            {/* Box 1: Stats summary */}
            <div className="bg-[#FAF0ED] rounded-3xl p-6 border border-brand-100 shadow-soft">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-700/80 mb-4 text-center sm:text-left">
                A glimpse into our sweet journey together
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {/* Stat 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-brand-100 flex items-center justify-center text-brand-800 mb-2 shadow-2xs">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-black text-sm sm:text-base text-brand-800 leading-tight">
                    {stats.totalPlacesVisited}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider mt-0.5">
                    TEMPAT
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-brand-100 flex items-center justify-center text-brand-800 mb-2 shadow-2xs">
                    <CheckSquare className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-black text-sm sm:text-base text-brand-800 leading-tight">
                    {stats.bucketListAchieved}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider mt-0.5">
                    TERCAPAI
                  </span>
                </div>

                {/* Stat 3 */}
                <div className={`flex flex-col items-center p-1.5 rounded-2xl transition-all ${
                  currentUser === 'Januar' ? 'bg-blue-100/60 ring-2 ring-blue-500 shadow-xs' : 'opacity-80'
                }`}>
                  <div className="w-10 h-10 rounded-2xl bg-white border border-brand-100 flex items-center justify-center text-brand-800 mb-2 shadow-2xs">
                    <Award className={`w-4.5 h-4.5 ${currentUser === 'Januar' ? 'text-blue-600' : 'text-neutral-500'}`} />
                  </div>
                  <span className={`font-black text-sm sm:text-base leading-tight ${currentUser === 'Januar' ? 'text-blue-700' : 'text-brand-800'}`}>
                    ★ {stats.averageRatingJanuar}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-neutral-600 tracking-wider mt-0.5 flex items-center gap-1">
                    <span>JANUAR</span>
                    {currentUser === 'Januar' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </span>
                </div>

                {/* Stat 4 */}
                <div className={`flex flex-col items-center p-1.5 rounded-2xl transition-all ${
                  currentUser === 'Adel' ? 'bg-pink-100/60 ring-2 ring-pink-500 shadow-xs' : 'opacity-80'
                }`}>
                  <div className="w-10 h-10 rounded-2xl bg-white border border-brand-100 flex items-center justify-center text-brand-800 mb-2 shadow-2xs">
                    <Flame className={`w-4.5 h-4.5 ${currentUser === 'Adel' ? 'text-pink-500' : 'text-neutral-500'}`} />
                  </div>
                  <span className={`font-black text-sm sm:text-base leading-tight ${currentUser === 'Adel' ? 'text-pink-700' : 'text-brand-800'}`}>
                    ★ {stats.averageRatingAdel}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-neutral-600 tracking-wider mt-0.5 flex items-center gap-1">
                    <span>ADEL</span>
                    {currentUser === 'Adel' && <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: 'THE MAGICAL TICKET' Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF5EC] to-[#FDE8DF] border border-amber-200/80 p-6 shadow-soft">
              <div className="flex items-center gap-5">
                {/* Yellow Ticket Icon / Badge */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 text-amber-950 flex flex-col items-center justify-center font-black p-2 rotate-[-6deg] shadow-md shrink-0 border border-amber-500/20">
                  <Ticket className="w-7 h-7 stroke-[2.5]" />
                  <span className="text-[9px] uppercase tracking-wider font-extrabold mt-1">TERSERAH</span>
                </div>

                {/* Ticket Text & CTA */}
                <div className="flex-1 space-y-2">
                  <h4 className="font-sans font-black text-sm uppercase tracking-wider text-brand-800">
                    THE MAGICAL TICKET
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Bingung mau makan apa atau pergi ke mana? Buka tiket ajaib untuk mengundi rencana terbaik!
                  </p>
                  <div>
                    <button
                      onClick={openRandomizer}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>UNLOCK NOW</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Social Signature / Avatars */}
            <div className="flex items-center gap-3 px-2 py-1 text-xs text-neutral-500">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  J
                </div>
                <div className="w-9 h-9 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  A
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-neutral-800">Januar &amp; Adel</span> • Follow our sweet journey!
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Bento Photo Collage (Spans 7 columns on desktop) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {bentoMemories.map((memo, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-3xl overflow-hidden aspect-square bg-cream-100 shadow-soft hover:shadow-dakingo transition-all"
                >
                  <img
                    src={memo.img}
                    alt={memo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 sm:p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] sm:text-xs text-pink-300 font-bold uppercase tracking-wider">
                      {memo.subtitle}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold line-clamp-1 leading-tight">
                      {memo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULL-WIDTH MAROON ACCENT BANNER (Exact Dakingo reference) */}
      <section className="animate-slide-right delay-400 w-full">
        <div className="rounded-full bg-brand-800 text-white text-center py-4 sm:py-5 px-6 sm:px-10 shadow-dakingo border border-brand-700/60 flex items-center justify-center gap-3">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-pink-300 text-pink-300 shrink-0" />
          <span className="font-sans font-bold text-xs sm:text-sm lg:text-base tracking-wide">
            Ruang Kita – Your Trusted Archive &amp; Sweetest Journal for Every Journey and Celebration
          </span>
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-pink-300 text-pink-300 shrink-0 hidden sm:inline" />
        </div>
      </section>

      {/* 6. BUCKET LIST SHORTCUT SECTION (Full-Width) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-cream-200/90 shadow-soft space-y-5 animate-slide-right delay-500 w-full">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Rencana Impian Berdua</span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl font-bold text-neutral-900">
              Active Bucket List
            </h2>
          </div>
          <Link
            to="/bucket-list"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-800 hover:text-brand-900 uppercase tracking-wider transition-colors"
          >
            <span>Semua Rencana ({bucketList.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {activeBucketItems.map((item) => (
            <div
              key={item.id}
              className="bg-cream-50/70 p-5 rounded-3xl border border-cream-200/80 shadow-2xs flex flex-col justify-between hover:border-brand-200 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
                    {item.category}
                  </span>
                  {item.budgetEstimate && (
                    <span className="text-xs font-bold text-neutral-600">
                      {item.budgetEstimate}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm sm:text-base text-neutral-900 line-clamp-2 mb-1.5">
                  {item.title}
                </h4>

                {item.notes && (
                  <p className="text-xs text-neutral-500 line-clamp-2 italic font-sans leading-relaxed">
                    "{item.notes}"
                  </p>
                )}
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-cream-200/60 flex items-center justify-between">
                <button
                  onClick={() => toggleBucketStatus(item.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-sage-600 hover:text-sage-700 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tandai Selesai</span>
                </button>
              </div>
            </div>
          ))}

          {/* Add Bucket List Card Shortcut */}
          <div
            onClick={() => openBucketModal()}
            className="border-2 border-dashed border-cream-300 hover:border-brand-300 rounded-3xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-brand-50/40 transition-all min-h-[150px]"
          >
            <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center mb-2">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-brand-900">Tambah Impian Baru</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Mau coba rasa atau tempat apa lagi?</div>
          </div>
        </div>
      </section>
    </div>
  );
};
