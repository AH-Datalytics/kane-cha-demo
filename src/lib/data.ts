/**
 * Kane County CHA / CHIP data fixtures.
 *
 * Values grounded in real Kane County demographics and CDC PLACES / County Health
 * Rankings patterns. Where a value is illustrative, it is labeled as such and
 * the full Data Sources & Methodology page surfaces the real-vs-illustrative split.
 *
 * Kane County population ≈ 535,000. Aurora (180K, heavily Latino, mixed SES),
 * Elgin (115K, historic Polish community, diverse), Batavia/Geneva/St. Charles
 * (wealthier suburbs), plus unincorporated tracts to the west.
 */

export type IPLANCategory =
  | "chronic-disease"
  | "maternal-child"
  | "behavioral-health"
  | "injury-violence"
  | "access-to-care"
  | "environmental-health";

export const IPLAN_CATEGORIES: {
  id: IPLANCategory;
  name: string;
  nameEs: string;
  namePl: string;
  description: string;
  descriptionEs: string;
  descriptionPl: string;
}[] = [
  {
    id: "chronic-disease",
    name: "Chronic Disease",
    nameEs: "Enfermedades crónicas",
    namePl: "Choroby przewlekłe",
    description:
      "Diabetes, heart disease, hypertension, stroke, cancer, COPD. Tracks prevalence, management, and outcomes.",
    descriptionEs:
      "Diabetes, enfermedades cardíacas, hipertensión, accidente cerebrovascular, cáncer, EPOC. Rastrea prevalencia, manejo y resultados.",
    descriptionPl:
      "Cukrzyca, choroby serca, nadciśnienie, udar, nowotwory, POChP. Śledzi chorobowość, leczenie i wyniki.",
  },
  {
    id: "maternal-child",
    name: "Maternal & Child Health",
    nameEs: "Salud materno-infantil",
    namePl: "Zdrowie matki i dziecka",
    description:
      "Prenatal care, low birth weight, infant mortality, childhood immunization, adolescent well-being.",
    descriptionEs:
      "Atención prenatal, bajo peso al nacer, mortalidad infantil, vacunación infantil, bienestar adolescente.",
    descriptionPl:
      "Opieka prenatalna, niska masa urodzeniowa, śmiertelność niemowląt, szczepienia dzieci, dobrostan młodzieży.",
  },
  {
    id: "behavioral-health",
    name: "Behavioral Health",
    nameEs: "Salud conductual",
    namePl: "Zdrowie behawioralne",
    description:
      "Depression, anxiety, substance use, suicide, stress, access to mental health services.",
    descriptionEs:
      "Depresión, ansiedad, uso de sustancias, suicidio, estrés, acceso a servicios de salud mental.",
    descriptionPl:
      "Depresja, lęk, używanie substancji, samobójstwa, stres, dostęp do usług zdrowia psychicznego.",
  },
  {
    id: "injury-violence",
    name: "Injury & Violence",
    nameEs: "Lesiones y violencia",
    namePl: "Urazy i przemoc",
    description:
      "Motor vehicle crashes, falls, intentional self-harm, interpersonal violence, overdose.",
    descriptionEs:
      "Accidentes de tránsito, caídas, autolesiones intencionales, violencia interpersonal, sobredosis.",
    descriptionPl:
      "Wypadki drogowe, upadki, umyślne samookaleczenia, przemoc interpersonalna, przedawkowania.",
  },
  {
    id: "access-to-care",
    name: "Access to Care",
    nameEs: "Acceso a la atención",
    namePl: "Dostęp do opieki",
    description:
      "Insurance coverage, primary care, dental, preventive services, language access, transportation.",
    descriptionEs:
      "Cobertura de seguro, atención primaria, dental, servicios preventivos, acceso por idioma, transporte.",
    descriptionPl:
      "Ubezpieczenie, opieka podstawowa, stomatologia, usługi profilaktyczne, dostęp językowy, transport.",
  },
  {
    id: "environmental-health",
    name: "Environmental Health",
    nameEs: "Salud ambiental",
    namePl: "Zdrowie środowiskowe",
    description:
      "Air quality, drinking water, housing quality, lead exposure, heat events, food access.",
    descriptionEs:
      "Calidad del aire, agua potable, calidad de vivienda, exposición al plomo, olas de calor, acceso a alimentos.",
    descriptionPl:
      "Jakość powietrza, woda pitna, jakość mieszkań, narażenie na ołów, fale upałów, dostęp do żywności.",
  },
];

export type PriorityArea = {
  slug: string;
  category: IPLANCategory;
  name: string;
  nameEs: string;
  namePl: string;
  headline: string;
  headlineEs: string;
  headlinePl: string;
  summary: string;
  summaryEs: string;
  summaryPl: string;
  headlineStat: {
    value: string;
    label: string;
    labelEs: string;
    labelPl: string;
    change: string;
    changeEs: string;
    changePl: string;
    direction: "up" | "down" | "flat";
  };
  lastUpdated: string;
  lastUpdatedEs: string;
  lastUpdatedPl: string;
};

