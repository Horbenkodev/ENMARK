import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/data";
import { deleteProductAction } from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
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

      <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white">
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
                <td className="px-4 py-3 text-neutral-600">{p.category.name}</td>
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
                  Товарів ще немає.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
