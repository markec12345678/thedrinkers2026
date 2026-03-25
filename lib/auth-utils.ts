import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return {
    ...session.user,
    role: session.user.membershipTier === "vip" ? "admin" : "user",
  };
});

export const getSession = cache(async () => {
  const headersList = await headers();
  return auth.api.getSession({
    headers: headersList,
  });
});