export const PRIORITY_AREAS: PriorityArea[] = [
  {
    slug: "chronic-disease",
    category: "chronic-disease",
    name: "Diabetes and cardiometabolic disease",
    nameEs: "Diabetes y enfermedad cardiometabólica",
    namePl: "Cukrzyca i choroby kardiometaboliczne",
    headline: "One in ten adults in Kane County lives with diagnosed diabetes.",
    headlineEs: "Uno de cada diez adultos del Condado de Kane vive con diabetes diagnosticada.",
    headlinePl: "Jeden na dziesięciu dorosłych w Hrabstwie Kane ma zdiagnozowaną cukrzycę.",
    summary:
      "Prevalence is uneven across the county. Aurora census tracts show rates two to three times those of St. Charles and Geneva. The gap widens among adults over 50.",
    summaryEs:
      "La prevalencia es desigual en el condado. Las secciones censales de Aurora muestran tasas de dos a tres veces las de St. Charles y Geneva. La brecha se amplía entre los adultos mayores de 50 años.",
    summaryPl:
      "Chorobowość jest nierówna w hrabstwie. Obwody spisowe Aurory pokazują stawki dwa do trzech razy wyższe niż St. Charles i Genewy. Luka pogłębia się wśród dorosłych powyżej 50. roku życia.",
    headlineStat: {
      value: "10.4%",
      label: "Adults with diabetes",
      labelEs: "Adultos con diabetes",
      labelPl: "Dorośli z cukrzycą",
      change: "+0.6 pts since 2019",
      changeEs: "+0,6 pts desde 2019",
      changePl: "+0,6 pkt od 2019",
      direction: "up",
    },
    lastUpdated: "March 2026",
    lastUpdatedEs: "marzo de 2026",
    lastUpdatedPl: "marzec 2026",
  },
  {
    slug: "maternal-child-health",
    category: "maternal-child",
    name: "Maternal and infant health",
    nameEs: "Salud materna e infantil",
    namePl: "Zdrowie matki i niemowlęcia",
    headline:
      "Black infants in Kane County die before their first birthday at nearly three times the rate of white infants.",
    headlineEs:
      "Los bebés negros en el Condado de Kane mueren antes de su primer cumpleaños a casi tres veces la tasa de los bebés blancos.",
    headlinePl:
      "Czarne niemowlęta w Hrabstwie Kane umierają przed pierwszymi urodzinami prawie trzy razy częściej niż białe niemowlęta.",
    summary:
      "Low birth weight, late prenatal care, and infant mortality all disaggregate sharply by race and by tract. Spanish-speaking mothers report the highest first-trimester prenatal care rates.",
    summaryEs:
      "Bajo peso al nacer, atención prenatal tardía y mortalidad infantil se desagregan de forma marcada por raza y por sección. Las madres hispanohablantes reportan las tasas más altas de atención prenatal en el primer trimestre.",
    summaryPl:
      "Niska masa urodzeniowa, późna opieka prenatalna i śmiertelność niemowląt silnie dezagregują się według rasy i obwodu. Hiszpańskojęzyczne matki zgłaszają najwyższe wskaźniki opieki prenatalnej w pierwszym trymestrze.",
    headlineStat: {
      value: "2.8×",
      label: "Black–White infant mortality ratio",
      labelEs: "Razón de mortalidad infantil negros–blancos",
      labelPl: "Stosunek śmiertelności niemowląt czarnych do białych",
      change: "Flat since 2015",
      changeEs: "Estable desde 2015",
      changePl: "Stabilne od 2015",
      direction: "flat",
    },
    lastUpdated: "February 2026",
    lastUpdatedEs: "febrero de 2026",
    lastUpdatedPl: "luty 2026",
  },
  {
    slug: "behavioral-health",
    category: "behavioral-health",
    name: "Behavioral health and substance use",
    nameEs: "Salud conductual y uso de sustancias",
    namePl: "Zdrowie behawioralne i używki",
    headline: "One in four Kane County adults reported frequent mental distress in 2024. Among LGBTQ+ adults, it was nearly one in two.",
    headlineEs:
      "Uno de cada cuatro adultos del Condado de Kane reportó angustia mental frecuente en 2024. Entre adultos LGBTQ+, fue casi uno de cada dos.",
    headlinePl:
      "Jeden na czterech dorosłych mieszkańców Hrabstwa Kane zgłosił częsty stres psychiczny w 2024 r. Wśród dorosłych LGBTQ+ było to niemal jeden na dwóch.",
    summary:
      "Reported mental distress climbed sharply between 2019 and 2022 and has not returned to pre-pandemic levels. Youth suicide attempts remain above state averages.",
    summaryEs:
      "La angustia mental reportada aumentó fuertemente entre 2019 y 2022 y no ha regresado a niveles prepandémicos. Los intentos de suicidio juveniles siguen por encima de los promedios estatales.",
    summaryPl:
      "Zgłaszany stres psychiczny gwałtownie wzrósł między 2019 a 2022 rokiem i nie powrócił do poziomów sprzed pandemii. Próby samobójcze młodzieży pozostają powyżej średnich stanowych.",
    headlineStat: {
      value: "24.1%",
      label: "Adults reporting frequent mental distress",
      labelEs: "Adultos que reportan angustia mental frecuente",
      labelPl: "Dorośli zgłaszający częsty stres psychiczny",
      change: "+5.2 pts since 2019",
      changeEs: "+5,2 pts desde 2019",
      changePl: "+5,2 pkt od 2019",
      direction: "up",
    },
    lastUpdated: "March 2026",
    lastUpdatedEs: "marzo de 2026",
    lastUpdatedPl: "marzec 2026",
  },
  {
    slug: "access-to-care",
    category: "access-to-care",
    name: "Access to primary and preventive care",
    nameEs: "Acceso a atención primaria y preventiva",
    namePl: "Dostęp do opieki podstawowej i profilaktycznej",
    headline: "Thirteen percent of adults in Kane County have no personal doctor. Among uninsured adults, it is more than half.",
    headlineEs:
      "El trece por ciento de los adultos del Condado de Kane no tiene médico de cabecera. Entre los adultos sin seguro, es más de la mitad.",
    headlinePl:
      "Trzynaście procent dorosłych w Hrabstwie Kane nie ma lekarza rodzinnego. Wśród dorosłych bez ubezpieczenia to ponad połowa.",
    summary:
      "Language access and insurance coverage are the two strongest predictors of whether a Kane County resident has a usual source of care.",
    summaryEs:
      "El acceso por idioma y la cobertura de seguro son los dos predictores más fuertes de si un residente del Condado de Kane tiene una fuente habitual de atención.",
    summaryPl:
      "Dostęp językowy i ubezpieczenie to dwa najsilniejsze predyktory tego, czy mieszkaniec Hrabstwa Kane ma stałe źródło opieki.",
    headlineStat: {
      value: "13.2%",
      label: "Adults with no personal doctor",
      labelEs: "Adultos sin médico de cabecera",
      labelPl: "Dorośli bez lekarza rodzinnego",
      change: "−1.4 pts since 2019",
      changeEs: "−1,4 pts desde 2019",
      changePl: "−1,4 pkt od 2019",
      direction: "down",
    },
    lastUpdated: "March 2026",
    lastUpdatedEs: "marzo de 2026",
    lastUpdatedPl: "marzec 2026",
  },
  {
    slug: "injury-and-violence",
    category: "injury-violence",
    name: "Injury, overdose, and violence prevention",
    nameEs: "Prevención de lesiones, sobredosis y violencia",
    namePl: "Zapobieganie urazom, przedawkowaniom i przemocy",
    headline: "Opioid overdose deaths in Kane County have plateaued after three years of rapid increase.",
    headlineEs:
      "Las muertes por sobredosis de opioides en el Condado de Kane se han estabilizado tras tres años de rápido aumento.",
    headlinePl:
      "Zgony z przedawkowania opioidów w Hrabstwie Kane ustabilizowały się po trzech latach szybkiego wzrostu.",
    summary:
      "Naloxone distribution and fentanyl test strip access expanded in 2024. Overdose mortality is still double its 2015 level.",
    summaryEs:
      "La distribución de naloxona y el acceso a tiras de prueba de fentanilo se ampliaron en 2024. La mortalidad por sobredosis sigue siendo el doble del nivel de 2015.",
    summaryPl:
      "Dystrybucja naloksonu i dostęp do pasków testowych na fentanyl zostały rozszerzone w 2024 r. Śmiertelność z przedawkowania wciąż jest dwukrotnie wyższa niż w 2015 r.",
    headlineStat: {
      value: "26.4",
      label: "Overdose deaths per 100k",
      labelEs: "Muertes por sobredosis por 100k",
      labelPl: "Zgony z przedawkowania na 100 tys.",
      change: "−1.1 pts since 2023",
      changeEs: "−1,1 pts desde 2023",
      changePl: "−1,1 pkt od 2023",
      direction: "down",
    },
    lastUpdated: "January 2026",
    lastUpdatedEs: "enero de 2026",
    lastUpdatedPl: "styczeń 2026",
  },
  {
    slug: "environmental-health",
    category: "environmental-health",
    name: "Environmental health and housing",
    nameEs: "Salud ambiental y vivienda",
    namePl: "Zdrowie środowiskowe i mieszkalnictwo",
    headline: "Roughly one in six Kane County households reports a severe housing cost burden.",
    headlineEs:
      "Aproximadamente uno de cada seis hogares del Condado de Kane reporta una carga severa por costo de vivienda.",
    headlinePl:
      "Mniej więcej jedno na sześć gospodarstw domowych w Hrabstwie Kane zgłasza poważne obciążenie kosztami mieszkania.",
    summary:
      "Housing cost burden, lead exposure risk, and poor air quality days cluster in the same tracts that carry the highest social vulnerability.",
    summaryEs:
      "La carga por costo de vivienda, el riesgo de exposición al plomo y los días de mala calidad del aire se concentran en las mismas secciones que presentan la mayor vulnerabilidad social.",
    summaryPl:
      "Obciążenie kosztami mieszkania, ryzyko narażenia na ołów i dni o złej jakości powietrza skupiają się w tych samych obwodach, które mają najwyższą podatność społeczną.",
    headlineStat: {
      value: "16.8%",
      label: "Severe housing cost burden",
      labelEs: "Carga severa por costo de vivienda",
      labelPl: "Poważne obciążenie kosztami mieszkania",
      change: "+0.9 pts since 2019",
      changeEs: "+0,9 pts desde 2019",
      changePl: "+0,9 pkt od 2019",
      direction: "up",
    },
    lastUpdated: "February 2026",
    lastUpdatedEs: "febrero de 2026",
    lastUpdatedPl: "luty 2026",
  },
];

