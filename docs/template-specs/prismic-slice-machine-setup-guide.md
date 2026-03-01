> Template - copy to create a new site guide. DO NOT EDIT for the Debora Lima site.

# Prismic Slice Machine Setup Guide

This guide describes how to configure Slice Machine, create custom types in Prismic, and understand how Slices work in projects using Prismic CMS.

## What are Slices?

**Slices** are reusable content blocks that let editors build pages dynamically. Instead of a fixed field structure, Slices allow choosing between predefined components (carousel, text block, gallery, etc.) and arranging them in any order.

**For portfolio/gallery projects:** You may not need Slices. A fixed content model is often enough:

- **Category**: static fields (title, description, hero image, order)
- **Work**: static fields (title, description, gallery images, order)

Image carousels in Works can use a **Group** (repeatable field group) instead of Slices. This is simpler for fixed structures.

---

## Step 1: Sync Custom Types with Prismic

Custom types are defined in `customtypes/`. To push them to Prismic:

1. Run in the project root:
   ```bash
   npm run slicemachine
   ```
2. In Slice Machine, go to **Custom types** in the sidebar.
3. Verify your types (e.g. Category, Work) appear.
4. Click **Push to Prismic** (or **Save**) to sync with the Prismic repository.

If Slice Machine is not running, edit custom types directly in the Prismic Dashboard under **Custom types**.

---

## Step 2: Create Categories in Prismic

Create one document per category. For each:

- **UID** = URL slug (e.g. `my-category-slug`)
- **Title** = display name
- **Description** = used on the category page and home card
- **Hero Image** = optional; if empty, the home carousel uses images from works
- **Order** = display order

Create each category in all supported locales (e.g. `pt-br`, `en-us`).

---

## Step 3: Create Works

For each work:

1. Create a new **Work** document.
2. Fill in:
   - **UID**: slug for the work
   - **Title**: work title
   - **Description**: short description
   - **Category**: link to the parent Category document
   - **Gallery Images**: add items to the group; each item: **Image** (upload) and **Alt Text** (optional; falls back to work title)
   - **Order**: order within the category

Repeat for all works in each category.

---

## Step 4: Home Page Behavior

On the home page, each category appears as a card with:

- **Title** and **description**
- **Image carousel**:
  - If the category has **Hero Image** in Prismic → use it
  - If not → use images from the category's **works**
  - If no works with images → use placeholder image

---

## Step 5: Webhook and Revalidation

For Prismic changes to update the site immediately:

1. In Prismic Dashboard: **Settings** → **Webhooks**
2. Add a webhook:
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Secret**: value of `PRISMIC_WEBHOOK_SECRET`
   - **Events**: publish, unpublish
3. Header: `Authorization: Bearer <PRISMIC_WEBHOOK_SECRET>`

---

## Custom Types Summary

### Category (main fields)

- `uid` – URL slug
- `title` – title
- `page_description` – description (page and home card)
- `hero_image` – optional; if empty, uses work images
- `order` – display order

### Work (main fields)

- `uid` – slug
- `title` – work title
- `description` – description
- `category` – content relationship to Category
- `gallery_images` – repeatable group: `image` + `image_alt` (empty alt uses work title)
- `order` – order within category

---

## Troubleshooting

### Site shows stale content

1. Stop the dev server (Ctrl+C).
2. Clear Next.js cache: `rm -rf .next`
3. Restart: `npm run dev`
4. Hard refresh in the browser (Ctrl+Shift+R or incognito).

In development, Prismic cache is often disabled (`cache: "no-store"`), so after clearing `.next` data should come fresh from Prismic.

### Only one category appears (not cache)

1. **Locale in Prismic**: Each document needs a published version in the locale you're viewing. Check the language selector (top-right) in each category.
2. **Copy to another locale**: If categories exist in one locale only, use "Copy to another locale" in Prismic.
3. **Locale IDs**: In Prismic > Settings > Languages, ensure IDs match your site (e.g. `pt-br`, `en-us`).

### Legacy filesystem assets

If the project previously used repository-backed assets (e.g. `public/portfolio/`), those are no longer read once Prismic is the sole source. Archive or remove them after backup.

---

## Checklist

- [ ] Custom types synced with Prismic
- [ ] Categories created in all supported locales
- [ ] Works created with gallery images
- [ ] Webhook configured for revalidation
- [ ] Env vars set: `PRISMIC_REPOSITORY_NAME`, `PRISMIC_ACCESS_TOKEN` (if needed), `PRISMIC_WEBHOOK_SECRET`
