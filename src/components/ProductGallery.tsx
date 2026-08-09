"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";

const ZOOM_SCALE = 2.2;

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
  const [zoom, setZoom] = useState({ x: 50, y: 50, active: false });

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y, active: true });
  }

  function handleMouseLeave() {
    setZoom((z) => ({ ...z, active: false }));
  }

  return (
    <div
      className="relative aspect-square cursor-zoom-in overflow-hidden rounded-lg bg-neutral-100"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
              style={
                i === index
                  ? {
                      transform: zoom.active ? `scale(${ZOOM_SCALE})` : "scale(1)",
                      transformOrigin: `${zoom.x}% ${zoom.y}%`,
                      transition: zoom.active ? "transform 0.1s ease-out" : "transform 0.3s ease-out",
                    }
                  : undefined
              }
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
