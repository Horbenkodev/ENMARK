import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { getProductBySlug, formatPrice } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";

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
          { label: "EN.MARK", href: "/" },
          { label: "Продукція" },
          { label: product.category.name, href: `/catalog/${product.category.slug}` },
          { label: product.title },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery
          images={[product.image, ...product.images.map((img) => img.url)]}
          title={product.title}
          isTopSeller={product.isTopSeller}
        />

        <div>
          <h1 className="text-3xl font-bold text-neutral-900">{product.title}</h1>
          {product.attribute && (
            <p className="mt-2 text-neutral-500">{product.attribute}</p>
          )}
          {product.showPrice && (
            <p className="mt-6 text-3xl font-bold text-neutral-900">
              від {formatPrice(product.price)}
            </p>
          )}

          {product.description && (
            <div className="mt-6 space-y-3 leading-relaxed text-neutral-600">
              <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                components={{
                  ul: ({ children }) => (
                    <ul className="list-disc space-y-1 pl-5">{children}</ul>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-neutral-900">{children}</strong>
                  ),
                }}
              >
                {product.description}
              </ReactMarkdown>
            </div>
          )}

          <a
            href="/contacts"
            className="mt-8 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400"
          >
            Зв&apos;язатися з нами
          </a>
        </div>
      </div>
    </div>
  );
}
