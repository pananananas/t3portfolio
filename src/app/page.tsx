import { getImages } from "~/server/queries";
export const dynamic = "force-dynamic";
import Image from "next/image";

async function Images() {
  const images = await getImages();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <Image
            src={image.url}
            alt={image.name}
            style={{ objectFit: "fill" }}
            width={192} // w-48 = 192px
            height={192}
          />
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
