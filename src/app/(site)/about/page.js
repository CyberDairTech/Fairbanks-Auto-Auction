import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "About Us",
  description:
    "Fairbanks Auto Auction is a locally owned, family-run auction house and the vehicle division of Great North Auction.",
};

const POINTS = [
  {
    q: "Who runs Fairbanks Auto Auction?",
    a: "We're a locally owned, family-run auction house based in Fairbanks — not a franchise or a national chain.",
  },
  {
    q: "Is the auction open to everyone?",
    a: "Yes. Dealers, first-time buyers, and everyone in between are welcome to register and bid, no license required.",
  },
  {
    q: "How are vehicles priced and sold?",
    a: "Everything sells at live public auction, as-is where-is, with condition notes posted on every lot ahead of time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-5 pt-14">
        <PageIntro
          eyebrow="Who runs Fairbanks Auto Auction?"
          answer="We're a locally owned, family-run auction house based in Fairbanks, Alaska."
          detail="Every vehicle that crosses our block is cataloged, inspected, and sold in person — no absentee sellers, no hidden fees."
        />

        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.q} className="border border-line bg-paperdim p-5">
              <h3 className="mb-2 text-[15px] font-semibold text-ink">{p.q}</h3>
              <p className="text-sm leading-relaxed text-steel">{p.a}</p>
            </div>
          ))}
        </div>

        <div className="mb-14 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="h-[260px] bg-[repeating-linear-gradient(135deg,#DCDCD4,#DCDCD4_10px,#D2D2C8_10px,#D2D2C8_20px)]" />
          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold text-ink">
              What is Fairbanks Auto Auction&apos;s connection to Great North Auction?
            </h2>
            <p className="text-[14.5px] leading-relaxed text-steel">
              <span className="font-semibold text-ink">
                Fairbanks Auto Auction is the vehicle division of Great North Auction,{" "}
              </span>
              which runs estate, equipment, and collectibles auctions across Fairbanks and North
              Pole. The two operate under the same ownership and team, so the same standards for
              honest, transparent cataloging carry over to every vehicle we sell.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-12">
          <div>
            <h2 className="mb-2 font-display text-[22px] font-semibold">
              Ready to see this week&apos;s lineup?
            </h2>
            <p className="text-sm text-slate-300">
              New lots are posted online every week before Saturday&apos;s sale.
            </p>
          </div>
          <Link
            href="/lineup"
            className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white"
          >
            View this week&apos;s lineup <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
