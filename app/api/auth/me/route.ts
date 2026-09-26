import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  AUTH_COOKIE_NAME,
  verifySession,
} from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(
      AUTH_COOKIE_NAME
    )?.value;

    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        { status: 401 }
      );
    }

    const session = await verifySession(token);

    if (!session) {
      const response = NextResponse.json(
        {
          authenticated: false,
        },
        { status: 401 }
      );

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return response;
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        username: session.username,
        role: session.role,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/auth/me error:",
      error
    );

    return NextResponse.json(
      {
        authenticated: false,
      },
      { status: 401 }
    );
  }
}