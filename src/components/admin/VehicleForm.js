"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Upload, X } from "lucide-react";
import { CATEGORIES, CONDITION_TAGS, STATUSES } from "@/lib/categories";
import { photoUrl } from "@/lib/photos";
import { saveVehicle } from "@/app/admin/(protected)/actions";

const initialState = { error: null };

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-accent py-3.5 text-sm font-semibold text-white disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

export default function VehicleForm({ vehicle }) {
  const [state, formAction] = useFormState(saveVehicle, initialState);

  const [category, setCategory] = useState(vehicle?.category || CATEGORIES[0]);
  const [status, setStatus] = useState(vehicle?.status || "active");
  const [tags, setTags] = useState(vehicle?.tags || []);
  const [existingPhotos, setExistingPhotos] = useState(
    (vehicle?.vehicle_photos || []).sort((a, b) => a.position - b.position)
  );
  const [removedIds, setRemovedIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  const toggleTag = (t) => {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const removeExisting = (photo) => {
    setExistingPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setRemovedIds((prev) => [...prev, photo.id]);
  };

  const onFilesChosen = (e) => {
    setNewFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
    e.target.value = "";
  };

  const removeNewFile = (idx) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <form action={formAction} className="max-w-xl bg-white p-6 sm:p-8">
      {vehicle?.id && <input type="hidden" name="vehicleId" value={vehicle.id} />}
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="status" value={status} />
      {tags.map((t) => (
        <input key={t} type="hidden" name="tags" value={t} />
      ))}
      {removedIds.map((id) => (
        <input key={id} type="hidden" name="removePhotoIds" value={id} />
      ))}

      {state?.error && <p className="mb-5 text-[13px] text-brick">{state.error}</p>}

      <label className="mb-2 block text-xs font-semibold text-steel">Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {existingPhotos.map((p) => (
          <div key={p.id} className="relative h-20 w-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl(p.storage_path)}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeExisting(p)}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-ink text-white"
              aria-label="Remove photo"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {newFiles.map((f, i) => (
          <div key={i} className="relative h-20 w-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(f)}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeNewFile(i)}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-ink text-white"
              aria-label="Remove photo"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
      <label className="mb-6 flex cursor-pointer flex-col items-center gap-2 border-2 border-dashed border-[#C7C7BC] py-6 text-[#8B8B80]">
        <Upload size={20} />
        <span className="text-[13px]">Tap to add photos</span>
        <input
          type="file"
          name="photos"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onFilesChosen}
        />
      </label>
      {/* Real file inputs the form actually submits (kept in sync with newFiles) */}
      <HiddenFileCarrier files={newFiles} />

      <label className="mb-1.5 block text-xs font-semibold text-steel">Lot number</label>
      <input
        name="lot_number"
        required
        defaultValue={vehicle?.lot_number || ""}
        placeholder="12"
        className="mb-4 w-full border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
      />

      <label className="mb-1.5 block text-xs font-semibold text-steel">Title</label>
      <input
        name="title"
        required
        defaultValue={vehicle?.title || ""}
        placeholder="2019 Ford Ranger"
        className="mb-4 w-full border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
      />

      <label className="mb-1.5 block text-xs font-semibold text-steel">Year (optional)</label>
      <input
        name="year"
        type="number"
        defaultValue={vehicle?.year || ""}
        placeholder="2019"
        className="mb-4 w-full border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
      />

      <label className="mb-1 block text-xs font-semibold text-steel">Vehicle type</label>
      <p className="mb-2 text-[11.5px] text-steel">
        Pick one — this decides which filter button finds it on the lineup page.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 text-xs font-medium ${
              category === c ? "bg-accent text-white" : "border border-line text-steel"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <label className="mb-1.5 block text-xs font-semibold text-steel">Short description</label>
      <textarea
        name="description"
        rows={3}
        defaultValue={vehicle?.description || ""}
        placeholder="Drove in, runs great, one owner..."
        className="mb-4 w-full border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
      />

      <label className="mb-1.5 block text-xs font-semibold text-steel">Status</label>
      <div className="mb-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`px-3 py-1.5 text-xs font-medium capitalize ${
              status === s ? "bg-moss text-white" : "border border-line text-steel"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <label className="mb-1 block text-xs font-semibold text-steel">Condition tags</label>
      <p className="mb-2 text-[11.5px] text-steel">
        Pick as many as apply — separate from vehicle type above.
      </p>
      <div className="mb-8 flex flex-wrap gap-2">
        {CONDITION_TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => toggleTag(t)}
            className={`px-3 py-1.5 text-xs font-medium ${
              tags.includes(t) ? "bg-moss text-white" : "border border-line text-steel"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <SubmitButton label={vehicle?.id ? "Save changes" : "Publish to site"} />
    </form>
  );
}

// A plain <input type="file"> can't have its file list set programmatically in a
// straightforward cross-browser way, so we keep one hidden input per selected file
// using DataTransfer, which lets removing a single photo work without clearing the rest.
function HiddenFileCarrier({ files }) {
  return (
    <>
      {files.map((file, i) => {
        const dt = new DataTransfer();
        dt.items.add(file);
        return (
          <input
            key={`${file.name}-${file.lastModified}-${i}`}
            type="file"
            name="photos"
            className="hidden"
            ref={(el) => {
              if (el) el.files = dt.files;
            }}
          />
        );
      })}
    </>
  );
}
