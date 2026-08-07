import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Столи", slug: "stoly", order: 1 },
  { name: "Крісла", slug: "krisla", order: 2 },
  { name: "Стільці", slug: "stiltsi", order: 3 },
];

const products = [
  {
    title: "Felix",
    slug: "felix",
    price: 21870,
    attribute: "Розкладний / нерозкладний стіл",
    categorySlug: "stoly",
    image: "/images/products/table-1.svg",
    isTopSeller: false,
  },
  {
    title: "Bristol",
    slug: "bristol",
    price: 19770,
    attribute: "Розкладний / нерозкладний стіл",
    categorySlug: "stoly",
    image: "/images/products/table-2.svg",
    isTopSeller: true,
  },
  {
    title: "Florian",
    slug: "florian",
    price: 16790,
    attribute: "Розкладний / нерозкладний стіл",
    categorySlug: "stoly",
    image: "/images/products/table-3.svg",
    isTopSeller: false,
  },
  {
    title: "Aspen",
    slug: "aspen",
    price: 12890,
    attribute: "М'яке крісло для вітальні",
    categorySlug: "krisla",
    image: "/images/products/armchair-1.svg",
    isTopSeller: true,
  },
  {
    title: "Mira",
    slug: "mira",
    price: 10990,
    attribute: "М'яке крісло для вітальні",
    categorySlug: "krisla",
    image: "/images/products/armchair-2.svg",
    isTopSeller: false,
  },
  {
    title: "Nordic",
    slug: "nordic",
    price: 9490,
    attribute: "М'яке крісло для вітальні",
    categorySlug: "krisla",
    image: "/images/products/armchair-3.svg",
    isTopSeller: false,
  },
  {
    title: "Lira",
    slug: "lira",
    price: 3290,
    attribute: "М'який стілець на металевих ніжках",
    categorySlug: "stiltsi",
    image: "/images/products/chair-1.svg",
    isTopSeller: false,
  },
  {
    title: "Oskar",
    slug: "oskar",
    price: 2990,
    attribute: "М'який стілець на металевих ніжках",
    categorySlug: "stiltsi",
    image: "/images/products/chair-2.svg",
    isTopSeller: true,
  },
  {
    title: "Vento",
    slug: "vento",
    price: 3490,
    attribute: "М'який стілець на металевих ніжках",
    categorySlug: "stiltsi",
    image: "/images/products/chair-3.svg",
    isTopSeller: false,
  },
];

async function main() {
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, order: c.order },
      create: c,
    });
  }

  for (const p of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: p.categorySlug },
    });
    const { categorySlug, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...data, categoryId: category.id },
      create: { ...data, categoryId: category.id },
    });
  }

  console.log("Seed завершён");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
