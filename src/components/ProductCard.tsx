import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data";

type Product = {
  slug: string;
  title: string;
  price: number;
  attribute: string | null;
  image: string;
  isTopSeller: boolean;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-neutral-200 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        {product.isTopSeller && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-neutral-950">
            Топ продажів
          </span>
        )}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-neutral-900">{product.title}</h3>
          <span className="whitespace-nowrap font-semibold text-neutral-900">
            від {formatPrice(product.price)}
          </span>
        </div>
        {product.attribute && (
          <p className="mt-1 text-sm text-neutral-500">{product.attribute}</p>
        )}
      </div>
    </Link>
  );
}
