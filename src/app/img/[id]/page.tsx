import FullPageImageView from "~/components/full-image-page";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idNumber = parseInt(photoId);
  if (Number.isNaN(idNumber)) throw new Error("Invalid ID");

  return <FullPageImageView id={idNumber} />;
}
9;
