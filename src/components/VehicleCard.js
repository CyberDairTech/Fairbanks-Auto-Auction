"use client";

import { Camera, ChevronRight } from "lucide-react";

const NEGATIVE_TAGS = ["No key", "No title", "Needs work"];
const POSITIVE_TAGS = ["Drove in", "Runs great", "Runs good", "Operational", "Like new"];

export function tagClass(tag) {
  if (NEGATIVE_TAGS.includes(tag)) return "bg-brick";
  if (POSITIVE_TAGS.includes(tag)) return "bg-moss";
  return "bg-steel";
}

export default function VehicleCard({ vehicle, onOpen }) {
  const cover = vehicle.photos[0];

  return (
    <div
      onClick={() => onOpen(vehicle)}
      className="cursor-pointer border border-line bg-white transition-colors hover:border-ink"
    >
      <div className="relative h-[200px] bg-paperdim">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.url}
            alt={vehicle.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#8B8B80]">
            <Camera size={28} strokeWidth={1.5} />
            <span className="text-xs">No photos yet</span>
          </div>
        )}
        <div className="absolute left-0 top-0 bg-ink px-3.5 py-1 font-display text-lg font-semibold text-white">
          Lot {vehicle.lot_number}
        </div>
        {vehicle.photos.length > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 text-xs text-white">
            <Camera size={12} /> {vehicle.photos.length}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-2 font-display text-[17px] font-semibold text-ink">
          {vehicle.title}
        </h3>
        <p className="mb-3 text-[13.5px] leading-relaxed text-steel line-clamp-2">
          {vehicle.description}
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {(vehicle.tags || []).map((t) => (
            <span
              key={t}
              className={`${tagClass(t)} px-2.5 py-1 text-xs font-medium text-white`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          View details <ChevronRight size={15} />
        </div>
      </div>
    </div>
  );
}
