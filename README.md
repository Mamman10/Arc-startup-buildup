# AI Startup Builder

A small, testable MVP that turns a startup idea into a structured validation brief. It is designed to grow into the AI Startup Builder described in the project documents.

## Run

Requires Node.js 20 or newer.

```powershell
npm test
npm run check
npm start
```

Then open `http://localhost:3000`.

## Deploy to Vercel

Vercel serves the site from `public/` and deploys `api/projects.js` as the project API. Import this repository with the project root set to the repository root; no framework preset or build command is required. Project history is session-only until a database is added, so it must not be treated as durable storage on Vercel.

## MVP scope

- Submit a startup idea.
- Receive a business summary, customer segment, revenue hypothesis, SWOT, validation experiments, and a phased roadmap.
- Keep generated projects in memory for the current server session.

The analysis engine is deliberately deterministic for an offline, testable first feature. Replace the adapter in `backend/src/ai/` with a server-side LLM integration once an API provider and data policy are approved.

## Arc safety

This release does not submit transactions or use a wallet. `shared/config/arc-testnet.js` retains the verified testnet configuration for future onchain payments. Arc Testnet uses USDC as the native gas token (18 decimals); its optional ERC-20 interface uses 6 decimals. Do not use mainnet credentials or real funds.

## Quality checks

`npm test` runs Node’s built-in test runner; `npm run check` validates the application entry points without requiring third-party dependencies.
