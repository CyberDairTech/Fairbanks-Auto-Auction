"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/lineup", label: "Weekly lineup" },
  { href: "/consign", label: "Consigning" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          Fairbanks Auto Auction
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b-2 pb-1 transition-colors ${
                  active
                    ? "border-accent font-semibold text-white"
                    : "border-transparent text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="tel:9073472219"
            className="flex items-center gap-2 bg-accent px-3.5 py-2 font-semibold text-white"
          >
            <Phone size={14} /> (907) 347-2219
          </a>
        </nav>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 px-6 pb-5 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`border-b border-slate-700 py-2.5 text-sm ${
                pathname === l.href ? "font-semibold text-white" : "text-slate-300"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:9073472219"
            className="mt-3 flex items-center justify-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Phone size={14} /> (907) 347-2219
          </a>
        </div>
      )}
    </header>
  );
}
