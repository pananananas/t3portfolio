import { getImages } from "~/server/queries";
export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";

async function Images() {
  const images = await getImages();

  return (
    <div className="flex flex-wrap justify-center gap-4">
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
          {/* <div> {image.name} </div> */}
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <Images />
    </main>
  );
}
