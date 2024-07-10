import { deleteImage, getImage } from "~/server/queries";
import { Button } from "../ui/button";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  return (
    <div className="m-0 flex h-full min-h-0 w-full min-w-0 justify-center ">
      <div className="rounded-xl p-2 sm:p-8">
        <img
          src={image?.url}
          className="w-max-[100%] h-max-[100%] h-full flex-shrink rounded-xl object-contain"
          alt=""
        />
      </div>

      <div className="absolute right-0 top-0 gap-4 flex flex-row p-8">
        <div>
          <form
            action={async () => {
              "use server";
              await deleteImage(props.id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}
