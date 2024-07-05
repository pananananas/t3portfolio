import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  return (
    <div className="m-0 flex h-full min-h-0 w-full min-w-0">
      {" "}
      <div className="flex flex-shrink items-center justify-center">
        <img src={image?.url} className="flex-shrink" alt="" />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col ">
        <div className="p-2 text-center text-xl font-bold">{image?.name} </div>
        <div>
          <form
            action={async () => {
              "use server";
              await deleteImage(props.id);
            }}
          >
            <Button type="submit" variant="destructive">
              {" "}
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
