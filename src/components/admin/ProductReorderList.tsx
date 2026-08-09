"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition, type DragEvent } from "react";
import { formatPrice } from "@/lib/format";
import { deleteProductAction } from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  isTopSeller: boolean;
  subcategory: { name: string } | null;
};

export function ProductReorderList({
  products: initialProducts,
  reorderAction,
}: {
  products: Product[];
  reorderAction: (orderedIds: string[]) => Promise<void>;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDragOver(e: DragEvent<HTMLDivElement>, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    setProducts((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(index);
  }

  function handleDragEnd() {
    setDragIndex(null);
    const orderedIds = products.map((p) => p.id);
    startTransition(() => {
      reorderAction(orderedIds);
    });
  }

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {products.map((p, index) => (
        <div
          key={p.id}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => e.preventDefault()}
          onDragEnd={handleDragEnd}
          className={`flex cursor-grab items-center gap-4 border-b border-neutral-100 bg-white px-4 py-3 last:border-0 active:cursor-grabbing ${
            dragIndex === index ? "opacity-40" : ""
          }`}
        >
          <span className="select-none text-neutral-300" aria-hidden>
            ⠿⠿
          </span>
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-neutral-100">
            <Image src={p.image} alt={p.title} fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-neutral-900">{p.title}</p>
            {p.subcategory && (
              <p className="truncate text-xs text-neutral-400">{p.subcategory.name}</p>
            )}
          </div>
          <div className="shrink-0 text-sm text-neutral-600">{formatPrice(p.price)}</div>
          {p.isTopSeller && (
            <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              Топ
            </span>
          )}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={`/admin/products/${p.id}/edit`}
              className="text-sm text-neutral-500 hover:text-neutral-900"
            >
              Редагувати
            </Link>
            <form action={deleteProductAction}>
              <input type="hidden" name="id" value={p.id} />
              <ConfirmSubmitButton
                confirmMessage={`Видалити товар "${p.title}"?`}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Видалити
              </ConfirmSubmitButton>
            </form>
          </div>
        </div>
      ))}
      {products.length === 0 && (
        <p className="px-4 py-10 text-center text-neutral-400">У цій категорії ще немає товарів.</p>
      )}
      <div className="border-t border-neutral-100 px-4 py-2 text-xs text-neutral-400">
        {isPending ? "Зберігаємо порядок…" : "Перетягніть товар, щоб змінити порядок відображення на сайті."}
      </div>
    </div>
  );
}
