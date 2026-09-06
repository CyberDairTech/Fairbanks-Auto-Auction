import Link from "next/link";
import { ArrowUpRight, Facebook } from "lucide-react";
import { subscribeAction } from "@/app/actions";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/lineup", label: "Weekly lineup" },
  { href: "/consign", label: "Consigning" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <>
      <section className="bg-steel">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-white">
          <span>
            <span className="text-slate-200">Who owns Fairbanks Auto Auction? </span>
            <span className="font-semibold">
              We&apos;re the vehicle division of Great North Auction.
            </span>
          </span>
          <a
            href="https://www.greatnorthauction.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-white"
          >
            Visit Great North Auction <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <footer className="bg-ink text-slate-300">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 font-display text-lg font-bold text-white">
              Fairbanks Auto Auction
            </div>
            <p className="mb-3 max-w-[240px] text-sm leading-relaxed">
              1665 Richardson Hwy, Fairbanks, AK 99701
              <br />
              (907) 347-2219
            </p>
            <a
              href="https://www.facebook.com/Greatnorthauction/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <Facebook size={16} /> Follow us on Facebook
            </a>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-white">Quick links</div>
            <div className="flex flex-col gap-2 text-sm">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-white">What are the hours?</div>
            <p className="text-sm leading-loose">
              Mon–Fri 10am–6pm
              <br />
              Sat 10am–3pm (auction at noon)
              <br />
              Sun closed
            </p>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-white">Get the lineup by email</div>
            <p className="mb-3 text-sm leading-relaxed">
              Sign up and we&apos;ll send it before it&apos;s posted online.
            </p>
            <form action={subscribeAction} className="flex border border-slate-600">
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="whitespace-nowrap bg-accent px-3.5 text-sm font-semibold text-white"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-slate-700 px-6 py-4 text-xs">
          <span>© {new Date().getFullYear()} Fairbanks Auto Auction. All rights reserved.</span>
          <Link href="/admin" className="text-slate-400">
            Staff login
          </Link>
        </div>
      </footer>
    </>
  );
}
