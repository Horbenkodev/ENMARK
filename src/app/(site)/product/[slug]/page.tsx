import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, formatPrice } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "ENMARK", href: "/" },
          { label: "Продукція" },
          { label: product.category.name, href: `/catalog/${product.category.slug}` },
          { label: product.title },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
          {product.isTopSeller && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-neutral-950">
              Топ продажів
            </span>
          )}
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-neutral-900">{product.title}</h1>
          {product.attribute && (
            <p className="mt-2 text-neutral-500">{product.attribute}</p>
          )}
          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {formatPrice(product.price)}
          </p>

          {product.description && (
            <p className="mt-6 leading-relaxed text-neutral-600">
              {product.description}
            </p>
          )}

          <a
            href="tel:+380000000000"
            className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400"
          >
            Зв&apos;язатися з нами
          </a>
        </div>
      </div>
    </div>
  );
}
