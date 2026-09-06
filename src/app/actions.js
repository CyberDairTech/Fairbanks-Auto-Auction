"use server";

import { createClient } from "@/lib/supabase/server";

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

  return { error: null, success: true };
}
