import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/data";
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

  const products = await getProductsByCategorySlug(slug);

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
