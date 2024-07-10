import CardStack from "~/components/img-display/card-stack";
import { getImages } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await getImages();

  return (
    <main className="">
      <div className="flex flex-wrap justify-center gap-4 p-4 pb-12">
        <CardStack images={images} />
      </div>
    </main>
  );
}
