import Link from "next/link";
import Image from "next/image";
import { getCategories, getTopSellers } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const [categories, topSellers] = await Promise.all([
    getCategories(),
    getTopSellers(3),
  ]);

  const categoryImages: Record<string, string> = {
    stoly: "/images/products/stoli.jpg",
    stiltsi: "/images/products/stilci-crop.jpg",
    pidvikonnia: "/images/products/psdvikonya.png",
  };

  return (
    <div>
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Меблі, які створюють затишок
            </h1>
            <p className="mt-4 max-w-md text-lg text-neutral-600">
              Столи, крісла та стільці — для дому та
              закладів HoReCa.
            </p>

          </div>
          <div className="relative aspect-[1361/893] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src="/images/hero-furniture.png"
              alt="Меблі ENMARK"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900">Категорії</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              className="group overflow-hidden rounded-lg border border-neutral-200 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-neutral-100">
                <Image
                  src={categoryImages[c.slug] ?? "/images/products/table-1.svg"}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {topSellers.length > 0 && (
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900">Топ продажів</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topSellers.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
