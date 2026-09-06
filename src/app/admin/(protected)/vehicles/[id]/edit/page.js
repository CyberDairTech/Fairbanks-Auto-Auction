import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VehicleForm from "@/components/admin/VehicleForm";

export const revalidate = 0;

async function getVehicle(id) {
  const supabase = createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*, vehicle_photos(id, storage_path, position)")
    .eq("id", id)
    .single();
  return data;
}

export default async function EditVehiclePage({ params }) {
  const vehicle = await getVehicle(params.id);
  if (!vehicle) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">
        Edit lot {vehicle.lot_number}
      </h1>
      <VehicleForm vehicle={vehicle} />
    </div>
  );
}
