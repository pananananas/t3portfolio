import { getImage } from "~/server/queries";
import { Modal } from "./modal";
import Image from "next/image";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idNumber = parseInt(photoId);
  if (Number.isNaN(idNumber)) throw new Error("Invalid ID");

  const image = await getImage(idNumber);
  return (
    <div>
      <Image src={image.url} width={400} height={400} />
    </div>
  );
}
