import nodemailer from "nodemailer";
import { SITE } from "./constants";

export type ContactFormPayload = {
  name: string;
  phone: string;
  email?: string;
  contactPerson: string;
  message: string;
};

const PLACEHOLDER_VALUES = new Set([
  "your-email@gmail.com",
  "your-app-password",
  "your-smtp-user",
  "your-smtp-password",
  "changeme",
  "password",
]);

export class SmtpNotConfiguredError extends Error {
  constructor() {
    super("SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local.");
    this.name = "SmtpNotConfiguredError";
  }
}

export class SmtpAuthError extends Error {
  constructor() {
    super("SMTP authentication failed.");
    this.name = "SmtpAuthError";
  }
}

function isPlaceholderValue(value: string | undefined): boolean {
  if (!value?.trim()) return true;

  const normalized = value.trim().toLowerCase();
  if (PLACEHOLDER_VALUES.has(normalized)) return true;
  if (normalized.startsWith("your-")) return true;
  if (normalized.includes("example.com")) return true;

  return false;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass) {
    return null;
  }

  if (isPlaceholderValue(host) || isPlaceholderValue(user) || isPlaceholderValue(pass)) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

function formatContactEmail(payload: ContactFormPayload) {
  const subject = `New inquiry from ${payload.name} — ${SITE.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "Not provided"}`,
    `Contact person: ${payload.contactPerson}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email || "Not provided")}</p>
    <p><strong>Contact person:</strong> ${escapeHtml(payload.contactPerson)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
  `;

  return { subject, text, html };
}

function isAuthError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const err = error as { code?: string; responseCode?: number };
  return err.code === "EAUTH" || err.responseCode === 535;
}

export async function sendContactEmail(payload: ContactFormPayload) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new SmtpNotConfiguredError();
  }

  const to = process.env.SMTP_TO ?? SITE.email;
  const from = process.env.SMTP_FROM ?? smtp.auth.user;
  const { subject, text, html } = formatContactEmail(payload);

  const transporter = nodemailer.createTransport(smtp);

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email || undefined,
      subject,
      text,
      html,
    });
  } catch (error) {
    if (isAuthError(error)) {
      throw new SmtpAuthError();
    }

    throw error;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
