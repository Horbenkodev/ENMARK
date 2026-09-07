import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  createCategoryAction,
  deleteCategoryAction,
  createSubcategoryAction,
  deleteSubcategoryAction,
  updateCategoryImageAction,
} from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { products: true } },
      subcategories: {
        orderBy: { order: "asc" },
        include: { _count: { select: { products: true } } },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Категорії</h1>

      <div className="mt-6 max-w-2xl space-y-6">
        {categories.map((c) => (
          <div key={c.id} className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-neutral-200">
                  {c.image && (
                    <Image src={c.image} alt={c.name} fill className="object-cover" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-neutral-900">{c.name}</span>
                  <span className="ml-2 text-sm text-neutral-500">
                    {c._count.products} товарів
                  </span>
                </div>
              </div>
              <form action={deleteCategoryAction}>
                <input type="hidden" name="id" value={c.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Видалити категорію "${c.name}"?`}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Видалити категорію
                </ConfirmSubmitButton>
              </form>
            </div>

            <form
              action={updateCategoryImageAction}
              className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3"
            >
              <input type="hidden" name="id" value={c.id} />
              <input
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                required
                className="flex-1 text-sm"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Замінити фото
              </button>
            </form>

            <table className="w-full text-left text-sm">
              <tbody>
                {c.subcategories.map((s) => (
                  <tr key={s.id} className="border-b border-neutral-100 last:border-0">
                    <td className="px-4 py-2.5 pl-8 text-neutral-800">{s.name}</td>
                    <td className="px-4 py-2.5 text-neutral-500">{s._count.products} товарів</td>
                    <td className="px-4 py-2.5 text-right">
                      <form action={deleteSubcategoryAction}>
                        <input type="hidden" name="id" value={s.id} />
                        <ConfirmSubmitButton
                          confirmMessage={`Видалити підкатегорію "${s.name}"?`}
                          className="text-red-500 hover:text-red-700"
                        >
                          Видалити
                        </ConfirmSubmitButton>
                      </form>
                    </td>
                  </tr>
                ))}
                {c.subcategories.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-2.5 pl-8 text-neutral-400">
                      Підкатегорій ще немає
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <form
              action={createSubcategoryAction}
              className="flex items-end gap-3 border-t border-neutral-100 px-4 py-3"
            >
              <input type="hidden" name="categoryId" value={c.id} />
              <div className="flex-1">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="напр. Барні стільці"
                  className="w-full rounded-md border border-neutral-300 px-3 py-1.5 text-sm focus:border-neutral-900 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                + Підкатегорія
              </button>
            </form>
          </div>
        ))}
      </div>

      <form action={createCategoryAction} className="mt-8 flex max-w-md flex-wrap items-end gap-3">
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
            Нова категорія
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="напр. Дивани"
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="category-image" className="block text-sm font-medium text-neutral-700">
            Фото
          </label>
          <input
            id="category-image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="mt-1.5 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Додати
        </button>
      </form>
    </div>
  );
}
