"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateVehicleStatus(vehicleId, status) {
  const supabase = createClient();
  await supabase.from("vehicles").update({ status }).eq("id", vehicleId);
  revalidatePath("/admin");
  revalidatePath("/lineup");
  revalidatePath("/");
}

export async function deleteVehicle(vehicleId) {
  const supabase = createClient();

  // Remove photo files from storage first, then the DB rows (cascade handles vehicle_photos).
  const { data: photos } = await supabase
    .from("vehicle_photos")
    .select("storage_path")
    .eq("vehicle_id", vehicleId);

  if (photos && photos.length > 0) {
    await supabase.storage
      .from("vehicle-photos")
      .remove(photos.map((p) => p.storage_path));
  }

  await supabase.from("vehicles").delete().eq("id", vehicleId);

  revalidatePath("/admin");
  revalidatePath("/lineup");
  revalidatePath("/");
}

export async function saveVehicle(prevState, formData) {
  const supabase = createClient();

  const vehicleId = formData.get("vehicleId")?.toString() || null;
  const lot_number = formData.get("lot_number")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const yearRaw = formData.get("year")?.toString().trim();
  const category = formData.get("category")?.toString();
  const description = formData.get("description")?.toString().trim() || "";
  const status = formData.get("status")?.toString() || "active";
  const tags = formData.getAll("tags").map((t) => t.toString());
  const removePhotoIds = formData.getAll("removePhotoIds").map((id) => id.toString());
  const newPhotos = formData.getAll("photos").filter((f) => f && f.size > 0);

  if (!lot_number || !title || !category) {
    return { error: "Lot number, title, and vehicle type are all required." };
  }

  const year = yearRaw ? parseInt(yearRaw, 10) : null;

  const payload = { lot_number, title, year, category, description, status, tags };

  let vehicle;

  if (vehicleId) {
    const { data, error } = await supabase
      .from("vehicles")
      .update(payload)
      .eq("id", vehicleId)
      .select()
      .single();
    if (error) return { error: "Couldn't save that vehicle. Try again." };
    vehicle = data;
  } else {
    const { data, error } = await supabase
      .from("vehicles")
      .insert(payload)
      .select()
      .single();
    if (error) return { error: "Couldn't create that vehicle. Try again." };
    vehicle = data;
  }

  // Remove any photos the admin deleted while editing.
  if (removePhotoIds.length > 0) {
    const { data: toRemove } = await supabase
      .from("vehicle_photos")
      .select("id, storage_path")
      .in("id", removePhotoIds);

    if (toRemove && toRemove.length > 0) {
      await supabase.storage
        .from("vehicle-photos")
        .remove(toRemove.map((p) => p.storage_path));
      await supabase
        .from("vehicle_photos")
        .delete()
        .in("id", toRemove.map((p) => p.id));
    }
  }

  // Upload any newly-added photos.
  const { count: existingCount } = await supabase
    .from("vehicle_photos")
    .select("*", { count: "exact", head: true })
    .eq("vehicle_id", vehicle.id);

  let position = existingCount || 0;

  for (const file of newPhotos) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${vehicle.id}/${randomUUID()}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("vehicle-photos")
      .upload(path, arrayBuffer, { contentType: file.type || "image/jpeg" });

    if (!uploadError) {
      await supabase
        .from("vehicle_photos")
        .insert({ vehicle_id: vehicle.id, storage_path: path, position });
      position += 1;
    }
  }

  revalidatePath("/admin");
  revalidatePath("/lineup");
  revalidatePath("/");

  redirect("/admin");
}
