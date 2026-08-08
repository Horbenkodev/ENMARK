"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  title,
  isTopSeller,
}: {
  images: string[];
  title: string;
  isTopSeller: boolean;
}) {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
      {isTopSeller && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-neutral-950">
          Топ продажів
        </span>
      )}

      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(index * 100) / images.length}%)`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            className="relative h-full shrink-0"
            style={{ width: `${100 / images.length}%` }}
          >
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Попереднє фото"
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow transition-colors hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Наступне фото"
            onClick={next}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow transition-colors hover:bg-white"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                aria-label={`Перейти до фото ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
