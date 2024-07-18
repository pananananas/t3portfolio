import { deleteImage, getImage } from "~/server/queries";
import { Button } from "../ui/button";
import Image from "next/image";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);



  return (
    <div className="flex h-full min-h-0 w-full min-w-0 items-center justify-center">
      <div className=" overflow-auto p-2 sm:p-8 ">
        {image && (
          <Image
            src={image?.url}
            className="w-max-[100%] h-max-[100%] h-full flex-shrink rounded-xl object-contain"
            alt=""
            // layout="fill"
            // objectFit="contain"
            fill={true}
            priority={true}
            quality={80}
            loading="eager"
            blurDataURL={image.url}
            placeholder = 'blur' 
          />
        )}
      </div>

      <div className="absolute right-0 top-0 flex flex-row gap-4 p-8">
        {/* if user exists: */}
        <div>
          <form
            action={async () => {
              "use server";
              await deleteImage(props.id);
            }}
          >
            {/* Delete button  */}
            {/* <Button type="submit" variant="destructive">
              Delete
            </Button> */}
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
        {/* <div className="absolute top-0 left-0 right-0 h-full w-full fill-red-500 z-50"> */}
        {/* </div> */}
      </div>
    </div>
  );
}
