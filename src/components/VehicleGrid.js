"use client";

import { useState } from "react";
import VehicleCard from "@/components/VehicleCard";
import VehicleModal from "@/components/VehicleModal";

export default function VehicleGrid({ vehicles }) {
  const [selected, setSelected] = useState(null);

  if (vehicles.length === 0) {
    return (
      <p className="text-sm text-steel">
        No lots match that search yet — try a different category or keyword.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} onOpen={setSelected} />
        ))}
      </div>
      {selected && <VehicleModal vehicle={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
