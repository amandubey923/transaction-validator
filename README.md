live demo - https://transaction-validator-aman.vercel.app
# Validex — Enterprise Transaction Data Validation & Processing Platform

> Next-generation web-based platform for multi-currency transaction dataset validation, automated hygiene, country-specific phone & date parsing, deduplication, integrity audits, and chunked CSV exports.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
**Live Application**: [https://transaction-validator-aman.vercel.app/](https://transaction-validator-aman.vercel.app/)

## Getting Started
---

First, run the development server:
## Key Platform Capabilities

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
- **Multi-Country Phone Validation**: Validates international telephone numbers according to country-specific rules driven by configurable country codes in `src/data/countryRules.ts` (e.g., Singapore: 8 digits, India: 10 digits, USA/UK: 10 digits, Germany: 11 digits, UAE: 9 digits).
- **Date & Time Audit**: Verifies transaction dates and times against standard ISO formats (`YYYY-MM-DD`, `HH:mm:ss`) and flags chronological anomalies.
- **Mathematical Integrity & Deduplication**: Audits required fields, checks for duplicate `order_id` values, and verifies financial accuracy (`quantity × unit_price = total_amount`).
- **Automated Data Hygiene**: Normalizes country names, standardizes phone prefixes, realigns timestamp strings, and trims whitespace.
- **Large Dataset Splitting & Export**: Generates a consolidated clean CSV for downstream consumption and automatically segments large datasets into smaller, manageable batch chunks.
- **Interactive Analytics**: Real-time country distribution bar charts, payment channel donut breakdown, and high-density searchable data preview tables.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
---

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
## Tech Stack

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI & Styling**: React 19, Tailwind CSS v4
- **Icons & Typography**: Lucide React, Google Fonts (Inter & JetBrains Mono)
- **Charts & Visualization**: Recharts
- **Parsing & Phone Rules**: PapaParse, libphonenumber-js, XLSX

## Learn More
---

To learn more about Next.js, take a look at the following resources:
## Getting Started

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
First, run the development server:

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
```bash
npm run dev
```

## Deploy on Vercel
Open [http://localhost:3000](http://localhost:3000) with your browser to launch the Validex dashboard.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
To create an optimized production build:

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```bash
npm run build
```
