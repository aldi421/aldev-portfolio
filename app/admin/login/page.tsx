"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Theme = "light" | "dark";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("aldev-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const initialTheme: Theme = prefersDark ? "dark" : "light";

      setTheme(initialTheme);
      document.documentElement.classList.toggle(
        "dark",
        initialTheme === "dark"
      );
    }
  }, []);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (response.ok) {
          router.replace("/admin");
          return;
        }
      } catch {
        // Abaikan error pengecekan session.
      } finally {
        setChecking(false);
      }
    }

    void checkSession();
  }, [router]);

  function toggleTheme() {
    const nextTheme: Theme =
      theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    localStorage.setItem("aldev-theme", nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Login gagal.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3] text-black dark:bg-[#080808] dark:text-white">
        <div className="flex items-center gap-3 text-sm text-black/50 dark:text-white/50">
          <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
          Checking session...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f5f3] text-black transition-colors duration-300 dark:bg-[#080808] dark:text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-black/[0.035] blur-[100px] dark:bg-white/[0.035]" />

        <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-black/[0.025] blur-[120px] dark:bg-white/[0.025]" />

        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Top Header */}
      <header className="absolute left-0 right-0 top-0 z-20 px-6 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-black/[0.08] bg-white/70 p-2 shadow-sm backdrop-blur-xl dark:border-white/[0.1] dark:bg-white/[0.06]">
              <Image
                src="/images/branding/logo.png"
                alt="ALDEV"
                width={40}
                height={40}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[-0.02em]">
                ALDEV
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-black/35 dark:text-white/35">
                Portfolio CMS
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* System Status */}
            <div className="hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black/35 dark:text-white/35 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              System Online
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Light mode"
                  : "Dark mode"
              }
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white/70 text-black/60 shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-black/15 hover:bg-white hover:text-black active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-white/60 dark:hover:border-white/15 dark:hover:bg-white/[0.09] dark:hover:text-white"
            >
              {theme === "dark" ? (
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
                  <circle cx="12" cy="12" r="4" />
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
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-10 pt-28 sm:px-8">
        <div className="grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_460px] lg:gap-24">
          {/* Left Branding */}
          <section className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-black/20 dark:bg-white/20" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/40 dark:text-white/40">
                  Secure Admin Access
                </span>
              </div>

              <h1 className="text-7xl font-semibold leading-[0.92] tracking-[-0.07em]">
                Your work.
                <br />
                <span className="text-black/25 dark:text-white/20">
                  Your space.
                </span>
              </h1>

              <p className="mt-8 max-w-md text-base leading-7 text-black/45 dark:text-white/40">
                Manage projects, update your portfolio, and keep
                your digital workspace organized from one place.
              </p>

              <div className="mt-12 flex items-center gap-8">
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">
                    ALDEV
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
                    Digital Portfolio
                  </p>
                </div>

                <div className="h-8 w-px bg-black/10 dark:bg-white/10" />

                <div>
                  <p className="text-xs font-medium">
                    Admin Workspace
                  </p>

                  <p className="mt-1 text-[10px] text-black/35 dark:text-white/30">
                    Private dashboard
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Login */}
          <section className="w-full">
            {/* Mobile heading */}
            <div className="mb-7 lg:hidden">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Secure Admin Access
              </div>

              <h1 className="text-4xl font-semibold tracking-[-0.06em]">
                Welcome back.
              </h1>

              <p className="mt-3 text-sm leading-6 text-black/45 dark:text-white/40">
                Sign in to manage your portfolio.
              </p>
            </div>

            {/* Glass Card */}
            <div className="rounded-[30px] border border-black/[0.08] bg-white/70 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-colors duration-300 dark:border-white/[0.09] dark:bg-white/[0.045] dark:shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <div className="rounded-[24px] border border-black/[0.05] bg-white/70 p-7 dark:border-white/[0.06] dark:bg-black/20 sm:p-8">
                {/* Card Header */}
                <div className="mb-8">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35 dark:text-white/30">
                      Administrator
                    </span>

                    <span className="rounded-full border border-black/[0.08] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-black/35 dark:border-white/[0.08] dark:text-white/30">
                      Private
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-[-0.05em]">
                    Sign in
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-black/40 dark:text-white/35">
                    Enter your administrator credentials to
                    continue.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    {/* Username */}
                    <div>
                      <label
                        htmlFor="username"
                        className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45 dark:text-white/40"
                      >
                        Username
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/25 dark:text-white/25">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21a8 8 0 0 0-16 0" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>

                        <input
                          id="username"
                          type="text"
                          autoComplete="username"
                          value={username}
                          onChange={(event) =>
                            setUsername(event.target.value)
                          }
                          placeholder="Enter username"
                          className="h-13 w-full rounded-2xl border border-black/[0.09] bg-black/[0.025] pl-11 pr-4 text-sm outline-none transition duration-200 placeholder:text-black/25 hover:border-black/15 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03] dark:border-white/[0.09] dark:bg-white/[0.025] dark:placeholder:text-white/20 dark:hover:border-white/15 dark:focus:border-white/30 dark:focus:bg-white/[0.055] dark:focus:ring-white/[0.03]"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45 dark:text-white/40"
                      >
                        Password
                      </label>

                      <div className="relative">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/25 dark:text-white/25">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="10"
                              rx="2"
                            />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>

                        <input
                          id="password"
                          type="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(event) =>
                            setPassword(event.target.value)
                          }
                          placeholder="Enter password"
                          className="h-13 w-full rounded-2xl border border-black/[0.09] bg-black/[0.025] pl-11 pr-4 text-sm outline-none transition duration-200 placeholder:text-black/25 hover:border-black/15 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03] dark:border-white/[0.09] dark:bg-white/[0.025] dark:placeholder:text-white/20 dark:hover:border-white/15 dark:focus:border-white/30 dark:focus:bg-white/[0.055] dark:focus:ring-white/[0.03]"
                        />
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="flex items-start gap-3 rounded-2xl border border-red-500/15 bg-red-500/[0.045] px-4 py-3.5 text-sm text-red-600 dark:text-red-400">
                        <svg
                          className="mt-0.5 shrink-0"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 8v4" />
                          <path d="M12 16h.01" />
                        </svg>

                        <span>{error}</span>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative mt-1 flex h-13 w-full items-center justify-center overflow-hidden rounded-2xl bg-black px-5 text-sm font-medium text-white transition duration-300 hover:scale-[1.01] hover:bg-black/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-black/20 dark:border-t-black" />
                            Signing in...
                          </>
                        ) : (
                          <>
                            Sign in

                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-transform duration-300 group-hover:translate-x-0.5"
                            >
                              <path d="M5 12h14" />
                              <path d="m13 6 6 6-6 6" />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>

                {/* Security */}
                <div className="mt-7 flex items-center justify-center gap-2 text-[10px] text-black/30 dark:text-white/25">
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
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="10"
                      rx="2"
                    />

                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>

                  Protected administrator area
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.16em] text-black/25 dark:text-white/20">
              <span>ALDEV / CMS</span>
              <span>Private Workspace</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}