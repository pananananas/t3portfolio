import Link from "next/link";
import { db } from "~/server/db";


const mockUrls = [
  "https://utfs.io/f/9c6799a0-cd52-4ccb-a62d-3661e0fb78c1-tivxvy.png",
  "https://utfs.io/f/a82c028c-40ad-49b4-be80-02106768e00d-p9y6kz.png",
  "https://utfs.io/f/10f54525-688a-4eff-8ee3-b2f6ccaa5ddb-4rk9u4.png",
  "https://utfs.io/f/2ae956d5-ffac-4027-982a-ba9f4d4a6001-yshtz.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));


export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log("posts")
  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (  
          <div key={post.id} className="w-48">
            {post.name}
          </div>  
        ))}

        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="" className="w-full" />
          </div>
        ))}
      </div>

    </main>
  );
}
