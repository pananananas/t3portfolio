import { getImage, getImagesFromFolder } from "~/server/queries";
export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { LinkBadge } from "~/components/LinkBadge";

import { ContactForm } from "~/components/contact-form";
import CardStack from "~/components/img-display/card-stack";
import { GalleryImages } from "~/components/img-display/gallery-images";

export default async function HomePage() {
  const profile_image = await getImage(67);

  const images_folder_1 = await getImagesFromFolder(1);
  const images_folder_2 = await getImagesFromFolder(2);

  return (
    <div className="">
      <div className="mx-auto grid h-screen max-w-screen-xl px-4 py-12 font-sans sm:px-6 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header className="flex flex-col items-center md:items-start lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div className="flex flex-col ">
              {profile_image && (
                <Image
                  src={profile_image.url}
                  alt="Profile Picture"
                  className="mb-8 rounded-lg border border-yellow-200 shadow-xl"
                  width={240}
                  height={240}
                  priority={true}
                />
              )}
              <nav className="nav desktop-nav hidden lg:flex xl:flex 2xl:flex">
                <ul className="flex flex-col gap-3">
                  {["About", "My work", "Contact"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="nav-link relative pl-8 transition-colors hover:text-yellow-500"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>

          <main className="lg:w-3/4 lg:py-24 lg:pt-24">
            <section id="about" className="pb-10 pt-8">
              <h2 className="pb-4 text-2xl font-bold">About Me</h2>
              <p>
                Hi, I’m Hanna - a sophomore year college scholar, studying
                Graphic Arts at the Academy of Fine Arts in Wrocław. I engage
                broadly in visual arts - from posters, logo and font designs to
                illustrations, animations and portraits - I do it all!
              </p>
            </section>

            <section id="my work" className="pb-10 pt-8">
              <h2 className="pb-4 text-2xl font-bold">My Work</h2>

              <div className="flex flex-row gap-10 items-center">
                <div className="w-1/2 sm:w-auto">
                  <CardStack images={images_folder_1} id="stack1" />
                </div>
                <div className="flex w-1/2 flex-col py-10">
                  <h3 className="text-xl font-bold">
                    Mom, why are there no stars in the city?
                  </h3>
                  <p className="pt-1">
                    An animated short about light pollution and farm animal
                    abuse. Written, directed, illustrated and animated by me.
                  </p>
                  <div className="flex flex-row gap-2 pt-2">
                    <Badge>2024</Badge>
                    <LinkBadge href="/watch" badge="Watch" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-10 items-center">
                <div className="w-1/2 sm:w-auto">
                  <CardStack images={images_folder_2} id="stack2" />
                </div>
                <div className="flex w-1/2 flex-col py-10">
                  <h3 className="text-xl font-bold">The friendship fable</h3>
                  <p className="pt-1">
                    A childrens book about forest animals and friendship,
                    written by Krystyna Piluś and Illustrated by me.
                  </p>
                  <div className="flex flex-row gap-2 pt-2">
                    <Badge>2020</Badge>
                    <LinkBadge href="/watch" badge="Read" />
                  </div>
                </div>
              </div>
              <GalleryImages />
            </section>

            <section id="contact" className="pb-10 pt-8">
              <h2 className="pb-4 text-2xl font-bold">Contact</h2>
              <ContactForm />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
