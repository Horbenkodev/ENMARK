"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 40;

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX > 0) prev();
    else next();
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    document.body.style.overflow = "hidden";
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

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
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            aria-label="Відкрити фото на весь екран"
            className="relative h-full shrink-0 cursor-zoom-in"
            style={{ width: `${100 / images.length}%` }}
            onClick={() => {
              setIndex(i);
              setLightboxOpen(true);
            }}
          >
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {images.length > 1 && !lightboxOpen && (
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

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Закрити"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ×
          </button>

          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={images[index]}
              alt={title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Попереднє фото"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Наступне фото"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:right-6"
              >
                ›
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    aria-label={`Перейти до фото ${i + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndex(i);
                    }}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      i === index ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
