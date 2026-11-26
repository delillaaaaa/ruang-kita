@echo off
title Ruang Kita - Server Lokal
echo ===================================================
echo     Menjalankan Aplikasi Ruang Kita (Januar & Adel)
echo ===================================================
echo Membuka browser di http://localhost:5173 ...
timeout /t 2 /nobreak >nul
start http://localhost:5173
echo Menjalankan Vite Dev Server...
call npm run dev
pause
