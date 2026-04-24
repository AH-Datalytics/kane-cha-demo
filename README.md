# Kane County Community Health Atlas

**Working prototype submitted with RFQ 26-029-TK** · Community Health Assessment and Improvement Plan Interactive Data Dashboard for the Kane County Health Department.

**Live demo:** https://kane-cha-demo.vercel.app
**Proposal:** AH Datalytics · [ahdatalytics.com](https://www.ahdatalytics.com)

---

## What this is

Kane County asked for a public-facing dashboard that replaces the Kane Health Atlas with something residents, partners, and KCHD staff actually use. This repo is a working demonstration of the approach — built in the same stack (Next.js, Vercel, Supabase-ready, Leaflet) the Year 1 engagement would deploy. Every capability the proposal promises is visible here, wired to real Kane County geometry and illustrative values grounded in CDC PLACES patterns.

The evaluation committee can click the live URL, open ⌘K to search, switch to Spanish or Polish, pull a tract-level map, build a custom PDF report, or sign in as a mock KCHD Viewer to see the staff workspace.

---

## Sections

| # | Route | What it delivers |
|---|---|---|
| 01 | `/` | Overview homepage — headline indicators with four CHA cycles back-loaded (2015, 2019, 2022, 2024), IPLAN priority grid, equity pullquote, community voice |
| 02 | `/map` | Interactive Kane County map · 104 real Census tracts · 5 geographic levels (county, municipality, ZIP, tract, KCHD Planning Area) · CDC SVI overlay · demographic ratio scaling |
| 03 | `/priorities` | Six priority areas organized against IPLAN · each deep-dive page has trend, equity cross-tabs, Planning Area breakdown, and qualitative callouts |
| 04 | `/equity` | Standalone Health Equity dashboard · lens-based disaggregation (race/income/age/language/LGBTQ+) · Planning Area geographic strip · "other equity stories" grid |
| 05 | `/reports` | Custom Report Builder · PDF / CSV / PNG export · shareable URL encodes the full report state · geography views per indicator (Planning Area grid, municipality table, top/bottom tracts) |
| 06 | `/sources` | Every data source with citation, refresh schedule, and Real vs. Illustrative label · four short tutorials · methodology |

**Plus:**

- `/admin` — simulated KCHD staff workspace. Sign in as Admin / Uploader / Editor / Viewer to see role-specific UIs. Includes usage analytics (Google-Analytics-style), data source refresh controls, role-based upload form with row-level permission indicator, and the 20-user staff directory.
- `/accessibility` — WCAG 2.1 AA commitment, keyboard shortcut reference, known limitations, how to report a barrier.
- `/search` — global search across indicators, places, priority areas, IPLAN categories, and data sources. Open anywhere with ⌘K / Ctrl+K.
- First-visit **guided tour** — 12-step driver.js walkthrough covering every feature, translated EN/ES/PL.

---

## Real vs. illustrative data

This is a **demonstration prototype.** Here is what is real and what is modeled:

| Real | Illustrative |
|---|---|
| Kane County Census tract boundaries (U.S. Census Bureau 2023 cartographic file, 104 tracts) | Per-tract health values (seeded to reflect realistic Aurora / Elgin / Batavia / Geneva / St. Charles patterns) |
| Kane County municipality list and populations (U.S. Census 2020) | BRFSS Kane County oversample values |
| CDC PLACES, ACS, CDC SVI, CDC WONDER, IDPH, County Health Rankings (named as data sources on `/sources`) | Planning Area aggregates (grounded in census-tract centroid assignment) |
| KCHD Health Department logo + Kane County seal | 2024 CHA survey data and qualitative listening session quotes |
| Trilingual interface (EN/ES/PL) for all chrome and content | "Real-time" data freshness timestamps |

Every source on `/sources` is labeled with a **Live** (real data API) or **Demo** (illustrative) badge. The 2024 Community Health Assessment survey data would be provided by KCHD on award per Addendum 3.

---

## Architecture

- **Next.js 14** (App Router) + TypeScript, deployed on Vercel as static pages
- **Tailwind CSS** with a custom editorial design system
  - Kane County palette extracted from the actual courthouse + KCHD logos (navy `#2e5c8a`, blue-deep `#086e9f`, amber `#db752c`)
  - Typography: Fraunces (display serif), IBM Plex Sans (body), IBM Plex Mono (data)
  - Paper-white `#faf8f3` background, editorial rules, tabular numerals throughout
- **Recharts** for time series, sparklines, and disparity bars
- **Leaflet + react-leaflet** for the tract choropleth (CARTO Light basemap)
- **driver.js** for the first-visit tour
- **html-to-image** for PNG export · `window.print()` for PDF (dedicated print stylesheet)
- **next-intl-free i18n** — custom context with full EN/ES/PL string trees and trilingual data fixtures

For the production engagement, the stack extends with:

- **Supabase** (PostgreSQL + row-level security) for indicator data and admin role enforcement
- **Payload CMS** for qualitative content editing without developer involvement
- **Python ETL on scheduled GitHub Actions** for secondary-data pulls
- **Sentry** for pipeline monitoring and email alerts on refresh failures
- **Plausible Analytics** (default) or **Google Analytics** (per KCHD preference)

---

## Accessibility

- WCAG 2.1 AA target throughout
- Semantic HTML with proper landmarks and headings
- Visible focus rings (amber, 2px) on every interactive element
- Keyboard shortcuts documented at `/accessibility`: ⌘K search, Tab navigation, Esc dismiss
- Color-independent encoding — every choropleth has a numeric legend, every disparity bar has a ratio label
- Skip-to-content link at top of every page
- Known limitations honestly listed at `/accessibility`

---

## Local development

```bash
npm install
npm run dev
```

Opens on `http://localhost:3000` (or `3001` if the default is taken).

## Production build

```bash
npm run build
npm start
```

The build outputs 18 static pages (public routes) + dynamic `/admin` + dynamic `/reports`.

---

## Submission mapping

Every concrete promise in the RFQ and Addenda is visible in the prototype:

- **6 public sections** · RFQ Section C, Addendum 1 Q3
- **5 geographic levels** (county, municipality, ZIP, tract, Planning Area) · Addendum 3
- **CDC SVI overlay** · Addendum 2 · Section 3.6 of submission
- **3 back-loaded CHA cycles** (demo shows 4: 2015/2019/2022/2024) · Addendum 3
- **Demographic disaggregation** by race/ethnicity, income, age, language, LGBTQ+ · Addendum 2
- **EN/ES/PL translation** of interface and content · Addendum 3
- **~20 internal users, ~5 with upload** + row-level security · Addendum 3
- **Custom reports** with PDF / CSV / PNG / shareable URL · RFQ Section C
- **Automated refresh** + alerting (architecture) · Addendum 3
- **Usage analytics** for KCHD staff · Addendum 2
- **"Medical Director Services" struck through** on the Qualifications Response Form · Addendum 1

---

## Credits

Built by **AH Datalytics** for the Kane County RFQ 26-029-TK submission.

- **Oscar Boochever** · Senior Product Manager · Project Lead · oboochever@ahdatalytics.com
- **Ben Horwitz** · Co-Founder · Technical Lead · bhorwitz@ahdatalytics.com · (314) 803-7457
- **Jeff Asher** · Co-Founder · Senior Advisor
- **Haley Shaeffer** · Senior Analyst · Data and dashboard build

AH Datalytics · 5970 General Haig Street, New Orleans, LA 70124 · [ahdatalytics.com](https://www.ahdatalytics.com)

---

*This is a demonstration prototype. No real CHA microdata, KCHD survey responses, or individual-level health information is stored in this repository or served by the live demo. All health values shown are illustrative and labeled as such on the Data Sources page.*
