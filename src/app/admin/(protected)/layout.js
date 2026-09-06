import Link from "next/link";
import { signOutAction } from "./actions";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-paperdim">
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-display text-base font-semibold">
            Fairbanks Auto Auction — Staff
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/" className="text-slate-300">
              View live site
            </Link>
            <form action={signOutAction}>
              <button type="submit" className="text-slate-300">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
