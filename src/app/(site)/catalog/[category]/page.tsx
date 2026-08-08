import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
  getSubcategoriesByCategorySlug,
} from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [products, subcategories] = await Promise.all([
    getProductsByCategorySlug(slug),
    getSubcategoriesByCategorySlug(slug),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "ENMARK", href: "/" },
          { label: "Продукція" },
          { label: category.name },
        ]}
      />
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">{category.name}</h1>

      {subcategories.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {subcategories.map((s) => (
            <Link
              key={s.slug}
              href={`/catalog/${slug}/${s.slug}`}
              className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
            >
              {s.name}
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-10 text-neutral-500">
          У цій категорії поки немає товарів.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
