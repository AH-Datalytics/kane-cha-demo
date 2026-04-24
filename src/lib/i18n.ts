"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "es" | "pl";

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "pl", label: "Polish", native: "Polski" },
];

type StringsTree = {
  skipToContent: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
  changeLanguageLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  closeLabel: string;
  brandAria: string;
  communityHealthAtlas: string;
  kaneCountyIllinois: string;
  lastUpdated: string;
  lastRefreshed: string;
  language: string;
  languages: string;
  publisher: string;
  volume: string;
  population: string;
  municipalities: string;
  censusTracts: string;
  chaCycles: string;
  demoMinute: string;

  nav: { overview: string; map: string; priorities: string; equity: string; reports: string; sources: string };

  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    cta1: string;
    cta2: string;
    tagline: string;
    volumeLabel: string;
    populationLabel: string;
    municipalitiesLabel: string;
    tractsLabel: string;
    chaLabel: string;
  };

  home: {
    atGlanceEyebrow: string;
    atGlanceTitle: string;
    openMap: string;
    iplanEyebrow: string;
    iplanTitle: string;
    iplanLede: string;
    iplanHowToReadEyebrow: string;
    iplanHowToReadBody: string;
    equityEyebrow: string;
    equityTitle: string;
    equityLede: string;
    openEquityDashboard: string;
    equityStat1: string;
    equityStat2: string;
    equityStat3: string;
    communityEyebrow: string;
    communityTitle: string;
    communityLede: string;
    changeSince2019: string;
    ctaMap: { eyebrow: string; title: string; body: string; cta: string };
    ctaReports: { eyebrow: string; title: string; body: string; cta: string };
    ctaSources: { eyebrow: string; title: string; body: string; cta: string };
  };

  map: {
    eyebrow: string;
    title: string;
    lede: string;
    tags: { geoLevels: string; svi: string; crosstabs: string; basemap: string };
    indicator: string;
    geoLevel: string;
    currentlyShowing: string;
    demographicSlice: string;
    overlays: string;
    sviToggle: string;
    sviTract: string;
    nowViewing: string;
    loadingGeometry: string;
    countyAggregate: string;
    countyAggregateBody: string;
    highestTract: string;
    countyVsIllinois: string;
    countyVsIllinoisBody: string;
    indicators: { [k: string]: { label: string; category: string } };
    demoFilters: { [k: string]: string };
  };

  prioritiesIndex: {
    eyebrow: string;
    title: string;
    lede: string;
    tagIplan: string;
    tagCycles: string;
    tagEquity: string;
    tagQualitative: string;
    categoryOf: (n: number, total: number) => string;
    deepDive: string;
  };

  priority: {
    eyebrow: (cat: string, num: string) => string;
    tagIplan: string;
    tagCycles: string;
    tagCrosstabs: string;
    tagUpdated: string;
    theLede: string;
    headlineIndicator: string;
    trendEyebrow: string;
    trendTitle: (ind: string) => string;
    illustrativeTag: string;
    readingChartEyebrow: string;
    readingChartBody: string;
    latestCycleLabel: string;
    equityEyebrow: string;
    equityTitle: (ind: string) => string;
    equityLede: string;
    ratiosEyebrow: string;
    ratiosBody: string;
    largestGap: string;
    aboveAverage: string;
    planningEyebrow: string;
    planningTitle: string;
    tracts: string;
    pop: string;
    communityEyebrow: string;
    communityTitle: string;
    communityLede: string;
    nextEyebrow: string;
    nextTitle: (ind: string) => string;
    nextBody: string;
    openInMap: string;
    openInMapBody: string;
    buildReport: string;
    buildReportBody: string;
  };

  equity: {
    eyebrow: string;
    title: string;
    lede: string;
    tags: string[];
    indicator: string;
    lens: string;
    lensOptions: { race: string; income: string; age: string; language: string; lgbtq: string };
    lensDesc: { race: string; income: string; age: string; language: string; lgbtq: string };
    headlineEyebrow: (lens: string) => string;
    headlineTemplate: (ind: string, ratio: string, worst: string) => string;
    overall: string;
    highest: string;
    lowest: string;
    byLens: (lens: string) => string;
    howToReadEyebrow: string;
    howToReadBody: string;
    sourceEyebrow: string;
    otherStoriesEyebrow: string;
    otherStoriesTitle: string;
    stories: {
      eyebrow: string;
      stat: string;
      headline: string;
      source: string;
    }[];
  };

  reports: {
    eyebrow: string;
    title: string;
    lede: string;
    tags: { pdf: string; csv: string; png: string; url: string };
    reportTitle: string;
    defaultTitle: string;
    step1: string;
    step1Body: string;
    step2: string;
    step2Opts: { county: string; municipality: string; planning: string; tract: string };
    step3: string;
    step3Body: string;
    step4: string;
    allCycles: string;
    exportHeading: string;
    exportBody: string;
    copiedLabel: string;
    copyUrl: string;
    indicators: string;
    geography: string;
    slices: string;
    period: string;
    section: string;
    noIndicators: string;
    noIndicatorsBody: string;
    trend: string;
    equityView: string;
    generatedOn: (date: string) => string;
  };

  sources: {
    eyebrow: string;
    title: string;
    lede: string;
    tagSources: string;
    tagRefresh: string;
    tagLabels: string;
    howToEyebrow: string;
    howToTitle: string;
    tutorials: { title: string; duration: string; body: string }[];
    restartEyebrow: string;
    restartTitle: string;
    restartBody: string;
    restartBtn: string;
    dataSourcesEyebrow: string;
    dataSourcesTitle: string;
    lastAudit: string;
    live: string;
    demo: string;
    lastRefresh: string;
    scope: string;
    citation: string;
    methodologyEyebrow: string;
    methodologyTitle: string;
    methodologyItems: { title: string; body: string }[];
  };

  admin: {
    eyebrowWorkspace: string;
    signInTitle: string;
    signInLede: string;
    directoryEyebrow: string;
    directoryTitle: string;
    demoNoteEyebrow: string;
    demoNoteBody: string;
    demoShieldNote: string;
    signOut: string;
    signedInAs: string;
    tabAnalytics: string;
    tabData: string;
    tabUpload: string;
    tabUsers: string;
    analyticsSection: string;
    analyticsTitle: string;
    activeUsers: string;
    today: string;
    week: string;
    month: string;
    topPages: string;
    topSearches: string;
    recentDownloads: string;
    dataSection: string;
    dataTitle: string;
    dataLede: string;
    sourceCol: string;
    freqCol: string;
    lastRefreshCol: string;
    statusCol: string;
    healthy: string;
    refresh: string;
    refreshing: string;
    refreshed: string;
    uploadSection: string;
    uploadTitle: string;
    permissionsEyebrow: string;
    permissionsFull: string;
    permissionsNone: string;
    permissionsSome: string;
    rowLevelNote: string;
    newUploadEyebrow: string;
    newUploadTitle: string;
    scopeLabel: string;
    indicatorNameLabel: string;
    indicatorNamePlaceholder: string;
    dataFileLabel: string;
    dropCsv: string;
    dropCsvHint: string;
    submitUpload: string;
    uploading: string;
    uploaded: string;
    usersSection: string;
    usersTitle: string;
    usersLede: string;
    nameCol: string;
    deptCol: string;
    roleCol: string;
    uploadScopeCol: string;
    emailCol: string;
    roles: { admin: string; uploader: string; editor: string; viewer: string };
    allScopes: string;
    noUploadScope: string;
    fullUploadScope: string;
    uploadScopeCount: (n: number) => string;
  };

  search: {
    eyebrow: string;
    titlePlaceholder: string;
    titleFor: (q: string) => string;
    lede: (n: number) => string;
    tags: { indicators: string; places: string; priorityAreas: string; sources: string };
    prompt: string;
    notFound: string;
    notFoundBody: string;
    groups: { indicators: string; places: string; priorityAreas: string; framework: string; sources: string };
    groupLabels: { indicator: string; priorityArea: string; municipality: string; planningArea: string; iplanCategory: string; dataSource: string };
  };

  footer: {
    tagline: string;
    builtBy: string;
    contact: string;
    accessibility: string;
    methodology: string;
    owner: string;
    exploreHeading: string;
    buildAndLearnHeading: string;
    kchdHeading: string;
    staff: string;
    demoVersion: string;
  };
};

