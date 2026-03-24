import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ пропускаем статику и системные файлы
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/next.svg" ||
    pathname === "/vercel.svg" ||
    pathname === "/globe.svg" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // дальше — твоя логика авторизации (пример)
  // если нет сессии → редирект на /auth
  // const session = req.cookies.get("SESSION")?.value;
  // if (!session) return NextResponse.redirect(new URL("/auth", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
