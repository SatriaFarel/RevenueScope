# RevenueScope — Sales & Profitability Dashboard

**RevenueScope** adalah aplikasi web dashboard interaktif yang dirancang untuk membantu tim bisnis dan analis data dalam memantau performa penjualan, mengevaluasi profitabilitas, serta menganalisis transaksi harian secara visual.

Project ini dibuat sebagai **Capstone Project Data Analytics** dengan fokus pada integrasi pengolahan data transaksi dan antarmuka dashboard yang modern.

## 🛠️ Fitur Utama

* **Dynamic Data Import & Export:** Mengunggah file dataset (CSV/JSON) secara langsung menggunakan `PapaParse` tanpa perlu mengedit kode JavaScript, serta fitur ekspor data hasil filter.
* **Filter Data Interaktif:** Filter multidimensi berdasarkan Wilayah (Region), Kanal Penjualan (Online vs Retail), Kategori Produk, dan Tipe Pelanggan.
* **KPI & Visualisasi Grafik:** Menampilkan indikator performa utama (Total Pendapatan, Profit Bersih, Rata-rata Diskon, Sales Rep Terbaik) beserta grafik tren bulanan dan kontribusi kategori.
* **Audit Tabel Transaksi:** Tabel data interaktif yang dilengkapi fitur pencarian, pengurutan kolom, dan indikator badge risiko (*risk alert*) untuk transaksi berdiskon tinggi atau bermargin tipis.
* **Lokalisasi Mata Uang:** Format seluruh angka moneter otomatis disesuaikan ke Rupiah Indonesia (`id-ID`).
* **Cetak Laporan (Print/PDF):** Dukungan cetak laporan langsung dari browser dengan tampilan yang sudah dioptimalkan.

## 🧮 Rumus Kalkulasi Bisnis

* **Revenue** = $\text{Quantity} \times \text{Unit Price} \times (1 - \text{Discount})$
* **Net Profit** = $\text{Quantity} \times [(\text{Unit Price} \times (1 - \text{Discount})) - \text{Unit Cost}]$
* **Profit Margin (%)** = $(\frac{\text{Net Profit}}{\text{Revenue}}) \times 100$

## 💻 Tech Stack

* **HTML5 & Tailwind CSS** — Layout Bento Grid & UI Styling
* **Vanilla JavaScript** — Pemrosesan data & agregasi logika bisnis
* **Chart.js** — Visualisasi grafik interaktif
* **PapaParse** — Parser CSV client-side

## 🚀 Cara Menjalankan Project

1. Unduh atau *clone* repositori ini ke komputer kamu.
2. Buka file `index.html` langsung menggunakan browser pilihanmu.
3. Gunakan tombol **Import Data** pada bagian navigasi atas untuk mengunggah file CSV transaksi (misal: `200_sales_data.csv`).
