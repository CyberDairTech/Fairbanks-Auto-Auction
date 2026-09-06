import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import VehicleRow from "@/components/admin/VehicleRow";

export const revalidate = 0;

async function getAllVehicles() {
  const supabase = createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*, vehicle_photos(storage_path, position)")
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function AdminDashboard() {
  const vehicles = await getAllVehicles();
  const active = vehicles.filter((v) => v.status === "active");
  const other = vehicles.filter((v) => v.status !== "active");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Vehicles</h1>
          <p className="text-sm text-steel">
            {active.length} active lot{active.length === 1 ? "" : "s"} showing on the site.
          </p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={16} /> Add a vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="bg-white p-10 text-center">
          <p className="mb-4 text-sm text-steel">No vehicles yet.</p>
          <Link href="/admin/vehicles/new" className="text-sm font-semibold text-accent">
            Add your first vehicle
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-line bg-white">
          {[...active, ...other].map((v) => (
            <VehicleRow key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
