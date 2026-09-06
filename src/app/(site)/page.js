import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Truck, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { mapVehicleRow } from "@/lib/photos";
import VehicleGrid from "@/components/VehicleGrid";

async function getFeaturedVehicles() {
  const supabase = createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*, vehicle_photos(storage_path, position)")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  return (data || []).map(mapVehicleRow);
}

async function getActiveLotCount() {
  const supabase = createClient();
  const { count } = await supabase
    .from("vehicles")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");
  return count || 0;
}

const STEPS = [
  {
    n: "1",
    title: "How do I see what's up for auction?",
    body: "Browse the lineup online — new vehicles are posted as soon as they're checked in for the week.",
  },
  {
    n: "2",
    title: "Can I inspect a vehicle before bidding?",
    body: "Yes. Walk the lot in Fairbanks any time before Saturday's sale — every vehicle is available to view and start.",
  },
  {
    n: "3",
    title: "How does the live auction work?",
    body: "Auctions run every Saturday at noon at 1665 Richardson Hwy. Registration is quick and free.",
  },
  {
    n: "4",
    title: "What happens after I win a bid?",
    body: "Settle up with our team on site and drive your vehicle home the same day.",
  },
];

const FACTS = [
  { icon: Clock, q: "When is the next car auction in Fairbanks?", a: "Every Saturday at 12 noon." },
  { icon: MapPin, q: "Where is Fairbanks Auto Auction located?", a: "1665 Richardson Hwy, Fairbanks, AK." },
  { icon: Truck, q: "Can I sell my vehicle at the auction?", a: "Yes — we're taking consignments now, call ahead." },
];

export default async function HomePage() {
  const [featured, lotCount] = await Promise.all([getFeaturedVehicles(), getActiveLotCount()]);

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="min-w-0 px-6 py-16 md:py-20">
            <div className="mb-6 inline-flex items-center gap-2 bg-accent px-3.5 py-1.5 text-sm font-semibold">
              <Clock size={14} /> Next live auction — Saturday, 12 noon
            </div>
            <h1 className="mb-5 max-w-[480px] font-display text-[40px] font-semibold leading-tight">
              Fairbanks&apos; weekly stop for vehicles, equipment, and honest deals.
            </h1>
            <p className="mb-8 max-w-[440px] text-base leading-relaxed">
              <span className="font-semibold text-white">
                A live vehicle auction runs every Saturday at 1665 Richardson Hwy.{" "}
              </span>
              <span className="text-slate-300">
                Cars, trucks, SUVs, snow machines, and equipment cross the block weekly — open
                to the public and dealers, no license required.
              </span>
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/lineup"
                className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white"
              >
                View this week&apos;s lineup <ArrowRight size={16} />
              </Link>
              <Link
                href="/consign"
                className="inline-flex items-center gap-2 border border-slate-600 px-5 py-3 text-sm text-white"
              >
                Consign a vehicle
              </Link>
            </div>
          </div>
          <div className="relative min-h-[300px] min-w-0 overflow-hidden md:min-h-[380px]">
            <Image
              src="/images/hero.png"
              alt="Aerial view of the Fairbanks Auto Auction lot, full of vehicles ready for auction"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paperdim">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 px-6 py-7 md:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.q} className="flex gap-3">
              <f.icon size={18} className="mt-0.5 shrink-0 text-accentdark" />
              <div>
                <div className="mb-0.5 text-[13px] text-steel">{f.q}</div>
                <div className="text-sm font-semibold text-ink">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-5 pt-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="mb-2 font-display text-[26px] font-semibold text-ink">
              What vehicles are up for auction this week?
            </h2>
            <p className="text-sm text-steel">
              <span className="font-semibold text-ink">
                {lotCount} lot{lotCount === 1 ? "" : "s"} cataloged for Saturday.{" "}
              </span>
              A sample of what&apos;s crossing the block is below.
            </p>
          </div>
          <Link href="/lineup" className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            See the full lineup <ArrowRight size={15} />
          </Link>
        </div>
        <VehicleGrid vehicles={featured} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 font-display text-[26px] font-semibold text-ink">
          How does the Fairbanks Auto Auction process work?
        </h2>
        <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="mb-3.5 font-display text-2xl font-semibold">
              How do I sell a vehicle at Fairbanks Auto Auction?
            </h2>
            <p className="mb-6 max-w-md text-[15px] leading-relaxed">
              <span className="font-semibold text-white">
                Drive it in or call ahead — we&apos;re taking consignments now for this
                Saturday&apos;s sale.{" "}
              </span>
              <span className="text-slate-300">
                Cars, trucks, ATVs, snow machines, boats, and equipment are all welcome.
              </span>
            </p>
            <Link
              href="/consign"
              className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white"
            >
              See how consigning works <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative h-[220px] overflow-hidden">
            <Image
              src="/images/consign.webp"
              alt="Downtown Fairbanks along the Chena River"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
