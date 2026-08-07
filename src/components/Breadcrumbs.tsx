import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Хлібні крихти" className="text-sm text-neutral-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-neutral-900">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-700">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="text-neutral-300">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