/* ---------- Headline indicators (grounded in CDC PLACES / ACS / CHR patterns) ---------- */

export type HeadlineIndicator = {
  id: string;
  label: string;
  labelEs: string;
  labelPl: string;
  value: number;
  unit: string;
  source: string;
  sparkline: number[];
  change: number;
  category: IPLANCategory;
  interpretation: "higher-worse" | "higher-better";
};

export const HEADLINE_INDICATORS: HeadlineIndicator[] = [
  {
    id: "diabetes",
    label: "Adults with diabetes",
    labelEs: "Adultos con diabetes",
    labelPl: "Dorośli z cukrzycą",
    value: 10.4,
    unit: "%",
    source: "CDC PLACES 2024",
    sparkline: [8.9, 9.1, 9.4, 9.6, 9.8, 10.1, 10.4],
    change: 0.6,
    category: "chronic-disease",
    interpretation: "higher-worse",
  },
  {
    id: "obesity",
    label: "Adults with obesity",
    labelEs: "Adultos con obesidad",
    labelPl: "Dorośli z otyłością",
    value: 31.2,
    unit: "%",
    source: "CDC PLACES 2024",
    sparkline: [28.4, 29.0, 29.6, 30.2, 30.5, 30.9, 31.2],
    change: 2.8,
    category: "chronic-disease",
    interpretation: "higher-worse",
  },
  {
    id: "hypertension",
    label: "Adults with hypertension",
    labelEs: "Adultos con hipertensión",
    labelPl: "Dorośli z nadciśnieniem",
    value: 29.7,
    unit: "%",
    source: "CDC PLACES 2024",
    sparkline: [27.8, 28.2, 28.6, 28.9, 29.1, 29.4, 29.7],
    change: 1.9,
    category: "chronic-disease",
    interpretation: "higher-worse",
  },
  {
    id: "mental-distress",
    label: "Frequent mental distress",
    labelEs: "Angustia mental frecuente",
    labelPl: "Częsty stres psychiczny",
    value: 24.1,
    unit: "%",
    source: "CDC PLACES 2024",
    sparkline: [15.8, 17.2, 18.9, 21.4, 22.8, 23.5, 24.1],
    change: 5.2,
    category: "behavioral-health",
    interpretation: "higher-worse",
  },
  {
    id: "uninsured",
    label: "Adults without health insurance",
    labelEs: "Adultos sin seguro médico",
    labelPl: "Dorośli bez ubezpieczenia",
    value: 10.8,
    unit: "%",
    source: "ACS 5-year 2019–2023",
    sparkline: [13.2, 12.7, 12.1, 11.6, 11.2, 11.0, 10.8],
    change: -1.8,
    category: "access-to-care",
    interpretation: "higher-worse",
  },
  {
    id: "no-primary-care",
    label: "Adults without a personal doctor",
    labelEs: "Adultos sin médico de cabecera",
    labelPl: "Dorośli bez lekarza pierwszego kontaktu",
    value: 13.2,
    unit: "%",
    source: "BRFSS 2024 (KCHD supplement)",
    sparkline: [14.6, 14.4, 14.1, 13.8, 13.5, 13.3, 13.2],
    change: -1.4,
    category: "access-to-care",
    interpretation: "higher-worse",
  },
  {
    id: "infant-mortality",
    label: "Infant mortality rate",
    labelEs: "Tasa de mortalidad infantil",
    labelPl: "Wskaźnik śmiertelności niemowląt",
    value: 5.1,
    unit: "per 1,000",
    source: "IDPH Vital Statistics 2023",
    sparkline: [5.3, 5.2, 5.4, 5.5, 5.3, 5.2, 5.1],
    change: -0.2,
    category: "maternal-child",
    interpretation: "higher-worse",
  },
  {
    id: "overdose",
    label: "Overdose deaths per 100k",
    labelEs: "Muertes por sobredosis por 100k",
    labelPl: "Zgony z powodu przedawkowania na 100 tys.",
    value: 26.4,
    unit: "",
    source: "CDC WONDER 2023",
    sparkline: [14.8, 17.9, 21.2, 24.1, 27.0, 27.5, 26.4],
    change: -1.1,
    category: "injury-violence",
    interpretation: "higher-worse",
  },
];

/* ---------- CHA cycles (3 back-loaded per Addendum 3) ---------- */

export type CHACycle = "2015 CHA" | "2019 CHA" | "2022 CHA" | "2024 CHA";
export const CHA_CYCLES: CHACycle[] = ["2015 CHA", "2019 CHA", "2022 CHA", "2024 CHA"];

export type TrendRow = { cycle: CHACycle; value: number };

export const TREND_BY_INDICATOR: Record<string, TrendRow[]> = {
  diabetes: [
    { cycle: "2015 CHA", value: 8.4 },
    { cycle: "2019 CHA", value: 9.8 },
    { cycle: "2022 CHA", value: 10.1 },
    { cycle: "2024 CHA", value: 10.4 },
  ],
  obesity: [
    { cycle: "2015 CHA", value: 26.1 },
    { cycle: "2019 CHA", value: 28.4 },
    { cycle: "2022 CHA", value: 30.2 },
    { cycle: "2024 CHA", value: 31.2 },
  ],
  "mental-distress": [
    { cycle: "2015 CHA", value: 13.9 },
    { cycle: "2019 CHA", value: 15.8 },
    { cycle: "2022 CHA", value: 21.4 },
    { cycle: "2024 CHA", value: 24.1 },
  ],
  "no-primary-care": [
    { cycle: "2015 CHA", value: 16.2 },
    { cycle: "2019 CHA", value: 14.6 },
    { cycle: "2022 CHA", value: 13.8 },
    { cycle: "2024 CHA", value: 13.2 },
  ],
  "infant-mortality": [
    { cycle: "2015 CHA", value: 5.6 },
    { cycle: "2019 CHA", value: 5.3 },
    { cycle: "2022 CHA", value: 5.3 },
    { cycle: "2024 CHA", value: 5.1 },
  ],
  overdose: [
    { cycle: "2015 CHA", value: 13.1 },
    { cycle: "2019 CHA", value: 14.8 },
    { cycle: "2022 CHA", value: 24.1 },
    { cycle: "2024 CHA", value: 26.4 },
  ],
};

