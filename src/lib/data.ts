import { prisma } from "@/lib/prisma";

export function getCategories() {
  return prisma.category.findMany({ orderBy: { order: "asc" } });
}

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export function getProductsByCategorySlug(slug: string) {
  return prisma.product.findMany({
    where: { category: { slug } },
    orderBy: { createdAt: "desc" },
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export function getTopSellers(limit = 3) {
  return prisma.product.findMany({
    where: { isTopSeller: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { category: true },
  });
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("uk-UA")} ₴`;
}
