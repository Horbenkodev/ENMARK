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

  let image = "/images/products/table-1.svg";
  if (imageFile instanceof File && imageFile.size > 0) {
    image = await saveUploadedImage(imageFile);
  }

  const slug = await uniqueProductSlug(manualSlug || title);

  await prisma.product.create({
    data: {
      title,
      slug,
      price,
      categoryId,
      attribute,
      description,
      isTopSeller,
      image,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "");
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
      attribute,
      description,
      isTopSeller,
      image,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
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
