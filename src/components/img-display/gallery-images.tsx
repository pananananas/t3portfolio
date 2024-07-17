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

  const beforeImage1 = images_folder_6[0];
  const afterImage1 = images_folder_5[0];

  const beforeImage2 = images_folder_6[1];
  const afterImage2 = images_folder_5[1];

  const beforeImage3 = images_folder_6[2];
  const afterImage3 = images_folder_5[2];

  const beforeImage4 = images_folder_6[3];
  const afterImage4 = images_folder_5[3];

  const beforeImage5 = images_folder_6[5];
  const afterImage5 = images_folder_5[5];

  const beforeImage6 = images_folder_6[4];
  const afterImage6 = images_folder_5[7];

  const beforeImage7 = images_folder_6[6];
  const afterImage7 = images_folder_5[6];

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
                    className="rounded-lg "
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-6 sm:w-auto">
          <ComparisonSlider beforeImage={beforeImage1} afterImage={afterImage1} />
          <ComparisonSlider beforeImage={beforeImage2} afterImage={afterImage2} />
          <ComparisonSlider beforeImage={beforeImage3} afterImage={afterImage3} />
          <ComparisonSlider beforeImage={beforeImage4} afterImage={afterImage4} />
          <ComparisonSlider beforeImage={beforeImage5} afterImage={afterImage5} />
          <ComparisonSlider beforeImage={beforeImage6} afterImage={afterImage6} />
          <ComparisonSlider beforeImage={beforeImage7} afterImage={afterImage7} />
        </div>
      </div>
    </div>
  );
}
