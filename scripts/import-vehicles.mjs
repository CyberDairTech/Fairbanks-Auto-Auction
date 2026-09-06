// Bulk vehicle importer — reusable any week you'd rather fill a spreadsheet
// than tap through the admin form one lot at a time.
//
// This is a developer/one-off tool, not part of the deployed site. It uses
// the Supabase SERVICE ROLE key, which bypasses row-level security — never
// commit that key, never put it in .env.local, and never use it in app code.
//
// Usage:
//   SUPABASE_URL=https://your-project.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
//   node scripts/import-vehicles.mjs scripts/vehicles-template.csv
//
// Get the service role key from: Supabase Dashboard > Project Settings > API
// (it's the "service_role" secret, not the "anon" public key).
//
// This script does NOT upload photos — a spreadsheet can't hold images.
// Add photos per vehicle afterward from /admin/vehicles/[id]/edit.

import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const csvPath = process.argv[2];

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables first (see comments at the top of this file)."
  );
  process.exit(1);
}

if (!csvPath) {
  console.error("Usage: node scripts/import-vehicles.mjs path/to/vehicles.csv");
  process.exit(1);
}

const VALID_CATEGORIES = [
  "Cars & sedans",
  "Trucks & SUVs",
  "Motorcycles & ATVs",
  "Equipment & machines",
  "Boats & trailers",
  "Classics",
];
const VALID_STATUSES = ["active", "sold", "pulled"];

// Minimal CSV parser — handles quoted fields with commas inside them
// (e.g. a description like "Drove in, runs great") without needing a
// third-party dependency.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && next === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  }
  return rows;
}

function rowsToObjects(rows) {
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj = {};
    header.forEach((h, i) => (obj[h] = (r[i] ?? "").trim()));
    return obj;
  });
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const text = fs.readFileSync(csvPath, "utf8");
const rows = parseCSV(text);

if (rows.length < 2) {
  console.error("That CSV doesn't have any data rows below the header.");
  process.exit(1);
}

const records = rowsToObjects(rows);

let ok = 0;
let failed = 0;

for (const r of records) {
  if (!r.lot_number || !r.title || !r.category) {
    console.warn(`Skipping row — missing lot_number, title, or category: ${JSON.stringify(r)}`);
    failed++;
    continue;
  }

  if (!VALID_CATEGORIES.includes(r.category)) {
    console.warn(
      `Skipping "${r.title}" — "${r.category}" isn't one of the six allowed categories:\n  ${VALID_CATEGORIES.join(", ")}`
    );
    failed++;
    continue;
  }

  const status = VALID_STATUSES.includes(r.status) ? r.status : "active";
  const tags = r.tags ? r.tags.split("|").map((t) => t.trim()).filter(Boolean) : [];
  const year = r.year ? parseInt(r.year, 10) : null;

  const { error } = await supabase.from("vehicles").insert({
    lot_number: r.lot_number,
    title: r.title,
    year: Number.isFinite(year) ? year : null,
    category: r.category,
    description: r.description || "",
    tags,
    status,
  });

  if (error) {
    console.error(`Failed to import lot ${r.lot_number} ("${r.title}"): ${error.message}`);
    failed++;
  } else {
    console.log(`Imported lot ${r.lot_number} — ${r.title}`);
    ok++;
  }
}

console.log(`\nDone. ${ok} imported, ${failed} skipped or failed.`);
