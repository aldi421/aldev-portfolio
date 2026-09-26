"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: number;
  number: string;
  title: string;
  category: string;
  description: string;
  role: string;
  details: string[];
  tech: string[];
  image: string;
  icon: string | null;
  type: string;
  link: string | null;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  number: string;
  title: string;
  category: string;
  description: string;
  role: string;
  details: string;
  tech: string;
  image: string;
  icon: string;
  type: string;
  link: string;
};

type Theme = "light" | "dark";

const initialForm: FormState = {
  number: "",
  title: "",
  category: "",
  description: "",
  role: "",
  details: "",
  tech: "",
  image: "",
  icon: "",
  type: "",
  link: "",
};

export default function AdminPage() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  // ============================================================
  // AUTH
  // ============================================================

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // ============================================================
  // PROJECTS
  // ============================================================

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FORM
  // ============================================================

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [imageError, setImageError] = useState(false);
  const [iconError, setIconError] = useState(false);

  const isEditing = editingId !== null;

  // ============================================================
  // AUTHENTICATION CHECK
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    async function checkAuthentication() {
      try {
        setCheckingAuth(true);

        const response = await fetch(
          "/api/auth/me",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (!cancelled) {
            setAuthenticated(false);
            router.replace("/admin/login");
          }

          return;
        }

        const data = await response.json();

        if (!data.authenticated) {
          if (!cancelled) {
            setAuthenticated(false);
            router.replace("/admin/login");
          }

          return;
        }

        if (!cancelled) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error(
          "Authentication check error:",
          error
        );

        if (!cancelled) {
          setAuthenticated(false);
          router.replace("/admin/login");
        }
      } finally {
        if (!cancelled) {
          setCheckingAuth(false);
        }
      }
    }

    void checkAuthentication();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // ============================================================
  // THEME
  // ============================================================

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "aldev-theme"
    );

    let initialTheme: Theme;

    if (
      savedTheme === "dark" ||
      savedTheme === "light"
    ) {
      initialTheme = savedTheme;
    } else {
      initialTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";
    }

    setDarkMode(initialTheme === "dark");

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );

    setThemeReady(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme =
      darkMode ? "light" : "dark";

    setDarkMode(nextTheme === "dark");

    localStorage.setItem(
      "aldev-theme",
      nextTheme
    );

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );
  }

  // ============================================================
  // FETCH PROJECTS
  // ============================================================

  useEffect(() => {
    if (
      checkingAuth ||
      !authenticated
    ) {
      return;
    }

    void fetchProjects();
  }, [
    checkingAuth,
    authenticated,
  ]);

  useEffect(() => {
    setImageError(false);
  }, [form.image]);

  useEffect(() => {
    setIconError(false);
  }, [form.icon]);

  async function fetchProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/projects",
        {
          cache: "no-store",
        }
      );

      if (response.status === 401) {
        setAuthenticated(false);
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          "Gagal mengambil data project."
        );
      }

      const data = await response.json();

      if (
        !data.success ||
        !Array.isArray(data.projects)
      ) {
        throw new Error(
          data.error ||
            "Format data project tidak valid."
        );
      }

      setProjects(data.projects);
    } catch (err) {
      console.error(
        "Fetch projects error:",
        err
      );

      setError(
        "Gagal mengambil data project dari database."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // LOGOUT
  // ============================================================

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    try {
      setLoggingOut(true);

      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      setAuthenticated(false);
      router.replace("/admin/login");
      router.refresh();
    }
  }

  // ============================================================
  // FORM
  // ============================================================

  function updateField(
    field: keyof FormState,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(initialForm);
    setFormError("");
    setImageError(false);
    setIconError(false);
    setShowForm(true);
  }

  function openEditForm(
    project: Project
  ) {
    setEditingId(project.id);

    setForm({
      number: project.number,
      title: project.title,
      category: project.category,
      description: project.description,
      role: project.role,
      details:
        project.details.join("\n"),
      tech:
        project.tech.join(", "),
      image: project.image,
      icon: project.icon ?? "",
      type: project.type,
      link: project.link ?? "",
    });

    setFormError("");
    setImageError(false);
    setIconError(false);
    setShowForm(true);
  }

  function closeForm() {
    if (saving) {
      return;
    }

    setShowForm(false);
    setEditingId(null);
    setFormError("");
    setForm(initialForm);
    setImageError(false);
    setIconError(false);
  }

  // ============================================================
  // CREATE / UPDATE
  // ============================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setFormError("");

    if (
      !form.number.trim() ||
      !form.title.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !form.role.trim() ||
      !form.details.trim() ||
      !form.tech.trim() ||
      !form.image.trim() ||
      !form.type.trim()
    ) {
      setFormError(
        "Isi semua field wajib terlebih dahulu."
      );

      return;
    }

    try {
      setSaving(true);

      const payload = {
        number:
          form.number.trim(),

        title:
          form.title.trim(),

        category:
          form.category.trim(),

        description:
          form.description.trim(),

        role:
          form.role.trim(),

        details:
          form.details
            .split("\n")
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),

        tech:
          form.tech
            .split(",")
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),

        image:
          form.image.trim(),

        icon:
          form.icon.trim() ||
          null,

        type:
          form.type.trim(),

        link:
          form.link.trim() ||
          null,
      };

      const url = isEditing
        ? `/api/projects/${editingId}`
        : "/api/projects";

      const method = isEditing
        ? "PUT"
        : "POST";

      const response =
        await fetch(url, {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        });

      if (
        response.status === 401
      ) {
        setAuthenticated(false);
        router.replace(
          "/admin/login"
        );
        return;
      }

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            (isEditing
              ? "Gagal memperbarui project."
              : "Gagal membuat project.")
        );
      }

      closeForm();

      await fetchProjects();
    } catch (err) {
      console.error(
        "Save project error:",
        err
      );

      setFormError(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan project."
      );
    } finally {
      setSaving(false);
    }
  }

  // ============================================================
  // DELETE
  // ============================================================

  async function handleDelete(
    project: Project
  ) {
    const confirmed =
      window.confirm(
        `Hapus project "${project.title}"?\n\nData yang dihapus tidak bisa dikembalikan.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(project.id);

      const response =
        await fetch(
          `/api/projects/${project.id}`,
          {
            method: "DELETE",
          }
        );

      if (
        response.status === 401
      ) {
        setAuthenticated(false);
        router.replace(
          "/admin/login"
        );
        return;
      }

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Gagal menghapus project."
        );
      }

      await fetchProjects();
    } catch (err) {
      console.error(
        "Delete project error:",
        err
      );

      window.alert(
        err instanceof Error
          ? err.message
          : "Gagal menghapus project."
      );
    } finally {
      setDeletingId(null);
    }
  }

  // ============================================================
  // AUTH LOADING
  // ============================================================

  if (
    checkingAuth ||
    !authenticated ||
    !themeReady
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3] text-black dark:bg-[#080808] dark:text-white">
        <div className="flex items-center gap-3 text-sm text-black/45 dark:text-white/40">
          <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
          Checking workspace...
        </div>
      </main>
    );
  }

  // ============================================================
  // DASHBOARD
  // ============================================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f5f3] text-black transition-colors duration-300 dark:bg-[#080808] dark:text-white">
      {/* ========================================================
          AMBIENT BACKGROUND
      ======================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-black/[0.025] blur-[120px] dark:bg-white/[0.025]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-black/[0.02] blur-[120px] dark:bg-white/[0.02]" />

        <div
          className="absolute inset-0 opacity-[0.018] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize:
              "72px 72px",
          }}
        />
      </div>

      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="relative z-30 border-b border-black/[0.07] bg-[#f5f5f3]/80 px-5 py-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#080808]/80 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/[0.08] bg-white/70 p-2 shadow-sm backdrop-blur-xl dark:border-white/[0.1] dark:bg-white/[0.06]">
              <Image
                src="/images/branding/logo.png"
                alt="ALDEV"
                width={40}
                height={40}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                ALDEV
              </p>

              <p className="truncate text-[9px] uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
                Portfolio CMS
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Status */}
            <div className="mr-1 hidden items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-black/35 dark:text-white/30 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              System Online
            </div>

            {/* Theme */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                darkMode
                  ? "Light mode"
                  : "Dark mode"
              }
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white/70 text-black/60 shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-black/15 hover:bg-white hover:text-black active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-white/60 dark:hover:border-white/15 dark:hover:bg-white/[0.09] dark:hover:text-white"
            >
              {darkMode ? (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:rotate-12"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.42 1.42" />
                  <path d="m17.65 17.65 1.42 1.42" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-rotate-12"
                >
                  <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z" />
                </svg>
              )}
            </button>

            {/* Portfolio */}
            <a
              href="/"
              className="hidden h-10 items-center rounded-xl border border-black/[0.08] bg-white/60 px-4 text-xs font-medium transition duration-200 hover:border-black/15 hover:bg-white dark:border-white/[0.1] dark:bg-white/[0.04] dark:hover:border-white/15 dark:hover:bg-white/[0.08] sm:flex"
            >
              <span className="mr-2 opacity-40">
                ↗
              </span>
              Portfolio
            </a>

            {/* Logout */}
            <button
              type="button"
              onClick={() =>
                void handleLogout()
              }
              disabled={loggingOut}
              className={
                loggingOut
                  ? "h-10 rounded-xl border border-red-500/15 px-4 text-xs font-medium text-red-500 opacity-50"
                  : "h-10 rounded-xl border border-red-500/15 px-4 text-xs font-medium text-red-500 transition duration-200 hover:bg-red-500/[0.05] active:scale-[0.98] dark:border-red-400/15 dark:text-red-400 dark:hover:bg-red-400/[0.06]"
              }
            >
              {loggingOut
                ? "..."
                : "Logout"}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* INTRO */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-black/20 dark:bg-white/20" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-black/35 dark:text-white/30">
                Content Management
              </span>
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.065em] sm:text-6xl">
              Manage your
              <br />
              <span className="text-black/25 dark:text-white/20">
                work.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-black/45 dark:text-white/40 sm:text-base">
              Kelola project yang ditampilkan
              pada portfolio ALDEV melalui
              satu workspace.
            </p>
          </div>

          <div className="hidden text-right lg:block">
            <p className="text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
              Workspace
            </p>

            <p className="mt-2 text-sm font-medium">
              ALDEV / CMS
            </p>

            <p className="mt-1 text-xs text-black/35 dark:text-white/30">
              Private administrator area
            </p>
          </div>
        </div>

        {/* ======================================================
            STATS
        ====================================================== */}

        <div className="grid gap-3 md:grid-cols-3">
          <StatCard
            label="Projects"
            value={
              loading
                ? "—"
                : String(projects.length)
            }
            description={
              loading
                ? "Mengambil data..."
                : "Project tersimpan"
            }
            darkMode={darkMode}
          />

          <StatCard
            label="Backend"
            value={
              error
                ? "Offline"
                : "Ready"
            }
            description={
              error
                ? "Database tidak terhubung"
                : "Prisma + Neon"
            }
            darkMode={darkMode}
            status={!error}
          />

          <StatCard
            label="System"
            value="ALDEV CMS"
            description="Production workspace"
            darkMode={darkMode}
          />
        </div>

        {/* ======================================================
            PROJECT MANAGEMENT
        ====================================================== */}

        <div className="mt-8 overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/65 shadow-[0_20px_80px_rgba(0,0,0,0.035)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.035] dark:shadow-none">
          {/* Section Header */}
          <div className="border-b border-black/[0.07] p-6 dark:border-white/[0.07] sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 dark:text-white/30">
                  Project Management
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  Portfolio Projects
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-black/40 dark:text-white/35">
                  Tambahkan, edit, atau hapus
                  project yang tampil pada
                  portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateForm}
                className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-black px-5 text-xs font-medium text-white transition duration-200 hover:scale-[1.01] hover:bg-black/85 active:scale-[0.99] dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <span className="text-base leading-none">
                  +
                </span>

                Tambah Project
              </button>
            </div>
          </div>

          {/* Project List */}
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex min-h-32 items-center justify-center rounded-2xl border border-black/[0.07] text-sm text-black/40 dark:border-white/[0.07] dark:text-white/30">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                  Mengambil project...
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/[0.12] p-12 text-center dark:border-white/[0.12]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.08] bg-black/[0.02] text-xl dark:border-white/[0.08] dark:bg-white/[0.03]">
                  +
                </div>

                <p className="mt-5 text-sm font-medium">
                  Belum ada project
                </p>

                <p className="mt-2 text-xs text-black/40 dark:text-white/30">
                  Tambahkan project pertama
                  untuk mulai mengisi portfolio.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {projects.map(
                  (project) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      darkMode={darkMode}
                      deleting={
                        deletingId ===
                        project.id
                      }
                      onEdit={() =>
                        openEditForm(
                          project
                        )
                      }
                      onDelete={() =>
                        void handleDelete(
                          project
                        )
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          MODAL
      ======================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/55 p-3 backdrop-blur-md sm:p-6">
          <div className="flex min-h-full items-start justify-center py-4 sm:items-center sm:py-8">
            <div className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-black/[0.09] bg-[#f7f7f5] shadow-[0_30px_120px_rgba(0,0,0,0.2)] dark:border-white/[0.09] dark:bg-[#111111] dark:shadow-[0_30px_120px_rgba(0,0,0,0.5)]">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 border-b border-black/[0.07] bg-[#f7f7f5]/90 px-6 py-5 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#111111]/90 sm:px-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 dark:text-white/30">
                        {isEditing
                          ? "Edit Project"
                          : "New Project"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                      {isEditing
                        ? "Edit project"
                        : "Tambah project"}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-black/40 dark:text-white/30">
                      {isEditing
                        ? "Perubahan akan langsung disimpan ke database."
                        : "Project baru akan langsung disimpan ke database."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    aria-label="Close modal"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] text-black/45 transition hover:bg-black/[0.04] hover:text-black disabled:opacity-40 dark:border-white/[0.08] dark:text-white/40 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12" />
                      <path d="M18 6 6 18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 sm:p-8">
                <form
                  onSubmit={(event) =>
                    void handleSubmit(
                      event
                    )
                  }
                  className="space-y-6"
                >
                  {/* Number + Type */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                      label="Nomor Project"
                      required
                      darkMode={
                        darkMode
                      }
                    >
                      <input
                        value={
                          form.number
                        }
                        onChange={(
                          event
                        ) =>
                          updateField(
                            "number",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="06"
                        className={inputClass(
                          darkMode
                        )}
                      />
                    </FormField>

                    <FormField
                      label="Type"
                      required
                      darkMode={
                        darkMode
                      }
                    >
                      <input
                        value={
                          form.type
                        }
                        onChange={(
                          event
                        ) =>
                          updateField(
                            "type",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="desktop"
                        className={inputClass(
                          darkMode
                        )}
                      />
                    </FormField>
                  </div>

                  {/* Title */}
                  <FormField
                    label="Judul Project"
                    required
                    darkMode={
                      darkMode
                    }
                  >
                    <input
                      value={
                        form.title
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "title",
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="SmartDisk PRO"
                      className={inputClass(
                        darkMode
                      )}
                    />
                  </FormField>

                  {/* Category + Role */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                      label="Category"
                      required
                      darkMode={
                        darkMode
                      }
                    >
                      <input
                        value={
                          form.category
                        }
                        onChange={(
                          event
                        ) =>
                          updateField(
                            "category",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="DESKTOP APPLICATION"
                        className={inputClass(
                          darkMode
                        )}
                      />
                    </FormField>

                    <FormField
                      label="Role"
                      required
                      darkMode={
                        darkMode
                      }
                    >
                      <input
                        value={
                          form.role
                        }
                        onChange={(
                          event
                        ) =>
                          updateField(
                            "role",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="Python Desktop Development"
                        className={inputClass(
                          darkMode
                        )}
                      />
                    </FormField>
                  </div>

                  {/* Description */}
                  <FormField
                    label="Description"
                    required
                    darkMode={
                      darkMode
                    }
                  >
                    <textarea
                      value={
                        form.description
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "description",
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="Deskripsi singkat project..."
                      rows={4}
                      className={inputClass(
                        darkMode
                      )}
                    />
                  </FormField>

                  {/* Details */}
                  <FormField
                    label="Details"
                    required
                    hint="Satu detail per baris."
                    darkMode={
                      darkMode
                    }
                  >
                    <textarea
                      value={
                        form.details
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "details",
                          event
                            .target
                            .value
                        )
                      }
                      placeholder={
                        "Dashboard analisis storage\nDuplicate Finder\nCleaner dan Organizer"
                      }
                      rows={5}
                      className={inputClass(
                        darkMode
                      )}
                    />
                  </FormField>

                  {/* Tech */}
                  <FormField
                    label="Tech Stack"
                    required
                    hint="Pisahkan dengan koma."
                    darkMode={
                      darkMode
                    }
                  >
                    <input
                      value={
                        form.tech
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "tech",
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="Python, CustomTkinter, Git, GitHub"
                      className={inputClass(
                        darkMode
                      )}
                    />
                  </FormField>

                  {/* Image */}
                  <FormField
                    label="Image URL"
                    required
                    hint="Path gambar dari folder public."
                    darkMode={
                      darkMode
                    }
                  >
                    <input
                      value={
                        form.image
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "image",
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="/images/projects/project/screenshot.jpg"
                      className={inputClass(
                        darkMode
                      )}
                    />

                    <div className="mt-3 overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.02]">
                      {form.image.trim() &&
                      !imageError ? (
                        <>
                          <img
                            src={
                              form.image.trim()
                            }
                            alt={
                              form.title
                                ? `Preview ${form.title}`
                                : "Project preview"
                            }
                            onError={() =>
                              setImageError(
                                true
                              )
                            }
                            className="max-h-72 w-full object-contain"
                          />

                          <div className="border-t border-black/[0.07] px-4 py-3 dark:border-white/[0.07]">
                            <p className="break-all text-[10px] text-black/35 dark:text-white/30">
                              {
                                form.image
                              }
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="p-8 text-center text-xs text-black/30 dark:text-white/25">
                          {form.image.trim() &&
                          imageError
                            ? "Gambar tidak ditemukan. Cek kembali Image URL."
                            : "Preview gambar akan muncul di sini."}
                        </div>
                      )}
                    </div>
                  </FormField>

                  {/* Icon */}
                  <FormField
                    label="Icon URL"
                    hint="Opsional."
                    darkMode={
                      darkMode
                    }
                  >
                    <input
                      value={
                        form.icon
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "icon",
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="/images/projects/project/icon.png"
                      className={inputClass(
                        darkMode
                      )}
                    />

                    {form.icon.trim() &&
                      !iconError && (
                        <div className="mt-3 flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-black/[0.02] p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
                          <img
                            src={
                              form.icon.trim()
                            }
                            alt="Project icon preview"
                            onError={() =>
                              setIconError(
                                true
                              )
                            }
                            className="h-12 w-12 rounded-xl object-contain"
                          />

                          <div className="min-w-0">
                            <p className="text-xs font-medium">
                              Icon Preview
                            </p>

                            <p className="mt-1 break-all text-[10px] text-black/35 dark:text-white/30">
                              {
                                form.icon
                              }
                            </p>
                          </div>
                        </div>
                      )}

                    {form.icon.trim() &&
                      iconError && (
                        <div className="mt-3 rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-4 text-xs text-red-500 dark:text-red-400">
                          Icon tidak
                          ditemukan.
                          Cek kembali
                          Icon URL.
                        </div>
                      )}
                  </FormField>

                  {/* Link */}
                  <FormField
                    label="Project Link"
                    hint="Opsional."
                    darkMode={
                      darkMode
                    }
                  >
                    <input
                      value={
                        form.link
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "link",
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="https://..."
                      className={inputClass(
                        darkMode
                      )}
                    />
                  </FormField>

                  {/* Error */}
                  {formError && (
                    <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.04] px-4 py-3.5 text-xs leading-5 text-red-500 dark:text-red-400">
                      {formError}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col-reverse gap-3 border-t border-black/[0.07] pt-6 dark:border-white/[0.07] sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={
                        closeForm
                      }
                      disabled={
                        saving
                      }
                      className="h-11 rounded-xl border border-black/[0.09] px-5 text-xs font-medium transition hover:bg-black/[0.04] disabled:opacity-40 dark:border-white/[0.09] dark:hover:bg-white/[0.06]"
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      disabled={
                        saving
                      }
                      className="h-11 rounded-xl bg-black px-5 text-xs font-medium text-white transition hover:bg-black/85 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      {saving
                        ? isEditing
                          ? "Menyimpan..."
                          : "Menambahkan..."
                        : isEditing
                          ? "Simpan Perubahan"
                          : "Simpan Project"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  label,
  value,
  description,
  darkMode,
  status,
}: {
  label: string;
  value: string;
  description: string;
  darkMode: boolean;
  status?: boolean;
}) {
  return (
    <div className="rounded-[22px] border border-black/[0.08] bg-white/65 p-5 backdrop-blur-xl transition-colors duration-300 dark:border-white/[0.08] dark:bg-white/[0.035]">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 dark:text-white/30">
          {label}
        </p>

        {status !== undefined && (
          <span
            className={
              status
                ? "h-1.5 w-1.5 rounded-full bg-emerald-500"
                : "h-1.5 w-1.5 rounded-full bg-red-500"
            }
          />
        )}
      </div>

      <p className="mt-5 truncate text-2xl font-semibold tracking-[-0.04em]">
        {value}
      </p>

      <p className="mt-1.5 truncate text-xs text-black/35 dark:text-white/30">
        {description}
      </p>
    </div>
  );
}

// ============================================================
// PROJECT ROW
// ============================================================

function ProjectRow({
  project,
  darkMode,
  deleting,
  onEdit,
  onDelete,
}: {
  project: Project;
  darkMode: boolean;
  deleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group rounded-[20px] border border-black/[0.07] bg-white/45 p-4 transition duration-200 hover:border-black/[0.13] hover:bg-white/75 dark:border-white/[0.07] dark:bg-white/[0.018] dark:hover:border-white/[0.13] dark:hover:bg-white/[0.035] sm:p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Project Info */}
        <div className="flex min-w-0 items-start gap-4">
          <span className="pt-1 font-mono text-[10px] text-black/30 dark:text-white/25">
            {project.number}
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold tracking-[-0.01em]">
                {project.title}
              </h3>

              <span className="rounded-full border border-black/[0.07] px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.12em] text-black/35 dark:border-white/[0.07] dark:text-white/25">
                {project.type}
              </span>
            </div>

            <p className="mt-1 text-xs text-black/40 dark:text-white/30">
              {project.category}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech
                .slice(0, 5)
                .map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-black/[0.035] px-2 py-1 text-[9px] text-black/40 dark:bg-white/[0.045] dark:text-white/30"
                    >
                      {tech}
                    </span>
                  )
                )}

              {project.tech.length >
                5 && (
                <span className="rounded-md bg-black/[0.035] px-2 py-1 text-[9px] text-black/30 dark:bg-white/[0.045] dark:text-white/25">
                  +
                  {project.tech
                    .length - 5}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex h-9 items-center gap-2 rounded-xl border border-black/[0.08] px-3.5 text-[10px] font-medium transition duration-200 hover:bg-black/[0.04] active:scale-[0.98] dark:border-white/[0.08] dark:hover:bg-white/[0.06]"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>

            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="flex h-9 items-center gap-2 rounded-xl border border-red-500/15 px-3.5 text-[10px] font-medium text-red-500 transition duration-200 hover:bg-red-500/[0.05] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-400/15 dark:text-red-400 dark:hover:bg-red-400/[0.06]"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="M19 6l-1 14H6L5 6" />
            </svg>

            {deleting
              ? "Menghapus..."
              : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INPUT CLASS
// ============================================================

function inputClass(
  darkMode: boolean
) {
  return darkMode
    ? "min-h-11 w-full rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/20 hover:border-white/15 focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02]"
    : "min-h-11 w-full rounded-xl border border-black/[0.09] bg-white/70 px-4 py-3 text-sm text-black outline-none transition duration-200 placeholder:text-black/25 hover:border-black/15 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.025]";
}

// ============================================================
// FORM FIELD
// ============================================================

function FormField({
  label,
  required,
  hint,
  darkMode,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  darkMode: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45 dark:text-white/35">
          {label}

          {required && (
            <span className="ml-1 text-black/25 dark:text-white/20">
              *
            </span>
          )}
        </label>

        {hint && (
          <span className="text-[10px] text-black/25 dark:text-white/20">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}