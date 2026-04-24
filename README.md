# Kane County Community Health Atlas — Prototype

Interactive Community Health Assessment and Improvement Plan dashboard for Kane County, Illinois.
Built for the RFQ 26-029-TK submission as a working demonstration of the proposed approach.

## Architecture

- **Next.js 14** (App Router) + TypeScript, deployed on Vercel
- **Tailwind CSS** with an editorial design system (paper-white backgrounds, Fraunces display,
  IBM Plex Sans body, IBM Plex Mono for data)
- **Recharts** for time series, sparklines, disparity bars
- **Leaflet + react-leaflet** for tract-level choropleths
- **driver.js** for the first-visit guided tour
- **html-to-image** for PNG export; `window.print()` for PDF

## Sections

1. Overview / Priority Areas homepage
2. Interactive Kane County map (104 real census tracts)
3. Priority Area deep dives (one page per CHIP priority, organized against IPLAN)
4. Health Equity dashboard
5. Custom Report Builder (PDF / CSV / PNG / shareable URL)
6. Data Sources & Methodology

Plus:

- `/admin` — simulated KCHD staff workspace with usage analytics, data refresh controls,
  role-based upload form, 20-user directory
- `/search` — global search over indicators, places, priority areas, and sources
- Language switcher: English, Spanish, Polish
- First-visit guided tour via driver.js

## Data

- Real Kane County tract boundaries from the U.S. Census 2023 cartographic files (104 tracts)
- Illustrative health values grounded in CDC PLACES patterns and Kane County demographics
- Every source on the Data Sources page is labeled Real vs. Illustrative

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```
