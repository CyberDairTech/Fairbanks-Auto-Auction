// Vehicle photos live in the public "vehicle-photos" Supabase Storage bucket.
// The public URL is deterministic, so we can build it without a network call.
export function photoUrl(storagePath) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/vehicle-photos/${storagePath}`;
}

export function mapVehicleRow(row) {
  const photos = (row.vehicle_photos || [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((p) => ({ path: p.storage_path, url: photoUrl(p.storage_path) }));
  return { ...row, photos };
}
