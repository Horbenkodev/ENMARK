import { prisma } from "@/lib/prisma";
import { createCategoryAction, deleteCategoryAction } from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Категорії</h1>

      <div className="mt-6 max-w-md overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Назва</th>
              <th className="px-4 py-3 font-medium">Товарів</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3 font-medium text-neutral-900">{c.name}</td>
                <td className="px-4 py-3 text-neutral-600">{c._count.products}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteCategoryAction}>
                    <input type="hidden" name="id" value={c.id} />
                    <ConfirmSubmitButton
                      confirmMessage={`Видалити категорію "${c.name}"?`}
                      className="text-red-500 hover:text-red-700"
                    >
                      Видалити
                    </ConfirmSubmitButton>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form action={createCategoryAction} className="mt-8 flex max-w-md items-end gap-3">
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
