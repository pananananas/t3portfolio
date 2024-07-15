"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "~/components/simple-upload-button";

export function UserSection() {
  return (
    <div className="absolute top-4 left-4 flex flex-row items-center gap-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <SimpleUploadButton />
      </SignedIn>
    </div>
  );
}