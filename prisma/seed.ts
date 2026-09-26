import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL tidak ditemukan");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const projects = [
  {
    number: "01",
    title: "LaporFast",
    category: "MOBILE APPLICATION",
    description:
      "Aplikasi pelaporan fasilitas sekolah yang dirancang untuk membuat proses penyampaian laporan menjadi lebih cepat, terstruktur, dan mudah dipantau.",
    role: "Mobile App Development",
    details: [
      "Form pelaporan fasilitas sekolah",
      "Penyimpanan data menggunakan SQLite",
      "Interface mobile yang sederhana dan mudah digunakan",
      "Alur laporan dibuat agar lebih terstruktur",
    ],
    tech: ["Flutter", "Dart", "SQLite", "Android"],
    image: "/images/projects/laporfast/screenshot.jpg",
    icon: "/images/projects/laporfast/icon.png",
    type: "mobile",
    link: null,
  },
  {
    number: "02",
    title: "DuitFlow",
    category: "MOBILE APPLICATION",
    description:
      "Aplikasi pencatatan keuangan pribadi yang membantu pengguna mengelola pemasukan dan pengeluaran melalui tampilan dashboard yang sederhana.",
    role: "Mobile App Development",
    details: [
      "Pencatatan pemasukan dan pengeluaran",
      "Dashboard ringkasan kondisi keuangan",
      "Riwayat transaksi",
      "Penyimpanan data secara lokal",
    ],
    tech: ["Flutter", "Dart", "SQLite", "Android"],
    image: "/images/projects/duitflow/screenshot.jpg",
    icon: "/images/projects/duitflow/icon.png",
    type: "mobile",
    link: null,
  },
  {
    number: "03",
    title: "PPDB TADIKA MESRA",
    category: "WEB APPLICATION",
    description:
      "Sistem penerimaan peserta didik baru berbasis web yang menangani proses pendaftaran calon siswa hingga pengecekan status secara online.",
    role: "Full-stack Web Development",
    details: [
      "Form pendaftaran calon peserta didik",
      "Database MySQL untuk menyimpan data pendaftar",
      "Login dan dashboard administrator",
      "Pengelolaan data pendaftar",
      "Fitur pengecekan status pendaftaran",
      "Website dapat diakses secara online",
    ],
    tech: [
      "PHP",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    image: "/images/projects/ppdb/screenshot.jpg",
    icon: null,
    type: "web",
    link: "https://ppdb-tadika-mesra.freedev.app",
  },
  {
    number: "04",
    title: "ARSIP 01 — B.J. Habibie",
    category: "DOCUMENTARY WEB",
    description:
      "Website dokumenter interaktif yang mengemas informasi mengenai perjalanan hidup dan kontribusi B.J. Habibie dalam bentuk visual storytelling.",
    role: "Web Development & Visual Design",
    details: [
      "Konsep website bergaya dokumenter",
      "Timeline perjalanan kehidupan tokoh",
      "Penyusunan informasi secara kronologis",
      "Visual storytelling dengan fotografi",
      "Layout responsive untuk berbagai ukuran layar",
      "Penggunaan JavaScript untuk interaksi halaman",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/habibie/screenshot.jpg",
    icon: null,
    type: "web",
    link: "https://arsip-habibie.wuaze.com",
  },
  {
    number: "05",
    title: "Seed Counter",
    category: "3D VISUALIZATION",
    description:
      "Visualisasi 3D konsep mesin Seed Counter untuk membantu menggambarkan bentuk, susunan, dan alur kerja perangkat penghitung benih kelapa sawit.",
    role: "3D Modeling & Visualization",
    details: [
      "Pemodelan konsep perangkat Seed Counter",
      "Visualisasi tray dan conveyor",
      "Representasi komponen kamera dan pencahayaan",
      "Visualisasi alur perpindahan benih",
      "Rendering untuk kebutuhan presentasi dan dokumentasi",
    ],
    tech: ["Blender", "3D Modeling", "Rendering"],
    image: "/images/projects/seed-counter/screenshot.jpg",
    icon: null,
    type: "3d",
    link: null,
  },
  {
    number: "06",
    title: "SmartDiskAnalyzer",
    category: "DESKTOP APPLICATION",
    description:
      "Aplikasi desktop untuk menganalisis dan mengelola penggunaan storage secara lebih terstruktur melalui visualisasi, analisis file, pencarian duplikat, dan berbagai utilitas pengelolaan disk.",
    role: "Python Desktop Development",
    details: [
      "Dashboard analisis penggunaan storage",
      "Scanner untuk menganalisis file dan folder",
      "Duplicate Finder untuk menemukan file duplikat",
      "Cleaner dan Organizer untuk pengelolaan file",
      "Interface desktop menggunakan CustomTkinter",
      "Project dikembangkan dan dikelola menggunakan Git & GitHub",
    ],
    tech: [
      "Python",
      "CustomTkinter",
      "Git",
      "GitHub",
      "Desktop App",
    ],
    image:
      "/images/projects/smartdiskanalyzer/screenshot.jpg",
    icon: null,
    type: "desktop",
    link: "https://github.com/aldi421/SmartDiskAnalyzer",
  },
];

async function main() {
  console.log("🌱 Memulai seed database ALDEV...");

  // Hapus data testing yang kita buat sebelumnya.
  await prisma.project.deleteMany({
    where: {
      number: "99",
    },
  });

  for (const project of projects) {
    await prisma.project.upsert({
      where: {
        number: project.number,
      },
      update: project,
      create: project,
    });
  }

  console.log(
    `✅ ${projects.length} project ALDEV berhasil dimasukkan.`
  );
}

main()
  .catch((error) => {
    console.error("❌ Seed gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });