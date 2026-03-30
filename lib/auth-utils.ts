import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { cache } from "react";

const getAdminEmails = cache(
  () =>
    new Set(
      (env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ),
);

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  return getAdminEmails().has(email.trim().toLowerCase());
}

export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return {
    ...session.user,
    isAdmin: isAdminEmail(session.user.email),
    role: isAdminEmail(session.user.email) ? "admin" : "user",
  };
});

export const getSession = cache(async () => {
  const headersList = await headers();
  return auth.api.getSession({
    headers: headersList,
  });
});

export const requireAdminUser = cache(async (callbackUrl = "/admin") => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (!user.isAdmin) {
    redirect("/");
  }

  return user;
});

export async function requireAdminApiAccess(requestHeaders: Headers) {
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    return {
      response: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  if (!isAdminEmail(session.user.email)) {
    return {
      response: NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 },
      ),
    };
  }

  return {
    user: {
      ...session.user,
      isAdmin: true,
    },
  };
}
