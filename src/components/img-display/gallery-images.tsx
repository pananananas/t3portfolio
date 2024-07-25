"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScrollPosition } from "~/hooks/useScrollPosition";
import ComparisonSlider from "~/components/img-display/img-comparison";

interface ImageData {
  id: number;
  name: string;
  url: string;
  key: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  folderId: number;
}

interface GalleryImagesProps {
  imgsCol1: ImageData[];
  imgsCol2: ImageData[];
  beforeImages: ImageData[];
  afterImages: ImageData[];
}

export function GalleryImages({
  imgsCol1,
  imgsCol2,
  beforeImages,
  afterImages,
}: GalleryImagesProps) {
  const router = useRouter();
  const scrollPosition = useScrollPosition();

  const handleImageClick = (id: number) => {
    router.push(`/img/${id}`, { scroll: false });
  };

  useEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

  return (
    <div className="py-6">
      <div className="flex flex-wrap gap-6">
        <div className="flex w-full flex-row justify-center gap-6 sm:w-auto">
          <div className="flex flex-col gap-6">
            {imgsCol1.map((image) => (
              <div key={image.id} className="w-40 sm:w-48">
                <div
                  onClick={() => handleImageClick(image.id)}
                  className="cursor-pointer"
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    style={{ objectFit: "fill" }}
                    width={192} // w-48 = 192px
                    height={192}
                    className="rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {imgsCol2.map((image) => (
              <div key={image.id} className="w-40 sm:w-48">
                <div
                  onClick={() => handleImageClick(image.id)}
                  className="cursor-pointer"
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    style={{ objectFit: "fill" }}
                    width={192} // w-48 = 192px
                    height={192}
                    className="rounded-lg "
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-6 sm:w-auto">
          {beforeImages.map((beforeImage, index) => (
            <ComparisonSlider
              key={beforeImage.id}
              beforeImage={beforeImage}
              afterImage={afterImages[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
