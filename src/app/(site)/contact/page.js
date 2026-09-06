import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Call, visit, or send a message to Fairbanks Auto Auction at 1665 Richardson Hwy, Fairbanks, AK.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <PageIntro
        eyebrow="How do I get in touch with Fairbanks Auto Auction?"
        answer="Call (907) 347-2219 or stop by 1665 Richardson Hwy during business hours."
        detail="You can also send a message below and our team will get back to you before the next sale."
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="mb-7">
            <div className="mb-1.5 text-[13px] font-semibold text-steel">Phone</div>
            <a href="tel:9073472219" className="font-display text-xl font-semibold text-ink">
              (907) 347-2219
            </a>
          </div>
          <div className="mb-7">
            <div className="mb-1.5 text-[13px] font-semibold text-steel">Address</div>
            <div className="text-[15px] text-ink">1665 Richardson Hwy, Fairbanks, AK 99701</div>
          </div>
          <div className="mb-7">
            <div className="mb-1.5 text-[13px] font-semibold text-steel">Hours</div>
            <div className="text-sm leading-loose text-ink">
              Mon–Fri 10am–6pm
              <br />
              Sat 10am–3pm (auction at noon)
              <br />
              Sun closed
            </div>
          </div>
          <div className="relative h-[160px] overflow-hidden">
            <Image
              src="/images/contact.jpg"
              alt="Northern lights over the boreal forest near Fairbanks, Alaska"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