/* ---------- Demographic cross-tabs (illustrative; grounded in state patterns) ---------- */

export type DemographicSlice =
  | "overall"
  | "race-white"
  | "race-black"
  | "race-latino"
  | "race-asian"
  | "age-18-34"
  | "age-35-54"
  | "age-55-plus"
  | "income-low"
  | "income-mid"
  | "income-high"
  | "lang-en"
  | "lang-es"
  | "lang-pl"
  | "lgbtq";

export const DEMO_LABELS: Record<DemographicSlice, { en: string; es: string; pl: string }> = {
  overall: { en: "Overall", es: "General", pl: "Ogółem" },
  "race-white": { en: "White, non-Hispanic", es: "Blanco, no hispano", pl: "Biali, nie-Hiszpanie" },
  "race-black": { en: "Black or African American", es: "Negro o afroamericano", pl: "Czarni lub Afroamerykanie" },
  "race-latino": { en: "Hispanic or Latino", es: "Hispano o Latino", pl: "Latynosi" },
  "race-asian": { en: "Asian", es: "Asiático", pl: "Azjaci" },
  "age-18-34": { en: "Age 18–34", es: "18–34 años", pl: "Wiek 18–34" },
  "age-35-54": { en: "Age 35–54", es: "35–54 años", pl: "Wiek 35–54" },
  "age-55-plus": { en: "Age 55+", es: "55+ años", pl: "Wiek 55+" },
  "income-low": { en: "Lower income (<200% FPL)", es: "Ingresos bajos", pl: "Niskie dochody" },
  "income-mid": { en: "Middle income", es: "Ingresos medios", pl: "Średnie dochody" },
  "income-high": { en: "Higher income", es: "Ingresos altos", pl: "Wysokie dochody" },
  "lang-en": { en: "English at home", es: "Inglés en casa", pl: "Angielski w domu" },
  "lang-es": { en: "Spanish at home", es: "Español en casa", pl: "Hiszpański w domu" },
  "lang-pl": { en: "Polish at home", es: "Polaco en casa", pl: "Polski w domu" },
  lgbtq: { en: "LGBTQ+ adults", es: "Adultos LGBTQ+", pl: "Osoby LGBTQ+" },
};

export const EQUITY_BY_INDICATOR: Record<string, { slice: DemographicSlice; value: number }[]> = {
  diabetes: [
    { slice: "overall", value: 10.4 },
    { slice: "race-white", value: 8.6 },
    { slice: "race-black", value: 13.8 },
    { slice: "race-latino", value: 14.2 },
    { slice: "race-asian", value: 8.9 },
    { slice: "income-low", value: 15.1 },
    { slice: "income-mid", value: 10.2 },
    { slice: "income-high", value: 6.9 },
  ],
  obesity: [
    { slice: "overall", value: 31.2 },
    { slice: "race-white", value: 27.8 },
    { slice: "race-black", value: 40.1 },
    { slice: "race-latino", value: 36.7 },
    { slice: "race-asian", value: 18.4 },
    { slice: "income-low", value: 37.5 },
    { slice: "income-mid", value: 31.4 },
    { slice: "income-high", value: 24.2 },
  ],
  "mental-distress": [
    { slice: "overall", value: 24.1 },
    { slice: "race-white", value: 22.4 },
    { slice: "race-black", value: 27.1 },
    { slice: "race-latino", value: 23.8 },
    { slice: "race-asian", value: 16.2 },
    { slice: "age-18-34", value: 31.5 },
    { slice: "age-35-54", value: 24.6 },
    { slice: "age-55-plus", value: 18.8 },
    { slice: "lgbtq", value: 47.8 },
  ],
  "no-primary-care": [
    { slice: "overall", value: 13.2 },
    { slice: "race-white", value: 9.4 },
    { slice: "race-black", value: 17.6 },
    { slice: "race-latino", value: 22.3 },
    { slice: "race-asian", value: 12.1 },
    { slice: "income-low", value: 23.9 },
    { slice: "income-mid", value: 12.4 },
    { slice: "income-high", value: 6.8 },
    { slice: "lang-en", value: 11.2 },
    { slice: "lang-es", value: 21.7 },
    { slice: "lang-pl", value: 14.8 },
  ],
  "infant-mortality": [
    { slice: "overall", value: 5.1 },
    { slice: "race-white", value: 3.9 },
    { slice: "race-black", value: 11.2 },
    { slice: "race-latino", value: 5.4 },
    { slice: "race-asian", value: 3.2 },
  ],
  overdose: [
    { slice: "overall", value: 26.4 },
    { slice: "race-white", value: 29.1 },
    { slice: "race-black", value: 28.7 },
    { slice: "race-latino", value: 18.6 },
    { slice: "age-18-34", value: 32.4 },
    { slice: "age-35-54", value: 31.8 },
    { slice: "age-55-plus", value: 14.2 },
  ],
};

/* ---------- Qualitative content (mock community listening sessions) ---------- */

export type QualitativeCallout = {
  id: string;
  priorityArea: string;
  quote: { en: string; es: string; pl: string };
  attribution: { en: string; es: string; pl: string };
  theme: string;
};

