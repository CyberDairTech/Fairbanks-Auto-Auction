import PageIntro from "@/components/PageIntro";
import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to the most common questions about bidding, consigning, titles, keys, payment, and buying at Fairbanks Auto Auction.",
};

export const FAQS = [
  {
    q: "What does \"no key\" mean on a lot?",
    a: "It means the vehicle doesn't come with a working key, so it can't be started or driven at the auction. It's still fully inspectable in person, and many buyers plan for a replacement key or ignition as part of their bid.",
  },
  {
    q: "What does \"no title\" mean, and can I still buy the vehicle?",
    a: "Yes. \"No title\" means the seller doesn't currently have paperwork on hand. We can walk you through Alaska's bonded title process for these vehicles after the sale.",
  },
  {
    q: "Do I need a dealer license to bid?",
    a: "No. Fairbanks Auto Auction is open to the general public as well as licensed dealers — no license is required to register or bid.",
  },
  {
    q: "How do I pay if I win a lot?",
    a: "Payment is due the day of the sale. We accept cash, debit, and most major cards at the counter immediately after the auction closes.",
  },
  {
    q: "Can I inspect a vehicle before the auction?",
    a: "Yes. The lot is open to walk during business hours all week leading up to Saturday's sale, so you can look over anything you're interested in before bidding.",
  },
  {
    q: "What happens if a vehicle I bought doesn't run?",
    a: "All vehicles sell as-is, where-is, with no warranty. Condition notes (drove in, no key, runs great, and so on) are posted on every lot so you know what you're bidding on before the gavel drops.",
  },
  {
    q: "Is there a buyer's premium?",
    a: "Yes, a standard buyer's premium is added to the winning bid. Our team can confirm the exact percentage when you register on auction day.",
  },
  {
    q: "Can out-of-state or online buyers participate?",
    a: "Absolute-auction lots are announced ahead of time and can be bid on with an absentee arrangement — call ahead to set one up before Saturday.",
  },
];

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <PageIntro
        eyebrow="Frequently asked questions"
        answer="Here's what most first-time bidders and sellers ask before Saturday's auction."
        detail="Can't find your question? Call (907) 347-2219 and our team will walk you through it."
      />
      <FaqAccordion items={FAQS} />
    </section>
  );
}
