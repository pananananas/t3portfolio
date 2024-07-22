// FullPageImageViewServer.tsx
import { getImage, getImagesFromFolder } from "~/server/queries";
import FullPageImageViewClient from "./full-image-page-client";


export default async function FullPageImageViewServer({ id }: { id: number }) {
  const image = await getImage(id);
  
  if (!image) {
    return <div>Image not found</div>;
  }

  const folderImages = image.folderId 
    ? await getImagesFromFolder(image.folderId)
    : [];

  return (
    <FullPageImageViewClient 
      initialImage={image} 
      folderImages={folderImages}
    />
  );
}