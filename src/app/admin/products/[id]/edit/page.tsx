import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProductAction, deleteProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/ProductForm";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({
      orderBy: { order: "asc" },
      include: { subcategories: { orderBy: { order: "asc" } } },
    }),
  ]);

  if (!product) {
    notFound();
  }

  const action = updateProductAction.bind(null, product.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Редагувати товар</h1>
        <form action={deleteProductAction}>
          <input type="hidden" name="id" value={product.id} />
          <ConfirmSubmitButton
            confirmMessage={`Видалити товар "${product.title}"?`}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Видалити товар
          </ConfirmSubmitButton>
        </form>
      </div>
      <div className="mt-6">
        <ProductForm action={action} categories={categories} product={product} />
      </div>
    </div>
  );
}
