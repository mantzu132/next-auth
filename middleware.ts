import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isApiRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(
      new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl.origin),
    );
  }

  if (!isPublicRoute && !isAuthRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl.origin));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
