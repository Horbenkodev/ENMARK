import { searchProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const products = query ? await searchProducts(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "EN.MARK", href: "/" }, { label: "Пошук" }]} />
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">
        {query ? `Результати пошуку: «${query}»` : "Пошук"}
      </h1>

      {!query ? (
        <p className="mt-10 text-neutral-500">Введіть назву товару для пошуку.</p>
      ) : products.length === 0 ? (
        <p className="mt-10 text-neutral-500">
          Нічого не знайдено за запитом «{query}».
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
