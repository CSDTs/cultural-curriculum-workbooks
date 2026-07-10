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
> fresh clone (ask csdt@generativejustice.org). Everything else — including Joe's Lunch, which is
> committed at `public/joes-lunch/` — works after `pnpm install`.

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

There's no CI/CD — a maintainer runs `pnpm run deploy-build` and hand-copies `dist/` into the CSDT
Django platform under `/workbooks/`. `public/csnap-pro/` is auto-excluded from `dist/`; CSnap is served
separately by Django.

## Contact

Setup help and pull-request approvals go through the CSDT team:
`help@generativejustice.org`.
