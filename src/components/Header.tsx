import Link from "next/link";
import { getCategories } from "@/lib/data";
import { MobileNav } from "@/components/MobileNav";

export async function Header() {
  const categories = await getCategories();

  return (
    <header className="relative z-50 bg-neutral-900 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MEBLI<span className="text-emerald-500">.</span>UA
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/about" className="text-neutral-200 transition-colors hover:text-white">
            Про нас
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-neutral-200 transition-colors hover:text-white"
            >
              Продукція
              <span className="text-xs transition-transform group-hover:rotate-180">⌄</span>
            </button>
            <div className="invisible absolute left-1/2 top-full w-48 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-xl">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/catalog/${c.slug}`}
                    className="block px-4 py-2.5 text-sm hover:bg-neutral-50"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contacts" className="text-neutral-200 transition-colors hover:text-white">
            Де купити?
          </Link>
        </nav>

        <div className="hidden md:block">
          <a
            href="tel:+380000000000"
            className="rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400"
          >
            Зв&apos;язатися з нами
          </a>
        </div>

        <MobileNav categories={categories.map((c) => ({ name: c.name, slug: c.slug }))} />
      </div>
    </header>
  );
}
