import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/shared/config/locales";
import { resolveCanonicalPathAlias } from "@/shared/utils/routing";

const DEFAULT_LOCALE_REGEX = new RegExp(`^/${DEFAULT_LOCALE}(/|$)`);
const OTHER_LOCALES = SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE);
const OTHER_LOCALE_REGEX = new RegExp(`^/(${OTHER_LOCALES.join("|")})(/|$)`);
const INTERNAL_REWRITE_PARAM = "__locale_rewrite";

function buildRedirectUrl(request: NextRequest, pathname: string) {
  const targetUrl = new URL(request.url);
  targetUrl.pathname = pathname;
  return targetUrl;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/slice-simulator")
  ) {
    return NextResponse.next();
  }

  if (request.nextUrl.searchParams.has(INTERNAL_REWRITE_PARAM)) {
    return NextResponse.next();
  }

  if (DEFAULT_LOCALE_REGEX.test(pathname)) {
    const newPath = pathname === `/${DEFAULT_LOCALE}` || pathname === `/${DEFAULT_LOCALE}/`
      ? "/"
      : pathname.replace(new RegExp(`^/${DEFAULT_LOCALE}`), "") || "/";
    return NextResponse.redirect(buildRedirectUrl(request, newPath));
  }

  const localeFromPath = OTHER_LOCALE_REGEX.test(pathname)
    ? (pathname.split("/")[1] as (typeof OTHER_LOCALES)[number])
    : DEFAULT_LOCALE;
  const relativePath = localeFromPath === DEFAULT_LOCALE
    ? pathname
    : pathname.replace(new RegExp(`^/${localeFromPath}`), "") || "/";
  const trimmedRelative = relativePath.replace(/^\/+/, "").replace(/\/+$/, "");

  if (trimmedRelative && !trimmedRelative.includes("/")) {
    const aliasTarget = resolveCanonicalPathAlias(localeFromPath, trimmedRelative);
    if (aliasTarget) {
      const redirectPath = localeFromPath === DEFAULT_LOCALE
        ? `/${aliasTarget}`
        : `/${localeFromPath}/${aliasTarget}`;
      return NextResponse.redirect(buildRedirectUrl(request, redirectPath));
    }
  }

  if (pathname === "/" || pathname === "") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/${DEFAULT_LOCALE}`;
    rewriteUrl.searchParams.set(INTERNAL_REWRITE_PARAM, "1");
    return NextResponse.rewrite(rewriteUrl);
  }

  if (!OTHER_LOCALE_REGEX.test(pathname) && pathname.startsWith("/")) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    rewriteUrl.searchParams.set(INTERNAL_REWRITE_PARAM, "1");
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*|slice-simulator).*)"],
};
