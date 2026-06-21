import { NextResponse } from "next/server";
import {
  sendContactEmail,
  SmtpAuthError,
  SmtpNotConfiguredError,
  type ContactFormPayload,
} from "@/lib/mail";

const DEV_GMAIL_SETUP =
  "Gmail setup for gargplywoodpalacesince1985@gmail.com: sign in to that Google account, enable 2-Step Verification at https://myaccount.google.com/security, create an App Password at https://myaccount.google.com/apppasswords, then set SMTP_USER=gargplywoodpalacesince1985@gmail.com and SMTP_PASS to the 16-character app password in .env.local. Restart the dev server after saving.";

function getContactErrorMessage(error: unknown): string {
  if (error instanceof SmtpNotConfiguredError) {
    return process.env.NODE_ENV === "development"
      ? `Email is not configured. Update SMTP settings in .env.local (replace placeholder values), then restart the dev server. ${DEV_GMAIL_SETUP}`
      : "Email service is not configured. Please call us directly.";
  }

  if (error instanceof SmtpAuthError) {
    return process.env.NODE_ENV === "development"
      ? `SMTP login failed. Check SMTP_USER and SMTP_PASS in .env.local. ${DEV_GMAIL_SETUP}`
      : "Unable to send your message. Please try again or call us directly.";
  }

  return "Unable to send your message. Please try again or call us directly.";
}

function isValidPayload(body: unknown): body is ContactFormPayload {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  return (
    typeof data.name === "string" &&
    data.name.trim().length > 0 &&
    typeof data.phone === "string" &&
    data.phone.trim().length > 0 &&
    typeof data.contactPerson === "string" &&
    data.contactPerson.trim().length > 0 &&
    typeof data.message === "string" &&
    data.message.trim().length > 0 &&
    (data.email === undefined ||
      data.email === null ||
      data.email === "" ||
      typeof data.email === "string")
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    await sendContactEmail({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || undefined,
      contactPerson: body.contactPerson.trim(),
      message: body.message.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      { error: getContactErrorMessage(error) },
      { status: 500 }
    );
  }
}
