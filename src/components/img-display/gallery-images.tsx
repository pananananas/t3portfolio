// "use client";
import Image from "next/image";
import Link from "next/link";

interface ImageData {
  id: number;
  name: string;
  url: string;
  key: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface ImagesGalleryProps {
  images: ImageData[];
}

export function GalleryImages({ images }: ImagesGalleryProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 pb-12">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              style={{ objectFit: "fill" }}
              width={192} // w-48 = 192px
              height={192}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
