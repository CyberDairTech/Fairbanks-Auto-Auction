import { createClient } from "@/lib/supabase/server";
import { mapVehicleRow } from "@/lib/photos";
import LineupClient from "./LineupClient";

export const metadata = {
  title: "This Week's Vehicle Lineup",
  description:
    "Every lot cataloged for Saturday's live auction at Fairbanks Auto Auction, with full photo sets for each vehicle.",
};

export const revalidate = 0;

async function getActiveVehicles() {
  const supabase = createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*, vehicle_photos(storage_path, position)")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (data || []).map(mapVehicleRow);
}

export default async function LineupPage() {
  const vehicles = await getActiveVehicles();
  return <LineupClient vehicles={vehicles} />;
}
