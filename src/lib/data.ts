import { prisma } from "@/lib/prisma";

export { formatPrice } from "@/lib/format";

export function getCategories() {
  return prisma.category.findMany({ orderBy: { order: "asc" } });
}

export function getCategoriesWithSubcategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { subcategories: { orderBy: { order: "asc" } } },
  });
}

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export function getSubcategoriesByCategorySlug(categorySlug: string) {
  return prisma.subcategory.findMany({
    where: { category: { slug: categorySlug } },
    orderBy: { order: "asc" },
  });
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  return prisma.subcategory.findFirst({
    where: { slug: subcategorySlug, category: { slug: categorySlug } },
  });
}

export function getProductsByCategorySlug(slug: string, subcategorySlug?: string) {
  return prisma.product.findMany({
    where: {
      category: { slug },
      ...(subcategorySlug ? { subcategory: { slug: subcategorySlug } } : {}),
    },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export function searchProducts(query: string) {
  return prisma.product.findMany({
    where: { title: { contains: query, mode: "insensitive" } },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true, images: { orderBy: { order: "asc" } } },
  });
}

export function getTopSellers(limit = 3) {
  return prisma.product.findMany({
    where: { isTopSeller: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: limit,
    include: { category: true },
  });
}
