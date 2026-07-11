# cultural-curriculum-workbooks

The CSDT **"workbooks"** app — an interactive lesson player for Culturally Situated Design Tools
curriculum. It currently ships the **AIKR: AI Keepin' it Real** (`aikr_compare`) workbook, and can
embed a vendored Snap!-based coding IDE (**CSnap**) and a classification exercise (**Joe's Lunch**)
inline via iframes. It talks to a Django backend for login, saving progress, and classroom data.

**Stack:** Vite 7 · React 18 · TypeScript · Chakra UI (dark mode) · Redux Toolkit · React Query ·
Tailwind CSS. Package manager: **pnpm**.

## Quick start

Prerequisites: **Node 22** (`.nvmrc`) and **pnpm 11** (`corepack enable`, or `npm i -g pnpm`).

```bash
git clone git@github.com:CSDTs/cultural-curriculum-workbooks.git
cd cultural-curriculum-workbooks
pnpm install
pnpm dev            # → http://localhost:5173
```

Open a workbook with a slug query param: `http://localhost:5173/?wb=aikr_compare`.

> **Note:** the CSnap lessons need a large, gitignored drop-in at `public/csnap-pro/` that isn't in a
> fresh clone — see [Add CSnap before testing locally](#add-csnap-before-testing-locally). Everything
> else — including Joe's Lunch, which is committed at `public/joes-lunch/` — works after `pnpm install`.

## Add CSnap before testing locally

The workbook's coding lessons embed **CSnap** ("CSnap! — Snap! with Culture", a vendored Snap!-based
IDE, ~513 MB) in an iframe pointed at `VITE_CSNAP_BASE_URL` (default `/csnap-pro`). In dev that
resolves to `public/csnap-pro/`, which is **gitignored** — a fresh clone doesn't have it, and every
CSnap slide shows a 404 in the iframe until you drop it in.

1. Clone the CSnap app into place (it lives in its own repo):

   ```bash
   git clone git@github.com:CSDTs/csnap-app.git public/csnap-pro
   ```

2. Confirm `public/csnap-pro/index.html` exists. Don't commit the folder to this repo —
   `.gitignore` already excludes it, so keep it as a plain clone.
3. Restart nothing — Vite serves `public/` live. Sanity-check by opening
   <http://localhost:5173/csnap-pro/index.html>, then load a CSnap lesson in the workbook
   (`http://localhost:5173/?wb=aikr_compare`) and confirm the IDE appears and the lesson's project
   XML loads into it.

Since it's gitignored you can't commit it by accident, and the production build excludes it from
`dist/` automatically (`copyPublicExcept()` in `vite.config.js`) — Django serves CSnap separately
at the site root.

## Scripts

| Command                 | What it does                                                                   |
| ----------------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`              | Start the Vite dev server on port 5173                                         |
| `pnpm build`            | Typecheck + production build (`tsc --noEmit && vite build --base=/workbooks/`) |
| `pnpm run deploy-build` | The real deploy build: `tsc --noEmit && vite build && sh adjust.sh`            |
| `pnpm typecheck`        | `tsc --noEmit` (kept green; the build gate enforces it)                        |
| `pnpm format`           | Prettier over the repo                                                         |
| `pnpm preview`          | Preview a production build locally                                             |

## How it's structured

- `src/` — the app: `main.tsx`/`App.tsx` (slug-driven, no route table), `components/` (atomic design),
  `hooks/` (business logic), `fetchers/` (Django API layer), `setup/` (Redux store), `data/`
  (curriculum + `AVAILABLE_WORKBOOKS`), `tools/aikr_compare/` (the workbook's lazy-loaded slides).
- `public/` — static assets served as-is. `public/csnap-pro/` (gitignored drop-in) is **excluded from
  the production build** automatically; Django serves CSnap separately.
- Env vars live in `src/.env` (+ `src/.env.production`) because `vite.config.js` sets `envDir: "./src"`.

## Deployment

There's no CI/CD — a maintainer runs `pnpm run deploy-build` and hand-copies everything in `dist/`
into the CSDT Django platform repo at `csdt-site/static/workbooks` (served under `/workbooks/`). `public/csnap-pro/` is auto-excluded from `dist/`; CSnap is served
separately by Django.

## Contact

Setup help and pull-request approvals go through the CSDT team:
`csdt@generativejustice.org`.
