import { getImages } from "~/server/queries";
export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import CardStack from "~/components/img-display/image-card-stack";

async function Images() {
  const images = await getImages();
  console.log(images);

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
}

export default async function HomePage() {
  const images = await getImages();

  return (
    <main className="">
      {/* <Images /> */}
      <div className="flex flex-wrap justify-center gap-4 p-4 pb-12">
        <CardStack images={images} />
      </div>
    </main>
  );
}
