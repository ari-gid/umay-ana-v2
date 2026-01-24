import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/auth";

const SESSION_COOKIE = "pregnancy_session";
const SESSION_DAYS = 7;


export async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}


export async function getSessionUser() {
  const token = await getSessionCookie();
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  return session?.user ?? null;
}


export async function createSession(userId: string) {
  const token = await createSessionToken(userId);
  const expiresAt = new Date(
    Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  );

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  return token;
}


export async function clearSession() {
  const token = await getSessionCookie();

  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
}

