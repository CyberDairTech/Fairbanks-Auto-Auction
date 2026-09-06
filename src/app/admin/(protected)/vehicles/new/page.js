import VehicleForm from "@/components/admin/VehicleForm";

export default function NewVehiclePage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">Add a vehicle</h1>
      <VehicleForm vehicle={null} />
    </div>
  );
}
