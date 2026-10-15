# ALDEV — PORTFOLIO UPDATE LOG

**Website:** https://aldev-portfolio-two.vercel.app/

**Folder:** `C:\Users\Aldi\Documents\PROJECT Kelas XII\portofolio-aldi`

## 1. Riwayat Update

### 15 Oktober 2026
- **SmartDisk PRO V2:** deskripsi dan screenshot diperbarui.
- **LENTERA:** tipe project diperbaiki menjadi `web`.
- **Foto profil:** `aldi.jpg` diperbarui.

## 2. Paket Lengkap — Cek dan Push Update

Salin seluruh blok PowerShell di bawah, lalu paste ke terminal PowerShell.

**Fungsi:** memeriksa perubahan, menampilkan daftar file, meminta konfirmasi sebelum commit, lalu push ke GitHub.

```powershell
$ErrorActionPreference = "Stop"
Set-Location "C:\Users\Aldi\Documents\PROJECT Kelas XII\portofolio-aldi"

Write-Host "`n===== ALDEV UPDATE MANAGER =====" -ForegroundColor Cyan

Write-Host "`n[1] STATUS GIT"
git status -sb

Write-Host "`n[2] FILE BERUBAH"
git status --short

Write-Host "`n[3] SINKRONISASI REMOTE"
git fetch origin
git status -sb

Write-Host "`n[4] PERIKSA PERUBAHAN"
git diff --stat
git diff --cached --stat
git ls-files --others --exclude-standard

Write-Host "`n[5] PILIH TINDAKAN" -ForegroundColor Yellow
Write-Host "1. Cek saja, tidak mengubah file"
Write-Host "2. Commit dan push semua perubahan"
$pilihan = Read-Host "Pilih 1 atau 2"

if ($pilihan -eq "1") {
    Write-Host "`nPemeriksaan selesai. Tidak ada perubahan yang diunggah." -ForegroundColor Green
}
elseif ($pilihan -eq "2") {
    Write-Host "`nPERIKSA DAFTAR FILE DI ATAS SEBELUM MELANJUTKAN."
    $konfirmasi = Read-Host "Ketik PUSH untuk melanjutkan"

    if ($konfirmasi -ceq "PUSH") {
        git add .
        git diff --cached --stat

        $pesan = Read-Host "Pesan commit (Enter untuk pesan default)"
        if ([string]::IsNullOrWhiteSpace($pesan)) {
            $pesan = "update: portfolio content and assets"
        }

        git commit -m $pesan

        if ($LASTEXITCODE -eq 0) {
            git push origin main
            if ($LASTEXITCODE -eq 0) {
                Write-Host "`nPush berhasil. Periksa deployment Vercel." -ForegroundColor Green
            }
        }
        else {
            Write-Host "`nCommit tidak berhasil. Periksa status Git." -ForegroundColor Red
        }
    }
    else {
        Write-Host "`nDibatalkan. Tidak ada push." -ForegroundColor Yellow
    }
}
else {
    Write-Host "`nPilihan tidak valid." -ForegroundColor Red
}

Write-Host "`n===== SELESAI =====" -ForegroundColor Cyan
```

## 3. Setelah Push

1. Buka dashboard Vercel dan pastikan deployment terbaru berstatus `Ready`.
2. Buka website ALDEV dan tekan `Ctrl + F5`.
3. Pastikan perubahan sudah tampil.

**Catatan:** paket ini mengunggah perubahan repository Git, bukan otomatis mengubah database yang dikelola dashboard admin. Periksa file yang akan diunggah sebelum mengetik `PUSH`.

## 4. Template Riwayat Update

### [Tanggal] — [Nama Project]
- Perubahan:
- File/aset:
- Status website:
- Catatan:
