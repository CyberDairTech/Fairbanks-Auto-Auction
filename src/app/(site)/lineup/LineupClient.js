"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import PageIntro from "@/components/PageIntro";
import VehicleGrid from "@/components/VehicleGrid";

const ALL = "All lots";

export default function LineupClient({ vehicles }) {
  const [cat, setCat] = useState(ALL);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return vehicles.filter(
      (v) =>
        (cat === ALL || v.category === cat) &&
        v.title.toLowerCase().includes(q.toLowerCase())
    );
  }, [vehicles, cat, q]);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <PageIntro
        eyebrow="What vehicles are up for auction in Fairbanks this week?"
        answer={`${vehicles.length} lot${vehicles.length === 1 ? "" : "s"} are cataloged for this Saturday's sale.`}
        detail="Every vehicle is listed with photos below — filter by type or search by name, and tap any lot for the full photo set."
      />

      <div className="mb-7 flex flex-wrap items-center gap-4">
        <div className="flex max-w-xs flex-1 items-center gap-2 border border-line bg-white px-3.5 py-2">
          <Search size={16} className="text-steel" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search this week's lots"
            className="w-full min-w-0 text-sm focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[ALL, ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3.5 py-1.5 text-[13px] font-medium ${
                cat === c ? "bg-accent text-white" : "border border-line bg-white text-steel"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 text-[13px] text-steel">
        Showing {filtered.length} of {vehicles.length} lots
        {cat !== ALL ? ` in ${cat}` : ""} — the full lineup, no pagination.
      </p>

      <VehicleGrid vehicles={filtered} />
    </section>
  );
}
