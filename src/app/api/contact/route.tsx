import { ratelimit } from "~/server/ratelimit";
import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const { fullname, message, title, email } = await request.json();

  // Extract IP address from the request
  const ip = request.headers.get("x-forwarded-for") || request.ip;
  
  // Check rate limit using the IP address as the identifier
  if (!ip) {
    console.error("IP address not found");
    return NextResponse.json({ error: "IP address not found" }, { status: 400 });
  }

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    console.error("Rate limit exceeded");
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

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
