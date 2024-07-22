"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-0 h-screen w-screen bg-black/50 text-zinc-50 backdrop-blur-xl select-none"
      onClose={onDismiss}
    >
      {children}
      <button
        className="absolute right-4 top-4 flex h-10 w-10 transform items-center justify-center rounded-full bg-black bg-opacity-40 text-white transition-all hover:scale-105 hover:bg-opacity-50 active:scale-110"
        aria-label="Previous image"
        onClick={onDismiss}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
