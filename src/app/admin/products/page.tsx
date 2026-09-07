import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/data";
import {
  deleteProductAction,
  duplicateProductAction,
  reorderProductsAction,
} from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { ProductReorderList } from "@/components/admin/ProductReorderList";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category: categoryId } = await searchParams;
  const query = q?.trim() ?? "";

  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  const canReorder = Boolean(categoryId) && !query;

  const products = await prisma.product.findMany({
    where: {
      ...(query ? { title: { contains: query, mode: "insensitive" } } : {}),
      ...(categoryId ? { categoryId } : {}),
    },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { category: true, subcategory: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Товари</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          + Додати товар
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={query ? `/admin/products?q=${encodeURIComponent(query)}` : "/admin/products"}
          className={`rounded-full border px-3 py-1 text-sm ${
            !categoryId
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          Усі категорії
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/admin/products?category=${c.id}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
            className={`rounded-full border px-3 py-1 text-sm ${
              categoryId === c.id
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <form className="mt-4 flex gap-2" action="/admin/products">
        {categoryId && <input type="hidden" name="category" value={categoryId} />}
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Пошук за назвою товару…"
          className="w-full max-w-sm rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Знайти
        </button>
        {query && (
          <Link
            href={categoryId ? `/admin/products?category=${categoryId}` : "/admin/products"}
            className="flex items-center px-2 text-sm text-neutral-500 hover:text-neutral-900"
          >
            Скинути
          </Link>
        )}
      </form>

      <div className="mt-4">
        {canReorder ? (
          <ProductReorderList
            key={categoryId}
            products={products}
            reorderAction={reorderProductsAction}
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            {!categoryId && (
              <p className="border-b border-neutral-100 bg-neutral-50 px-4 py-2 text-xs text-neutral-500">
                Оберіть одну категорію вище, щоб змінювати порядок товарів перетягуванням.
              </p>
            )}
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Фото</th>
                  <th className="px-4 py-3 font-medium">Назва</th>
                  <th className="px-4 py-3 font-medium">Категорія</th>
                  <th className="px-4 py-3 font-medium">Ціна</th>
                  <th className="px-4 py-3 font-medium">Топ</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded bg-neutral-100">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-900">{p.title}</td>
                    <td className="px-4 py-3 text-neutral-600">
                      {p.category.name}
                      {p.subcategory && (
                        <span className="text-neutral-400"> · {p.subcategory.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3">
                      {p.isTopSeller && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          Топ
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="text-neutral-500 hover:text-neutral-900"
                        >
                          Редагувати
                        </Link>
                        <form action={duplicateProductAction}>
                          <input type="hidden" name="id" value={p.id} />
                          <button type="submit" className="text-neutral-500 hover:text-neutral-900">
                            Дублювати
                          </button>
                        </form>
                        <form action={deleteProductAction}>
                          <input type="hidden" name="id" value={p.id} />
                          <ConfirmSubmitButton
                            confirmMessage={`Видалити товар "${p.title}"?`}
                            className="text-red-500 hover:text-red-700"
                          >
                            Видалити
                          </ConfirmSubmitButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-neutral-400">
                      {query ? `Нічого не знайдено за запитом "${query}".` : "Товарів ще немає."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
