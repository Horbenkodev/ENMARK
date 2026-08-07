"use client";

import Link from "next/link";
import { useState } from "react";

type Category = { name: string; slug: string };

export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

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
        <div className="absolute inset-x-0 top-full border-t border-neutral-800 bg-neutral-900 px-6 py-4">
          <nav className="flex flex-col gap-1 text-sm">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/catalog/${c.slug}`}
                className="py-2 text-neutral-200"
                onClick={() => setOpen(false)}
              >
                {c.name}
              </Link>
            ))}

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
