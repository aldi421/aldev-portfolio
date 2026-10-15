# ALDEV Portfolio — Update Log

> Catatan perubahan, progres, dan checklist agar pengembangan portofolio tidak membingungkan.

## 1. Informasi Project

- **Portfolio:** ALDEV
- **Framework:** Next.js
- **Repository lokal:** `C:\Users\Aldi\Documents\PROJECT Kelas XII\portofolio-aldi`
- **Website:** https://aldev-portfolio-two.vercel.app/
- **Tujuan catatan:** Mendokumentasikan perubahan project, screenshot, deskripsi, deployment, dan riwayat Git.

---

## 2. Riwayat Update

### 15 Oktober 2026 — SmartDisk PRO V2

**Status:** Perubahan konten telah dilakukan melalui dashboard admin.

Perubahan:
- Memperbarui informasi dan deskripsi SmartDisk PRO V2.
- Mengganti screenshot project dengan screenshot versi terbaru.
- Memperbarui informasi bahwa aplikasi memiliki UI/UX lebih modern dan profesional.
- Menambahkan informasi bahwa aplikasi desktop sudah dikemas dalam format `.exe`.
- Memperbarui informasi teknologi: Python, CustomTkinter, PyInstaller, Git, dan GitHub.

**Checklist verifikasi:**
- [x] Informasi project diperbarui di dashboard admin.
- [x] Screenshot terbaru diganti.
- [ ] Pastikan project tampil di website publik.
- [ ] Pastikan screenshot terlihat jelas di website publik.
- [ ] Pastikan deskripsi dan teknologi sudah sesuai.
- [ ] Periksa status Git repository portofolio.
- [ ] Pastikan perubahan sudah tersimpan dan ter-deploy.

### 15 Oktober 2026 — LENTERA

**Status:** Perbaikan tipe project telah dilakukan.

Perubahan:
- Mengubah tipe project dari `Web` menjadi `web` melalui dashboard admin.
- API sebelumnya sudah menampilkan data LENTERA.
- Screenshot `/images/projects/bookstore/screenshot.jpg` sudah dapat diakses.
- Perubahan tipe dilakukan agar sesuai dengan format tipe project yang digunakan di halaman utama.

**Checklist verifikasi:**
- [x] Tipe project disesuaikan.
- [x] LENTERA sudah muncul di website.
- [x] Screenshot project sudah tampil.

---

## 3. SOP Update Project Baru

Setiap kali menambahkan atau memperbarui project:

1. Siapkan screenshot terbaru dan simpan dengan nama file yang jelas.
2. Perbarui nama, kategori, deskripsi, teknologi, link demo, dan informasi project.
3. Periksa apakah project muncul di website publik.
4. Periksa screenshot, tombol demo, kategori, dan detail project.
5. Catat perubahan baru di bagian Riwayat Update.
6. Periksa perubahan kode menggunakan Git sebelum melakukan commit.

### Perintah Git untuk memeriksa perubahan

Jalankan di PowerShell:

```powershell
cd "C:\Users\Aldi\Documents\PROJECT Kelas XII\portofolio-aldi"

git status
git diff
```

Jika perubahan kode sudah siap dan memang ingin diunggah:

```powershell
git add .
git commit -m "update: portfolio project content"
git push origin main
```

Jika tidak ada perubahan kode karena update hanya dilakukan melalui dashboard admin, tidak perlu membuat commit kosong. Periksa terlebih dahulu apakah perubahan sudah tersimpan di database dan tampil di website.

**Catatan:** Perintah Git di atas mengunggah perubahan repository. Jangan menganggapnya sebagai bukti bahwa perubahan database sudah tersimpan atau website sudah ter-deploy.

---

## 4. Format Catatan Update Berikutnya

Salin format ini setiap kali ada perubahan baru:

### [Tanggal] — [Nama Project]

**Jenis perubahan:**
- 

**File atau bagian yang diubah:**
- 

**Screenshot:**
- [ ] Tidak berubah
- [ ] Diperbarui

**Status:**
- [ ] Perubahan tersimpan
- [ ] Sudah diuji di website
- [ ] Sudah di-push jika ada perubahan repository
- [ ] Sudah diverifikasi setelah deployment

**Catatan kendala:**
- 

**Langkah berikutnya:**
- 

---

## 5. Aturan Penting

- Jangan mengubah database atau kode sebelum penyebab masalah diketahui.
- Jangan mengganti nama file screenshot tanpa menyesuaikan path yang digunakan.
- Jangan menimpa perubahan yang belum di-commit tanpa memeriksa `git status`.
- Jangan mencatat deployment sebagai selesai sebelum memeriksa website publik.
- Setiap perubahan harus mencatat apa yang diubah, mengapa, dan bagaimana hasilnya.

**Prinsip ALDEV:** Catat perubahan, uji hasilnya, lalu verifikasi sebelum menyatakan selesai.