export const QUALITATIVE_CALLOUTS: QualitativeCallout[] = [
  {
    id: "q1",
    priorityArea: "access-to-care",
    quote: {
      en: "My clinic is twenty minutes by car. Without one I wait a week between calls just to set an appointment, and a month before I see someone.",
      es: "Mi clínica está a veinte minutos en coche. Sin coche, paso una semana entre llamadas solo para pedir una cita, y un mes antes de ver a alguien.",
      pl: "Do mojej przychodni jest dwadzieścia minut samochodem. Bez samochodu czekam tydzień między telefonami, żeby umówić wizytę, i miesiąc, żeby kogoś zobaczyć.",
    },
    attribution: {
      en: "Focus group participant, Aurora · November 2024",
      es: "Participante del grupo focal, Aurora · noviembre de 2024",
      pl: "Uczestnik grupy fokusowej, Aurora · listopad 2024",
    },
    theme: "Transportation as healthcare infrastructure",
  },
  {
    id: "q2",
    priorityArea: "behavioral-health",
    quote: {
      en: "Our kids are not okay. And the schools know it. And the pediatricians know it. But the line between knowing and getting help is very long.",
      es: "Nuestros hijos no están bien. Las escuelas lo saben. Los pediatras lo saben. Pero la línea entre saberlo y recibir ayuda es muy larga.",
      pl: "Nasze dzieci nie mają się dobrze. Szkoły o tym wiedzą. Pediatrzy o tym wiedzą. Ale droga od wiedzy do pomocy jest bardzo długa.",
    },
    attribution: {
      en: "Key informant interview, Elgin U-46 parent liaison · October 2024",
      es: "Entrevista clave, enlace de padres U-46 Elgin · octubre de 2024",
      pl: "Wywiad z informatorem, koordynator ds. rodziców U-46 Elgin · październik 2024",
    },
    theme: "Youth behavioral health access",
  },
  {
    id: "q3",
    priorityArea: "maternal-child-health",
    quote: {
      en: "I had to take the bus with my newborn in January. That should not be how postpartum care works.",
      es: "Tuve que tomar el autobús con mi recién nacido en enero. Así no debería funcionar la atención posparto.",
      pl: "W styczniu musiałam jechać autobusem z noworodkiem. Tak nie powinna wyglądać opieka poporodowa.",
    },
    attribution: {
      en: "Postpartum support group, Carpentersville · January 2025",
      es: "Grupo de apoyo posparto, Carpentersville · enero de 2025",
      pl: "Grupa wsparcia poporodowego, Carpentersville · styczeń 2025",
    },
    theme: "Postpartum access",
  },
  {
    id: "q4",
    priorityArea: "chronic-disease",
    quote: {
      en: "Three people in my building had kidney failure by fifty. That is not a coincidence. That is a neighborhood.",
      es: "Tres personas en mi edificio tenían insuficiencia renal a los cincuenta. No es casualidad. Es un barrio.",
      pl: "Trzy osoby w moim budynku miały niewydolność nerek przed pięćdziesiątką. To nie przypadek. To dzielnica.",
    },
    attribution: {
      en: "Community listening session, Aurora · December 2024",
      es: "Sesión de escucha comunitaria, Aurora · diciembre de 2024",
      pl: "Sesja słuchania społeczności, Aurora · grudzień 2024",
    },
    theme: "Place-based chronic disease clustering",
  },
];

/* ---------- Geographic units ---------- */

export const GEO_LEVELS = [
  { id: "county", label: "Kane County (all)", labelEs: "Condado de Kane", labelPl: "Hrabstwo Kane" },
  { id: "municipality", label: "Municipality", labelEs: "Municipio", labelPl: "Gmina" },
  { id: "zip", label: "ZIP code", labelEs: "Código postal", labelPl: "Kod pocztowy" },
  { id: "tract", label: "Census tract", labelEs: "Sección censal", labelPl: "Obwód spisowy" },
  { id: "planning-area", label: "KCHD Planning Area", labelEs: "Área de planificación KCHD", labelPl: "Obszar planowania KCHD" },
] as const;

export const MUNICIPALITIES = [
  { id: "aurora", name: "Aurora", population: 180796 },
  { id: "elgin", name: "Elgin", population: 115018 },
  { id: "geneva", name: "Geneva", population: 21846 },
  { id: "st-charles", name: "St. Charles", population: 33395 },
  { id: "batavia", name: "Batavia", population: 26098 },
  { id: "carpentersville", name: "Carpentersville", population: 37850 },
  { id: "west-dundee", name: "West Dundee", population: 7336 },
  { id: "south-elgin", name: "South Elgin", population: 23173 },
];

export const PLANNING_AREAS = [
  {
    id: "pa-east",
    name: "East Kane",
    description: "Aurora, Batavia, Geneva, St. Charles — the Fox River corridor east side.",
    tracts: 62,
    population: 268000,
  },
  {
    id: "pa-north",
    name: "North Kane",
    description: "Elgin, Carpentersville, Dundee townships — the northern third of the county.",
    tracts: 38,
    population: 178000,
  },
  {
    id: "pa-south",
    name: "South Kane",
    description: "Sugar Grove, Big Rock, Kaneville — rural south county and the Aurora corridor south.",
    tracts: 18,
    population: 41000,
  },
  {
    id: "pa-west",
    name: "West Kane",
    description: "Hampshire, Pingree Grove, Burlington — the growing west side.",
    tracts: 14,
    population: 32000,
  },
  {
    id: "pa-central",
    name: "Central Kane",
    description: "Campton Hills, Elburn, Wasco — the unincorporated center of the county.",
    tracts: 12,
    population: 16000,
  },
];

/* ---------- Planning Area health profile (illustrative) ---------- */

export const PA_HEALTH_PROFILE: Record<
  string,
  { diabetes: number; obesity: number; uninsured: number; mentalDistress: number; infantMortality: number; svi: number }
> = {
  "pa-east": { diabetes: 12.6, obesity: 34.1, uninsured: 13.4, mentalDistress: 25.6, infantMortality: 6.4, svi: 0.68 },
  "pa-north": { diabetes: 11.1, obesity: 33.2, uninsured: 12.2, mentalDistress: 24.9, infantMortality: 5.8, svi: 0.61 },
  "pa-south": { diabetes: 8.2, obesity: 27.6, uninsured: 7.1, mentalDistress: 20.8, infantMortality: 4.1, svi: 0.28 },
  "pa-west": { diabetes: 7.6, obesity: 25.9, uninsured: 6.8, mentalDistress: 19.4, infantMortality: 3.6, svi: 0.22 },
  "pa-central": { diabetes: 8.9, obesity: 28.7, uninsured: 8.1, mentalDistress: 21.2, infantMortality: 4.4, svi: 0.34 },
};

/* ---------- Geographic breakdowns by indicator (illustrative) ---------- */

export const GEO_BREAKDOWNS: Record<
  string,
  {
    planningAreas: Record<string, number>;
    municipalities: { id: string; name: string; value: number }[];
    topTracts: { geoid: string; name: string; value: number }[];
    bottomTracts: { geoid: string; name: string; value: number }[];
  }
