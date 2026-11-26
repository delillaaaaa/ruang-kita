import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Lock, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { currentUser, loginAs, logout } = useApp();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<UserRole>('Januar');
  const [pin, setPin] = useState('1234');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAs(selectedUser, pin);
    if (success) {
      setSuccessMsg(`Berhasil masuk sebagai ${selectedUser}!`);
      setTimeout(() => {
        navigate('/');
      }, 700);
    } else {
      setErrorMsg('Passcode salah. Gunakan default passcode: 1234');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 animate-slide-right">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200/90 shadow-soft space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-800 text-white flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h2 className="font-sans font-black text-2xl text-brand-800">
            Akses Ruang Kita
          </h2>
          <p className="text-xs text-neutral-500">
            Ruang privat untuk dokumentasi cerita Januar &amp; Adel
          </p>
        </div>

        {/* Current logged in status if any */}
        {currentUser && (
          <div className="bg-cream-100/80 p-3.5 rounded-2xl text-xs flex items-center justify-between border border-cream-200">
            <div>
              <span className="text-neutral-500">Sedang aktif sebagai: </span>
              <strong className="text-brand-800">{currentUser}</strong>
            </div>
            <button
              onClick={logout}
              className="text-brand-800 hover:underline font-bold"
            >
              Keluar
            </button>
          </div>
        )}

        {/* User Choice Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
            Pilih Siapa yang Sedang Membuka:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedUser('Januar')}
              className={`p-3.5 rounded-2xl border text-center transition-all ${
                selectedUser === 'Januar'
                  ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-cream-50 border-cream-200 text-neutral-600 hover:bg-cream-100'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mx-auto mb-1">
                J
              </div>
              <div className="font-bold text-sm text-neutral-800">Januar</div>
              <div className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Skor Biru</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedUser('Adel')}
              className={`p-3.5 rounded-2xl border text-center transition-all ${
                selectedUser === 'Adel'
                  ? 'bg-pink-50 border-pink-400 ring-2 ring-pink-500/20 shadow-xs'
                  : 'bg-cream-50 border-cream-200 text-neutral-600 hover:bg-cream-100'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-pink-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-1">
                A
              </div>
              <div className="font-bold text-sm text-neutral-800">Adel</div>
              <div className="text-[10px] text-pink-600 font-semibold uppercase tracking-wider">Skor Pink</div>
            </button>
          </div>
        </div>

        {/* Form Passcode */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Masukkan Passcode (Default: 1234)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full pl-10 pr-4 py-2.5 text-center tracking-widest text-lg font-mono rounded-full border border-cream-300 bg-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
              />
            </div>
            {errorMsg && (
              <p className="text-[11px] text-red-600 font-semibold">{errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{successMsg}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            Masuk ke Ruang Kita
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privasi terjaga untuk cerita kalian berdua</span>
        </div>
      </div>
    </div>
  );
};
