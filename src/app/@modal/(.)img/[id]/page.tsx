import FullPageImageView from "~/components/img-display/full-image-page";

import { Modal } from "./modal";
import FullPageImageViewServer from "~/components/img-display/full-image-page-server";

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