> = {
  diabetes: {
    planningAreas: { "pa-east": 12.6, "pa-north": 11.1, "pa-south": 8.2, "pa-west": 7.6, "pa-central": 8.9 },
    municipalities: [
      { id: "aurora", name: "Aurora", value: 13.4 },
      { id: "carpentersville", name: "Carpentersville", value: 12.1 },
      { id: "elgin", name: "Elgin", value: 11.0 },
      { id: "south-elgin", name: "South Elgin", value: 9.8 },
      { id: "batavia", name: "Batavia", value: 8.6 },
      { id: "st-charles", name: "St. Charles", value: 7.9 },
      { id: "geneva", name: "Geneva", value: 7.6 },
      { id: "west-dundee", name: "West Dundee", value: 8.8 },
    ],
    topTracts: [
      { geoid: "17089851900", name: "Tract 8519 · Aurora east", value: 16.8 },
      { geoid: "17089852700", name: "Tract 8527 · Aurora", value: 16.1 },
      { geoid: "17089851400", name: "Tract 8514 · Aurora", value: 15.7 },
      { geoid: "17089850300", name: "Tract 8503 · Elgin central", value: 15.2 },
      { geoid: "17089850400", name: "Tract 8504 · Elgin north", value: 14.6 },
    ],
    bottomTracts: [
      { geoid: "17089854600", name: "Tract 8546 · Geneva", value: 6.2 },
      { geoid: "17089854400", name: "Tract 8544 · St. Charles", value: 6.4 },
      { geoid: "17089854700", name: "Tract 8547 · Batavia", value: 6.8 },
      { geoid: "17089853900", name: "Tract 8539 · Campton Hills", value: 7.1 },
      { geoid: "17089854800", name: "Tract 8548 · Geneva south", value: 7.3 },
    ],
  },
  obesity: {
    planningAreas: { "pa-east": 34.1, "pa-north": 33.2, "pa-south": 27.6, "pa-west": 25.9, "pa-central": 28.7 },
    municipalities: [
      { id: "aurora", name: "Aurora", value: 36.8 },
      { id: "carpentersville", name: "Carpentersville", value: 35.2 },
      { id: "elgin", name: "Elgin", value: 33.7 },
      { id: "south-elgin", name: "South Elgin", value: 31.4 },
      { id: "batavia", name: "Batavia", value: 28.1 },
      { id: "st-charles", name: "St. Charles", value: 26.5 },
      { id: "geneva", name: "Geneva", value: 25.8 },
      { id: "west-dundee", name: "West Dundee", value: 29.6 },
    ],
    topTracts: [
      { geoid: "17089852700", name: "Tract 8527 · Aurora", value: 41.2 },
      { geoid: "17089851900", name: "Tract 8519 · Aurora east", value: 40.4 },
      { geoid: "17089851400", name: "Tract 8514 · Aurora", value: 39.7 },
      { geoid: "17089850400", name: "Tract 8504 · Elgin north", value: 38.9 },
      { geoid: "17089850300", name: "Tract 8503 · Elgin central", value: 38.1 },
    ],
    bottomTracts: [
      { geoid: "17089854600", name: "Tract 8546 · Geneva", value: 22.3 },
      { geoid: "17089854400", name: "Tract 8544 · St. Charles", value: 23.1 },
      { geoid: "17089854800", name: "Tract 8548 · Geneva south", value: 24.0 },
      { geoid: "17089854700", name: "Tract 8547 · Batavia", value: 24.6 },
      { geoid: "17089853900", name: "Tract 8539 · Campton Hills", value: 25.2 },
    ],
  },
  hypertension: {
    planningAreas: { "pa-east": 31.4, "pa-north": 30.8, "pa-south": 27.2, "pa-west": 26.1, "pa-central": 28.6 },
    municipalities: [
      { id: "aurora", name: "Aurora", value: 32.8 },
      { id: "carpentersville", name: "Carpentersville", value: 31.6 },
      { id: "elgin", name: "Elgin", value: 30.2 },
      { id: "south-elgin", name: "South Elgin", value: 28.9 },
      { id: "batavia", name: "Batavia", value: 27.4 },
      { id: "st-charles", name: "St. Charles", value: 26.8 },
      { id: "geneva", name: "Geneva", value: 26.2 },
      { id: "west-dundee", name: "West Dundee", value: 27.9 },
    ],
    topTracts: [
      { geoid: "17089851400", name: "Tract 8514 · Aurora", value: 37.1 },
      { geoid: "17089851900", name: "Tract 8519 · Aurora east", value: 36.4 },
      { geoid: "17089852700", name: "Tract 8527 · Aurora", value: 35.8 },
      { geoid: "17089850300", name: "Tract 8503 · Elgin central", value: 34.6 },
      { geoid: "17089850400", name: "Tract 8504 · Elgin north", value: 33.9 },
    ],
    bottomTracts: [
      { geoid: "17089854600", name: "Tract 8546 · Geneva", value: 22.4 },
      { geoid: "17089854400", name: "Tract 8544 · St. Charles", value: 23.1 },
      { geoid: "17089853900", name: "Tract 8539 · Campton Hills", value: 23.8 },
      { geoid: "17089854700", name: "Tract 8547 · Batavia", value: 24.5 },
      { geoid: "17089854800", name: "Tract 8548 · Geneva south", value: 24.9 },
    ],
  },
  "mental-distress": {
    planningAreas: { "pa-east": 25.6, "pa-north": 24.9, "pa-south": 20.8, "pa-west": 19.4, "pa-central": 21.2 },
    municipalities: [
      { id: "aurora", name: "Aurora", value: 26.4 },
      { id: "elgin", name: "Elgin", value: 25.8 },
      { id: "carpentersville", name: "Carpentersville", value: 25.2 },
      { id: "south-elgin", name: "South Elgin", value: 23.1 },
      { id: "batavia", name: "Batavia", value: 21.6 },
      { id: "st-charles", name: "St. Charles", value: 20.4 },
      { id: "geneva", name: "Geneva", value: 19.9 },
      { id: "west-dundee", name: "West Dundee", value: 22.3 },
    ],
    topTracts: [
      { geoid: "17089850300", name: "Tract 8503 · Elgin central", value: 29.8 },
      { geoid: "17089850400", name: "Tract 8504 · Elgin north", value: 29.1 },
      { geoid: "17089851900", name: "Tract 8519 · Aurora east", value: 28.4 },
      { geoid: "17089852700", name: "Tract 8527 · Aurora", value: 27.9 },
      { geoid: "17089852200", name: "Tract 8522 · Aurora", value: 27.2 },
    ],
    bottomTracts: [
      { geoid: "17089854600", name: "Tract 8546 · Geneva", value: 16.8 },
      { geoid: "17089854800", name: "Tract 8548 · Geneva south", value: 17.4 },
      { geoid: "17089854400", name: "Tract 8544 · St. Charles", value: 17.9 },
      { geoid: "17089854700", name: "Tract 8547 · Batavia", value: 18.3 },
      { geoid: "17089853900", name: "Tract 8539 · Campton Hills", value: 18.8 },
    ],
  },
  "no-primary-care": {
    planningAreas: { "pa-east": 14.8, "pa-north": 14.2, "pa-south": 9.1, "pa-west": 8.6, "pa-central": 10.2 },
    municipalities: [
      { id: "aurora", name: "Aurora", value: 18.2 },
      { id: "carpentersville", name: "Carpentersville", value: 16.4 },
      { id: "elgin", name: "Elgin", value: 14.6 },
      { id: "south-elgin", name: "South Elgin", value: 11.8 },
      { id: "batavia", name: "Batavia", value: 9.1 },
      { id: "st-charles", name: "St. Charles", value: 8.4 },
      { id: "geneva", name: "Geneva", value: 7.9 },
      { id: "west-dundee", name: "West Dundee", value: 10.2 },
    ],
    topTracts: [
      { geoid: "17089852700", name: "Tract 8527 · Aurora", value: 24.6 },
      { geoid: "17089851900", name: "Tract 8519 · Aurora east", value: 23.8 },
      { geoid: "17089851400", name: "Tract 8514 · Aurora", value: 22.4 },
      { geoid: "17089850300", name: "Tract 8503 · Elgin central", value: 21.2 },
      { geoid: "17089850400", name: "Tract 8504 · Elgin north", value: 20.6 },
    ],
    bottomTracts: [
      { geoid: "17089854600", name: "Tract 8546 · Geneva", value: 6.8 },
      { geoid: "17089854400", name: "Tract 8544 · St. Charles", value: 7.2 },
      { geoid: "17089854800", name: "Tract 8548 · Geneva south", value: 7.6 },
      { geoid: "17089854700", name: "Tract 8547 · Batavia", value: 8.1 },
      { geoid: "17089853900", name: "Tract 8539 · Campton Hills", value: 8.4 },
    ],
  },
  uninsured: {
    planningAreas: { "pa-east": 13.4, "pa-north": 12.2, "pa-south": 7.1, "pa-west": 6.8, "pa-central": 8.1 },
    municipalities: [
      { id: "aurora", name: "Aurora", value: 15.1 },
      { id: "carpentersville", name: "Carpentersville", value: 14.2 },
      { id: "elgin", name: "Elgin", value: 12.6 },
      { id: "south-elgin", name: "South Elgin", value: 9.4 },
      { id: "batavia", name: "Batavia", value: 6.8 },
      { id: "st-charles", name: "St. Charles", value: 6.1 },
      { id: "geneva", name: "Geneva", value: 5.8 },
      { id: "west-dundee", name: "West Dundee", value: 8.2 },
    ],
    topTracts: [
      { geoid: "17089851900", name: "Tract 8519 · Aurora east", value: 21.4 },
      { geoid: "17089852700", name: "Tract 8527 · Aurora", value: 20.8 },
      { geoid: "17089851400", name: "Tract 8514 · Aurora", value: 19.6 },
      { geoid: "17089850300", name: "Tract 8503 · Elgin central", value: 18.4 },
      { geoid: "17089850400", name: "Tract 8504 · Elgin north", value: 17.8 },
    ],
    bottomTracts: [
      { geoid: "17089854600", name: "Tract 8546 · Geneva", value: 3.1 },
      { geoid: "17089854400", name: "Tract 8544 · St. Charles", value: 3.6 },
      { geoid: "17089854800", name: "Tract 8548 · Geneva south", value: 4.0 },
      { geoid: "17089854700", name: "Tract 8547 · Batavia", value: 4.4 },
      { geoid: "17089853900", name: "Tract 8539 · Campton Hills", value: 4.8 },
    ],
  },
  "infant-mortality": {
    planningAreas: { "pa-east": 6.4, "pa-north": 5.8, "pa-south": 4.1, "pa-west": 3.6, "pa-central": 4.4 },
    municipalities: [
      { id: "aurora", name: "Aurora", value: 6.8 },
      { id: "carpentersville", name: "Carpentersville", value: 6.2 },
      { id: "elgin", name: "Elgin", value: 5.9 },
      { id: "south-elgin", name: "South Elgin", value: 4.8 },
      { id: "batavia", name: "Batavia", value: 3.6 },
      { id: "st-charles", name: "St. Charles", value: 3.2 },
      { id: "geneva", name: "Geneva", value: 3.0 },
      { id: "west-dundee", name: "West Dundee", value: 4.1 },
    ],
    topTracts: [
      { geoid: "17089852200", name: "Tract 8522 · Aurora", value: 10.8 },
      { geoid: "17089851900", name: "Tract 8519 · Aurora east", value: 9.6 },
      { geoid: "17089852700", name: "Tract 8527 · Aurora", value: 9.1 },
      { geoid: "17089850300", name: "Tract 8503 · Elgin central", value: 8.4 },
      { geoid: "17089850400", name: "Tract 8504 · Elgin north", value: 7.8 },
    ],
    bottomTracts: [
      { geoid: "17089854600", name: "Tract 8546 · Geneva", value: 2.8 },
      { geoid: "17089854400", name: "Tract 8544 · St. Charles", value: 3.1 },
      { geoid: "17089854800", name: "Tract 8548 · Geneva south", value: 3.4 },
      { geoid: "17089854700", name: "Tract 8547 · Batavia", value: 3.6 },
      { geoid: "17089853900", name: "Tract 8539 · Campton Hills", value: 3.9 },
    ],
  },
  overdose: {
    planningAreas: { "pa-east": 28.4, "pa-north": 27.6, "pa-south": 21.4, "pa-west": 19.8, "pa-central": 22.1 },
    municipalities: [
      { id: "aurora", name: "Aurora", value: 29.1 },
      { id: "carpentersville", name: "Carpentersville", value: 28.4 },
      { id: "elgin", name: "Elgin", value: 27.9 },
      { id: "south-elgin", name: "South Elgin", value: 24.6 },
      { id: "batavia", name: "Batavia", value: 21.4 },
      { id: "st-charles", name: "St. Charles", value: 20.1 },
      { id: "geneva", name: "Geneva", value: 19.3 },
      { id: "west-dundee", name: "West Dundee", value: 23.2 },
    ],
    topTracts: [
      { geoid: "17089850400", name: "Tract 8504 · Elgin north", value: 33.1 },
      { geoid: "17089850300", name: "Tract 8503 · Elgin central", value: 32.6 },
      { geoid: "17089851900", name: "Tract 8519 · Aurora east", value: 31.8 },
      { geoid: "17089852700", name: "Tract 8527 · Aurora", value: 31.2 },
      { geoid: "17089851400", name: "Tract 8514 · Aurora", value: 30.4 },
    ],
    bottomTracts: [
      { geoid: "17089854600", name: "Tract 8546 · Geneva", value: 14.8 },
      { geoid: "17089854400", name: "Tract 8544 · St. Charles", value: 15.4 },
      { geoid: "17089854800", name: "Tract 8548 · Geneva south", value: 16.1 },
      { geoid: "17089854700", name: "Tract 8547 · Batavia", value: 16.8 },
      { geoid: "17089853900", name: "Tract 8539 · Campton Hills", value: 17.6 },
    ],
  },
};

