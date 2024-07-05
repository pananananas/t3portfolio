import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  return (
    <div className="flex h-full w-full min-w-0 min-h-0 m-0">
      {" "}
      <div className="flex flex-shrink items-center justify-center">
        <img src={image?.url} className="flex-shrink" alt="" />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col ">
        <div className="p-2 text-center text-xl font-bold">{image?.name} </div>
      </div>
    </div>
  );
}
