"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  returnHref: string;
}

export function Modal({ children, returnHref }: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (pathname.startsWith("/img/")) setIsOpen(true);
    else setIsOpen(false);

    if (dialog && isOpen) dialog.showModal();
    else if (dialog && !isOpen && dialog.open) dialog.close();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      if (dialog && dialog.open) dialog.close();
    };
  }, [pathname, isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    router.push(returnHref, { scroll: false });
  };

  function onDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closeModal();
  }

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-0 h-screen w-screen select-none bg-black/50 backdrop-blur-xl"
      onClick={onDialogClick}
    >
      {children}
      <button
        className="absolute right-4 top-4 flex h-10 w-10 transform items-center justify-center rounded-full bg-black bg-opacity-40 text-white transition-all hover:scale-105 hover:bg-opacity-50 active:scale-110"
        aria-label="Close image"
        onClick={closeModal}
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
