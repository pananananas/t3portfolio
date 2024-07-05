import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";
import { utapi } from "./uploadthing";

export async function getImages() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthenticated");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));
  
  await utapi.deleteFiles(image.key);

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "Image Deleted",
    properties: {
      imageId: id,
    },
  });
  redirect("/");
}
