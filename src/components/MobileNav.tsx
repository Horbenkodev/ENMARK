"use client";

import Link from "next/link";
import { useState } from "react";

type Category = { name: string; slug: string };

export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto border-t border-neutral-800 bg-neutral-900 px-6 py-4">
          <nav className="flex flex-col gap-1 text-sm">
            <Link href="/about" className="py-2 text-neutral-200" onClick={() => setOpen(false)}>
              Про нас
            </Link>

            <button
              type="button"
              className="flex items-center justify-between py-2 text-left text-neutral-200"
              onClick={() => setProductsOpen((v) => !v)}
            >
              Продукція
              <span className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}>⌄</span>
            </button>
            {productsOpen && (
              <div className="flex flex-col gap-1 border-l border-neutral-700 pl-4">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/catalog/${c.slug}`}
                    className="py-1.5 text-neutral-300"
                    onClick={() => setOpen(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/contacts" className="py-2 text-neutral-200" onClick={() => setOpen(false)}>
              Де купити?
            </Link>

            <a
              href="tel:+380000000000"
              className="mt-3 rounded-md bg-emerald-500 px-4 py-2.5 text-center text-sm font-semibold text-neutral-950"
              onClick={() => setOpen(false)}
            >
              Зв&apos;язатися з нами
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
