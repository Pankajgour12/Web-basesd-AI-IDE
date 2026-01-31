import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // 1. API Routes ko kabhi mat roko
  if (isApiAuthRoute) {
    return null; // Null ka matlab "Jane do"
  }

  // 2. Agar user Login page par hai aur pehle se LoggedIn hai -> Dashboard bhejo
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // 3. Agar Protected route hai aur user LoggedIn NAHI hai -> Login page bhejo
  if (!isLoggedIn && !isPublicRoute) {
    // Optional: Wapis wahin aane ke liye callbackUrl add kar sakte ho
    // let callbackUrl = nextUrl.pathname;
    // if (nextUrl.search) callbackUrl += nextUrl.search;
    
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
  }

  return null;
});

// Matcher Configuration
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};