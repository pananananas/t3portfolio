"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);  // Added state to control modal visibility

  console.log("Modal rendered");
  console.log("Modal pathname", pathname);

  useEffect(() => {
    if (dialogRef.current && isOpen && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }

    return () => {
      if (dialogRef.current && dialogRef.current.open) {
        dialogRef.current.close();
      }
    };
  }, [pathname, isOpen]);

  function onDismiss(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("Dismiss");
    event.stopPropagation();
    dialogRef.current?.close();
    setIsOpen(false);  // Update state to close modal
    router.push("/");
  }

  function onDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    console.log("Dialog click");
    if (event.target === dialogRef.current) {
      dialogRef.current?.close();
      setIsOpen(false);  // Update state to close modal
      router.push("/");
    }
  }

  if (!isOpen) {
    return null;  // Prevent rendering when modal is closed
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-0 h-screen w-screen select-none bg-black/50 backdrop-blur-xl"
    >
      {children}
      <button
        className="absolute right-4 top-4 flex h-10 w-10 transform items-center justify-center rounded-full bg-black bg-opacity-40 text-white transition-all hover:scale-105 hover:bg-opacity-50 active:scale-110"
        aria-label="Close image"
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