export const STRINGS: Record<Locale, StringsTree> = {
  en: {
    skipToContent: "Skip to main content",
    searchPlaceholder: "Search indicators, places, priority areas…",
    searchButtonLabel: "Search",
    changeLanguageLabel: "Change language",
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
    closeLabel: "Close",
    brandAria: "Kane County Community Health Atlas, home",
    communityHealthAtlas: "Community Health Atlas",
    kaneCountyIllinois: "Kane County, Illinois",
    lastUpdated: "Data last updated",
    lastRefreshed: "Last refreshed",
    language: "Language",
    languages: "Languages",
    publisher: "Publisher",
    volume: "Volume",
    population: "Population",
    municipalities: "Municipalities",
    censusTracts: "Census tracts",
    chaCycles: "CHA cycles",
    demoMinute: "min · video + transcript",

    nav: {
      overview: "Overview",
      map: "Map",
      priorities: "Priority Areas",
      equity: "Health Equity",
      reports: "Reports",
      sources: "Data & Methods",
    },

    hero: {
      eyebrow: "2024 Community Health Assessment",
      title: "The data behind Kane County’s health.",
      lede: "An interactive atlas of chronic disease, maternal and child health, behavioral health, access to care, and the social conditions that shape each of them. Built for residents, partners, and policymakers.",
      cta1: "Explore indicators",
      cta2: "Open the map",
      tagline: "An atlas of the data behind Kane County’s health. Open to everyone.",
      volumeLabel: "Volume",
      populationLabel: "Population",
      municipalitiesLabel: "Municipalities",
      tractsLabel: "Census tracts",
      chaLabel: "CHA cycles",
    },

    home: {
      atGlanceEyebrow: "Kane County at a glance",
      atGlanceTitle: "Eight indicators, four CHA cycles, 535,000 residents.",
      openMap: "Open the map",
      iplanEyebrow: "Priority areas · IPLAN framework",
      iplanTitle: "Kane County’s health, organized against IPLAN.",
      iplanLede: "Six Illinois Project for Local Assessment of Needs categories, paired with the specific priorities KCHD and community partners named in the 2024 Community Health Assessment. Each area has its own deep-dive page with time series, cross-tabs, and qualitative voice from community listening sessions.",
      iplanHowToReadEyebrow: "How to read this",
      iplanHowToReadBody: "The circled number on each area is the IPLAN reference. The headline statistic is the single indicator KCHD and community partners named as the priority for this cycle. Click through for the full picture, including equity breakdowns.",
      equityEyebrow: "Health equity, not buried",
      equityTitle: "Disparity is the story.",
      equityLede: "Every indicator on this atlas is disaggregated by race and ethnicity, age, income, language, geography, and sexual orientation and gender identity where data permit. The equity view is the default view.",
      openEquityDashboard: "Open the equity dashboard →",
      equityStat1: "Black–White infant mortality ratio in Kane County, flat since 2015.",
      equityStat2: "Diabetes prevalence in the lowest-income tracts of Aurora versus St. Charles.",
      equityStat3: "LGBTQ+ Kane County adults reporting frequent mental distress, nearly double the county average.",
      communityEyebrow: "Community voice · CHA 2024",
      communityTitle: "What the numbers alone can’t tell you.",
      communityLede: "Quantitative data says what. Qualitative data says why. Both live on the same pages across this atlas. A few voices from the 2024 CHA listening sessions.",
      changeSince2019: "pts since 2019",
      ctaMap: {
        eyebrow: "Section 02",
        title: "Interactive Kane County map",
        body: "Five geographic levels. SVI overlay. Filter by any indicator and any demographic slice.",
        cta: "Open the map",
      },
      ctaReports: {
        eyebrow: "Section 05",
        title: "Custom report builder",
        body: "Pick indicators, geography, demographics, time period. Save, share via URL, export to PDF, CSV, or PNG.",
        cta: "Build a report",
      },
      ctaSources: {
        eyebrow: "Section 06",
        title: "Data sources and methods",
        body: "Every source, citation, and refresh schedule. Plus short tutorials and a guided first-visit tour.",
        cta: "Review methods",
      },
    },

    map: {
      eyebrow: "Section 02 · Interactive map",
      title: "Map every indicator at every scale.",
      lede: "Choropleth at the census tract level with a togglable CDC Social Vulnerability Index overlay. Filter by indicator and by demographic slice. Five geographic levels available.",
      tags: {
        geoLevels: "Five geographic levels",
        svi: "SVI overlay",
        crosstabs: "Demographic cross-tabs",
        basemap: "Basemap: CARTO Light",
      },
      indicator: "Indicator",
      geoLevel: "Geographic level",
      currentlyShowing: "Currently showing: census tract choropleth (144 Kane County tracts).",
      demographicSlice: "Demographic slice",
      overlays: "Overlays",
      sviToggle: "CDC Social Vulnerability Index",
      sviTract: "Tracts with SVI > 0.5 highlighted",
      nowViewing: "Now viewing",
      loadingGeometry: "Loading Kane County geometry…",
      countyAggregate: "County aggregate",
      countyAggregateBody: "Kane County weighted average across all 144 tracts.",
      highestTract: "Highest tract",
      countyVsIllinois: "County vs. Illinois",
      countyVsIllinoisBody: "Kane County compared to the Illinois statewide rate (IDPH 2024).",
      indicators: {
        diabetes: { label: "Diabetes prevalence", category: "Chronic Disease" },
        obesity: { label: "Obesity", category: "Chronic Disease" },
        hypertension: { label: "Hypertension", category: "Chronic Disease" },
        mental_distress: { label: "Frequent mental distress", category: "Behavioral Health" },
        no_primary_care: { label: "No personal doctor", category: "Access to Care" },
        uninsured: { label: "Uninsured adults", category: "Access to Care" },
        infant_mortality: { label: "Infant mortality", category: "Maternal & Child" },
        overdose: { label: "Overdose mortality", category: "Injury & Violence" },
      },
      demoFilters: {
        overall: "Overall",
        "race-white": "White, NH",
        "race-black": "Black / AA",
        "race-latino": "Hispanic / Latino",
        "race-asian": "Asian",
        "income-low": "<200% FPL",
        "age-55-plus": "Age 55+",
        "lang-es": "Spanish speakers",
        "lang-pl": "Polish speakers",
      },
    },

    prioritiesIndex: {
      eyebrow: "Section 03 · Priority areas",
      title: "Six priority areas, organized against IPLAN.",
      lede: "Every deep dive page below includes the headline indicator, trend lines over four CHA cycles, demographic cross-tabs, equity views, and voice from community listening sessions.",
      tagIplan: "IPLAN framework",
      tagCycles: "Four CHA cycles back-loaded",
      tagEquity: "Equity disaggregation",
      tagQualitative: "Qualitative voice",
      categoryOf: (n: number, total: number) => `IPLAN · category ${n} of ${total}`,
      deepDive: "Deep dive →",
    },

    priority: {
      eyebrow: (cat: string, num: string) => `${cat} · Priority Area ${num}`,
      tagIplan: "IPLAN",
      tagCycles: "CHA 2015 · 2019 · 2022 · 2024",
      tagCrosstabs: "Demographic cross-tabs",
      tagUpdated: "Updated",
      theLede: "The lede",
      headlineIndicator: "Headline indicator",
      trendEyebrow: "Trend · four CHA cycles",
      trendTitle: (ind: string) => `Tracking ${ind} from 2015 forward.`,
      illustrativeTag: "Illustrative — KCHD data pending load",
      readingChartEyebrow: "Reading the chart",
      readingChartBody: "The 2015, 2019, and 2022 CHA cycles are back-loaded per Addendum 3 of the RFQ to support trend analysis at launch. Dashed amber marks the 2024 CHA release.",
      latestCycleLabel: "2024 CHA",
      equityEyebrow: "Equity · disaggregated view",
      equityTitle: (ind: string) => `${ind}, disaggregated.`,
      equityLede: "Every indicator on this atlas is broken out by race and ethnicity, age, income, language, and — where data permit — sexual orientation and gender identity. Reference line is the county average.",
      ratiosEyebrow: "What the ratios mean",
      ratiosBody: "The number on the right (e.g., 1.85×) is the slice’s value divided by the county average. A 1.00× means parity. Above 1.00× is elevated burden; below is lower.",
      largestGap: "Largest gap",
      aboveAverage: "the Kane County overall rate.",
      planningEyebrow: "Geography · Planning Area view",
      planningTitle: "Five KCHD Planning Areas.",
      tracts: "tracts",
      pop: "pop.",
      communityEyebrow: "Community voice · CHA 2024 listening sessions",
      communityTitle: "Why the numbers look this way.",
      communityLede: "Voices from the 2024 CHA focus groups and key informant interviews, coded to this priority area and published alongside the quantitative data they explain.",
      nextEyebrow: "What’s next",
      nextTitle: (ind: string) => `Build your own view of ${ind}.`,
      nextBody: "Open this indicator in the map to see tract-level choropleths. Or jump to the report builder to combine it with other indicators, pick your own demographic slice, and export a custom report.",
      openInMap: "Open in map",
      openInMapBody: "See this indicator by tract",
      buildReport: "Build report",
      buildReportBody: "Combine with other indicators",
    },

    equity: {
      eyebrow: "Section 04 · Health equity",
      title: "Disparities are the story, not a subsection.",
      lede: "Every indicator in this atlas is disaggregated. This page pulls the disparity views together in one place. Pick an indicator. Pick a lens.",
      tags: ["Race & ethnicity", "Income", "Age", "Language", "LGBTQ+", "Geography"],
      indicator: "Indicator",
      lens: "Equity lens",
      lensOptions: {
        race: "Race & Ethnicity",
        income: "Income",
        age: "Age",
        language: "Language at home",
        lgbtq: "LGBTQ+ adults",
      },
      lensDesc: {
        race: "Disparities across Black, White, Latino, and Asian Kane County residents.",
        income: "Disparities by household income relative to the Federal Poverty Level.",
        age: "How burden shifts across 18–34, 35–54, and 55+.",
        language: "English, Spanish, Polish — Kane County’s top three languages.",
        lgbtq: "Sexual orientation and gender identity where BRFSS and KCHD survey data permit.",
      },
      headlineEyebrow: (lens: string) => `Headline · ${lens}`,
      headlineTemplate: (ind: string, ratio: string, worst: string) =>
        `${ind} is ${ratio}× higher for ${worst} than the Kane County average.`,
      overall: "Overall",
      highest: "Highest",
      lowest: "Lowest",
      byLens: (lens: string) => `By ${lens.toLowerCase()}`,
      howToReadEyebrow: "How to read this",
      howToReadBody: "Dark bar is the Kane County overall rate. Amber marks the highest-burden slice. The number on the right of each bar is the slice’s value divided by the overall rate.",
      sourceEyebrow: "Source",
      otherStoriesEyebrow: "Other equity stories",
      otherStoriesTitle: "Five headlines worth knowing.",
      stories: [
        {
          eyebrow: "Infant mortality · race",
          stat: "2.8×",
          headline: "Black infants die before their first birthday at nearly three times the rate of white infants in Kane County.",
          source: "IDPH Vital Statistics 2023",
        },
        {
          eyebrow: "Mental distress · LGBTQ+",
          stat: "47.8%",
          headline: "Nearly one in two LGBTQ+ Kane County adults reported frequent mental distress in 2024 — double the county rate.",
          source: "BRFSS 2024 Kane supplement",
        },
        {
          eyebrow: "No personal doctor · language",
          stat: "2.3×",
          headline: "Spanish-speaking adults are 2.3× more likely than English speakers to lack a personal physician.",
          source: "BRFSS 2024 Kane supplement",
        },
        {
          eyebrow: "Diabetes · income",
          stat: "2.2×",
          headline: "Adults in Kane County’s lowest-income tracts have diabetes at 2.2× the rate of the highest-income tracts.",
          source: "CDC PLACES 2024",
        },
        {
          eyebrow: "Obesity · race + income",
          stat: "40.1%",
          headline: "Obesity among Black adults (40.1%) is 12 points above the county average, widening since 2015.",
          source: "CDC PLACES 2024",
        },
        {
          eyebrow: "Overdose · age",
          stat: "2.3×",
          headline: "Adults 18–34 die from overdose at 2.3× the rate of adults 55+, reversing the 2015 pattern.",
          source: "CDC WONDER 2023",
        },
      ],
    },

    reports: {
      eyebrow: "Section 05 · Custom reports",
      title: "Build a report. Save it. Share it.",
      lede: "Pick indicators, geography, demographics, and time period. Export to PDF, CSV, or PNG. Every report has a shareable URL that restores the exact view.",
      tags: { pdf: "PDF export", csv: "CSV download", png: "PNG image", url: "Shareable URL" },
      reportTitle: "Report title",
      defaultTitle: "Kane County Custom Report",
      step1: "1. Indicators",
      step1Body: "Pick one or more. Each becomes a section of the report.",
      step2: "2. Geography",
      step2Opts: {
        county: "Kane County",
        municipality: "By municipality",
        planning: "Planning Areas",
        tract: "Census tracts",
      },
      step3: "3. Demographics",
      step3Body: "Slices to include in each indicator section.",
      step4: "4. Time period",
      allCycles: "All cycles",
      exportHeading: "Export",
      exportBody: "Copy URL encodes the full report state so a colleague opens the exact same view.",
      copiedLabel: "Copied",
      copyUrl: "Copy URL",
      indicators: "Indicators",
      geography: "Geography",
      slices: "Slices",
      period: "Period",
      section: "Section",
      noIndicators: "No indicators selected",
      noIndicatorsBody: "Pick one or more indicators from the left panel.",
      trend: "Trend",
      equityView: "Equity view",
      generatedOn: (date: string) => `Generated ${date} · Kane County Health Department`,
    },

    sources: {
      eyebrow: "Section 06 · Data & methods",
      title: "Every source, every citation, every refresh.",
      lede: "This atlas is built on public data from the CDC, Census Bureau, Illinois Department of Public Health, and Kane County’s own Community Health Assessment. This page is the transparent record.",
      tagSources: "sources",
      tagRefresh: "Refresh timestamps",
      tagLabels: "Real vs. illustrative labels",
      howToEyebrow: "How to use this atlas",
      howToTitle: "Four short tutorials, plus a guided first-visit tour.",
      tutorials: [
        {
          title: "How to read the map",
          duration: "2 min",
          body: "Choropleth colors, demographic filters, SVI overlay, and what the ratios on the disparity bars mean.",
        },
        {
          title: "Building a custom report",
          duration: "3 min",
          body: "Pick indicators, geography, demographics, and time period. Export to PDF / CSV / PNG. Share via URL.",
        },
        {
          title: "What is IPLAN?",
          duration: "1 min",
          body: "The Illinois Project for Local Assessment of Needs framework — six categories of community health the atlas is organized around.",
        },
        {
          title: "Equity views, explained",
          duration: "2 min",
          body: "Why disparity is the default view. How race/ethnicity, income, age, language, and LGBTQ+ cuts work across every indicator.",
        },
      ],
      restartEyebrow: "Restart the tour",
      restartTitle: "Want the guided walkthrough again?",
      restartBody: "Click to re-run the five-step tour that appears on first visit.",
      restartBtn: "Restart tour →",
      dataSourcesEyebrow: "Data sources",
      dataSourcesTitle: "Every dataset behind this atlas.",
      lastAudit: "Last audit: April 10, 2026",
      live: "Live",
      demo: "Demo",
      lastRefresh: "Last refresh",
      scope: "Scope in this demo",
      citation: "Citation",
      methodologyEyebrow: "Methodology",
      methodologyTitle: "How the atlas is built.",
      methodologyItems: [
        {
          title: "Tract-level estimates",
          body: "Small-area estimates use CDC PLACES, with ACS 5-year as the population base. Kane County has 144 census tracts and six aggregate geographies (county, municipality, ZIP, Planning Area, plus hospital service area where data permit).",
        },
        {
          title: "Demographic disaggregation",
          body: "Race and ethnicity use OMB categories with Hispanic/Latino treated as a separate dimension. Income is measured relative to the Federal Poverty Level (<200%, 200–399%, ≥400%). LGBTQ+ estimates from BRFSS adult supplement where sample size permits.",
        },
        {
          title: "Privacy and suppression",
          body: "Cells with fewer than 20 observations are suppressed in public views. Rates computed against population denominators with standard population age-adjustment applied for mortality outcomes. Tract-level estimates flagged with coefficient of variation.",
        },
        {
          title: "Refresh and monitoring",
          body: "Automated pulls run on scheduled GitHub Actions. Each source has a health check that alerts KCHD staff by email if a pull fails or a schema changes. Every page shows the data’s ‘last refreshed’ timestamp from the source.",
        },
        {
          title: "Accessibility",
          body: "WCAG 2.1 AA throughout. Semantic HTML, visible focus states, keyboard-accessible interactions, color-independent encoding (every choropleth has a numeric legend), screen-reader friendly chart descriptions. Lighthouse target: 90+.",
        },
        {
          title: "Translation",
          body: "English, Spanish, and Polish. Kane County’s third-most-spoken language is Polish. Interface labels, page content, and exported reports translate. Additional languages can be added post-launch without structural changes.",
        },
      ],
    },

    admin: {
      eyebrowWorkspace: "KCHD staff workspace",
      signInTitle: "Sign in to manage data, monitor usage, and upload indicators.",
      signInLede: "This area is restricted to Kane County Health Department staff. For the demo, pick any staff profile below — no password required — to see what each role sees.",
      directoryEyebrow: "Staff directory · 20 users",
      directoryTitle: "Choose a role to preview",
      demoNoteEyebrow: "Demo note",
      demoNoteBody: "In production, this workspace authenticates against KCHD’s identity provider (Microsoft 365 tenant in the proposal). Row-level security limits each user to their specific upload scope. Twenty users total; five with upload permissions as specified in Addendum 3.",
      demoShieldNote: "Sign-in is mocked for this demo. No real credentials are collected or stored.",
      signOut: "Sign out",
      signedInAs: "Signed in as",
      tabAnalytics: "Usage analytics",
      tabData: "Manage data sources",
      tabUpload: "Upload new data",
      tabUsers: "Users & permissions",
      analyticsSection: "Section · Usage analytics",
      analyticsTitle: "Who is using the atlas, for what.",
      activeUsers: "Active users",
      today: "Today",
      week: "This week",
      month: "This month",
      topPages: "Top pages · past 30 days",
      topSearches: "Top searches",
      recentDownloads: "Recent downloads",
      dataSection: "Section · Manage data sources",
      dataTitle: "Refresh timestamps and manual pulls.",
      dataLede: "Automated refresh runs on schedule for each source. Trigger a manual refresh here. Staff are alerted by email if any scheduled pull fails.",
      sourceCol: "Source",
      freqCol: "Frequency",
      lastRefreshCol: "Last refresh",
      statusCol: "Status",
      healthy: "Healthy",
      refresh: "Refresh",
      refreshing: "Refreshing",
      refreshed: "Refreshed",
      uploadSection: "Section · Upload new data",
      uploadTitle: "Add indicator data within your permission scope.",
      permissionsEyebrow: "Your upload permissions",
      permissionsFull: "You have full upload permissions across every priority area.",
      permissionsNone: "You do not currently have upload permissions. Contact KCHD Data Systems to request scope.",
      permissionsSome: "You may upload to the following scopes only:",
      rowLevelNote: "Row-level security on the Supabase backend enforces these scopes. This demo shows the permission rail; the production build blocks the upload server-side.",
      newUploadEyebrow: "New indicator upload",
      newUploadTitle: "Upload an indicator dataset",
      scopeLabel: "Scope (must be within your permissions)",
      indicatorNameLabel: "Indicator name",
      indicatorNamePlaceholder: "e.g. Adult asthma prevalence",
      dataFileLabel: "Data file (CSV · up to 25 MB)",
      dropCsv: "Drop a CSV here, or click to browse",
      dropCsvHint: "Expected columns: geoid, indicator_id, value, period, cv",
      submitUpload: "Submit upload",
      uploading: "Validating + writing",
      uploaded: "Upload queued · QA in progress",
      usersSection: "Section · Users & permissions",
      usersTitle: "Twenty internal users. Five with upload scope.",
      usersLede: "Per Addendum 3, roughly 20 KCHD staff use this workspace. Row-level security restricts each user to their specified scope.",
      nameCol: "Name",
      deptCol: "Department",
      roleCol: "Role",
      uploadScopeCol: "Upload scope",
      emailCol: "Email",
      roles: { admin: "Admin", uploader: "Uploader", editor: "Editor", viewer: "Viewer" },
      allScopes: "All scopes",
      noUploadScope: "No upload scope",
      fullUploadScope: "Full upload scope",
      uploadScopeCount: (n: number) => `Upload: ${n} scope${n > 1 ? "s" : ""}`,
    },

    search: {
      eyebrow: "Search",
      titlePlaceholder: "Search the atlas",
      titleFor: (q: string) => `Results for “${q}”`,
      lede: (n: number) =>
        `${n} result${n === 1 ? "" : "s"} across indicators, places, priority areas, framework categories, and data sources.`,
      tags: { indicators: "Indicators", places: "Places", priorityAreas: "Priority areas", sources: "Sources" },
      prompt: "Use the search bar in the header, or press ⌘K anywhere in the atlas.",
      notFound: "Nothing found. Try a broader term.",
      notFoundBody:
        "Suggestions: diabetes, Aurora, behavioral, SVI, Planning Area, PLACES.",
      groups: {
        indicators: "Indicators",
        places: "Places",
        priorityAreas: "Priority areas",
        framework: "Framework",
        sources: "Sources",
      },
      groupLabels: {
        indicator: "Indicator",
        priorityArea: "Priority area",
        municipality: "Municipality",
        planningArea: "Planning Area",
        iplanCategory: "IPLAN category",
        dataSource: "Data source",
      },
    },

    footer: {
      tagline: "Community Health Assessment and Improvement Plan",
      builtBy: "A custom dashboard built for the Kane County Health Department.",
      contact: "Contact the Health Department",
      accessibility: "Accessibility",
      methodology: "Methods & Sources",
      owner: "© Kane County Health Department",
      exploreHeading: "Explore",
      buildAndLearnHeading: "Build & learn",
      kchdHeading: "Kane County Health Department",
      staff: "KCHD staff",
      demoVersion: "v1.0 · RFQ 26-029-TK demonstration",
    },
  },

  es: {
    skipToContent: "Saltar al contenido principal",
    searchPlaceholder: "Buscar indicadores, lugares, áreas prioritarias…",
    searchButtonLabel: "Buscar",
    changeLanguageLabel: "Cambiar idioma",
    openMenuLabel: "Abrir menú",
    closeMenuLabel: "Cerrar menú",
    closeLabel: "Cerrar",
    brandAria: "Atlas de Salud Comunitaria del Condado de Kane, inicio",
    communityHealthAtlas: "Atlas de Salud Comunitaria",
    kaneCountyIllinois: "Condado de Kane, Illinois",
    lastUpdated: "Datos actualizados",
    lastRefreshed: "Última actualización",
    language: "Idioma",
    languages: "Idiomas",
    publisher: "Editor",
    volume: "Volumen",
    population: "Población",
    municipalities: "Municipios",
    censusTracts: "Secciones censales",
    chaCycles: "Ciclos de CHA",
    demoMinute: "min · video + transcripción",

    nav: {
      overview: "Resumen",
      map: "Mapa",
      priorities: "Áreas prioritarias",
      equity: "Equidad en salud",
      reports: "Informes",
      sources: "Datos y métodos",
    },

    hero: {
      eyebrow: "Evaluación de Salud Comunitaria 2024",
      title: "Los datos detrás de la salud del Condado de Kane.",
      lede: "Un atlas interactivo de enfermedades crónicas, salud materno-infantil, salud conductual, acceso a la atención médica y las condiciones sociales que influyen en cada uno. Creado para residentes, socios y responsables de políticas.",
      cta1: "Explorar indicadores",
      cta2: "Abrir el mapa",
      tagline: "Un atlas de los datos detrás de la salud del Condado de Kane. Abierto a todos.",
      volumeLabel: "Volumen",
      populationLabel: "Población",
      municipalitiesLabel: "Municipios",
      tractsLabel: "Secciones censales",
      chaLabel: "Ciclos de CHA",
    },

    home: {
      atGlanceEyebrow: "Condado de Kane en resumen",
      atGlanceTitle: "Ocho indicadores, cuatro ciclos de CHA, 535,000 residentes.",
      openMap: "Abrir el mapa",
      iplanEyebrow: "Áreas prioritarias · marco IPLAN",
      iplanTitle: "La salud del Condado de Kane, organizada según IPLAN.",
      iplanLede: "Seis categorías del Illinois Project for Local Assessment of Needs, junto con las prioridades que KCHD y los socios comunitarios identificaron en la Evaluación de Salud Comunitaria 2024. Cada área tiene su propia página detallada con series temporales, tablas cruzadas y la voz cualitativa de las sesiones comunitarias.",
      iplanHowToReadEyebrow: "Cómo leer esto",
      iplanHowToReadBody: "El número circulado en cada área es la referencia IPLAN. La estadística principal es el indicador único que KCHD y los socios comunitarios nombraron como la prioridad de este ciclo. Haga clic para ver el panorama completo, incluidas las desagregaciones por equidad.",
      equityEyebrow: "Equidad en salud, visible",
      equityTitle: "La disparidad es la historia principal.",
      equityLede: "Cada indicador de este atlas se desagrega por raza y etnia, edad, ingresos, idioma, geografía y orientación sexual e identidad de género cuando los datos lo permiten. La vista de equidad es la predeterminada.",
      openEquityDashboard: "Abrir el panel de equidad →",
      equityStat1: "Razón de mortalidad infantil entre bebés negros y blancos en el Condado de Kane, estable desde 2015.",
      equityStat2: "Prevalencia de diabetes en las secciones de menores ingresos de Aurora frente a St. Charles.",
      equityStat3: "Adultos LGBTQ+ del Condado de Kane que reportan angustia mental frecuente, casi el doble del promedio del condado.",
      communityEyebrow: "Voz comunitaria · CHA 2024",
      communityTitle: "Lo que los números por sí solos no pueden decir.",
      communityLede: "Los datos cuantitativos dicen qué. Los datos cualitativos dicen por qué. Ambos aparecen en las mismas páginas de este atlas. Algunas voces de las sesiones de escucha de la CHA 2024.",
      changeSince2019: "pts desde 2019",
      ctaMap: {
        eyebrow: "Sección 02",
        title: "Mapa interactivo del Condado de Kane",
        body: "Cinco niveles geográficos. Superposición SVI. Filtre por cualquier indicador y cualquier grupo demográfico.",
        cta: "Abrir el mapa",
      },
      ctaReports: {
        eyebrow: "Sección 05",
        title: "Generador de informes personalizados",
        body: "Elija indicadores, geografía, datos demográficos y un período. Guarde, comparta por URL, exporte a PDF, CSV o PNG.",
        cta: "Crear un informe",
      },
      ctaSources: {
        eyebrow: "Sección 06",
        title: "Fuentes de datos y métodos",
        body: "Cada fuente, cita y programa de actualización. Además, tutoriales breves y una visita guiada inicial.",
        cta: "Ver métodos",
      },
    },

    map: {
      eyebrow: "Sección 02 · Mapa interactivo",
      title: "Asigne cada indicador a cada escala.",
      lede: "Mapa coroplético a nivel de sección censal con una superposición opcional del Índice de Vulnerabilidad Social de los CDC. Filtre por indicador y grupo demográfico. Cinco niveles geográficos disponibles.",
      tags: {
        geoLevels: "Cinco niveles geográficos",
        svi: "Superposición SVI",
        crosstabs: "Tablas cruzadas demográficas",
        basemap: "Mapa base: CARTO Light",
      },
      indicator: "Indicador",
      geoLevel: "Nivel geográfico",
      currentlyShowing: "Mostrando actualmente: mapa coroplético por sección censal (144 secciones del Condado de Kane).",
      demographicSlice: "Grupo demográfico",
      overlays: "Superposiciones",
      sviToggle: "Índice de Vulnerabilidad Social de los CDC",
      sviTract: "Secciones con SVI > 0.5 resaltadas",
      nowViewing: "Ahora viendo",
      loadingGeometry: "Cargando la geometría del Condado de Kane…",
      countyAggregate: "Agregado del condado",
      countyAggregateBody: "Promedio ponderado del Condado de Kane entre las 144 secciones.",
      highestTract: "Sección más alta",
      countyVsIllinois: "Condado vs. Illinois",
      countyVsIllinoisBody: "Condado de Kane en comparación con la tasa estatal de Illinois (IDPH 2024).",
      indicators: {
        diabetes: { label: "Prevalencia de diabetes", category: "Enfermedades crónicas" },
        obesity: { label: "Obesidad", category: "Enfermedades crónicas" },
        hypertension: { label: "Hipertensión", category: "Enfermedades crónicas" },
        mental_distress: { label: "Angustia mental frecuente", category: "Salud conductual" },
        no_primary_care: { label: "Sin médico de cabecera", category: "Acceso a atención" },
        uninsured: { label: "Adultos sin seguro", category: "Acceso a atención" },
        infant_mortality: { label: "Mortalidad infantil", category: "Salud materno-infantil" },
        overdose: { label: "Mortalidad por sobredosis", category: "Lesiones y violencia" },
      },
      demoFilters: {
        overall: "General",
        "race-white": "Blanco, NH",
        "race-black": "Negro / AA",
        "race-latino": "Hispano / Latino",
        "race-asian": "Asiático",
        "income-low": "<200% FPL",
        "age-55-plus": "55+ años",
        "lang-es": "Hispanohablantes",
        "lang-pl": "Polacohablantes",
      },
    },

    prioritiesIndex: {
      eyebrow: "Sección 03 · Áreas prioritarias",
      title: "Seis áreas prioritarias, organizadas según IPLAN.",
      lede: "Cada página detallada a continuación incluye el indicador principal, líneas de tendencia en cuatro ciclos de CHA, tablas cruzadas demográficas, vistas de equidad y la voz de las sesiones de escucha comunitaria.",
      tagIplan: "Marco IPLAN",
      tagCycles: "Cuatro ciclos de CHA cargados",
      tagEquity: "Desagregación por equidad",
      tagQualitative: "Voz cualitativa",
      categoryOf: (n: number, total: number) => `IPLAN · categoría ${n} de ${total}`,
      deepDive: "Vista detallada →",
    },

    priority: {
      eyebrow: (cat: string, num: string) => `${cat} · Área prioritaria ${num}`,
      tagIplan: "IPLAN",
      tagCycles: "CHA 2015 · 2019 · 2022 · 2024",
      tagCrosstabs: "Tablas cruzadas demográficas",
      tagUpdated: "Actualizado",
      theLede: "El titular",
      headlineIndicator: "Indicador principal",
      trendEyebrow: "Tendencia · cuatro ciclos de CHA",
      trendTitle: (ind: string) => `Seguimiento de ${ind} desde 2015.`,
      illustrativeTag: "Ilustrativo — carga de datos de KCHD pendiente",
      readingChartEyebrow: "Cómo leer el gráfico",
      readingChartBody: "Los ciclos de CHA de 2015, 2019 y 2022 están cargados según el Addendum 3 del RFQ para permitir el análisis de tendencias desde el lanzamiento. El trazo ámbar marca el lanzamiento de CHA 2024.",
      latestCycleLabel: "CHA 2024",
      equityEyebrow: "Equidad · vista desagregada",
      equityTitle: (ind: string) => `${ind}, desagregado.`,
      equityLede: "Cada indicador de este atlas se desglosa por raza y etnia, edad, ingresos, idioma y, cuando los datos lo permiten, orientación sexual e identidad de género. La línea de referencia es el promedio del condado.",
      ratiosEyebrow: "Qué significan las proporciones",
      ratiosBody: "El número a la derecha (por ejemplo, 1,85×) es el valor del grupo dividido por el promedio del condado. 1,00× significa paridad. Por encima de 1,00× indica mayor carga; por debajo, menor.",
      largestGap: "Mayor brecha",
      aboveAverage: "la tasa general del Condado de Kane.",
      planningEyebrow: "Geografía · vista por Área de Planificación",
      planningTitle: "Cinco Áreas de Planificación de KCHD.",
      tracts: "secciones",
      pop: "hab.",
      communityEyebrow: "Voz comunitaria · sesiones de escucha CHA 2024",
      communityTitle: "Por qué los números se ven así.",
      communityLede: "Voces de los grupos focales y entrevistas con informantes clave de la CHA 2024, codificadas para esta área prioritaria y publicadas junto con los datos cuantitativos que explican.",
      nextEyebrow: "Qué sigue",
      nextTitle: (ind: string) => `Cree su propia vista de ${ind}.`,
      nextBody: "Abra este indicador en el mapa para ver los mapas coropléticos por sección. O salte al generador de informes para combinarlo con otros indicadores, elegir su propio grupo demográfico y exportar un informe personalizado.",
      openInMap: "Abrir en el mapa",
      openInMapBody: "Ver este indicador por sección",
      buildReport: "Crear informe",
      buildReportBody: "Combinar con otros indicadores",
    },

    equity: {
      eyebrow: "Sección 04 · Equidad en salud",
      title: "Las disparidades son la historia principal, no una subsección.",
      lede: "Cada indicador de este atlas está desagregado. Esta página reúne las vistas de disparidad en un solo lugar. Elija un indicador. Elija una lente.",
      tags: ["Raza y etnia", "Ingresos", "Edad", "Idioma", "LGBTQ+", "Geografía"],
      indicator: "Indicador",
      lens: "Lente de equidad",
      lensOptions: {
        race: "Raza y etnia",
        income: "Ingresos",
        age: "Edad",
        language: "Idioma en el hogar",
        lgbtq: "Adultos LGBTQ+",
      },
      lensDesc: {
        race: "Disparidades entre los residentes negros, blancos, latinos y asiáticos del Condado de Kane.",
        income: "Disparidades por ingresos del hogar en relación con el Nivel Federal de Pobreza.",
        age: "Cómo cambia la carga entre los 18–34, 35–54 y 55+.",
        language: "Inglés, español y polaco — los tres idiomas más hablados del Condado de Kane.",
        lgbtq: "Orientación sexual e identidad de género cuando los datos de BRFSS y KCHD lo permiten.",
      },
      headlineEyebrow: (lens: string) => `Titular · ${lens}`,
      headlineTemplate: (ind: string, ratio: string, worst: string) =>
        `${ind} es ${ratio}× mayor para ${worst} que el promedio del Condado de Kane.`,
      overall: "General",
      highest: "Más alto",
      lowest: "Más bajo",
      byLens: (lens: string) => `Por ${lens.toLowerCase()}`,
      howToReadEyebrow: "Cómo leer esto",
      howToReadBody: "La barra oscura es la tasa general del Condado de Kane. El ámbar marca el grupo con mayor carga. El número a la derecha de cada barra es el valor del grupo dividido por la tasa general.",
      sourceEyebrow: "Fuente",
      otherStoriesEyebrow: "Otras historias de equidad",
      otherStoriesTitle: "Cinco titulares que vale la pena conocer.",
      stories: [
        {
          eyebrow: "Mortalidad infantil · raza",
          stat: "2,8×",
          headline: "Los bebés negros mueren antes de su primer cumpleaños a casi tres veces la tasa de los bebés blancos en el Condado de Kane.",
          source: "Estadísticas Vitales IDPH 2023",
        },
        {
          eyebrow: "Angustia mental · LGBTQ+",
          stat: "47,8%",
          headline: "Casi uno de cada dos adultos LGBTQ+ del Condado de Kane reportó angustia mental frecuente en 2024 — el doble de la tasa del condado.",
          source: "BRFSS 2024 suplemento Kane",
        },
        {
          eyebrow: "Sin médico · idioma",
          stat: "2,3×",
          headline: "Los adultos hispanohablantes tienen 2,3× más probabilidades que los anglohablantes de no tener médico de cabecera.",
          source: "BRFSS 2024 suplemento Kane",
        },
        {
          eyebrow: "Diabetes · ingresos",
          stat: "2,2×",
          headline: "Los adultos en las secciones de menores ingresos del Condado de Kane tienen diabetes a 2,2× la tasa de las secciones de mayores ingresos.",
          source: "CDC PLACES 2024",
        },
        {
          eyebrow: "Obesidad · raza + ingresos",
          stat: "40,1%",
          headline: "La obesidad entre adultos negros (40,1%) está 12 puntos por encima del promedio del condado y sigue ampliándose desde 2015.",
          source: "CDC PLACES 2024",
        },
        {
          eyebrow: "Sobredosis · edad",
          stat: "2,3×",
          headline: "Adultos de 18–34 años mueren por sobredosis a 2,3× la tasa de adultos 55+, invirtiendo el patrón de 2015.",
          source: "CDC WONDER 2023",
        },
      ],
    },

    reports: {
      eyebrow: "Sección 05 · Informes personalizados",
      title: "Cree un informe. Guárdelo. Compártalo.",
      lede: "Elija indicadores, geografía, datos demográficos y un período. Exporte a PDF, CSV o PNG. Cada informe tiene una URL compartible que restaura la misma vista.",
      tags: { pdf: "Exportar PDF", csv: "Descargar CSV", png: "Imagen PNG", url: "URL compartible" },
      reportTitle: "Título del informe",
      defaultTitle: "Informe personalizado del Condado de Kane",
      step1: "1. Indicadores",
      step1Body: "Elija uno o más. Cada uno se convierte en una sección del informe.",
      step2: "2. Geografía",
      step2Opts: {
        county: "Condado de Kane",
        municipality: "Por municipio",
        planning: "Áreas de Planificación",
        tract: "Secciones censales",
      },
      step3: "3. Datos demográficos",
      step3Body: "Grupos para incluir en cada sección de indicador.",
      step4: "4. Período",
      allCycles: "Todos los ciclos",
      exportHeading: "Exportar",
      exportBody: "Copiar URL codifica el estado completo del informe para que un colega abra exactamente la misma vista.",
      copiedLabel: "Copiado",
      copyUrl: "Copiar URL",
      indicators: "Indicadores",
      geography: "Geografía",
      slices: "Grupos",
      period: "Período",
      section: "Sección",
      noIndicators: "Ningún indicador seleccionado",
      noIndicatorsBody: "Elija uno o más indicadores en el panel izquierdo.",
      trend: "Tendencia",
      equityView: "Vista de equidad",
      generatedOn: (date: string) => `Generado el ${date} · Departamento de Salud del Condado de Kane`,
    },

    sources: {
      eyebrow: "Sección 06 · Datos y métodos",
      title: "Cada fuente, cada cita, cada actualización.",
      lede: "Este atlas se construye con datos públicos de los CDC, la Oficina del Censo, el Departamento de Salud Pública de Illinois y la propia Evaluación de Salud Comunitaria del Condado de Kane. Esta página es el registro transparente.",
      tagSources: "fuentes",
      tagRefresh: "Marcas de actualización",
      tagLabels: "Etiquetas real vs. ilustrativo",
      howToEyebrow: "Cómo usar este atlas",
      howToTitle: "Cuatro tutoriales breves, más una visita guiada inicial.",
      tutorials: [
        {
          title: "Cómo leer el mapa",
          duration: "2 min",
          body: "Colores coropléticos, filtros demográficos, superposición SVI y lo que significan las proporciones en las barras de disparidad.",
        },
        {
          title: "Creación de un informe personalizado",
          duration: "3 min",
          body: "Elija indicadores, geografía, datos demográficos y un período. Exporte a PDF / CSV / PNG. Comparta por URL.",
        },
        {
          title: "¿Qué es IPLAN?",
          duration: "1 min",
          body: "El marco del Illinois Project for Local Assessment of Needs — seis categorías de salud comunitaria en torno a las cuales se organiza el atlas.",
        },
        {
          title: "Vistas de equidad, explicadas",
          duration: "2 min",
          body: "Por qué la disparidad es la vista predeterminada. Cómo funcionan los cortes por raza/etnia, ingresos, edad, idioma y LGBTQ+ en cada indicador.",
        },
      ],
      restartEyebrow: "Reiniciar el recorrido",
      restartTitle: "¿Quiere repetir el recorrido guiado?",
      restartBody: "Haga clic para volver a ejecutar el recorrido de cinco pasos que aparece en la primera visita.",
      restartBtn: "Reiniciar recorrido →",
      dataSourcesEyebrow: "Fuentes de datos",
      dataSourcesTitle: "Cada conjunto de datos detrás de este atlas.",
      lastAudit: "Última auditoría: 10 de abril de 2026",
      live: "En vivo",
      demo: "Demo",
      lastRefresh: "Última actualización",
      scope: "Alcance en esta demo",
      citation: "Cita",
      methodologyEyebrow: "Metodología",
      methodologyTitle: "Cómo se construye el atlas.",
      methodologyItems: [
        {
          title: "Estimaciones a nivel de sección censal",
          body: "Las estimaciones de áreas pequeñas utilizan CDC PLACES, con ACS de 5 años como base poblacional. El Condado de Kane tiene 144 secciones censales y seis geografías agregadas (condado, municipio, código postal, Área de Planificación, además del área de servicio hospitalario cuando los datos lo permiten).",
        },
        {
          title: "Desagregación demográfica",
          body: "Raza y etnia usan las categorías OMB con hispano/latino tratado como una dimensión separada. Los ingresos se miden respecto al Nivel Federal de Pobreza (<200%, 200–399%, ≥400%). Estimaciones LGBTQ+ del suplemento adulto BRFSS cuando el tamaño de la muestra lo permite.",
        },
        {
          title: "Privacidad y supresión",
          body: "Las celdas con menos de 20 observaciones se suprimen en las vistas públicas. Las tasas se calculan contra denominadores poblacionales con ajuste por edad estándar aplicado a los resultados de mortalidad. Las estimaciones a nivel de sección se marcan con coeficiente de variación.",
        },
        {
          title: "Actualización y monitoreo",
          body: "Las extracciones automatizadas se ejecutan en GitHub Actions programadas. Cada fuente tiene una verificación de salud que alerta al personal de KCHD por correo electrónico si una extracción falla o cambia un esquema. Cada página muestra la marca de “última actualización” desde la fuente.",
        },
        {
          title: "Accesibilidad",
          body: "WCAG 2.1 AA en todo. HTML semántico, estados de foco visibles, interacciones accesibles por teclado, codificación independiente del color (cada mapa coroplético tiene leyenda numérica), descripciones de gráficos accesibles por lector de pantalla. Objetivo de Lighthouse: 90+.",
        },
        {
          title: "Traducción",
          body: "Inglés, español y polaco. El tercer idioma más hablado del Condado de Kane es el polaco. Etiquetas de la interfaz, contenido de páginas e informes exportados se traducen. Se pueden añadir idiomas adicionales tras el lanzamiento sin cambios estructurales.",
        },
      ],
    },

    admin: {
      eyebrowWorkspace: "Área de trabajo del personal de KCHD",
      signInTitle: "Inicie sesión para administrar datos, monitorear el uso y cargar indicadores.",
      signInLede: "Esta área está reservada al personal del Departamento de Salud del Condado de Kane. Para la demo, elija cualquier perfil a continuación — sin contraseña — para ver lo que cada rol ve.",
      directoryEyebrow: "Directorio · 20 usuarios",
      directoryTitle: "Elija un rol para obtener una vista previa",
      demoNoteEyebrow: "Nota de la demo",
      demoNoteBody: "En producción, esta área se autentica contra el proveedor de identidad de KCHD (inquilino Microsoft 365 en la propuesta). La seguridad a nivel de fila limita a cada usuario a su alcance específico de carga. Veinte usuarios en total; cinco con permisos de carga según lo especificado en el Addendum 3.",
      demoShieldNote: "El inicio de sesión está simulado para esta demo. No se recopilan ni almacenan credenciales reales.",
      signOut: "Cerrar sesión",
      signedInAs: "Sesión iniciada como",
      tabAnalytics: "Analítica de uso",
      tabData: "Gestionar fuentes de datos",
      tabUpload: "Cargar nuevos datos",
      tabUsers: "Usuarios y permisos",
      analyticsSection: "Sección · Analítica de uso",
      analyticsTitle: "Quién usa el atlas, para qué.",
      activeUsers: "Usuarios activos",
      today: "Hoy",
      week: "Esta semana",
      month: "Este mes",
      topPages: "Páginas principales · últimos 30 días",
      topSearches: "Búsquedas principales",
      recentDownloads: "Descargas recientes",
      dataSection: "Sección · Gestionar fuentes de datos",
      dataTitle: "Marcas de actualización y extracciones manuales.",
      dataLede: "La actualización automática se ejecuta programada para cada fuente. Active una actualización manual aquí. El personal recibe alertas por correo electrónico si alguna extracción programada falla.",
      sourceCol: "Fuente",
      freqCol: "Frecuencia",
      lastRefreshCol: "Última actualización",
      statusCol: "Estado",
      healthy: "Saludable",
      refresh: "Actualizar",
      refreshing: "Actualizando",
      refreshed: "Actualizado",
      uploadSection: "Sección · Cargar nuevos datos",
      uploadTitle: "Añada datos de indicadores dentro de su alcance de permisos.",
      permissionsEyebrow: "Sus permisos de carga",
      permissionsFull: "Tiene permisos completos de carga en todas las áreas prioritarias.",
      permissionsNone: "Actualmente no tiene permisos de carga. Contacte con Sistemas de Datos de KCHD para solicitar alcance.",
      permissionsSome: "Puede cargar sólo en los siguientes alcances:",
      rowLevelNote: "La seguridad a nivel de fila en el backend de Supabase hace cumplir estos alcances. Esta demo muestra la barra de permisos; la compilación de producción bloquea la carga del lado del servidor.",
      newUploadEyebrow: "Nueva carga de indicador",
      newUploadTitle: "Cargar un conjunto de datos de indicador",
      scopeLabel: "Alcance (debe estar dentro de sus permisos)",
      indicatorNameLabel: "Nombre del indicador",
      indicatorNamePlaceholder: "p.ej. Prevalencia del asma en adultos",
      dataFileLabel: "Archivo de datos (CSV · hasta 25 MB)",
      dropCsv: "Suelte un CSV aquí, o haga clic para explorar",
      dropCsvHint: "Columnas esperadas: geoid, indicator_id, value, period, cv",
      submitUpload: "Enviar carga",
      uploading: "Validando + escribiendo",
      uploaded: "Carga en cola · QA en curso",
      usersSection: "Sección · Usuarios y permisos",
      usersTitle: "Veinte usuarios internos. Cinco con alcance de carga.",
      usersLede: "Según el Addendum 3, aproximadamente 20 miembros del personal de KCHD usan esta área de trabajo. La seguridad a nivel de fila restringe a cada usuario a su alcance especificado.",
      nameCol: "Nombre",
      deptCol: "Departamento",
      roleCol: "Rol",
      uploadScopeCol: "Alcance de carga",
      emailCol: "Correo electrónico",
      roles: { admin: "Administrador", uploader: "Cargador", editor: "Editor", viewer: "Visor" },
      allScopes: "Todos los alcances",
      noUploadScope: "Sin alcance de carga",
      fullUploadScope: "Alcance de carga completo",
      uploadScopeCount: (n: number) => `Carga: ${n} alcance${n > 1 ? "s" : ""}`,
    },

    search: {
      eyebrow: "Búsqueda",
      titlePlaceholder: "Buscar en el atlas",
      titleFor: (q: string) => `Resultados para “${q}”`,
      lede: (n: number) =>
        `${n} resultado${n === 1 ? "" : "s"} entre indicadores, lugares, áreas prioritarias, categorías del marco y fuentes de datos.`,
      tags: { indicators: "Indicadores", places: "Lugares", priorityAreas: "Áreas prioritarias", sources: "Fuentes" },
      prompt: "Use la barra de búsqueda en el encabezado o pulse ⌘K en cualquier parte del atlas.",
      notFound: "No se encontró nada. Pruebe un término más amplio.",
      notFoundBody: "Sugerencias: diabetes, Aurora, conductual, SVI, Área de Planificación, PLACES.",
      groups: {
        indicators: "Indicadores",
        places: "Lugares",
        priorityAreas: "Áreas prioritarias",
        framework: "Marco",
        sources: "Fuentes",
      },
      groupLabels: {
        indicator: "Indicador",
        priorityArea: "Área prioritaria",
        municipality: "Municipio",
        planningArea: "Área de Planificación",
        iplanCategory: "Categoría IPLAN",
        dataSource: "Fuente de datos",
      },
    },

    footer: {
      tagline: "Evaluación y Plan de Mejora de la Salud Comunitaria",
      builtBy: "Un panel personalizado creado para el Departamento de Salud del Condado de Kane.",
      contact: "Contactar al Departamento de Salud",
      accessibility: "Accesibilidad",
      methodology: "Métodos y fuentes",
      owner: "© Departamento de Salud del Condado de Kane",
      exploreHeading: "Explorar",
      buildAndLearnHeading: "Crear y aprender",
      kchdHeading: "Departamento de Salud del Condado de Kane",
      staff: "Personal de KCHD",
      demoVersion: "v1.0 · demostración RFQ 26-029-TK",
    },
  },

  pl: {
    skipToContent: "Przejdź do głównej treści",
    searchPlaceholder: "Szukaj wskaźników, miejscowości, obszarów priorytetowych…",
    searchButtonLabel: "Szukaj",
    changeLanguageLabel: "Zmień język",
    openMenuLabel: "Otwórz menu",
    closeMenuLabel: "Zamknij menu",
    closeLabel: "Zamknij",
    brandAria: "Atlas Zdrowia Społeczności Hrabstwa Kane, strona główna",
    communityHealthAtlas: "Atlas Zdrowia Społeczności",
    kaneCountyIllinois: "Hrabstwo Kane, Illinois",
    lastUpdated: "Dane zaktualizowano",
    lastRefreshed: "Ostatnia aktualizacja",
    language: "Język",
    languages: "Języki",
    publisher: "Wydawca",
    volume: "Tom",
    population: "Ludność",
    municipalities: "Gminy",
    censusTracts: "Obwody spisowe",
    chaCycles: "Cykle CHA",
    demoMinute: "min · wideo + transkrypcja",

    nav: {
      overview: "Przegląd",
      map: "Mapa",
      priorities: "Obszary priorytetowe",
      equity: "Równość zdrowotna",
      reports: "Raporty",
      sources: "Dane i metody",
    },

    hero: {
      eyebrow: "Ocena Zdrowia Społeczności 2024",
      title: "Dane stojące za zdrowiem Hrabstwa Kane.",
      lede: "Interaktywny atlas chorób przewlekłych, zdrowia matki i dziecka, zdrowia behawioralnego, dostępu do opieki oraz uwarunkowań społecznych, które je kształtują. Stworzony dla mieszkańców, partnerów i decydentów.",
      cta1: "Przeglądaj wskaźniki",
      cta2: "Otwórz mapę",
      tagline: "Atlas danych stojących za zdrowiem Hrabstwa Kane. Otwarty dla każdego.",
      volumeLabel: "Tom",
      populationLabel: "Ludność",
      municipalitiesLabel: "Gminy",
      tractsLabel: "Obwody spisowe",
      chaLabel: "Cykle CHA",
    },

    home: {
      atGlanceEyebrow: "Hrabstwo Kane w skrócie",
      atGlanceTitle: "Osiem wskaźników, cztery cykle CHA, 535 000 mieszkańców.",
      openMap: "Otwórz mapę",
      iplanEyebrow: "Obszary priorytetowe · ramy IPLAN",
      iplanTitle: "Zdrowie Hrabstwa Kane, uporządkowane według IPLAN.",
      iplanLede: "Sześć kategorii Illinois Project for Local Assessment of Needs, połączonych z konkretnymi priorytetami wskazanymi przez KCHD i partnerów społecznych w Ocenie Zdrowia Społeczności 2024. Każdy obszar ma własną stronę szczegółową z szeregami czasowymi, tabelami krzyżowymi i głosem jakościowym z sesji społecznościowych.",
      iplanHowToReadEyebrow: "Jak to czytać",
      iplanHowToReadBody: "Liczba w kółku przy każdym obszarze to odniesienie IPLAN. Nagłówkowa statystyka to pojedynczy wskaźnik, który KCHD i partnerzy społeczni wskazali jako priorytet tego cyklu. Kliknij, aby zobaczyć pełny obraz, w tym podział na grupy według równości.",
      equityEyebrow: "Równość zdrowotna, nie ukryta",
      equityTitle: "Nierówności to nagłówek.",
      equityLede: "Każdy wskaźnik w tym atlasie jest dezagregowany według rasy i pochodzenia etnicznego, wieku, dochodu, języka, geografii oraz orientacji seksualnej i tożsamości płciowej, gdy pozwalają na to dane.",
      openEquityDashboard: "Otwórz panel równości →",
      equityStat1: "Stosunek śmiertelności niemowląt czarnych do białych w Hrabstwie Kane, stabilny od 2015 r.",
      equityStat2: "Chorobowość cukrzycy w obwodach Aurory o najniższych dochodach w porównaniu ze St. Charles.",
      equityStat3: "Dorośli LGBTQ+ z Hrabstwa Kane zgłaszający częsty stres psychiczny, prawie dwukrotnie powyżej średniej hrabstwa.",
      communityEyebrow: "Głos społeczności · CHA 2024",
      communityTitle: "To, czego same liczby nie powiedzą.",
      communityLede: "Dane ilościowe mówią co. Dane jakościowe mówią dlaczego. Oba występują na tych samych stronach w tym atlasie. Kilka głosów z sesji słuchania CHA 2024.",
      changeSince2019: "pkt od 2019",
      ctaMap: {
        eyebrow: "Sekcja 02",
        title: "Interaktywna mapa Hrabstwa Kane",
        body: "Pięć poziomów geograficznych. Nakładka SVI. Filtruj według dowolnego wskaźnika i grupy demograficznej.",
        cta: "Otwórz mapę",
      },
      ctaReports: {
        eyebrow: "Sekcja 05",
        title: "Kreator raportów niestandardowych",
        body: "Wybierz wskaźniki, geografię, dane demograficzne i okres. Zapisz, udostępnij przez URL, wyeksportuj do PDF, CSV lub PNG.",
        cta: "Utwórz raport",
      },
      ctaSources: {
        eyebrow: "Sekcja 06",
        title: "Źródła danych i metody",
        body: "Każde źródło, cytowanie i harmonogram odświeżania. Plus krótkie samouczki i wycieczka przy pierwszej wizycie.",
        cta: "Zobacz metody",
      },
    },

    map: {
      eyebrow: "Sekcja 02 · Interaktywna mapa",
      title: "Zmapuj każdy wskaźnik w każdej skali.",
      lede: "Kartogram na poziomie obwodu spisowego z opcjonalną nakładką CDC Social Vulnerability Index. Filtruj według wskaźnika i grupy demograficznej. Pięć dostępnych poziomów geograficznych.",
      tags: {
        geoLevels: "Pięć poziomów geograficznych",
        svi: "Nakładka SVI",
        crosstabs: "Tabele krzyżowe demograficzne",
        basemap: "Mapa bazowa: CARTO Light",
      },
      indicator: "Wskaźnik",
      geoLevel: "Poziom geograficzny",
      currentlyShowing: "Obecnie wyświetlane: kartogram obwodów spisowych (144 obwody Hrabstwa Kane).",
      demographicSlice: "Grupa demograficzna",
      overlays: "Nakładki",
      sviToggle: "Indeks Podatności Społecznej CDC",
      sviTract: "Obwody z SVI > 0,5 podświetlone",
      nowViewing: "Obecnie wyświetlane",
      loadingGeometry: "Ładowanie geometrii Hrabstwa Kane…",
      countyAggregate: "Zbiorcze dla hrabstwa",
      countyAggregateBody: "Średnia ważona Hrabstwa Kane dla wszystkich 144 obwodów.",
      highestTract: "Najwyższy obwód",
      countyVsIllinois: "Hrabstwo vs. Illinois",
      countyVsIllinoisBody: "Hrabstwo Kane w porównaniu ze stawką stanową Illinois (IDPH 2024).",
      indicators: {
        diabetes: { label: "Chorobowość cukrzycy", category: "Choroby przewlekłe" },
        obesity: { label: "Otyłość", category: "Choroby przewlekłe" },
        hypertension: { label: "Nadciśnienie", category: "Choroby przewlekłe" },
        mental_distress: { label: "Częsty stres psychiczny", category: "Zdrowie behawioralne" },
        no_primary_care: { label: "Brak lekarza rodzinnego", category: "Dostęp do opieki" },
        uninsured: { label: "Dorośli bez ubezpieczenia", category: "Dostęp do opieki" },
        infant_mortality: { label: "Śmiertelność niemowląt", category: "Matka i dziecko" },
        overdose: { label: "Śmiertelność z przedawkowania", category: "Urazy i przemoc" },
      },
      demoFilters: {
        overall: "Ogółem",
        "race-white": "Biali, NH",
        "race-black": "Czarni / AA",
        "race-latino": "Latynosi",
        "race-asian": "Azjaci",
        "income-low": "<200% FPL",
        "age-55-plus": "Wiek 55+",
        "lang-es": "Hiszpańskojęzyczni",
        "lang-pl": "Polskojęzyczni",
      },
    },

    prioritiesIndex: {
      eyebrow: "Sekcja 03 · Obszary priorytetowe",
      title: "Sześć obszarów priorytetowych, uporządkowanych według IPLAN.",
      lede: "Każda strona szczegółowa poniżej zawiera wskaźnik nagłówkowy, linie trendu dla czterech cykli CHA, tabele krzyżowe demograficzne, widoki równości i głos z sesji słuchania społeczności.",
      tagIplan: "Ramy IPLAN",
      tagCycles: "Cztery cykle CHA wczytane",
      tagEquity: "Dezagregacja równości",
      tagQualitative: "Głos jakościowy",
      categoryOf: (n: number, total: number) => `IPLAN · kategoria ${n} z ${total}`,
      deepDive: "Szczegóły →",
    },

    priority: {
      eyebrow: (cat: string, num: string) => `${cat} · Obszar priorytetowy ${num}`,
      tagIplan: "IPLAN",
      tagCycles: "CHA 2015 · 2019 · 2022 · 2024",
      tagCrosstabs: "Tabele krzyżowe demograficzne",
      tagUpdated: "Zaktualizowano",
      theLede: "Nagłówek",
      headlineIndicator: "Wskaźnik nagłówkowy",
      trendEyebrow: "Trend · cztery cykle CHA",
      trendTitle: (ind: string) => `Śledzenie ${ind} od 2015 r.`,
      illustrativeTag: "Ilustracyjne — oczekiwanie na dane KCHD",
      readingChartEyebrow: "Jak czytać wykres",
      readingChartBody: "Cykle CHA 2015, 2019 i 2022 są wczytane zgodnie z Aneksem 3 do RFQ, aby umożliwić analizę trendów od startu. Przerywana bursztynowa oznacza publikację CHA 2024.",
      latestCycleLabel: "CHA 2024",
      equityEyebrow: "Równość · widok dezagregowany",
      equityTitle: (ind: string) => `${ind}, dezagregowane.`,
      equityLede: "Każdy wskaźnik w tym atlasie jest rozbity według rasy i pochodzenia etnicznego, wieku, dochodu, języka oraz — gdy pozwalają na to dane — orientacji seksualnej i tożsamości płciowej. Linia odniesienia to średnia hrabstwa.",
      ratiosEyebrow: "Co oznaczają proporcje",
      ratiosBody: "Liczba po prawej (np. 1,85×) to wartość grupy podzielona przez średnią hrabstwa. 1,00× oznacza parytet. Powyżej 1,00× to podwyższone obciążenie; poniżej — niższe.",
      largestGap: "Największa luka",
      aboveAverage: "ogólnej stawki Hrabstwa Kane.",
      planningEyebrow: "Geografia · widok Obszarów Planowania",
      planningTitle: "Pięć Obszarów Planowania KCHD.",
      tracts: "obwodów",
      pop: "ludn.",
      communityEyebrow: "Głos społeczności · sesje słuchania CHA 2024",
      communityTitle: "Dlaczego liczby wyglądają tak, jak wyglądają.",
      communityLede: "Głosy z grup fokusowych CHA 2024 i wywiadów z kluczowymi informatorami, przypisane do tego obszaru priorytetowego i publikowane wraz z danymi ilościowymi, które wyjaśniają.",
      nextEyebrow: "Co dalej",
      nextTitle: (ind: string) => `Zbuduj własny widok ${ind}.`,
      nextBody: "Otwórz ten wskaźnik w mapie, aby zobaczyć kartogramy na poziomie obwodów. Lub przejdź do kreatora raportów, aby połączyć go z innymi wskaźnikami, wybrać własną grupę demograficzną i wyeksportować raport niestandardowy.",
      openInMap: "Otwórz w mapie",
      openInMapBody: "Zobacz ten wskaźnik według obwodów",
      buildReport: "Utwórz raport",
      buildReportBody: "Połącz z innymi wskaźnikami",
    },

    equity: {
      eyebrow: "Sekcja 04 · Równość zdrowotna",
      title: "Nierówności to nagłówek, nie podsekcja.",
      lede: "Każdy wskaźnik w tym atlasie jest dezagregowany. Ta strona zbiera widoki nierówności w jednym miejscu. Wybierz wskaźnik. Wybierz soczewkę.",
      tags: ["Rasa i pochodzenie etniczne", "Dochód", "Wiek", "Język", "LGBTQ+", "Geografia"],
      indicator: "Wskaźnik",
      lens: "Soczewka równości",
      lensOptions: {
        race: "Rasa i pochodzenie etniczne",
        income: "Dochód",
        age: "Wiek",
        language: "Język używany w domu",
        lgbtq: "Dorośli LGBTQ+",
      },
      lensDesc: {
        race: "Nierówności między mieszkańcami czarnymi, białymi, latynoskimi i azjatyckimi Hrabstwa Kane.",
        income: "Nierówności według dochodu gospodarstwa w stosunku do Federalnego Progu Ubóstwa.",
        age: "Jak obciążenie zmienia się w przedziałach 18–34, 35–54 i 55+.",
        language: "Angielski, hiszpański, polski — trzy najczęstsze języki Hrabstwa Kane.",
        lgbtq: "Orientacja seksualna i tożsamość płciowa, gdy pozwalają na to dane BRFSS i KCHD.",
      },
      headlineEyebrow: (lens: string) => `Nagłówek · ${lens}`,
      headlineTemplate: (ind: string, ratio: string, worst: string) =>
        `${ind} jest ${ratio}× wyższy dla ${worst} niż średnia Hrabstwa Kane.`,
      overall: "Ogółem",
      highest: "Najwyższy",
      lowest: "Najniższy",
      byLens: (lens: string) => `Według ${lens.toLowerCase()}`,
      howToReadEyebrow: "Jak to czytać",
      howToReadBody: "Ciemny pasek to ogólna stawka Hrabstwa Kane. Bursztynowy oznacza grupę o najwyższym obciążeniu. Liczba po prawej każdego paska to wartość grupy podzielona przez stawkę ogólną.",
      sourceEyebrow: "Źródło",
      otherStoriesEyebrow: "Inne historie równości",
      otherStoriesTitle: "Pięć nagłówków wartych poznania.",
      stories: [
        {
          eyebrow: "Śmiertelność niemowląt · rasa",
          stat: "2,8×",
          headline: "Czarne niemowlęta umierają przed pierwszymi urodzinami prawie trzy razy częściej niż białe niemowlęta w Hrabstwie Kane.",
          source: "IDPH Statystyki Życiowe 2023",
        },
        {
          eyebrow: "Stres psychiczny · LGBTQ+",
          stat: "47,8%",
          headline: "Prawie jeden na dwóch dorosłych LGBTQ+ z Hrabstwa Kane zgłaszał częsty stres psychiczny w 2024 r. — dwa razy więcej niż w hrabstwie.",
          source: "BRFSS 2024 suplement Kane",
        },
        {
          eyebrow: "Brak lekarza · język",
          stat: "2,3×",
          headline: "Dorośli hiszpańskojęzyczni mają 2,3× większe prawdopodobieństwo niż anglojęzyczni, że nie mają lekarza rodzinnego.",
          source: "BRFSS 2024 suplement Kane",
        },
        {
          eyebrow: "Cukrzyca · dochód",
          stat: "2,2×",
          headline: "Dorośli w obwodach Hrabstwa Kane o najniższych dochodach mają cukrzycę 2,2× częściej niż w obwodach o najwyższych dochodach.",
          source: "CDC PLACES 2024",
        },
        {
          eyebrow: "Otyłość · rasa + dochód",
          stat: "40,1%",
          headline: "Otyłość wśród dorosłych czarnych (40,1%) przewyższa średnią hrabstwa o 12 punktów i rośnie od 2015 r.",
          source: "CDC PLACES 2024",
        },
        {
          eyebrow: "Przedawkowanie · wiek",
          stat: "2,3×",
          headline: "Dorośli w wieku 18–34 umierają z przedawkowania 2,3× częściej niż dorośli 55+, odwracając wzór z 2015 r.",
          source: "CDC WONDER 2023",
        },
      ],
    },

    reports: {
      eyebrow: "Sekcja 05 · Raporty niestandardowe",
      title: "Utwórz raport. Zapisz go. Udostępnij.",
      lede: "Wybierz wskaźniki, geografię, dane demograficzne i okres. Wyeksportuj do PDF, CSV lub PNG. Każdy raport ma udostępniany URL, który przywraca dokładny widok.",
      tags: { pdf: "Eksport PDF", csv: "Pobierz CSV", png: "Obraz PNG", url: "URL do udostępnienia" },
      reportTitle: "Tytuł raportu",
      defaultTitle: "Raport niestandardowy Hrabstwa Kane",
      step1: "1. Wskaźniki",
      step1Body: "Wybierz jeden lub więcej. Każdy stanie się sekcją raportu.",
      step2: "2. Geografia",
      step2Opts: {
        county: "Hrabstwo Kane",
        municipality: "Według gminy",
        planning: "Obszary Planowania",
        tract: "Obwody spisowe",
      },
      step3: "3. Dane demograficzne",
      step3Body: "Grupy do uwzględnienia w każdej sekcji wskaźnika.",
      step4: "4. Okres",
      allCycles: "Wszystkie cykle",
      exportHeading: "Eksport",
      exportBody: "Kopiowanie URL koduje pełny stan raportu, aby kolega otworzył dokładnie ten sam widok.",
      copiedLabel: "Skopiowano",
      copyUrl: "Kopiuj URL",
      indicators: "Wskaźniki",
      geography: "Geografia",
      slices: "Grupy",
      period: "Okres",
      section: "Sekcja",
      noIndicators: "Nie wybrano wskaźników",
      noIndicatorsBody: "Wybierz jeden lub więcej wskaźników z lewego panelu.",
      trend: "Trend",
      equityView: "Widok równości",
      generatedOn: (date: string) => `Wygenerowano ${date} · Departament Zdrowia Hrabstwa Kane`,
    },

    sources: {
      eyebrow: "Sekcja 06 · Dane i metody",
      title: "Każde źródło, każde cytowanie, każda aktualizacja.",
      lede: "Ten atlas opiera się na publicznych danych CDC, Biura Spisu Ludności, Departamentu Zdrowia Publicznego Illinois oraz własnej Oceny Zdrowia Społeczności Hrabstwa Kane. Ta strona to przejrzysty zapis.",
      tagSources: "źródeł",
      tagRefresh: "Znaczniki odświeżania",
      tagLabels: "Etykiety real vs. ilustracyjne",
      howToEyebrow: "Jak korzystać z atlasu",
      howToTitle: "Cztery krótkie samouczki i wycieczka przy pierwszej wizycie.",
      tutorials: [
        {
          title: "Jak czytać mapę",
          duration: "2 min",
          body: "Kolory kartogramu, filtry demograficzne, nakładka SVI i co oznaczają proporcje na słupkach nierówności.",
        },
        {
          title: "Tworzenie raportu niestandardowego",
          duration: "3 min",
          body: "Wybierz wskaźniki, geografię, dane demograficzne i okres. Wyeksportuj do PDF / CSV / PNG. Udostępnij przez URL.",
        },
        {
          title: "Czym jest IPLAN?",
          duration: "1 min",
          body: "Ramowy program Illinois Project for Local Assessment of Needs — sześć kategorii zdrowia społeczności, wokół których uporządkowany jest atlas.",
        },
        {
          title: "Widoki równości, wyjaśnione",
          duration: "2 min",
          body: "Dlaczego nierówności są domyślnym widokiem. Jak działają przekroje rasa/etniczność, dochód, wiek, język i LGBTQ+ w każdym wskaźniku.",
        },
      ],
      restartEyebrow: "Uruchom ponownie wycieczkę",
      restartTitle: "Chcesz ponownie obejrzeć przewodnik?",
      restartBody: "Kliknij, aby ponownie uruchomić pięcioetapową wycieczkę, która pojawia się przy pierwszej wizycie.",
      restartBtn: "Uruchom wycieczkę ponownie →",
      dataSourcesEyebrow: "Źródła danych",
      dataSourcesTitle: "Każdy zbiór danych stojący za tym atlasem.",
      lastAudit: "Ostatni audyt: 10 kwietnia 2026",
      live: "Na żywo",
      demo: "Demo",
      lastRefresh: "Ostatnia aktualizacja",
      scope: "Zakres w tej demonstracji",
      citation: "Cytat",
      methodologyEyebrow: "Metodologia",
      methodologyTitle: "Jak zbudowany jest atlas.",
      methodologyItems: [
        {
          title: "Szacunki na poziomie obwodu",
          body: "Szacunki dla małych obszarów wykorzystują CDC PLACES, z ACS 5-letnim jako podstawą populacyjną. Hrabstwo Kane ma 144 obwody spisowe i sześć geografii zbiorczych (hrabstwo, gmina, kod pocztowy, Obszar Planowania oraz obszar usług szpitalnych, gdy pozwalają dane).",
        },
        {
          title: "Dezagregacja demograficzna",
          body: "Rasa i pochodzenie etniczne wykorzystują kategorie OMB z Latynosami traktowanymi jako osobny wymiar. Dochód mierzony jest w stosunku do Federalnego Progu Ubóstwa (<200%, 200–399%, ≥400%). Szacunki LGBTQ+ z suplementu BRFSS, gdy pozwala próbka.",
        },
        {
          title: "Prywatność i tłumienie",
          body: "Komórki z mniej niż 20 obserwacjami są tłumione w widokach publicznych. Stawki liczone są względem mianowników populacyjnych ze standardową korektą wieku dla wyników śmiertelności. Szacunki na poziomie obwodów oznaczane są współczynnikiem zmienności.",
        },
        {
          title: "Odświeżanie i monitorowanie",
          body: "Zautomatyzowane pobrania działają na zaplanowanych GitHub Actions. Każde źródło ma health-check, który ostrzega personel KCHD e-mailem, jeśli pobranie nie powiedzie się lub zmieni się schemat. Każda strona pokazuje znacznik „ostatniej aktualizacji” ze źródła.",
        },
        {
          title: "Dostępność",
          body: "WCAG 2.1 AA w całości. Semantyczny HTML, widoczne stany focusu, interakcje dostępne z klawiatury, kodowanie niezależne od koloru (każdy kartogram ma legendę numeryczną), opisy wykresów przyjazne czytnikom ekranu. Cel Lighthouse: 90+.",
        },
        {
          title: "Tłumaczenie",
          body: "Angielski, hiszpański i polski. Trzecim najczęściej używanym językiem w Hrabstwie Kane jest polski. Etykiety interfejsu, treść stron i wyeksportowane raporty są tłumaczone. Dodatkowe języki można dodać po uruchomieniu bez zmian strukturalnych.",
        },
      ],
    },

    admin: {
      eyebrowWorkspace: "Obszar roboczy personelu KCHD",
      signInTitle: "Zaloguj się, aby zarządzać danymi, monitorować użycie i przesyłać wskaźniki.",
      signInLede: "Ta strefa jest zastrzeżona dla personelu Departamentu Zdrowia Hrabstwa Kane. W demonstracji wybierz dowolny profil poniżej — bez hasła — aby zobaczyć, co widzi każda rola.",
      directoryEyebrow: "Katalog · 20 użytkowników",
      directoryTitle: "Wybierz rolę do podglądu",
      demoNoteEyebrow: "Notka demonstracyjna",
      demoNoteBody: "W produkcji ten obszar uwierzytelnia się względem dostawcy tożsamości KCHD (Microsoft 365 w propozycji). Bezpieczeństwo wierszowe ogranicza każdego użytkownika do jego zakresu przesyłania. Dwudziestu użytkowników; pięciu z uprawnieniami przesyłania zgodnie z Aneksem 3.",
      demoShieldNote: "Logowanie jest symulowane w tej demonstracji. Prawdziwe poświadczenia nie są zbierane ani przechowywane.",
      signOut: "Wyloguj",
      signedInAs: "Zalogowany jako",
      tabAnalytics: "Analityka użycia",
      tabData: "Zarządzaj źródłami danych",
      tabUpload: "Prześlij nowe dane",
      tabUsers: "Użytkownicy i uprawnienia",
      analyticsSection: "Sekcja · Analityka użycia",
      analyticsTitle: "Kto i do czego korzysta z atlasu.",
      activeUsers: "Aktywni użytkownicy",
      today: "Dziś",
      week: "Ten tydzień",
      month: "Ten miesiąc",
      topPages: "Najpopularniejsze strony · ostatnie 30 dni",
      topSearches: "Najczęstsze wyszukiwania",
      recentDownloads: "Ostatnie pobrania",
      dataSection: "Sekcja · Zarządzaj źródłami danych",
      dataTitle: "Znaczniki odświeżania i ręczne pobrania.",
      dataLede: "Automatyczne odświeżanie uruchamia się według harmonogramu dla każdego źródła. Uruchom tu ręczne odświeżenie. Personel otrzymuje alert e-mail, jeśli zaplanowane pobranie się nie powiedzie.",
      sourceCol: "Źródło",
      freqCol: "Częstotliwość",
      lastRefreshCol: "Ostatnia aktualizacja",
      statusCol: "Status",
      healthy: "Sprawne",
      refresh: "Odśwież",
      refreshing: "Odświeżanie",
      refreshed: "Odświeżono",
      uploadSection: "Sekcja · Prześlij nowe dane",
      uploadTitle: "Dodaj dane wskaźnika w ramach twojego zakresu uprawnień.",
      permissionsEyebrow: "Twoje uprawnienia przesyłania",
      permissionsFull: "Masz pełne uprawnienia przesyłania we wszystkich obszarach priorytetowych.",
      permissionsNone: "Obecnie nie masz uprawnień przesyłania. Skontaktuj się z KCHD Data Systems, aby poprosić o zakres.",
      permissionsSome: "Możesz przesyłać tylko w następujących zakresach:",
      rowLevelNote: "Bezpieczeństwo wierszowe w backendzie Supabase egzekwuje te zakresy. Ta demonstracja pokazuje szynę uprawnień; kompilacja produkcyjna blokuje przesyłanie po stronie serwera.",
      newUploadEyebrow: "Nowe przesłanie wskaźnika",
      newUploadTitle: "Prześlij zestaw danych wskaźnika",
      scopeLabel: "Zakres (musi mieścić się w twoich uprawnieniach)",
      indicatorNameLabel: "Nazwa wskaźnika",
      indicatorNamePlaceholder: "np. Chorobowość astmy u dorosłych",
      dataFileLabel: "Plik danych (CSV · do 25 MB)",
      dropCsv: "Upuść CSV tutaj lub kliknij, aby przeglądać",
      dropCsvHint: "Oczekiwane kolumny: geoid, indicator_id, value, period, cv",
      submitUpload: "Prześlij",
      uploading: "Walidacja + zapisywanie",
      uploaded: "Przesłanie w kolejce · QA w toku",
      usersSection: "Sekcja · Użytkownicy i uprawnienia",
      usersTitle: "Dwudziestu użytkowników wewnętrznych. Pięciu z zakresem przesyłania.",
      usersLede: "Zgodnie z Aneksem 3, około 20 pracowników KCHD korzysta z tego obszaru roboczego. Bezpieczeństwo wierszowe ogranicza każdego użytkownika do jego określonego zakresu.",
      nameCol: "Imię i nazwisko",
      deptCol: "Wydział",
      roleCol: "Rola",
      uploadScopeCol: "Zakres przesyłania",
      emailCol: "E-mail",
      roles: { admin: "Administrator", uploader: "Przesyłający", editor: "Edytor", viewer: "Widz" },
      allScopes: "Wszystkie zakresy",
      noUploadScope: "Brak zakresu przesyłania",
      fullUploadScope: "Pełny zakres przesyłania",
      uploadScopeCount: (n: number) => `Przesyłanie: ${n} zakres${n > 1 ? "ów" : ""}`,
    },

    search: {
      eyebrow: "Szukaj",
      titlePlaceholder: "Przeszukaj atlas",
      titleFor: (q: string) => `Wyniki dla „${q}”`,
      lede: (n: number) =>
        `${n} wynik${n === 1 ? "" : "ów"} w wskaźnikach, miejscach, obszarach priorytetowych, kategoriach ramowych i źródłach danych.`,
      tags: { indicators: "Wskaźniki", places: "Miejsca", priorityAreas: "Obszary priorytetowe", sources: "Źródła" },
      prompt: "Użyj paska wyszukiwania w nagłówku lub naciśnij ⌘K w dowolnym miejscu atlasu.",
      notFound: "Nic nie znaleziono. Spróbuj szerszego terminu.",
      notFoundBody: "Sugestie: cukrzyca, Aurora, behawioralne, SVI, Obszar Planowania, PLACES.",
      groups: {
        indicators: "Wskaźniki",
        places: "Miejsca",
        priorityAreas: "Obszary priorytetowe",
        framework: "Ramy",
        sources: "Źródła",
      },
      groupLabels: {
        indicator: "Wskaźnik",
        priorityArea: "Obszar priorytetowy",
        municipality: "Gmina",
        planningArea: "Obszar Planowania",
        iplanCategory: "Kategoria IPLAN",
        dataSource: "Źródło danych",
      },
    },

    footer: {
      tagline: "Ocena i Plan Poprawy Zdrowia Społeczności",
      builtBy: "Niestandardowy panel zbudowany dla Departamentu Zdrowia Hrabstwa Kane.",
      contact: "Kontakt z Departamentem Zdrowia",
      accessibility: "Dostępność",
      methodology: "Metody i źródła",
      owner: "© Departament Zdrowia Hrabstwa Kane",
      exploreHeading: "Eksploruj",
      buildAndLearnHeading: "Twórz i ucz się",
      kchdHeading: "Departament Zdrowia Hrabstwa Kane",
      staff: "Personel KCHD",
      demoVersion: "v1.0 · demonstracja RFQ 26-029-TK",
    },
  },
};

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: StringsTree;
}>({ locale: "en", setLocale: () => {}, t: STRINGS.en });

export function useLocale() {
  return useContext(LocaleContext);
}
