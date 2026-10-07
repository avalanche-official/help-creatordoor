# CreatorDoor Help Center

A Vue 3 + Vite frontend and a Strapi 5 backend. **The backend is an authoring tool that
runs on your machine — it is not deployed.** Content is exported to static JSON and
shipped inside the frontend build, so hosting is a static site and costs nothing.

## Publishing a change to the help center

```bash
# 1. Write/edit articles in the Strapi admin (first run creates the admin user)
cd backend && npm run develop        # → http://localhost:1337/admin

# 2. Publish the entries in the admin (drafts are skipped), then export
npm run export:content               # → writes frontend/src/content/*.json

# 3. Commit and deploy the frontend
cd ../frontend && npm run build      # → frontend/dist/
```

Step 3's `dist/` is plain static files — deploy them to Cloudflare Pages, Netlify,
Appwrite Sites, or any static host.

## Layout

| Path | What it is |
|---|---|
| `frontend/src/content/*.json` | Generated content. **Commit it** — the site is built from it. |
| `backend/scripts/export-content.js` | Boots Strapi headlessly, writes the JSON above. |
| `backend/.tmp/data.db` | Local SQLite content database. Gitignored — **this is the only copy of your articles, back it up.** |
| `backend/.env` | Local Strapi secrets. Gitignored. |

## Gotchas

- **Only published entries are exported.** A draft in the admin will not appear on the site.
- **Back up `backend/.tmp/data.db`.** It lives on one machine and is not in git. Losing it
  loses your articles — which is exactly what happened with the previous Railway database.
- Images uploaded in Strapi are copied to `frontend/public/uploads` by the export script.
