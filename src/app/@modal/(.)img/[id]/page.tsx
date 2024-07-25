import FullPageImageViewServer from "~/components/img-display/full-image-page-server";
import { Modal } from "./modal";

export default async function PhotoModalPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idNumber = parseInt(photoId);
  if (Number.isNaN(idNumber)) throw new Error("Invalid ID");
  const returnHref = "/";

  return (
    <Modal returnHref={returnHref}>
      <FullPageImageViewServer id={idNumber} />
    </Modal>
  );
}
