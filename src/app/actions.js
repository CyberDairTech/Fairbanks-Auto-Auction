"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const NOTIFY_EMAIL = "greatnorthauction@gci.net";

async function sendContactNotification({ name, email, phone, message }) {
  if (!process.env.RESEND_API_KEY) return;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Fairbanks Auto Auction <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${message}`,
    });
  } catch (err) {
    console.error("Failed to send contact notification email:", err);
  }
}

export async function subscribeAction(formData) {
  const email = formData.get("email")?.toString().trim();
  if (!email) return;

  const supabase = createClient();
  await supabase.from("subscribers").insert({ email }).select().maybeSingle();
}

export async function contactAction(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { error: "Please fill in your name, email, and message.", success: false };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, phone, message });

  if (error) {
    return {
      error: "Something went wrong sending your message. Please call us instead.",
      success: false,
    };
  }

  await sendContactNotification({ name, email, phone, message });

  return { error: null, success: true };
}
