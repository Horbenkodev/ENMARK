"use client";

import { useEffect, useRef, useState } from "react";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );
}

export function SearchToggle() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div className="flex items-center">
      {open && (
        <form action="/search" className="mr-1">
          <input
            ref={inputRef}
            type="search"
            name="q"
            placeholder="Пошук товару…"
            className="w-32 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none sm:w-52"
          />
        </form>
      )}
      <button
        type="button"
        aria-label={open ? "Закрити пошук" : "Пошук"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 shrink-0 items-center justify-center text-neutral-200 cursor-pointer hover:text-white"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
      </button>
    </div>
  );
}
