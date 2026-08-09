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
              EN.MARK
            </Link>
            <p className="mt-3 max-w-xs text-sm text-neutral-400">
              Меблі для дому та HoReCa: столи, крісла, стільці та підвіконня.
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
                <a href="tel:+380967062202" className="hover:text-white">
                  +380967062202
                </a>
              </li>
              <li>
                <a href="mailto:enmark.lviv@gmail.com" className="hover:text-white">
                  enmark.lviv@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/New+Market/@49.8001909,24.0020958,14z/data=!4m6!3m5!1s0x473adce27c967d8b:0xfe8ef87977659c01!8m2!3d49.8015426!4d24.0057252!16s%2Fg%2F11cjnpq7pb?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  м. Львів, ТЦ Нова Маркет, вул. Наукова 7 (2-ий поверх)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} EN.MARK. Усі права захищені.
        </div>
      </div>
    </footer>
  );
}
