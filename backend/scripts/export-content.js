/**
 * Exports published Strapi content to static JSON for the frontend.
 *
 * Run it after editing articles locally:  npm run export:content
 *
 * Boots Strapi headlessly (no HTTP server), reads the published documents via
 * the Document Service, and writes them to frontend/src/content/. Any uploaded
 * media is copied to frontend/public/uploads so the relative URLs Strapi stores
 * keep resolving once the frontend is served on its own.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', '..');
const CONTENT_DIR = path.join(ROOT, 'frontend', 'src', 'content');
const UPLOADS_SRC = path.join(ROOT, 'backend', 'public', 'uploads');
const UPLOADS_DEST = path.join(ROOT, 'frontend', 'public', 'uploads');

// Relations are populated so the frontend can read article.category.slug etc.
const COLLECTIONS = [
  {
    uid: 'api::category.category',
    file: 'categories.json',
    populate: {},
    sortLabel: 'name',
  },
  {
    uid: 'api::subcategory.subcategory',
    file: 'subcategories.json',
    populate: { category: true },
    sortLabel: 'name',
  },
  {
    uid: 'api::help-article.help-article',
    file: 'help-articles.json',
    populate: { category: true, subcategory: true },
    sortLabel: 'title',
  },
];

// Entries without an explicit `order` fall to the end, then sort alphabetically.
const byOrderThenLabel = (label) => (a, b) => {
  const ao = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER;
  const bo = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER;
  if (ao !== bo) return ao - bo;
  return String(a[label] || '').localeCompare(String(b[label] || ''));
};

// Strapi bookkeeping the frontend never reads — dropped to keep the bundle small.
const STRIP = ['createdAt', 'updatedAt', 'publishedAt', 'createdBy', 'updatedBy', 'locale'];

const clean = (value) => {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !STRIP.includes(key))
        .map(([key, val]) => [key, clean(val)])
    );
  }
  return value;
};

const copyUploads = () => {
  if (!fs.existsSync(UPLOADS_SRC)) return 0;
  const files = fs.readdirSync(UPLOADS_SRC).filter((f) => !f.startsWith('.'));
  if (files.length === 0) return 0;
  fs.mkdirSync(UPLOADS_DEST, { recursive: true });
  for (const file of files) {
    fs.copyFileSync(path.join(UPLOADS_SRC, file), path.join(UPLOADS_DEST, file));
  }
  return files.length;
};

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  fs.mkdirSync(CONTENT_DIR, { recursive: true });

  try {
    for (const { uid, file, populate, sortLabel } of COLLECTIONS) {
      const documents = await app.documents(uid).findMany({
        status: 'published',
        populate,
        limit: -1,
      });

      const entries = documents.map(clean).sort(byOrderThenLabel(sortLabel));
      fs.writeFileSync(
        path.join(CONTENT_DIR, file),
        `${JSON.stringify(entries, null, 2)}\n`
      );
      console.log(`  ${file.padEnd(22)} ${entries.length} published entries`);
    }

    const copied = copyUploads();
    if (copied > 0) console.log(`  uploads/               ${copied} media files copied`);
  } finally {
    await app.destroy();
  }

  console.log(`\nWrote content to frontend/src/content/`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\nExport failed:', error);
    process.exit(1);
  });
