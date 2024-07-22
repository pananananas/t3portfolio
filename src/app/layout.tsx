import "@uploadthing/react/styles.css";
import "~/styles/globals.css";
import posthog from "posthog-js";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/sonner";
import { Background } from "~/components/background";
import { ourFileRouter } from "./api/uploadthing/core";
import { UserSection } from "~/components/user-section";
import { extractRouterConfig } from "uploadthing/server";
import { CSPostHogProvider } from "./_analytics/provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

export const metadata = {
  title: "Portfolio",
  description: "Portfolio",
  icons: [{ rel: "icon", url: "/sunflower.png" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  posthog.capture("my event", { property: "value" });

  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <body className="dark bg-[#101010]">
            <main className="overflow-y-scroll">{children}</main>
            {modal}
            <Background />
            <UserSection />
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
