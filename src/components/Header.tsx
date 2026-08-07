import Link from "next/link";
import { getCategories } from "@/lib/data";
import { MobileNav } from "@/components/MobileNav";

export async function Header() {
  const categories = await getCategories();

  return (
    <header className="relative z-50 bg-neutral-900 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          ENMARK
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              className="text-neutral-200 transition-colors hover:text-white"
            >
              {c.name}
            </Link>
          ))}
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
