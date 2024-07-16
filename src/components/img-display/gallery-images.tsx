import Image from "next/image";
import Link from "next/link";
import { getImage, getImagesFromFolder } from "~/server/queries";
import ComparisonSlider from "~/components/img-display/img-comparison";
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

export async function GalleryImages() {
  const imgsCol1 = await getImagesFromFolder(3);
  const imgsCol2 = await getImagesFromFolder(4);

  const images_folder_5 = await getImagesFromFolder(5);
  const images_folder_6 = await getImagesFromFolder(6);

  const beforeImage = images_folder_6[0];
  const afterImage = images_folder_5[0];

  return (
    <div className="py-6">
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-row gap-6 w-full sm:w-auto justify-center">
          <div className="flex flex-col gap-6">
            {imgsCol1.map((image) => (
              <div key={image.id} className="w-40 sm:w-48">
                <Link href={`/img/${image.id}`}>
                  <Image
                    src={image.url}
                    alt={image.name}
                    style={{ objectFit: "fill" }}
                    width={192} // w-48 = 192px
                    height={192}
                    className="rounded-lg"
                  />
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {imgsCol2.map((image) => (
              <div key={image.id} className="w-40 sm:w-48">
                <Link href={`/img/${image.id}`}>
                  <Image
                    src={image.url}
                    alt={image.name}
                    style={{ objectFit: "fill" }}
                    width={192} // w-48 = 192px
                    height={192}
                    className="rounded-lg"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-6 sm:w-auto">
          <ComparisonSlider beforeImage={beforeImage} afterImage={afterImage} />
          <ComparisonSlider beforeImage={beforeImage} afterImage={afterImage} />
        </div>
      </div>
    </div>
  );
}
