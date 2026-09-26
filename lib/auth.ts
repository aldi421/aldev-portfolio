import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error("AUTH_SECRET belum diatur di file .env");
}

const secretKey = new TextEncoder().encode(secret);

export const AUTH_COOKIE_NAME = "aldev_admin_session";

export async function createSession(username: string) {
  return await new SignJWT({
    username,
    role: "admin",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secretKey);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      secretKey
    );

    if (payload.role !== "admin") {
      return null;
    }

    if (typeof payload.username !== "string") {
      return null;
    }

    return {
      username: payload.username,
      role: "admin" as const,
    };
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    AUTH_COOKIE_NAME
  )?.value;

  if (!token) {
    return null;
  }

  return await verifySession(token);
}