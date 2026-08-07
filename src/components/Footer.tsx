import Link from "next/link";
import { getCategories } from "@/lib/data";

export async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="mt-auto bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              MEBLI<span className="text-emerald-500">.</span>UA
            </Link>
            <p className="mt-3 max-w-xs text-sm text-neutral-400">
              Меблі для дому та HoReCa: столи, крісла та стільці власного виробництва.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Продукція</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/catalog/${c.slug}`} className="hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Компанія</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  Про нас
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white">
                  Де купити?
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Контакти</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="tel:+380000000000" className="hover:text-white">
                  +380 (00) 000-00-00
                </a>
              </li>
              <li>
                <a href="mailto:info@mebli.ua" className="hover:text-white">
                  info@mebli.ua
                </a>
              </li>
              <li className="text-neutral-400">м. Київ, вул. Прикладна, 1</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} MEBLI.UA. Усі права захищені.
        </div>
      </div>
    </footer>
  );
}
