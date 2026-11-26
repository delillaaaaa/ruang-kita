# Folder Assets (src/assets) 🎨

Folder ini biasanya digunakan untuk aset statis yang di-import langsung di dalam kode komponen React (misalnya: logo SVG, icon khusus, atau background pattern).

Contoh pemakaian dalam kode React:
```tsx
import logoRuangKita from './assets/logo.svg';

<img src={logoRuangKita} alt="Logo" />
```

> **Catatan:** Untuk foto-foto dokumentasi momen/kuliner pribadi yang ingin dipanggil secara dinamis, disarankan ditaruh di folder `public/images/` atau diunggah langsung lewat form input jurnal di browser.
