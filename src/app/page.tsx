import CardStack from "~/components/img-display/card-stack";
import { getImages, getImagesFromFolder } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images_folder_1 = await getImagesFromFolder(1);
  const images_folder_2 = await getImagesFromFolder(2);

  return (
    <main className="">
      <div className="flex flex-wrap justify-center gap-4 p-4 pb-12">
        <div className="flex flex-col">
          <CardStack images={images_folder_1} id="stack1" />
          <CardStack images={images_folder_2} id="stack2" />
        </div>
      </div>
    </main>
  );
}
