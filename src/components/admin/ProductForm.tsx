"use client";

import Image from "next/image";
import { useState } from "react";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

type Subcategory = { id: string; name: string };
type Category = { id: string; name: string; subcategories: Subcategory[] };
type ProductImage = { id: string; url: string };
type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  categoryId: string;
  subcategoryId: string | null;
  attribute: string | null;
  description: string | null;
  isTopSeller: boolean;
  image: string;
};

export function ProductForm({
  action,
  categories,
  product,
  existingImages = [],
  deleteImageAction,
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  product?: Product;
  existingImages?: ProductImage[];
  deleteImageAction?: (formData: FormData) => void;
}) {
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [subcategoryId, setSubcategoryId] = useState(product?.subcategoryId ?? "");
  const subcategories = categories.find((c) => c.id === categoryId)?.subcategories ?? [];

  return (
    <>
      <form action={action} className="max-w-2xl space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700">
            Назва *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={product?.title}
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-neutral-700">
            URL (slug)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={product?.slug}
            placeholder="генерується автоматично з назви"
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-neutral-700">
              Ціна, ₴ *
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              step={1}
              required
              defaultValue={product?.price}
              className="mt-1.5 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-neutral-700">
              Категорія *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setSubcategoryId("");
              }}
              className="mt-1.5 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
            >
              <option value="" disabled>
                Оберіть категорію
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {subcategories.length > 0 && (
          <div>
            <label htmlFor="subcategoryId" className="block text-sm font-medium text-neutral-700">
              Підкатегорія
            </label>
            <select
              id="subcategoryId"
              name="subcategoryId"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
            >
              <option value="">Без підкатегорії</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="attribute" className="block text-sm font-medium text-neutral-700">
            Короткий атрибут
          </label>
          <input
            id="attribute"
            name="attribute"
            type="text"
            placeholder='напр. "Розкладний / нерозкладний стіл"'
            defaultValue={product?.attribute ?? ""}
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700">
            Опис
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className="mt-1.5 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-neutral-700">
            Фото {product ? "(залиште порожнім, щоб не змінювати)" : ""}
          </label>
          {product && (
            <div className="relative mt-2 h-24 w-24 overflow-hidden rounded bg-neutral-100">
              <Image src={product.image} alt={product.title} fill className="object-cover" />
            </div>
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="mt-1.5 w-full text-sm"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-neutral-700">
            Додаткові фото (для слайдера на сторінці товару)
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="mt-1.5 w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isTopSeller"
            name="isTopSeller"
            type="checkbox"
            defaultChecked={product?.isTopSeller}
            className="h-4 w-4 rounded border-neutral-300"
          />
          <label htmlFor="isTopSeller" className="text-sm text-neutral-700">
            Позначити як «Топ продажів»
          </label>
        </div>

        <button
          type="submit"
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          {product ? "Зберегти зміни" : "Додати товар"}
        </button>
      </form>

      {product && existingImages.length > 0 && deleteImageAction && (
        <div className="mt-8 max-w-2xl">
          <h2 className="text-sm font-medium text-neutral-700">Галерея товару</h2>
          <div className="mt-2 flex flex-wrap gap-4">
            {existingImages.map((img) => (
              <div key={img.id} className="relative">
                <div className="relative h-24 w-24 overflow-hidden rounded bg-neutral-100">
                  <Image src={img.url} alt="" fill className="object-cover" />
                </div>
                <form action={deleteImageAction} className="mt-1">
                  <input type="hidden" name="id" value={img.id} />
                  <ConfirmSubmitButton
                    confirmMessage="Видалити це фото з галереї?"
                    className="w-full text-xs text-red-500 hover:text-red-700"
                  >
                    Видалити
                  </ConfirmSubmitButton>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
