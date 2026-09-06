# Fairbanks Auto Auction — website + admin

Next.js site with a Supabase backend (database, photo storage, and staff login).
No WordPress, no cPanel — vehicles are added from `/admin` on any phone or computer.

## What's here

- **Public site** — Home, Weekly Lineup, Consigning, About, FAQ, Contact
- **`/admin`** — staff-only dashboard to add/edit/delete vehicles, upload photos,
  and mark lots Active / Sold / Pulled
- **Supabase** — Postgres database + file storage + login, all in one project

## 1. Run the database setup (5 minutes)

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Paste in the entire contents of `supabase/schema.sql` from this repo and click **Run**.
   This creates the `vehicles`, `vehicle_photos`, `contact_messages`, and `subscribers`
   tables, locks them down with row-level security, and creates the `vehicle-photos`
   storage bucket.
3. Create your staff login: Supabase Dashboard → **Authentication** → **Users** →
   **Add user**. Use the email and password you (or he) want to sign in with at
   `/admin/login`. You can add more than one user later the same way.

## 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase project's
URL and anon key (Supabase Dashboard → **Project Settings** → **API**):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Add the same two variables in **Vercel** → your project → **Settings** →
**Environment Variables** before deploying.

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin`
for the staff side (sign in with the user you created in step 1).

## 4. Deploy

Push this folder to the GitHub repo that's already connected to your Vercel
project — Vercel will build and deploy automatically. Make sure the environment
variables from step 2 are set in Vercel first, or the build will fail.

```bash
git init
git add .
git commit -m "Fairbanks Auto Auction site"
git branch -M main
git remote add origin <your-existing-github-repo-url>
git push -u origin main
```

## How the pieces fit together

- **Adding a vehicle**: `/admin/vehicles/new` → picks a vehicle type (one of six
  fixed categories) and condition tags, uploads photos, hits Publish. That writes
  a row to the `vehicles` table and uploads photos to the `vehicle-photos` storage
  bucket — nothing to redeploy, it's live immediately.
- **The Weekly Lineup filter** reads that same `category` field, so the buttons
  in the admin form and the filter buttons on `/lineup` always match.
- **Status** (Active / Sold / Pulled) controls what the public ever sees — only
  `active` vehicles show on the site. Sold or pulled lots stay in the database
  for your records but disappear from public view immediately.
- **Consignment PDF** lives at `public/fairbanks-auto-auction-consignment-form.pdf`.
  Replace that file (same filename) any time you want to update the form.
- **Contact form and newsletter signups** write to the `contact_messages` and
  `subscribers` tables. For now, check them in Supabase Dashboard → **Table
  Editor** — a proper inbox view can be added to `/admin` later if useful.

## Bulk-importing vehicles from a spreadsheet

`scripts/import-vehicles.mjs` reads a CSV and creates vehicles in bulk — handy
for loading a whole week's lineup at once instead of the admin form, one lot
at a time. It does **not** upload photos (a spreadsheet can't hold images) —
add those per vehicle afterward from `/admin`.

`scripts/vehicles-template.csv` is a real example, generated from the current
fairbanksautoauction.com lot list, so you can see the exact format expected.
**Important:** that list is last Saturday's lineup — by launch it'll be sold.
It's marked `status,sold` on purpose so importing it (if you ever do, e.g. to
test the script) won't make stale vehicles show up as for sale. Copy its
format into a new CSV with the *upcoming* Saturday's real lineup, set
`status` to `active`, and import that instead.

CSV columns:

| column | required | notes |
|---|---|---|
| `lot_number` | yes | any text, matches how you already number lots |
| `title` | yes | e.g. `2019 Ford Ranger` |
| `year` | no | plain number |
| `category` | yes | must exactly match one of the six values in `src/lib/categories.js` |
| `description` | no | short blurb shown on the card |
| `tags` | no | condition tags separated by `\|`, e.g. `Drove in\|No title` |
| `status` | no | `active`, `sold`, or `pulled` — defaults to `active` if left blank |

To run it:

```bash
SUPABASE_URL=https://your-project.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
node scripts/import-vehicles.mjs scripts/vehicles-template.csv
```

Get the service role key from Supabase Dashboard → Project Settings → API
(the **service_role** secret — never the anon key, and never commit it or
put it in `.env.local`). It bypasses row-level security, which is exactly
why this only runs as a one-off script from your terminal, never in the
deployed app.

## Things worth doing next (not required to launch)

- Email notifications when a contact form is submitted (needs an email service
  like Resend — a few lines of code once you have an account).
- A second staff account so more than one person can manage listings.
- Bulk photo reordering in the admin form (currently photos display in upload order).

## A note on this handoff

This code was written without the ability to run `npm install` or a live build
(no network access in the environment it was written in), so it hasn't been
build-tested end to end. Everything has been checked carefully for correctness,
but if `npm run build` turns up an error the first time, that's expected —
paste the error into Claude Code (or back here) and it'll be a quick fix.
