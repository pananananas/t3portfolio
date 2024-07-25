"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ImageType {
  id: number;
  name: string;
  url: string;
  folderId?: number;
}

interface Props {
  initialImage: ImageType;
  folderImages: ImageType[];
}

export default function FullPageImageViewClient({
  initialImage,
  folderImages,
}: Props) {
  const [currentImage, setCurrentImage] = useState(initialImage);
  const router = useRouter();

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      const currentIndex = folderImages.findIndex(
        (img) => img.id === currentImage.id,
      );
      let newIndex;

      if (direction === "prev") {
        newIndex =
          (currentIndex - 1 + folderImages.length) % folderImages.length;
      } else {
        newIndex = (currentIndex + 1) % folderImages.length;
      }

      const newImage = folderImages[newIndex];
      if (newImage) setCurrentImage(newImage);
      if (newImage) router.replace(`/img/${newImage.id}`, { scroll: false });
    },
    [currentImage, folderImages, router],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateImage("next");
      }
    },
    [navigateImage],
  );

  useEffect(() => {
    console.log("FullImagePageClient mounted");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative flex h-full min-h-0 w-full min-w-0 items-center justify-center">
      {folderImages.length > 1 && (
        <>
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-[20px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-black bg-opacity-40 text-white transition-all hover:scale-105 hover:bg-opacity-50 active:translate-scale-110"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-[20px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-black bg-opacity-40 text-white transition-all hover:scale-105 hover:bg-opacity-50 active:translate-scale-110"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
      <div className="overflow-auto p-2 sm:p-8">
        <Image
          src={currentImage.url}
          className="w-max-[100%] h-max-[100%] flex-shrink rounded-xl object-contain p-4"
          alt={currentImage.name}
          fill={true}
          priority={true}
          quality={80}
          loading="eager"
          blurDataURL={currentImage.url}
          placeholder="blur"
        />
      </div>
    </div>
  );
}
