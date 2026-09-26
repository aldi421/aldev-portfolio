import { NextResponse } from "next/server";

import {
  AUTH_COOKIE_NAME,
  createSession,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const adminUsername =
      process.env.ADMIN_USERNAME;

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error(
        "ADMIN_USERNAME atau ADMIN_PASSWORD belum diatur."
      );

      return NextResponse.json(
        {
          success: false,
          error: "Konfigurasi admin belum lengkap.",
        },
        { status: 500 }
      );
    }

    if (
      username !== adminUsername ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Username atau password salah.",
        },
        { status: 401 }
      );
    }

    const token = await createSession(username);

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil.",
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",

      // Tidak memakai maxAge.
      // Cookie menjadi session cookie.
    });

    return response;
  } catch (error) {
    console.error(
      "POST /api/auth/login error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan saat login.",
      },
      { status: 500 }
    );
  }
}