"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  role: string;
  details: string[];
  tech: string[];
  image: string;
  icon?: string;
  type: "mobile" | "web" | "3d";
  link?: string;
};

const projects: Project[] = [
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
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/ppdb/screenshot.jpg",
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
    type: "3d",
  },
];

const skillGroups = [
  {
    title: "DEVELOPMENT",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "Git",
      "GitHub",
    ],
  },
  {
    title: "MOBILE",
    skills: [
      "Flutter",
      "Dart",
      "Android",
    ],
  },
  {
    title: "DATABASE",
    skills: [
      "MySQL",
      "SQLite",
      "CRUD",
      "Authentication",
    ],
  },
  {
    title: "UI & DESIGN",
    skills: [
      "Canva",
      "Figma",
      "Stitch",
      "UI Design",
      "UX Design",
      "Branding",
    ],
  },
  {
    title: "CREATIVE & 3D",
    skills: [
      "CapCut",
      "Video Editing",
      "Poster Design",
      "Social Media Design",
      "Blender",
      "3D Modeling",
      "Rendering",
      "VS Code",
      "XAMPP",
      "Laragon",
    ],
  },
];

const timeline = [
  {
    year: "2024",
    title: "Started Informatics",
    description:
      "Memulai perjalanan di bidang Pengembangan Perangkat Lunak dan Gim di SMK Informatika CBI.",
  },
  {
    year: "2025",
    title: "Web & Database",
    description:
      "Mulai mengembangkan website menggunakan HTML, CSS, JavaScript, PHP, MySQL, CRUD, authentication, dan database.",
  },
  {
    year: "2025 — 2026",
    title: "Mobile, UI & Multimedia",
    description:
      "Memperluas kemampuan ke Flutter, Dart, SQLite, UI/UX, desain visual, video editing, dan 3D visualization.",
  },
  {
    year: "2026",
    title: "Industrial Experience",
    description:
      "Melaksanakan PKL di PT Riset Perkebunan Nusantara dan terlibat dalam IT Center, desain, 3D visualization, dokumentasi, serta aktivitas laboratorium.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("reveal-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M4 4h6v6H4z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6H4z" />
      <path d="M14 14h6v6h-6z" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

function BrowserDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-35" />
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-25" />
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-15" />
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [photoError, setPhotoError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [activeFilter, setActiveFilter] = useState<
    "all" | "mobile" | "web" | "3d"
  >("all");

  /* ================= THEME ================= */

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem("aldev-theme");

    if (savedTheme === "light") {
      setDarkMode(false);
    } else if (savedTheme === "dark") {
      setDarkMode(true);
    } else {
      const prefersDark =
        window.matchMedia?.("(prefers-color-scheme: dark)")
          .matches ?? true;

      setDarkMode(prefersDark);
    }

    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;

    window.localStorage.setItem(
      "aldev-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode, themeReady]);

  /* ================= SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
      setShowTopButton(window.scrollY > 520);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= ACTIVE SECTION ================= */

  useEffect(() => {
    const sectionIds = [
      "home",
      "work",
      "experience",
      "skills",
      "timeline",
      "about",
      "contact",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.12, 0.25, 0.45, 0.6],
        rootMargin: "-18% 0px -58% 0px",
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  /* ================= NAV ================= */

  const navItems = [
    { label: "WORK", id: "work" },
    { label: "ABOUT", id: "about" },
    { label: "SKILLS", id: "skills" },
    { label: "CONTACT", id: "contact" },
  ];

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  /* ================= FILTER ================= */

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
          (project) => project.type === activeFilter
        );

  const filterItems = [
    {
      label: "ALL",
      value: "all" as const,
      count: projects.length,
    },
    {
      label: "MOBILE",
      value: "mobile" as const,
      count: projects.filter(
        (project) => project.type === "mobile"
      ).length,
    },
    {
      label: "WEB",
      value: "web" as const,
      count: projects.filter(
        (project) => project.type === "web"
      ).length,
    },
    {
      label: "3D",
      value: "3d" as const,
      count: projects.filter(
        (project) => project.type === "3d"
      ).length,
    },
  ];

  /* ================= TOKENS ================= */

  const bg = darkMode ? "bg-black" : "bg-white";
  const text = darkMode ? "text-white" : "text-black";

  const glass = darkMode
    ? "bg-white/[0.045] border-white/[0.11] shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
    : "bg-black/[0.028] border-black/[0.10] shadow-[0_18px_60px_rgba(0,0,0,0.06)]";

  const glassHover = darkMode
    ? "hover:bg-white/[0.07] hover:border-white/[0.20]"
    : "hover:bg-black/[0.045] hover:border-black/[0.16]";

  const border = darkMode
    ? "border-white/[0.11]"
    : "border-black/[0.10]";

  const muted = darkMode
    ? "text-white/42"
    : "text-black/42";

  const soft = darkMode
    ? "text-white/68"
    : "text-black/68";

  return (
    <main
      className={`min-h-screen overflow-x-hidden ${bg} ${text}`}
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          background: ${darkMode ? "#000000" : "#ffffff"};
        }

        body {
          margin: 0;
          background: ${darkMode ? "#000000" : "#ffffff"};
          color: ${darkMode ? "#ffffff" : "#000000"};
          transition:
            background-color 240ms ease,
            color 240ms ease;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: ${darkMode ? "#ffffff" : "#000000"};
          color: ${darkMode ? "#000000" : "#ffffff"};
        }

        /* ================= REVEAL ================= */

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 650ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ================= BACKGROUND ================= */

        .hero-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: ${darkMode ? "0.7" : "0.55"};
          background-image:
            linear-gradient(
              to right,
              ${darkMode
                ? "rgba(255,255,255,0.045)"
                : "rgba(0,0,0,0.045)"} 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              ${darkMode
                ? "rgba(255,255,255,0.045)"
                : "rgba(0,0,0,0.045)"} 1px,
              transparent 1px
            );
          background-size: 72px 72px;
          mask-image: linear-gradient(
            to bottom,
            black 0%,
            rgba(0,0,0,0.9) 45%,
            transparent 100%
          );
        }

        .hero-glow {
          position: absolute;
          width: 720px;
          height: 720px;
          top: -340px;
          right: -180px;
          pointer-events: none;
          border-radius: 999px;
          background: ${darkMode
            ? "rgba(255,255,255,0.045)"
            : "rgba(0,0,0,0.035)"};
          filter: blur(90px);
        }

        .hero-ring {
          position: absolute;
          width: 420px;
          height: 420px;
          top: 11%;
          right: 4%;
          border: 1px solid
            ${darkMode
              ? "rgba(255,255,255,0.075)"
              : "rgba(0,0,0,0.075)"};
          border-radius: 999px;
          pointer-events: none;
          opacity: 0.65;
        }

        .hero-brand {
          transition:
            opacity 220ms ease,
            transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-brand:hover {
          transform: translateX(7px);
        }

        .hero-brand-dot {
          display: inline-block;
          width: 0.08em;
          height: 0.08em;
          margin-left: 0.07em;
          margin-bottom: 0.12em;
          border-radius: 999px;
          background: currentColor;
        }

        /* ================= NAV ================= */

        .nav-shell {
          transform: translateY(0);
          transition:
            height 280ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 240ms ease,
            border-color 240ms ease,
            box-shadow 280ms ease,
            transform 280ms ease;
        }

        .nav-shell.scrolled {
          transform: translateY(-2px);
        }

        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -7px;
          width: 100%;
          height: 1px;
          transform: scaleX(0);
          transform-origin: right;
          background: currentColor;
          opacity: 0.55;
          transition:
            transform 220ms ease,
            opacity 220ms ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .nav-link.active {
          opacity: 1;
        }

        .mobile-menu {
          animation: mobileMenuIn 220ms
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes mobileMenuIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ================= GLASS ================= */

        .glass-shine {
          position: relative;
          overflow: hidden;
        }

        .glass-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            115deg,
            transparent 22%,
            rgba(255,255,255,0.055) 48%,
            transparent 72%
          );
          transform: translateX(-120%);
          transition: transform 650ms ease;
        }

        .glass-shine:hover::after {
          transform: translateX(120%);
        }

        /* ================= THEME TOGGLE ================= */

        .theme-toggle {
          transition:
            background-color 180ms ease,
            border-color 180ms ease,
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .theme-toggle:hover {
          transform: scale(1.035);
          box-shadow: 0 10px 30px
            ${darkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)"};
        }

        .theme-knob {
          transition:
            transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 180ms ease,
            color 180ms ease;
        }

        /* ================= EMAIL ================= */

        .email-button {
          background: #000000;
          color: #ffffff !important;
          border: 1px solid #000000;
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .email-button:hover {
          background: #1f1f1f;
          color: #ffffff !important;
          border-color: #1f1f1f;
          box-shadow: 0 12px 30px rgba(0,0,0,0.18);
        }

        .email-button.dark-email {
          background: #ffffff;
          color: #000000 !important;
          border-color: #ffffff;
        }

        .email-button.dark-email:hover {
          background: #e4e4e7;
          color: #000000 !important;
          border-color: #e4e4e7;
          box-shadow: 0 12px 30px rgba(255,255,255,0.08);
        }

        /* ================= PROJECT OPEN ================= */

        .project-open-button {
          background: #000000;
          color: #ffffff !important;
          border: 1px solid #000000;
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .project-open-button:hover {
          background: #1f1f1f;
          color: #ffffff !important;
          border-color: #1f1f1f;
          box-shadow: 0 12px 30px rgba(0,0,0,0.18);
        }

        .project-open-button.dark-project-open {
          background: #ffffff;
          color: #000000 !important;
          border-color: #ffffff;
        }

        .project-open-button.dark-project-open:hover {
          background: #e4e4e7;
          color: #000000 !important;
          border-color: #e4e4e7;
          box-shadow: 0 12px 30px rgba(255,255,255,0.08);
        }

        /* ================= HERO ================= */

        .hero-title {
          text-wrap: balance;
        }

        .hero-accent {
          display: inline-block;
          width: 0.12em;
          height: 0.12em;
          margin-left: 0.1em;
          margin-bottom: 0.1em;
          border-radius: 999px;
          background: currentColor;
          vertical-align: middle;
        }

        .hero-name-wrap {
          position: relative;
          width: fit-content;
        }

        .hero-name-wrap::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -18px;
          width: 68px;
          height: 2px;
          background: currentColor;
          opacity: 0.35;
          transform-origin: left;
          transition:
            width 400ms ease,
            opacity 300ms ease;
        }

        .hero-name-wrap:hover::after {
          width: 118px;
          opacity: 0.7;
        }

        /* ================= SECTION ================= */

        .section-line {
          position: relative;
          overflow: hidden;
        }

        .section-line::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 70px;
          height: 1px;
          background: currentColor;
          opacity: 0.3;
        }

        /* ================= PROJECT EXPERIENCE ================= */

        .project-image {
          transition:
            transform 750ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 650ms ease;
        }

        .project-frame:hover .project-image {
          transform: scale(1.035);
          filter: contrast(1.045);
        }

        .project-frame {
          isolation: isolate;
          transition:
            transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 240ms ease,
            background-color 240ms ease,
            box-shadow 320ms ease;
        }

        .project-frame:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 85px
            ${darkMode
              ? "rgba(0,0,0,0.38)"
              : "rgba(0,0,0,0.09)"};
        }

        .project-number {
          transition:
            opacity 240ms ease,
            transform 240ms ease;
        }

        .project-frame:hover .project-number {
          transform: translateX(4px);
        }

        .project-status {
          transition:
            background-color 180ms ease,
            border-color 180ms ease,
            transform 180ms ease;
        }

        .project-frame:hover .project-status {
          transform: translateY(-2px);
        }

        .project-visual-label {
          transition:
            opacity 220ms ease,
            transform 220ms ease;
        }

        .project-frame:hover .project-visual-label {
          opacity: 1;
          transform: translateY(-2px);
        }

        .project-open {
          transition:
            transform 200ms ease,
            opacity 200ms ease;
        }

        .project-open:hover {
          transform: translateX(4px);
          opacity: 0.7;
        }

        .project-tech {
          transition:
            background-color 180ms ease,
            border-color 180ms ease,
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .project-tech:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px
            ${darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.05)"};
        }

        .project-progress {
          position: relative;
          overflow: hidden;
        }

        .project-progress::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 38%;
          background: currentColor;
          opacity: 0.5;
          transform: translateX(-140%);
          transition:
            transform 750ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        article:hover .project-progress::after {
          transform: translateX(310%);
        }

        .project-index {
          transition:
            background-color 200ms ease,
            color 200ms ease,
            transform 200ms ease;
        }

        .project-frame:hover .project-index {
          transform: translateY(-2px);
        }

        .project-corner {
          transition:
            opacity 250ms ease,
            transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-frame:hover .project-corner {
          opacity: 1;
          transform: scale(1.05);
        }

        .project-browser-bar {
          transition:
            background-color 220ms ease,
            border-color 220ms ease;
        }

        .project-meta-cell {
          transition:
            background-color 200ms ease,
            padding 200ms ease;
        }

        .project-meta-cell:hover {
          padding-left: 5px;
        }

        .filter-pill {
          position: relative;
          overflow: hidden;
          transition:
            background-color 180ms ease,
            color 180ms ease,
            border-color 180ms ease,
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .filter-pill:hover {
          transform: translateY(-2px);
        }

        .filter-pill-active {
          box-shadow: 0 8px 24px
            ${darkMode
              ? "rgba(255,255,255,0.10)"
              : "rgba(0,0,0,0.10)"};
        }

        /* ================= EXPERIENCE ================= */

        .experience-item {
          transition:
            padding-left 250ms ease,
            border-color 250ms ease;
        }

        .experience-item:hover {
          padding-left: 8px;
        }

        .experience-tag {
          transition:
            transform 180ms ease,
            background-color 180ms ease;
        }

        .experience-item:hover .experience-tag {
          transform: translateX(3px);
        }

        /* ================= SKILLS ================= */

        .skill-card {
          position: relative;
          transition:
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 240ms ease,
            border-color 240ms ease,
            box-shadow 300ms ease;
        }

        .skill-card::before {
          content: "";
          position: absolute;
          left: 28px;
          top: 0;
          width: 38px;
          height: 1px;
          background: currentColor;
          opacity: 0.35;
          transition:
            width 300ms ease,
            opacity 300ms ease;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 65px
            ${darkMode
              ? "rgba(0,0,0,0.32)"
              : "rgba(0,0,0,0.07)"};
        }

        .skill-card:hover::before {
          width: 72px;
          opacity: 0.65;
        }

        .skill-chip {
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            border-color 180ms ease;
        }

        .skill-chip:hover {
          transform: translateY(-2px);
        }

        /* ================= TIMELINE ================= */

        .timeline-item {
          position: relative;
        }

        .timeline-marker {
          transition:
            transform 220ms ease,
            background-color 220ms ease,
            border-color 220ms ease;
        }

        .timeline-item:hover .timeline-marker {
          transform: scale(1.18);
        }

        .timeline-title {
          transition: transform 220ms ease;
        }

        .timeline-item:hover .timeline-title {
          transform: translateX(4px);
        }

        /* ================= ABOUT ================= */

        .about-photo {
          transition:
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 500ms ease;
        }

        .about-frame:hover .about-photo {
          transform: scale(1.035);
          filter: contrast(1.03);
        }

        .about-stat {
          transition:
            transform 220ms ease,
            opacity 220ms ease;
        }

        .about-stat:hover {
          transform: translateY(-3px);
        }

        .focus-pill {
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            border-color 180ms ease;
        }

        .focus-pill:hover {
          transform: translateY(-2px);
        }

        /* ================= CONTACT ================= */

        .contact-title {
          text-wrap: balance;
        }

        .contact-link {
          transition:
            transform 180ms ease,
            opacity 180ms ease;
        }

        .contact-link:hover {
          transform: translateX(4px);
        }

        /* ================= BACK TO TOP ================= */

        .back-top {
          transition:
            opacity 220ms ease,
            transform 220ms ease,
            background-color 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .back-top:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 35px
            ${darkMode
              ? "rgba(255,255,255,0.09)"
              : "rgba(0,0,0,0.09)"};
        }

        /* ================= MOBILE ================= */

        @media (max-width: 768px) {
          .hero-name-wrap::after {
            bottom: -12px;
            width: 45px;
          }

          .hero-name-wrap:hover::after {
            width: 75px;
          }

          .project-frame:hover {
            transform: translateY(-3px);
          }

          .experience-item:hover {
            padding-left: 3px;
          }
        }

        @media (max-width: 640px) {
          .hero-grid {
            background-size: 48px 48px;
          }

          .hero-glow {
            width: 430px;
            height: 430px;
            top: -170px;
            right: -230px;
          }

          .hero-ring {
            width: 250px;
            height: 250px;
            top: 14%;
            right: -80px;
          }

          .reveal {
            transform: translateY(20px);
          }

          .project-frame {
            border-radius: 24px;
          }

          .project-frame:hover {
            transform: translateY(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          body {
            transition: none;
          }

          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .glass-shine::after {
            display: none;
          }

          .mobile-menu {
            animation: none;
          }

          .theme-toggle,
          .theme-knob,
          .email-button,
          .project-open-button,
          .nav-shell,
          .nav-link::after,
          .project-image,
          .project-frame,
          .project-tech,
          .filter-pill,
          .skill-card,
          .skill-card::before,
          .skill-chip,
          .timeline-marker,
          .timeline-title,
          .about-photo,
          .contact-link,
          .hero-name-wrap::after,
          .hero-brand,
          .project-index,
          .project-corner,
          .project-browser-bar,
          .experience-item,
          .experience-tag,
          .about-stat,
          .focus-pill,
          .back-top {
            transition: none;
          }
        }
      `}</style>

      {/* ========================================================= */}
      {/* NAVBAR */}
      {/* ========================================================= */}

      <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={`nav-shell ${
            scrolled ? "scrolled" : ""
          } mx-auto flex ${
            scrolled ? "h-[58px]" : "h-[66px]"
          } max-w-[1380px] items-center justify-between rounded-full border px-4 backdrop-blur-2xl sm:px-6 ${glass} ${
            scrolled
              ? "shadow-[0_18px_55px_rgba(0,0,0,0.25)]"
              : ""
          }`}
        >
          <a
            href="#home"
            onClick={closeMobileMenu}
            className="group flex items-center gap-3"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-transform duration-300 group-hover:scale-105 ${
                darkMode
                  ? "border-white/10"
                  : "border-black/10"
              }`}
            >
              {!logoError ? (
                <img
                  src="/images/branding/logo.png"
                  alt="ALDEV Logo"
                  onError={() => setLogoError(true)}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div
                  className={`flex h-full w-full items-center justify-center text-[13px] font-black ${
                    darkMode
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  A
                </div>
              )}
            </div>

            <div className="hidden sm:block">
              <div className="text-[12px] font-bold tracking-[0.22em]">
                ALDEV
              </div>

              <div
                className={`text-[8px] tracking-[0.18em] ${muted}`}
              >
                ALDI ALDIANSYAH
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const active =
                activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link ${
                    active ? "active" : ""
                  } text-[10px] font-semibold tracking-[0.17em] transition-opacity duration-200 hover:opacity-55 ${soft}`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((value) => !value)
              }
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl md:hidden ${glass}`}
            >
              <MenuIcon open={mobileMenuOpen} />
            </button>

            {/* THEME */}

            <button
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              aria-pressed={darkMode}
              className={`theme-toggle relative flex h-10 w-[68px] items-center rounded-full border p-1 backdrop-blur-xl ${glass}`}
            >
              <span
                className={`theme-knob absolute flex h-8 w-8 items-center justify-center rounded-full ${
                  darkMode
                    ? "translate-x-7 bg-white text-black"
                    : "translate-x-0 bg-black text-white"
                }`}
              >
                {darkMode ? (
                  <MoonIcon />
                ) : (
                  <SunIcon />
                )}
              </span>

              <span className="flex w-full justify-between px-[7px] text-[9px] opacity-35">
                <span>☼</span>
                <span>◐</span>
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE NAV PANEL */}

        {mobileMenuOpen && (
          <div
            className={`mobile-menu mx-auto mt-2 max-w-[1380px] rounded-[26px] border p-3 backdrop-blur-2xl md:hidden ${glass}`}
          >
            <div className="grid gap-1">
              {navItems.map((item) => {
                const active =
                  activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between rounded-[18px] px-5 py-4 text-[10px] font-bold tracking-[0.18em] transition-colors ${
                      active
                        ? darkMode
                          ? "bg-white text-black"
                          : "bg-black text-white"
                        : `${soft} ${
                            darkMode
                              ? "hover:bg-white/[0.06]"
                              : "hover:bg-black/[0.05]"
                          }`
                    }`}
                  >
                    <span>{item.label}</span>

                    <span
                      className={`text-[8px] ${
                        active
                          ? "opacity-45"
                          : muted
                      }`}
                    >
                      0{navItems.indexOf(item) + 1}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12"
      >
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-ring" />

        <div className="relative z-10 mx-auto w-full max-w-[1380px]">
          <Reveal>
            <div
              className={`mb-7 flex items-center gap-3 text-[10px] font-bold tracking-[0.28em] ${muted}`}
            >
              <span
                className={`h-px w-9 ${
                  darkMode
                    ? "bg-white/30"
                    : "bg-black/30"
                }`}
              />

              <span>PORTFOLIO / 2026</span>

              <span
                className={`rounded-full border px-3 py-1.5 text-[8px] tracking-[0.16em] ${
                  darkMode
                    ? "border-white/10 bg-white/[0.035]"
                    : "border-black/10 bg-black/[0.025]"
                }`}
              >
                DIGITAL CREATOR
              </span>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div
              className={`mb-3 text-[clamp(4.8rem,12vw,11rem)] font-black leading-[0.78] tracking-[-0.09em] ${text}`}
            >
              <span className="hero-brand">
                ALDEV<span className="hero-brand-dot" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={130}>
            <div
              className={`mb-6 text-[9px] font-medium tracking-[0.22em] ${muted}`}
            >
              DESIGN / DEVELOPMENT / VISUAL
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="hero-name-wrap">
              <h1 className="hero-title max-w-[1150px] text-[clamp(3rem,7.8vw,7.8rem)] font-bold leading-[0.84] tracking-[-0.075em]">
                ALDI
                <br />
                ALDIANSYAH
                <span className="hero-accent" />
              </h1>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div
                  className={`mb-4 text-[9px] font-bold tracking-[0.2em] ${muted}`}
                >
                  INFORMATICS STUDENT / DIGITAL CREATOR
                </div>

                <p
                  className={`max-w-[620px] text-[15px] leading-7 sm:text-[17px] ${soft}`}
                >
                  Building digital products through code,
                  design, mobile applications, web development,
                  and visual experiences.
                </p>
              </div>

              <a
                href="#work"
                className={`group flex w-fit items-center gap-4 rounded-full border px-6 py-3.5 text-[10px] font-bold tracking-[0.18em] backdrop-blur-xl transition-[background-color,border-color,transform] duration-200 hover:-translate-y-1 ${glass} ${glassHover}`}
              >
                EXPLORE WORK

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className={`mt-20 border-t pt-6 ${border}`}>
              <div className="mb-5 flex items-center justify-between">
                <span
                  className={`text-[8px] font-bold tracking-[0.2em] ${muted}`}
                >
                  PROFILE / 01
                </span>

                <span
                  className={`text-[8px] tracking-[0.18em] ${muted}`}
                >
                  ALDEV — 2026
                </span>
              </div>

              <div className="grid gap-5 text-[9px] font-medium tracking-[0.16em] sm:grid-cols-3">
                <div>
                  <div className={muted}>BASED IN</div>
                  <div className="mt-2">INDONESIA</div>
                </div>

                <div>
                  <div className={muted}>EDUCATION</div>
                  <div className="mt-2">
                    SMK INFORMATIKA CBI
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className={muted}>SPECIALIZATION</div>
                  <div className="mt-2">
                    WEB / MOBILE / DESIGN
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* APPROACH */}
      {/* ========================================================= */}

      <section className="px-5 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <div
              className={`flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] ${muted}`}
            >
              <GridIcon />
              01 / APPROACH
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <h2 className="max-w-[900px] text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
                Building things that are
                <span className={`block ${muted}`}>
                  useful, clear, and intentional.
                </span>
              </h2>

              <p
                className={`mt-9 max-w-[680px] text-[15px] leading-7 ${soft}`}
              >
                Bukan sekadar membuat sesuatu terlihat bagus.
                Setiap project dibuat dengan fokus pada fungsi,
                pengalaman pengguna, struktur yang rapi, dan
                visual yang punya karakter.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WORK */}
      {/* ========================================================= */}

      <section
        id="work"
        className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1380px]">
          <Reveal>
            <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div
                  className={`mb-4 flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] ${muted}`}
                >
                  <GridIcon />
                  02 / SELECTED WORK
                </div>

                <h2 className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-none tracking-[-0.065em]">
                  Projects.
                </h2>
              </div>

              <div
                className={`text-[9px] tracking-[0.15em] lg:text-right ${muted}`}
              >
                <span className="font-bold">
                  {filteredProjects.length
                    .toString()
                    .padStart(2, "0")}{" "}
                  PROJECTS
                </span>
                <br />
                2025 — 2026
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              className={`mb-16 flex flex-col gap-5 border-y py-5 sm:flex-row sm:items-center sm:justify-between ${border}`}
            >
              <div
                className={`flex items-center gap-2 text-[8px] font-bold tracking-[0.18em] ${muted}`}
              >
                <FilterIcon />
                FILTER PROJECTS
              </div>

              <div className="flex flex-wrap gap-2">
                {filterItems.map((filter) => {
                  const active =
                    activeFilter === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() =>
                        setActiveFilter(filter.value)
                      }
                      className={`filter-pill ${
                        active
                          ? "filter-pill-active"
                          : ""
                      } rounded-full border px-4 py-2.5 text-[8px] font-bold tracking-[0.15em] ${
                        active
                          ? darkMode
                            ? "border-white bg-white text-black"
                            : "border-black bg-black text-white"
                          : `${glass} ${glassHover}`
                      }`}
                    >
                      {active && (
                        <span className="mr-1.5 inline-flex align-middle">
                          <CheckIcon />
                        </span>
                      )}

                      {filter.label}

                      <span
                        className={`ml-2 ${
                          active
                            ? "opacity-45"
                            : muted
                        }`}
                      >
                        {String(filter.count).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div className="space-y-32">
            {filteredProjects.map((project, index) => {
              const originalIndex = projects.findIndex(
                (item) => item.number === project.number
              );

              const reversed = index % 2 === 1;

              return (
                <Reveal
                  key={project.title}
                  delay={(index % 2) * 80}
                >
                  <article className="group">
                    <div
                      className={`mb-6 border-t pt-5 ${border}`}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <span
                            className={`project-number text-[10px] font-bold tracking-[0.2em] ${muted}`}
                          >
                            {project.number}
                          </span>

                          <span
                            className={`h-px w-8 ${
                              darkMode
                                ? "bg-white/15"
                                : "bg-black/15"
                            }`}
                          />

                          <span
                            className={`text-[9px] tracking-[0.18em] ${muted}`}
                          >
                            PROJECT /{" "}
                            {String(
                              originalIndex + 1
                            ).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`project-status rounded-full border px-3 py-1.5 text-[8px] font-semibold tracking-[0.16em] ${glass}`}
                          >
                            {project.type === "mobile"
                              ? "MOBILE"
                              : project.type === "web"
                                ? "WEB"
                                : "3D"}
                          </span>

                          <span
                            className={`hidden text-[9px] font-semibold tracking-[0.18em] sm:block ${muted}`}
                          >
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:gap-16 ${
                        reversed
                          ? "lg:grid-cols-[0.75fr_1.25fr]"
                          : ""
                      }`}
                    >
                      <div
                        className={`project-frame ${
                          reversed ? "lg:order-2" : ""
                        } glass-shine relative overflow-hidden rounded-[30px] border backdrop-blur-xl ${glass} ${glassHover}`}
                      >
                        <div
                          className={`project-corner pointer-events-none absolute left-5 top-5 z-30 h-5 w-5 border-l border-t opacity-55 ${
                            darkMode
                              ? "border-white/40"
                              : "border-black/35"
                          }`}
                        />

                        <div
                          className={`project-corner pointer-events-none absolute right-5 top-5 z-30 h-5 w-5 border-r border-t opacity-55 ${
                            darkMode
                              ? "border-white/40"
                              : "border-black/35"
                          }`}
                        />

                        {project.type === "mobile" ? (
                          <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden p-8 sm:min-h-[650px] sm:p-12">
                            <div
                              className={`pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
                                darkMode
                                  ? "bg-white/[0.025]"
                                  : "bg-black/[0.025]"
                              }`}
                            />

                            <div
                              className={`project-visual-label absolute left-7 top-7 z-20 text-[8px] font-bold tracking-[0.18em] opacity-75 ${muted}`}
                            >
                              MOBILE / PREVIEW
                            </div>

                            <div
                              className={`absolute right-7 top-7 z-20 text-[8px] tracking-[0.15em] ${muted}`}
                            >
                              {project.number} /{" "}
                              {String(projects.length).padStart(
                                2,
                                "0"
                              )}
                            </div>

                            <div
                              className={`relative z-10 h-[475px] w-[238px] overflow-hidden rounded-[36px] border-[7px] border-black bg-black shadow-[0_35px_90px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:translate-y-[-4px] sm:h-[535px] sm:w-[268px]`}
                            >
                              <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

                              <img
                                src={project.image}
                                alt={`${project.title} screenshot`}
                                className="project-image h-full w-full object-cover"
                              />

                              {project.icon && (
                                <div className="absolute bottom-5 left-1/2 z-20 h-12 w-12 -translate-x-1/2 overflow-hidden rounded-[13px] border border-white/20 bg-black/30 p-1 shadow-xl backdrop-blur-md">
                                  <img
                                    src={project.icon}
                                    alt=""
                                    className="h-full w-full rounded-[9px] object-cover"
                                  />
                                </div>
                              )}
                            </div>

                            <div
                              className={`absolute bottom-6 left-6 z-20 text-[8px] font-bold tracking-[0.18em] ${muted}`}
                            >
                              APP / INTERFACE
                            </div>

                            <div
                              className={`absolute bottom-6 right-6 z-20 text-[8px] tracking-[0.15em] ${muted}`}
                            >
                              FLUTTER / ANDROID
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`relative aspect-[16/10] overflow-hidden ${
                              project.type === "3d"
                                ? darkMode
                                  ? "bg-[#0b0b0b]"
                                  : "bg-[#f1f1f1]"
                                : darkMode
                                  ? "bg-[#111111]"
                                  : "bg-[#eeeeee]"
                            }`}
                          >
                            {project.type === "web" && (
                              <div
                                className={`project-browser-bar absolute left-0 right-0 top-0 z-20 flex h-10 items-center gap-4 border-b px-5 backdrop-blur-xl ${
                                  darkMode
                                    ? "border-white/10 bg-black/45 text-white"
                                    : "border-black/10 bg-white/55 text-black"
                                }`}
                              >
                                <BrowserDots />

                                <div className="hidden flex-1 items-center justify-center sm:flex">
                                  <div
                                    className={`w-[55%] rounded-full border px-4 py-1.5 text-[7px] tracking-[0.12em] ${
                                      darkMode
                                        ? "border-white/10 bg-white/[0.04] text-white/35"
                                        : "border-black/10 bg-black/[0.025] text-black/35"
                                    }`}
                                  >
                                    PROJECT PREVIEW
                                  </div>
                                </div>
                              </div>
                            )}

                            <img
                              src={project.image}
                              alt={`${project.title} project preview`}
                              className={`project-image h-full w-full ${
                                project.type === "3d"
                                  ? "object-contain p-7 sm:p-10"
                                  : `object-cover ${
                                      project.type === "web"
                                        ? "pt-10"
                                        : ""
                                    }`
                              }`}
                            />

                            <div
                              className={`pointer-events-none absolute inset-0 ${
                                project.type === "3d"
                                  ? "bg-gradient-to-br from-transparent via-transparent to-black/20"
                                  : "bg-gradient-to-t from-black/65 via-transparent to-black/5"
                              }`}
                            />

                            <div className="absolute left-6 top-16 z-10">
                              <span className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[8px] font-semibold tracking-[0.16em] text-white backdrop-blur-xl">
                                {project.type === "web"
                                  ? "WEB PROJECT"
                                  : "3D VISUALIZATION"}
                              </span>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between text-white">
                              <div>
                                <div className="text-[9px] font-bold tracking-[0.16em]">
                                  {project.title}
                                </div>

                                <div className="mt-1 text-[8px] tracking-[0.12em] text-white/55">
                                  {project.role}
                                </div>
                              </div>

                              <span className="text-[8px] tracking-[0.16em] text-white/55">
                                {project.number}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`flex flex-col justify-between py-1 ${
                          reversed ? "lg:order-1" : ""
                        }`}
                      >
                        <div>
                          <div className="mb-5 flex items-center gap-3">
                            <div
                              className={`text-[8px] font-bold tracking-[0.2em] ${muted}`}
                            >
                              CASE STUDY
                            </div>

                            <span
                              className={`h-px w-5 ${
                                darkMode
                                  ? "bg-white/15"
                                  : "bg-black/15"
                              }`}
                            />

                            <div
                              className={`text-[8px] tracking-[0.16em] ${muted}`}
                            >
                              {project.number}
                            </div>
                          </div>

                          <h3 className="max-w-[620px] text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
                            {project.title}
                          </h3>

                          <p
                            className={`mt-7 max-w-[620px] text-[14px] leading-7 ${soft}`}
                          >
                            {project.description}
                          </p>

                          <div
                            className={`mt-8 grid grid-cols-2 gap-5 border-y py-5 ${border}`}
                          >
                            <div className="project-meta-cell">
                              <div
                                className={`text-[8px] font-bold tracking-[0.2em] ${muted}`}
                              >
                                ROLE
                              </div>

                              <div className="mt-2 text-[11px] font-medium leading-5">
                                {project.role}
                              </div>
                            </div>

                            <div className="project-meta-cell">
                              <div
                                className={`text-[8px] font-bold tracking-[0.2em] ${muted}`}
                              >
                                TYPE
                              </div>

                              <div className="mt-2 text-[11px] font-medium leading-5">
                                {project.category}
                              </div>
                            </div>
                          </div>

                          <div className="mt-7">
                            <div
                              className={`text-[8px] font-bold tracking-[0.2em] ${muted}`}
                            >
                              PROJECT DETAILS
                            </div>

                            <div className="mt-3 space-y-2.5">
                              {project.details.map(
                                (detail) => (
                                  <div
                                    key={detail}
                                    className={`flex items-start gap-3 text-[11px] leading-5 ${soft}`}
                                  >
                                    <span
                                      className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${
                                        darkMode
                                          ? "bg-white/50"
                                          : "bg-black/50"
                                      }`}
                                    />

                                    <span>{detail}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          <div className="mt-7">
                            <div
                              className={`text-[8px] font-bold tracking-[0.2em] ${muted}`}
                            >
                              TECH STACK
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className={`project-tech rounded-full border px-3 py-2 text-[8px] font-semibold tracking-[0.1em] backdrop-blur-xl ${glass}`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-10">
                          <div className="flex items-center justify-between gap-5">
                            {project.link ? (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`project-open-button ${
                                  darkMode
                                    ? "dark-project-open"
                                    : ""
                                } group inline-flex items-center gap-3 rounded-full px-5 py-3 text-[10px] font-bold tracking-[0.16em] transition-transform duration-200 hover:-translate-y-1`}
                              >
                                OPEN PROJECT

                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                  <ExternalIcon />
                                </span>
                              </a>
                            ) : (
                              <div
                                className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-[10px] font-bold tracking-[0.16em] ${glass}`}
                              >
                                PROJECT SHOWCASE
                              </div>
                            )}

                            <span
                              className={`text-[8px] tracking-[0.14em] ${muted}`}
                            >
                              {project.number} /{" "}
                              {String(projects.length).padStart(
                                2,
                                "0"
                              )}
                            </span>
                          </div>

                          <div
                            className={`project-progress mt-7 h-px w-full ${
                              darkMode
                                ? "bg-white/[0.08]"
                                : "bg-black/[0.08]"
                            } ${muted}`}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div
              className={`rounded-[28px] border p-12 text-center ${glass}`}
            >
              <div
                className={`text-[10px] font-bold tracking-[0.2em] ${muted}`}
              >
                NO PROJECTS
              </div>

              <p className={`mt-3 text-sm ${soft}`}>
                Belum ada project pada kategori ini.
              </p>
            </div>
          )}

          <Reveal delay={100}>
            <div
              className={`mt-20 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${border}`}
            >
              <div
                className={`text-[8px] font-bold tracking-[0.18em] ${muted}`}
              >
                END OF SELECTED WORK
              </div>

              <a
                href="#contact"
                className={`contact-link group flex w-fit items-center gap-3 text-[9px] font-bold tracking-[0.16em] ${soft}`}
              >
                START A CONVERSATION

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* EXPERIENCE */}
      {/* ========================================================= */}

      <section
        id="experience"
        className="scroll-mt-24 px-5 py-28 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1380px]">
          <Reveal>
            <div
              className={`section-line mb-14 border-t pt-5 ${border}`}
            >
              <div
                className={`text-[10px] font-bold tracking-[0.25em] ${muted}`}
              >
                03 / EXPERIENCE
              </div>
            </div>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr]">
            <Reveal>
              <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.065em]">
                From
                <br />
                school
                <br />
                to
                <br />
                industry.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <div
                  className={`experience-item border-b py-8 ${border}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className={`text-[10px] font-bold tracking-[0.2em] ${muted}`}
                    >
                      MAY — JULY 2026
                    </div>

                    <span
                      className={`experience-tag rounded-full border px-3 py-1.5 text-[8px] font-semibold tracking-[0.16em] ${glass}`}
                    >
                      PKL
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-semibold">
                    PT Riset Perkebunan Nusantara
                  </h3>

                  <p
                    className={`mt-4 max-w-[680px] text-[14px] leading-7 ${soft}`}
                  >
                    Pengalaman PKL di IT Center RPN dengan
                    keterlibatan dalam pembuatan media visual,
                    poster keamanan digital, 3D visualization
                    Seed Counter, dokumentasi, serta aktivitas
                    pengolahan sampel di laboratorium.
                  </p>
                </div>

                <div
                  className={`experience-item border-b py-8 ${border}`}
                >
                  <div
                    className={`text-[10px] font-bold tracking-[0.2em] ${muted}`}
                  >
                    ROLE
                  </div>

                  <h3 className="mt-3 text-2xl font-semibold">
                    Informatics Student / Developer
                  </h3>

                  <p
                    className={`mt-4 max-w-[680px] text-[14px] leading-7 ${soft}`}
                  >
                    Fokus pada pengembangan aplikasi, website,
                    database, interface, visual design, dan
                    eksplorasi teknologi digital.
                  </p>
                </div>

                <div
                  className={`experience-item py-8 ${border}`}
                >
                  <div
                    className={`text-[10px] font-bold tracking-[0.2em] ${muted}`}
                  >
                    CURRENT DIRECTION
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "WEB",
                      "MOBILE",
                      "UI / UX",
                      "DATABASE",
                      "3D",
                    ].map((item) => (
                      <span
                        key={item}
                        className={`experience-tag rounded-full border px-4 py-2.5 text-[9px] font-semibold tracking-[0.14em] ${glass}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SKILLS */}
      {/* ========================================================= */}

      <section
        id="skills"
        className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1380px]">
          <Reveal>
            <div
              className={`section-line mb-14 border-t pt-5 ${border}`}
            >
              <div
                className={`text-[10px] font-bold tracking-[0.25em] ${muted}`}
              >
                04 / SKILLS
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="mb-12 max-w-[760px]">
              <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.065em]">
                Toolbox.
              </h2>

              <p
                className={`mt-6 text-[14px] leading-7 ${soft}`}
              >
                Kumpulan teknologi dan tools yang digunakan untuk
                membangun produk digital dari struktur, interface,
                sampai visual.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index * 70}
                className={
                  index === skillGroups.length - 1
                    ? "md:col-span-2"
                    : ""
                }
              >
                <div
                  className={`skill-card glass-shine h-full rounded-[28px] border p-7 backdrop-blur-2xl ${glass} ${glassHover}`}
                >
                  <div className="flex items-center justify-between gap-5">
                    <div
                      className={`text-[10px] font-bold tracking-[0.22em] ${muted}`}
                    >
                      {group.title}
                    </div>

                    <div
                      className={`text-[8px] font-bold tracking-[0.16em] ${muted}`}
                    >
                      {String(group.skills.length).padStart(
                        2,
                        "0"
                      )}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`skill-chip rounded-full border px-4 py-2.5 text-[10px] font-medium backdrop-blur-xl ${glass}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TIMELINE */}
      {/* ========================================================= */}

      <section
        id="timeline"
        className="scroll-mt-24 px-5 py-28 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1380px]">
          <Reveal>
            <div
              className={`section-line mb-14 border-t pt-5 ${border}`}
            >
              <div
                className={`text-[10px] font-bold tracking-[0.25em] ${muted}`}
              >
                05 / TIMELINE
              </div>
            </div>
          </Reveal>

          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr]">
            <Reveal>
              <h2 className="text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.88] tracking-[-0.07em]">
                The
                <br />
                journey.
              </h2>
            </Reveal>

            <div>
              {timeline.map((item, index) => (
                <Reveal
                  key={item.year}
                  delay={index * 80}
                >
                  <div
                    className={`timeline-item grid gap-5 border-b py-8 sm:grid-cols-[140px_1fr] ${border}`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`timeline-marker mt-[3px] h-2 w-2 shrink-0 rounded-full border ${
                          darkMode
                            ? "border-white/40 bg-white/10"
                            : "border-black/40 bg-black/10"
                        }`}
                      />

                      <div
                        className={`text-[11px] font-bold tracking-[0.12em] ${muted}`}
                      >
                        {item.year}
                      </div>
                    </div>

                    <div>
                      <h3 className="timeline-title text-xl font-semibold">
                        {item.title}
                      </h3>

                      <p
                        className={`mt-3 max-w-[650px] text-[13px] leading-6 ${soft}`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ABOUT */}
<section id="about" className="scroll-mt-24 px-5 py-28 sm:px-8 lg:px-12">
  <div className="mx-auto max-w-[1380px]">
    <Reveal>
      <div className={`section-line mb-14 border-t pt-5 ${border}`}>
        <div className={`text-[10px] font-bold tracking-[0.25em] ${muted}`}>
          06 / ABOUT
        </div>
      </div>
    </Reveal>

    <div className="grid items-start gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
      {/* PHOTO */}
      <Reveal>
        <div className="mx-auto w-full max-w-[420px] lg:mx-0">
          <div
            className={`about-frame group relative aspect-[3/4] overflow-hidden rounded-[30px] border p-2 backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-2 ${glass}`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[23px] bg-neutral-900">
              {!photoError ? (
                <img
                  src="/images/profile/aldi.jpg"
                  alt="Aldi Aldiansyah"
                  onError={() => setPhotoError(true)}
                  className="about-photo h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-center text-white">
                  <div className="text-5xl font-black">A</div>
                  <div className="mt-4 text-[9px] font-bold tracking-[0.2em] text-white/40">
                    PHOTO NOT FOUND
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.2em]">
                    ALDI ALDIANSYAH
                  </div>
                  <div className="mt-1 text-[8px] tracking-[0.15em] text-white/60">
                    ALDEV / INFORMATICS
                  </div>
                </div>

                <div className="text-[8px] tracking-[0.18em]">
                  2026
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-4 flex items-center justify-between text-[8px] font-semibold tracking-[0.16em] ${muted}`}
          >
            <span>PORTRAIT / 2026</span>
            <span>ALDEV</span>
          </div>
        </div>
      </Reveal>

      {/* STORY */}
      <Reveal delay={120}>
        <div>
          <div className={`mb-5 text-[9px] font-bold tracking-[0.2em] ${muted}`}>
            PROFILE / WHO I AM
          </div>

          <h2 className="max-w-[850px] text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.065em]">
            I&apos;m Aldi.
            <span className={`block ${muted}`}>
              I build, explore,
              <br />
              and keep learning.
            </span>
          </h2>

          <div className="mt-9 max-w-[760px] space-y-5">
            <p className={`text-[15px] leading-8 ${soft}`}>
              Saya Aldi Aldiansyah, siswa kelas XII PPLG 4 di SMK Informatika
              CBI. Saya mulai mengenal dunia Informatika sejak 2024, dan sejak
              saat itu saya terus mencoba memahami bagaimana teknologi bisa
              digunakan untuk membuat sesuatu yang benar-benar berguna.
            </p>

            <p className={`text-[15px] leading-8 ${soft}`}>
              Awalnya saya banyak belajar dari website dan database. Dari sana,
              rasa penasaran saya berkembang ke mobile development, UI/UX,
              desain visual, multimedia, sampai 3D visualization. Saya suka
              proses ketika sebuah ide yang masih sederhana perlahan berubah
              menjadi interface, aplikasi, website, atau visual yang bisa
              dilihat dan digunakan.
            </p>

            <p className={`text-[15px] leading-8 ${soft}`}>
              Pengalaman PKL di PT Riset Perkebunan Nusantara juga memberi saya
              kesempatan untuk melihat bagaimana kemampuan yang dipelajari di
              sekolah digunakan dalam lingkungan kerja nyata. Saya terlibat
              dalam pembuatan media visual, poster keamanan digital, visualisasi
              3D Seed Counter, dokumentasi, hingga aktivitas di laboratorium.
            </p>

            <p className={`text-[15px] leading-8 ${soft}`}>
              Sekarang saya ingin terus berkembang sebagai seseorang yang tidak
              hanya bisa menulis kode, tetapi juga memahami bagaimana sebuah
              produk terlihat, terasa, dan bekerja. Buat saya, teknologi,
              desain, dan kreativitas bukan tiga hal yang terpisah — semuanya
              bisa saling melengkapi untuk membuat karya digital yang lebih
              baik.
            </p>
          </div>

          {/* IDENTITY STATS */}
          <div className={`mt-11 grid max-w-[760px] grid-cols-3 border-y ${border}`}>
            <div className={`about-stat border-r py-6 pr-4 ${border}`}>
              <div className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none tracking-[-0.06em]">
                2024
              </div>
              <div className={`mt-3 text-[8px] font-bold tracking-[0.16em] ${muted}`}>
                STARTED INFORMATICS
              </div>
            </div>

            <div className={`about-stat border-r px-4 py-6 ${border}`}>
              <div className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none tracking-[-0.06em]">
                05
              </div>
              <div className={`mt-3 text-[8px] font-bold tracking-[0.16em] ${muted}`}>
                SELECTED PROJECTS
              </div>
            </div>

            <div className="about-stat py-6 pl-4">
              <div className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none tracking-[-0.06em]">
                2026
              </div>
              <div className={`mt-3 text-[8px] font-bold tracking-[0.16em] ${muted}`}>
                INDUSTRIAL EXPERIENCE
              </div>
            </div>
          </div>

          {/* PERSONAL INFO */}
          <div
            className={`mt-8 grid max-w-[760px] gap-6 border-t pt-7 sm:grid-cols-3 ${border}`}
          >
            <div>
              <div className={`text-[9px] tracking-[0.18em] ${muted}`}>
                SCHOOL
              </div>
              <div className="mt-2 text-[12px] font-medium">
                SMK INFORMATIKA CBI
              </div>
            </div>

            <div>
              <div className={`text-[9px] tracking-[0.18em] ${muted}`}>
                CLASS
              </div>
              <div className="mt-2 text-[12px] font-medium">
                XII PPLG 4
              </div>
            </div>

            <div>
              <div className={`text-[9px] tracking-[0.18em] ${muted}`}>
                IDENTITY
              </div>
              <div className="mt-2 text-[12px] font-medium">
                ALDEV / DIGITAL CREATOR
              </div>
            </div>
          </div>

          {/* WHAT I EXPLORE */}
          <div className="mt-9">
            <div className={`mb-3 text-[8px] font-bold tracking-[0.2em] ${muted}`}>
              WHAT I&apos;M EXPLORING
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "WEB DEVELOPMENT",
                "MOBILE DEVELOPMENT",
                "UI / UX",
                "DATABASE",
                "VISUAL DESIGN",
                "3D VISUALIZATION",
                "MULTIMEDIA",
              ].map((focus) => (
                <span
                  key={focus}
                  className={`focus-pill rounded-full border px-3.5 py-2 text-[8px] font-semibold tracking-[0.12em] ${glass}`}
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          {/* CLOSING STATEMENT */}
          <div
            className={`mt-10 border-l-2 pl-5 ${
              darkMode ? "border-white/25" : "border-black/20"
            }`}
          >
            <p className={`max-w-[680px] text-[13px] leading-7 ${soft}`}>
              <span className="font-semibold">
                I&apos;m still at the beginning of the journey.
              </span>{" "}
              Masih banyak hal yang ingin saya pelajari, eksperimen yang ingin
              saya coba, dan project yang ingin saya bangun. ALDEV adalah ruang
              untuk mendokumentasikan proses tersebut — satu project, satu
              pengalaman, dan satu langkah pada satu waktu.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
</section>

      {/* ========================================================= */}
      {/* CONTACT */}
      {/* ========================================================= */}

      <section
        id="contact"
        className="scroll-mt-24 px-5 py-28 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1380px]">
          <Reveal>
            <div
              className={`section-line border-t pt-5 ${border}`}
            >
              <div
                className={`text-[10px] font-bold tracking-[0.25em] ${muted}`}
              >
                07 / CONTACT
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="py-20">
              <div
                className={`mb-7 text-[9px] font-semibold tracking-[0.2em] ${muted}`}
              >
                AVAILABLE FOR CREATIVE & DEVELOPMENT WORK
              </div>

              <h2 className="contact-title max-w-[1050px] text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.87] tracking-[-0.075em]">
                Let&apos;s build
                <span className={`block ${muted}`}>
                  something.
                </span>
              </h2>

              <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="mailto:aldiansyh421@gmail.com"
                  className={`email-button ${
                    darkMode ? "dark-email" : ""
                  } group inline-flex w-fit items-center gap-3 rounded-full px-6 py-3.5 text-[10px] font-bold tracking-[0.15em] hover:-translate-y-1`}
                >
                  EMAIL

                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>

                <a
                  href="https://instagram.com/_di1.a_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex w-fit items-center gap-3 rounded-full border px-6 py-3.5 text-[10px] font-bold tracking-[0.15em] backdrop-blur-xl transition-[background-color,border-color,transform] duration-200 hover:-translate-y-1 ${glass} ${glassHover}`}
                >
                  INSTAGRAM

                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    <ExternalIcon />
                  </span>
                </a>

                <div
                  className={`inline-flex w-fit items-center gap-3 rounded-full border px-6 py-3.5 text-[10px] font-bold tracking-[0.15em] backdrop-blur-xl ${glass}`}
                >
                  GITHUB — COMING SOON
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <footer
        className={`border-t px-5 py-8 sm:px-8 lg:px-12 ${border}`}
      >
        <div className="mx-auto flex max-w-[1380px] flex-col gap-4 text-[9px] font-medium tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between">
          <div className={muted}>
            © 2026 ALDEV — ALDI ALDIANSYAH
          </div>

          <div className={muted}>
            DESIGNED & BUILT WITH CODE
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* BACK TO TOP */}
      {/* ========================================================= */}

      <button
        type="button"
        onClick={goToTop}
        aria-label="Back to top"
        className={`back-top fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-2xl sm:bottom-7 sm:right-7 ${
          showTopButton
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        } ${glass}`}
      >
        <ArrowUpIcon />
      </button>
    </main>
  );
}