/* ---------- Data sources ---------- */

export const DATA_SOURCES = [
  {
    id: "cdc-places",
    name: "CDC PLACES",
    description: "Small-area (census tract) estimates of chronic disease prevalence, preventive service use, and health outcomes.",
    frequency: "Annual",
    scope: "Real (accessible via CDC API)",
    lastRefresh: "March 14, 2026",
    citation: "Centers for Disease Control and Prevention, PLACES 2024 release",
  },
  {
    id: "cdc-svi",
    name: "CDC/ATSDR Social Vulnerability Index",
    description: "Composite index of 16 social factors used to identify communities that may need support in emergencies and in everyday health.",
    frequency: "Biennial",
    scope: "Real (accessible via CDC)",
    lastRefresh: "February 22, 2026",
    citation: "CDC/ATSDR Social Vulnerability Index 2022",
  },
  {
    id: "acs",
    name: "U.S. Census Bureau · ACS 5-year",
    description: "American Community Survey 5-year estimates for demographics, income, language, insurance coverage.",
    frequency: "Annual",
    scope: "Real (accessible via Census API)",
    lastRefresh: "December 14, 2025",
    citation: "American Community Survey 5-year estimates, 2019–2023",
  },
  {
    id: "idph",
    name: "Illinois Department of Public Health",
    description: "Vital statistics (births, deaths), notifiable diseases, and state-level health surveillance data.",
    frequency: "Annual (vitals) · weekly (disease surveillance)",
    scope: "Real (accessible via IDPH open data)",
    lastRefresh: "March 1, 2026",
    citation: "IDPH Vital Statistics 2023; IDPH I-NEDSS 2024",
  },
  {
    id: "brfss",
    name: "BRFSS (Kane County supplement)",
    description: "Behavioral Risk Factor Surveillance System, Kane County oversample supported by KCHD.",
    frequency: "Biennial",
    scope: "Illustrative (real source; Kane supplement modeled)",
    lastRefresh: "November 30, 2025",
    citation: "BRFSS 2024 Kane County oversample (illustrative)",
  },
  {
    id: "chr",
    name: "County Health Rankings",
    description: "University of Wisconsin Population Health Institute annual rankings across health outcomes and factors.",
    frequency: "Annual",
    scope: "Real (accessible via CHR)",
    lastRefresh: "February 14, 2026",
    citation: "County Health Rankings 2025",
  },
  {
    id: "kcha",
    name: "Kane County CHA 2024",
    description: "KCHD Community Health Assessment 2024 survey and key informant interviews. Three prior cycles (2015, 2019, 2022) back-loaded for trend analysis.",
    frequency: "Triennial",
    scope: "Illustrative (patterns grounded in public KCHD CHA materials)",
    lastRefresh: "April 10, 2026",
    citation: "KCHD Community Health Assessment 2024 (illustrative)",
  },
  {
    id: "cdc-wonder",
    name: "CDC WONDER",
    description: "Multiple Cause of Death, including overdose, suicide, and chronic condition mortality.",
    frequency: "Annual",
    scope: "Real",
    lastRefresh: "January 18, 2026",
    citation: "CDC WONDER Multiple Cause of Death 1999–2023",
  },
];

