import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Lock, ShieldCheck, Check, Sparkles } from 'lucide-react';
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
    <div className="max-w-md mx-auto py-12 px-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200/90 shadow-soft space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rosewood-500 to-terracotta-500 text-white flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h2 className="font-serif text-2xl font-extrabold text-neutral-900">
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
              <strong className="text-neutral-900">{currentUser}</strong>
            </div>
            <button
              onClick={logout}
              className="text-rosewood-600 hover:underline font-semibold"
            >
              Keluar
            </button>
          </div>
        )}

        {/* User Choice Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-neutral-600">
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
              <div className="text-[10px] text-blue-600 font-medium">Skor Biru</div>
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
              <div className="text-[10px] text-pink-600 font-medium">Skor Pink</div>
            </button>
          </div>
        </div>

        {/* Passcode input */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-neutral-700">
                Passcode Berdua
              </label>
              <span className="text-[11px] text-neutral-400">Default: 1234</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Masukkan 4 angka kode"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rosewood-500/20 focus:border-rosewood-500 text-sm font-mono tracking-widest text-center"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-center font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 rounded-xl bg-green-50 border border-green-100 text-green-700 text-center font-medium flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-rosewood-500 to-terracotta-500 hover:from-rosewood-600 hover:to-terracotta-600 text-white font-bold text-sm shadow-sm transition-all active:scale-98"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="border-t border-cream-200 pt-4 text-center">
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Hanya Januar &amp; Adel yang memiliki akses untuk mengedit dan mencatat momen.
          </p>
        </div>
      </div>
    </div>
  );
};
