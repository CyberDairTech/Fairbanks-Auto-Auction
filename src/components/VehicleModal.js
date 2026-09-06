"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { tagClass } from "@/components/VehicleCard";

export default function VehicleModal({ vehicle, onClose }) {
  const [active, setActive] = useState(0);
  const photos = vehicle.photos || [];
  const hasPhotos = photos.length > 0;

  const next = () => setActive((a) => (a === photos.length - 1 ? 0 : a + 1));
  const prev = () => setActive((a) => (a === 0 ? photos.length - 1 : a - 1));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto bg-white"
      >
        <div className="relative bg-paperdim">
          {hasPhotos ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photos[active].url}
              alt={vehicle.title}
              className="h-[340px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[340px] w-full flex-col items-center justify-center gap-2 text-[#8B8B80]">
              <Camera size={28} strokeWidth={1.5} />
              <span className="text-xs">No photos yet</span>
            </div>
          )}

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center bg-ink text-white"
          >
            <X size={18} />
          </button>
          <div className="absolute left-0 top-0 bg-ink px-3.5 py-1 font-display text-lg font-semibold text-white">
            Lot {vehicle.lot_number}
          </div>

          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-white"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {photos.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto px-6 pt-3">
            {photos.map((p, i) => (
              <button
                key={p.path}
                onClick={() => setActive(i)}
                className={`h-[42px] w-14 shrink-0 ${
                  i === active ? "bg-accent" : "bg-paperdim"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt="" className="h-full w-full object-cover opacity-90" />
              </button>
            ))}
          </div>
        )}

        <div className="px-6 pb-7 pt-5">
          <h2 className="mb-2.5 font-display text-2xl font-semibold text-ink">
            {vehicle.title}
          </h2>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {(vehicle.tags || []).map((t) => (
              <span
                key={t}
                className={`${tagClass(t)} px-2.5 py-1 text-xs font-medium text-white`}
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mb-5 max-w-lg text-[15px] leading-relaxed text-steel">
            {vehicle.description} Available to inspect in person at 1665 Richardson Hwy
            ahead of this Saturday&apos;s live auction. Bring your questions — our team can
            walk the lot with you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white"
          >
            Ask about this lot
          </a>
        </div>
      </div>
    </div>
  );
}
