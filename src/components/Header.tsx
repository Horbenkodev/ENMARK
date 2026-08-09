import Link from "next/link";
import { getCategoriesWithSubcategories } from "@/lib/data";
import { MobileNav } from "@/components/MobileNav";
import { SearchToggle } from "@/components/SearchToggle";

export async function Header() {
  const categories = await getCategoriesWithSubcategories();

  return (
    <header className="relative z-50 bg-neutral-900 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          EN.MARK
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {categories.map((c) => (
            <div key={c.slug} className="group relative">
              <Link
                href={`/catalog/${c.slug}`}
                className="text-neutral-200 transition-colors hover:text-white"
              >
                {c.name}
              </Link>

              {c.subcategories.length > 0 && (
                <div className="invisible absolute left-0 top-full z-50 min-w-48 rounded-md border border-neutral-800 bg-neutral-900 py-2 opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                  {c.subcategories.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/catalog/${c.slug}/${s.slug}`}
                      className="block px-4 py-2 text-sm text-neutral-200 transition-colors hover:bg-neutral-800 hover:text-white"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SearchToggle />

          <a
            href="/contacts"
            className="hidden rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400 md:block"
          >
            Зв&apos;язатися з нами
          </a>

          <MobileNav categories={categories.map((c) => ({ name: c.name, slug: c.slug }))} />
        </div>
      </div>
    </header>
  );
}