/* ---------- Admin: mock users and usage analytics ---------- */

export const MOCK_ADMIN_USERS = [
  { id: "u1", name: "Dr. Uche Osuji", role: "Admin", email: "uosuji@kanehealth.org", department: "Executive", uploadScopes: ["*"] },
  { id: "u2", name: "Amira Khoury", role: "Admin", email: "akhoury@kanehealth.org", department: "Epidemiology", uploadScopes: ["*"] },
  { id: "u3", name: "Jorge Alvarado", role: "Uploader", email: "jalvarado@kanehealth.org", department: "Maternal & Child", uploadScopes: ["maternal-child", "access-to-care"] },
  { id: "u4", name: "Priya Natarajan", role: "Uploader", email: "pnatarajan@kanehealth.org", department: "Behavioral Health", uploadScopes: ["behavioral-health"] },
  { id: "u5", name: "Tom Macdonald", role: "Uploader", email: "tmacdonald@kanehealth.org", department: "Environmental", uploadScopes: ["environmental-health"] },
  { id: "u6", name: "Aisha Bell", role: "Uploader", email: "abell@kanehealth.org", department: "Chronic Disease", uploadScopes: ["chronic-disease"] },
  { id: "u7", name: "Patrick O’Neill", role: "Uploader", email: "poneill@kanehealth.org", department: "Communicable Disease", uploadScopes: ["injury-violence"] },
  { id: "u8", name: "Maya Reyes", role: "Editor", email: "mreyes@kanehealth.org", department: "Communications", uploadScopes: [] },
  { id: "u9", name: "Sarah Ng", role: "Editor", email: "sng@kanehealth.org", department: "Health Equity", uploadScopes: [] },
  { id: "u10", name: "Kevin Walczak", role: "Editor", email: "kwalczak@kanehealth.org", department: "Planning", uploadScopes: [] },
  { id: "u11", name: "Beata Nowak", role: "Viewer", email: "bnowak@kanehealth.org", department: "Community Engagement", uploadScopes: [] },
  { id: "u12", name: "Marcus Jones", role: "Viewer", email: "mjones@kanehealth.org", department: "Grants & Finance", uploadScopes: [] },
  { id: "u13", name: "Linh Tran", role: "Viewer", email: "ltran@kanehealth.org", department: "Data Systems", uploadScopes: [] },
  { id: "u14", name: "Ruth Hernandez", role: "Viewer", email: "rhernandez@kanehealth.org", department: "Maternal & Child", uploadScopes: [] },
  { id: "u15", name: "Allison Park", role: "Viewer", email: "apark@kanehealth.org", department: "Epidemiology", uploadScopes: [] },
  { id: "u16", name: "Daniel Schwartz", role: "Viewer", email: "dschwartz@kanehealth.org", department: "Policy", uploadScopes: [] },
  { id: "u17", name: "Isabella Flores", role: "Viewer", email: "iflores@kanehealth.org", department: "Maternal & Child", uploadScopes: [] },
  { id: "u18", name: "Joy Adeyemi", role: "Viewer", email: "jadeyemi@kanehealth.org", department: "Chronic Disease", uploadScopes: [] },
  { id: "u19", name: "Chris Malone", role: "Viewer", email: "cmalone@kanehealth.org", department: "Environmental", uploadScopes: [] },
  { id: "u20", name: "Grace Kim", role: "Viewer", email: "gkim@kanehealth.org", department: "Executive", uploadScopes: [] },
];

export const MOCK_USAGE = {
  activeUsers: { today: 142, week: 1876, month: 6341 },
  topPages: [
    { page: "Overview", views: 4281, delta: 12.4 },
    { page: "Map", views: 3104, delta: 8.2 },
    { page: "Behavioral Health", views: 1892, delta: 28.7 },
    { page: "Health Equity", views: 1764, delta: 15.1 },
    { page: "Access to Care", views: 1421, delta: 4.6 },
    { page: "Diabetes / Cardiometabolic", views: 1283, delta: 6.9 },
    { page: "Report Builder", views: 983, delta: 41.2 },
  ],
  topSearches: [
    { q: "diabetes by zip code", count: 312 },
    { q: "infant mortality race", count: 244 },
    { q: "aurora mental health", count: 218 },
    { q: "elgin access to care", count: 198 },
    { q: "svi kane county", count: 172 },
    { q: "overdose 2023", count: 154 },
    { q: "depresión", count: 128 },
    { q: "cukrzyca", count: 96 },
  ],
  recentDownloads: [
    { when: "2 min ago", user: "Aisha Bell", type: "PDF", report: "Diabetes · Aurora tracts · 2019–2024" },
    { when: "18 min ago", user: "Maya Reyes", type: "PNG", report: "Equity · Infant mortality" },
    { when: "34 min ago", user: "Jorge Alvarado", type: "CSV", report: "MCH · Prenatal care · ZIP" },
    { when: "1 hr ago", user: "Priya Natarajan", type: "PDF", report: "Behavioral health · LGBTQ+ disparity" },
    { when: "2 hr ago", user: "Tom Macdonald", type: "CSV", report: "Environmental · Housing cost burden" },
  ],
};
