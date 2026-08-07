import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Столи", slug: "stoly", order: 1 },
  { name: "Стільці", slug: "stiltsi", order: 2 },
  { name: "Підвіконня", slug: "pidvikonnia", order: 3 },
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
  {
    title: "Alpin",
    slug: "alpin",
    price: 2490,
    attribute: "Підвіконня ПВХ, вологостійке",
    categorySlug: "pidvikonnia",
    image: "/images/products/windowsill-1.svg",
    isTopSeller: true,
  },
  {
    title: "Dana",
    slug: "dana",
    price: 2790,
    attribute: "Підвіконня з ефектом дерева",
    categorySlug: "pidvikonnia",
    image: "/images/products/windowsill-2.svg",
    isTopSeller: false,
  },
  {
    title: "Solid",
    slug: "solid",
    price: 2650,
    attribute: "Підвіконня ПВХ, вологостійке",
    categorySlug: "pidvikonnia",
    image: "/images/products/windowsill-3.svg",
    isTopSeller: false,
  },
];

async function main() {
  const keepSlugs = categories.map((c) => c.slug);
  const obsoleteCategories = await prisma.category.findMany({
    where: { slug: { notIn: keepSlugs } },
  });
  for (const c of obsoleteCategories) {
    await prisma.product.deleteMany({ where: { categoryId: c.id } });
    await prisma.category.delete({ where: { id: c.id } });
  }

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, order: c.order },
      create: c,
    });
  }

  const keepProductSlugs = products.map((p) => p.slug);
  await prisma.product.deleteMany({ where: { slug: { notIn: keepProductSlugs } } });

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
