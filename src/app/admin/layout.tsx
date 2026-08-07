import Link from "next/link";
import { isAdminAuthed } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthed();

  return (
    <div className="min-h-screen bg-neutral-50">
      {authed && (
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Link href="/admin/products" className="font-bold text-neutral-900">
                ENMARK · Адмін
              </Link>
              <nav className="flex items-center gap-4 text-sm text-neutral-600">
                <Link href="/admin/products" className="hover:text-neutral-900">
                  Товари
                </Link>
                <Link href="/admin/categories" className="hover:text-neutral-900">
                  Категорії
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank" className="text-sm text-neutral-500 hover:text-neutral-900">
                Переглянути сайт ↗
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Вийти
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
