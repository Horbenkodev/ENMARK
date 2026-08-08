"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { saveUploadedImage } from "@/lib/upload";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthed,
} from "@/lib/auth";

async function requireAdmin() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }
}

async function uniqueProductSlug(base: string, excludeId?: string) {
  const slug = slugify(base) || "product";
  let candidate = slug;
  let i = 2;
  while (
    await prisma.product.findFirst({
      where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) },
    })
  ) {
    candidate = `${slug}-${i}`;
    i += 1;
  }
  return candidate;
}

async function uniqueSubcategorySlug(categoryId: string, base: string, excludeId?: string) {
  const slug = slugify(base) || "subcategory";
  let candidate = slug;
  let i = 2;
  while (
    await prisma.subcategory.findFirst({
      where: {
        categoryId,
        slug: candidate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    })
  ) {
    candidate = `${slug}-${i}`;
    i += 1;
  }
  return candidate;
}

async function saveGalleryImages(productId: string, formData: FormData, startOrder: number) {
  const files = formData.getAll("images").filter(
    (f): f is File => f instanceof File && f.size > 0,
  );

  let order = startOrder;
  for (const file of files) {
    const url = await saveUploadedImage(file);
    await prisma.productImage.create({
      data: { url, order, productId },
    });
    order += 1;
  }
}

async function resolveSubcategoryId(categoryId: string, subcategoryIdRaw: string) {
  if (!subcategoryIdRaw) return null;

  const subcategory = await prisma.subcategory.findUnique({
    where: { id: subcategoryIdRaw },
  });
  if (!subcategory || subcategory.categoryId !== categoryId) {
    throw new Error("Обрана підкатегорія не належить обраній категорії.");
  }
  return subcategoryIdRaw;
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin/products");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "");
  const subcategoryIdRaw = String(formData.get("subcategoryId") ?? "");
  const attribute = String(formData.get("attribute") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const isTopSeller = formData.get("isTopSeller") === "on";
  const manualSlug = String(formData.get("slug") ?? "").trim();
  const imageFile = formData.get("image");

  if (!title || !priceRaw || !categoryId) {
    throw new Error("Заповніть обов'язкові поля: назва, ціна, категорія.");
  }

  const price = Math.round(Number(priceRaw));
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Некоректна ціна.");
  }

  const subcategoryId = await resolveSubcategoryId(categoryId, subcategoryIdRaw);

  let image = "/images/products/table-1.svg";
  if (imageFile instanceof File && imageFile.size > 0) {
    image = await saveUploadedImage(imageFile);
  }

  const slug = await uniqueProductSlug(manualSlug || title);

  const product = await prisma.product.create({
    data: {
      title,
      slug,
      price,
      categoryId,
      subcategoryId,
      attribute,
      description,
      isTopSeller,
      image,
    },
  });

  await saveGalleryImages(product.id, formData, 0);

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "");
  const subcategoryIdRaw = String(formData.get("subcategoryId") ?? "");
  const attribute = String(formData.get("attribute") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const isTopSeller = formData.get("isTopSeller") === "on";
  const manualSlug = String(formData.get("slug") ?? "").trim();
  const imageFile = formData.get("image");

  if (!title || !priceRaw || !categoryId) {
    throw new Error("Заповніть обов'язкові поля: назва, ціна, категорія.");
  }

  const price = Math.round(Number(priceRaw));
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Некоректна ціна.");
  }

  const subcategoryId = await resolveSubcategoryId(categoryId, subcategoryIdRaw);

  const existing = await prisma.product.findUniqueOrThrow({ where: { id } });

  let image = existing.image;
  if (imageFile instanceof File && imageFile.size > 0) {
    image = await saveUploadedImage(imageFile);
  }

  const slug =
    manualSlug && manualSlug !== existing.slug
      ? await uniqueProductSlug(manualSlug, id)
      : existing.slug;

  await prisma.product.update({
    where: { id },
    data: {
      title,
      slug,
      price,
      categoryId,
      subcategoryId,
      attribute,
      description,
      isTopSeller,
      image,
    },
  });

  const existingImageCount = await prisma.productImage.count({ where: { productId: id } });
  await saveGalleryImages(id, formData, existingImageCount);

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProductImageAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.productImage.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function createCategoryAction(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Вкажіть назву категорії.");
  }

  const slug = slugify(name) || `category-${Date.now()}`;
  const count = await prisma.category.count();

  await prisma.category.create({
    data: { name, slug, order: count + 1 },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    throw new Error(
      "Неможливо видалити категорію, в якій є товари. Спочатку видаліть або перенесіть товари.",
    );
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function createSubcategoryAction(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  if (!name || !categoryId) {
    throw new Error("Вкажіть назву та категорію.");
  }

  const slug = await uniqueSubcategorySlug(categoryId, name);
  const count = await prisma.subcategory.count({ where: { categoryId } });

  await prisma.subcategory.create({
    data: { name, slug, categoryId, order: count + 1 },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteSubcategoryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.subcategory.delete({ where: { id } });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}
