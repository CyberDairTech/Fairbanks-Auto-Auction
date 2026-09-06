import { FileText, Download, ArrowRight } from "lucide-react";
import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "Consign a Vehicle",
  description:
    "How to sell a vehicle at Fairbanks Auto Auction — no listing fee, weekly cataloging, and a downloadable consignment form.",
};

const ACCEPTED = [
  "Cars & trucks",
  "SUVs & vans",
  "Motorcycles & ATVs",
  "Snow machines",
  "Boats & trailers",
  "Heavy equipment",
  "Fleet & surplus",
];

const STEPS = [
  {
    n: "1",
    title: "What's the first step to consign a vehicle?",
    body: "Drive it to 1665 Richardson Hwy during business hours, or call ahead if it isn't running.",
  },
  {
    n: "2",
    title: "What do I need to bring?",
    body: "Your title and key if you have them — we can still take vehicles without either, with a short conversation first.",
  },
  {
    n: "3",
    title: "How is my vehicle listed?",
    body: "Our team photographs and catalogs it online under its own lot number before the week's auction.",
  },
  {
    n: "4",
    title: "When and how do I get paid?",
    body: "Once your lot sells on Saturday, proceeds are available at the counter minus a standard seller's commission.",
  },
];

export default function ConsignPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-5 pt-14">
        <PageIntro
          eyebrow="How do I sell a vehicle at Fairbanks Auto Auction?"
          answer="Drive it in or call ahead — we're taking consignments now for this Saturday's sale."
          detail="There's no listing fee to bring a vehicle through the gate, and our team handles the cataloging, photos, and marketing for you."
        />

        <div className="mb-7 flex flex-wrap gap-2">
          {ACCEPTED.map((a) => (
            <span key={a} className="border border-line bg-paperdim px-3.5 py-2 text-[13px] font-medium text-ink">
              {a}
            </span>
          ))}
        </div>

        <a
          href="/fairbanks-auto-auction-consignment-form.pdf"
          download
          className="mb-12 flex max-w-[480px] items-center gap-3.5 border border-accent bg-white px-5 py-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-paperdim">
            <FileText size={20} className="text-accentdark" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-ink">Download the consignment form (PDF)</div>
            <div className="text-xs text-steel">Fill it out ahead of time and bring it with your vehicle.</div>
          </div>
          <Download size={18} className="shrink-0 text-accent" />
        </a>

        <div className="mb-14 grid grid-cols-2 gap-7 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="mb-2.5 font-display text-[32px] font-bold text-accent">{s.n}</div>
              <h3 className="mb-2 text-[15.5px] font-semibold text-ink">{s.title}</h3>
              <p className="text-sm leading-relaxed text-steel">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2">
          <div>
            <h2 className="mb-3.5 font-display text-[23px] font-semibold">
              Ready to bring a vehicle in?
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-slate-300">
              Call ahead so we know you&apos;re coming, especially for anything that isn&apos;t
              driving.
            </p>
            <a
              href="tel:9073472219"
              className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white"
            >
              Call (907) 347-2219 <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
