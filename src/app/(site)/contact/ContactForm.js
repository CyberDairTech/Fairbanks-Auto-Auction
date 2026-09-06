"use client";

import { useFormState, useFormStatus } from "react-dom";
import { contactAction } from "@/app/actions";

const initialState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex bg-accent px-5 py-2.5 text-[13px] font-semibold text-white disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(contactAction, initialState);

  if (state.success) {
    return (
      <div className="bg-paperdim p-6">
        <div className="mb-1.5 text-[15px] font-semibold text-ink">Message sent</div>
        <p className="text-sm text-steel">
          Thanks for reaching out — our team will get back to you before the next sale.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-paperdim p-6">
      <div className="mb-4 text-[15px] font-semibold text-ink">Send a message</div>

      {state.error && (
        <p className="mb-4 text-[13px] text-brick">{state.error}</p>
      )}

      <input
        name="name"
        required
        placeholder="Name"
        className="mb-3 w-full border border-line bg-white px-3 py-2.5 text-[13px] focus:outline-none focus:border-accent"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="mb-3 w-full border border-line bg-white px-3 py-2.5 text-[13px] focus:outline-none focus:border-accent"
      />
      <input
        name="phone"
        placeholder="Phone (optional)"
        className="mb-3 w-full border border-line bg-white px-3 py-2.5 text-[13px] focus:outline-none focus:border-accent"
      />
      <textarea
        name="message"
        required
        placeholder="What can we help with?"
        rows={4}
        className="mb-4 w-full border border-line bg-white px-3 py-2.5 text-[13px] focus:outline-none focus:border-accent"
      />
      <SubmitButton />
    </form>
  );
}
