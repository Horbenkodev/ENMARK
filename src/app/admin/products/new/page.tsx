import { prisma } from "@/lib/prisma";
import { createProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { subcategories: { orderBy: { order: "asc" } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Новий товар</h1>
      <div className="mt-6">
        <ProductForm action={createProductAction} categories={categories} />
      </div>
    </div>
  );
}
