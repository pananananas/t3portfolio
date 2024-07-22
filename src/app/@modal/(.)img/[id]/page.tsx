import FullPageImageViewServer from "~/components/img-display/full-image-page-server";
import { Modal } from "./modal";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idNumber = parseInt(photoId);
  if (Number.isNaN(idNumber)) throw new Error("Invalid ID");

  return (
    <Modal>
      <FullPageImageViewServer id={idNumber} />
    </Modal>
  );
}
