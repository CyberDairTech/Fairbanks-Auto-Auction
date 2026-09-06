"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Pencil, Trash2, Camera } from "lucide-react";
import { photoUrl } from "@/lib/photos";
import { updateVehicleStatus, deleteVehicle } from "@/app/admin/(protected)/actions";

const STATUS_STYLES = {
  active: "bg-moss text-white",
  sold: "bg-steel text-white",
  pulled: "bg-brick text-white",
};

export default function VehicleRow({ vehicle }) {
  const [isPending, startTransition] = useTransition();
  const photos = (vehicle.vehicle_photos || []).sort((a, b) => a.position - b.position);
  const cover = photos[0];

  const setStatus = (status) => {
    startTransition(() => updateVehicleStatus(vehicle.id, status));
  };

  const onDelete = () => {
    if (confirm(`Delete "${vehicle.title}"? This can't be undone.`)) {
      startTransition(() => deleteVehicle(vehicle.id));
    }
  };

  return (
    <div className={`flex items-center gap-4 p-4 ${isPending ? "opacity-50" : ""}`}>
      <div className="h-16 w-20 shrink-0 bg-paperdim">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl(cover.storage_path)}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#8B8B80]">
            <Camera size={18} />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-steel">Lot {vehicle.lot_number}</span>
          <span className={`px-2 py-0.5 text-[11px] font-semibold uppercase ${STATUS_STYLES[vehicle.status]}`}>
            {vehicle.status}
          </span>
        </div>
        <div className="truncate text-sm font-semibold text-ink">{vehicle.title}</div>
        <div className="truncate text-xs text-steel">{vehicle.category}</div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {vehicle.status !== "active" && (
          <button
            onClick={() => setStatus("active")}
            className="border border-line px-2.5 py-1.5 text-xs font-medium text-steel"
          >
            Mark active
          </button>
        )}
        {vehicle.status !== "sold" && (
          <button
            onClick={() => setStatus("sold")}
            className="border border-line px-2.5 py-1.5 text-xs font-medium text-steel"
          >
            Mark sold
          </button>
        )}
        {vehicle.status !== "pulled" && (
          <button
            onClick={() => setStatus("pulled")}
            className="border border-line px-2.5 py-1.5 text-xs font-medium text-steel"
          >
            Pull
          </button>
        )}
        <Link
          href={`/admin/vehicles/${vehicle.id}/edit`}
          className="flex h-8 w-8 items-center justify-center border border-line text-steel"
          aria-label="Edit"
        >
          <Pencil size={14} />
        </Link>
        <button
          onClick={onDelete}
          className="flex h-8 w-8 items-center justify-center border border-line text-brick"
          aria-label="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
