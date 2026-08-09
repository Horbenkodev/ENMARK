import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { getCategories, getTopSellers } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import heroBg from "@/images/ban1.jpg";
import stoliImg from "@/images/products/stoli.jpg";
import stilciImg from "@/images/products/stilci.jpg";
import pidvikonniaImg from "@/images/products/psdvikonya.png";

export default async function HomePage() {
  const [categories, topSellers] = await Promise.all([
    getCategories(),
    getTopSellers(3),
  ]);

  const categoryImages: Record<string, StaticImageData> = {
    stoly: stoliImg,
    stiltsi: stilciImg,
    pidvikonnia: pidvikonniaImg,
  };

  return (
    <div>
      <section className="relative flex flex-col border-b border-neutral-200 md:block md:h-[480px] lg:h-[600px]">
        <div className="relative h-56 w-full sm:h-72 md:absolute md:inset-0 md:h-full">
          <Image
            src={heroBg}
            alt="Меблі EN.MARK"
            fill
            priority
            className="object-cover object-right"
          />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-neutral-50 via-neutral-50/70 to-transparent md:block" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:flex md:h-full md:items-center md:py-0 lg:px-8">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Меблі, які створюють затишок
            </h1>
            <p className="mt-4 max-w-md text-lg text-neutral-600">
              Столи, крісла та стільці — для дому та
              закладів HoReCa.
            </p>
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
              <div className="relative aspect-[4/3]">
                <Image
                  src={categoryImages[c.slug]}
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
