import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { HttpError } from "@/lib/api/errors";
import { routes } from "@/constants/routes";
import { clientEnv } from "@/constants/env.client";

export const getAdmin = cache(async () => {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) return null;
  return getDb().user.findFirst({
    where: { id: session.user.id, isAdmin: true },
    select: { id: true, name: true, email: true },
  });
});

export async function requireAdminPage() {
  const user = await getAdmin();
  if (!user) redirect(routes.login);
  return user;
}

export async function requireAdminRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (origin !== new URL(clientEnv.NEXT_PUBLIC_SITE_URL).origin)
    throw new HttpError(403, "Request origin not allowed");
  const user = await getAdmin();
  if (!user) throw new HttpError(401, "Please sign in to continue");
  return user;
}
