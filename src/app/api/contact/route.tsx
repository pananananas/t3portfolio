import { ratelimit } from "~/server/ratelimit";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const { fullname, message, title, email } = await request.json();

  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log("Sending email...");
  console.log(fullname, message, title, email);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "drumpixtv@gmail.com",
    subject: "Someone wants to contact you!" + title,
    text: `From: ${fullname} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
