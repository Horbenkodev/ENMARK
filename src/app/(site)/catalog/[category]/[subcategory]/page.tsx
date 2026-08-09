import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
  getSubcategoriesByCategorySlug,
  getSubcategoryBySlug,
} from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const subcategory = await getSubcategoryBySlug(categorySlug, subcategorySlug);

  if (!subcategory) {
    notFound();
  }

  const [products, subcategories] = await Promise.all([
    getProductsByCategorySlug(categorySlug, subcategorySlug),
    getSubcategoriesByCategorySlug(categorySlug),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "EN.MARK", href: "/" },
          { label: "Продукція" },
          { label: category.name, href: `/catalog/${categorySlug}` },
          { label: subcategory.name },
        ]}
      />
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">{subcategory.name}</h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {subcategories.map((s) => (
          <Link
            key={s.slug}
            href={`/catalog/${categorySlug}/${s.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              s.slug === subcategorySlug
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
            }`}
          >
            {s.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-neutral-500">
          У цій підкатегорії поки немає товарів.
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
