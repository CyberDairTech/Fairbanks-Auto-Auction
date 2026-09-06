"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./actions";

const initialState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-accent py-3 text-sm font-semibold text-white disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paperdim px-6">
      <form action={formAction} className="w-full max-w-sm bg-white p-8">
        <div className="mb-1 font-display text-xl font-semibold text-ink">
          Fairbanks Auto Auction
        </div>
        <div className="mb-6 text-sm text-steel">Staff sign in</div>

        {state.error && <p className="mb-4 text-[13px] text-brick">{state.error}</p>}

        <label className="mb-1.5 block text-xs font-semibold text-steel">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mb-4 w-full border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
        />
        <label className="mb-1.5 block text-xs font-semibold text-steel">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mb-6 w-full border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
        />
        <SubmitButton />
      </form>
    </div>
  );
}
