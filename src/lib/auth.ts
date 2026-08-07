import "server-only";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

export async function isAdminAuthed() {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  return Boolean(value) && value === process.env.ADMIN_SESSION_SECRET;
}

export async function createAdminSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, process.env.ADMIN_SESSION_SECRET ?? "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
