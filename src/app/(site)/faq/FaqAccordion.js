"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-2xl">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={item.q} className="border-b border-line">
            <button
              onClick={() => setOpenIdx(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-[15.5px] font-semibold text-ink">{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-steel transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <p className="mb-5 max-w-xl text-[14.5px] leading-relaxed text-steel">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
