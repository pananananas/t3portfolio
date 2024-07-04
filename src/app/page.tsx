import Link from "next/link";
import { getImages } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await getImages();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="" className="w-full" />
            <div> {image.name} </div>
          </div>
        ))}
      </div>
    </main>
  );
}
