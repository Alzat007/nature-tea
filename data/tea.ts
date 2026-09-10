const heritageSource = 'https://www.ihchina.cn/project_details/23858.html';

export const brand = {
  name: 'NATURE',
  chinese: '维吾尔药茶',
  tagline: 'Nine centuries of living knowledge.',
};

export const tea = {
  name: 'Hotan Medicinal Tea',
  chinese: '和田药茶',
  origin: 'Hotan, Xinjiang',
  heritage: 'National ICH extension project · 2021',
  ingredients: '30+ food-and-medicine botanicals',
  processing: 'Selected. Ground. Blended. Infused.',
};

export const reasons = [
  {
    id: 'heritage',
    title: 'HERITAGE',
    headline: 'Nine centuries in every cup.',
    copy: 'Official heritage records trace Hotan medicinal tea back about 900 years, carrying Uyghur medical knowledge into everyday life.',
    detail: 'ABOUT 900 YEARS · HOTAN',
  },
  {
    id: 'formula',
    title: 'FORMULA',
    headline: 'More than a tea leaf.',
    copy: 'Traditional tea leaves are not used. More than twenty formulas combine food-and-medicine botanicals and change with the seasons.',
    detail: 'NO TEA LEAVES · 20+ FORMULAS',
  },
  {
    id: 'botanicals',
    title: 'BOTANICALS',
    headline: 'A pantry of fragrance.',
    copy: 'Clove, cardamom, cinnamon, ginger, rose, goji and citrus peel are among more than thirty ingredients used in the tradition.',
    detail: 'CLOVE · ROSE · CARDAMOM · GINGER',
  },
  {
    id: 'hospitality',
    title: 'HOSPITALITY',
    headline: 'Hospitality, poured.',
    copy: 'In Hotan, tea accompanies meals, visits and conversation. Serving it to guests turns a daily drink into a shared cultural practice.',
    detail: 'MEALS · GUESTS · CONVERSATION',
  },
];

export const advantages = [
  {
    label: '01 / SELECT',
    title: 'Begin with sound ingredients.',
    word: 'SELECT',
    copy: 'Choose clean, well-kept botanicals from a palette of more than thirty.',
    color: '#b89a70',
  },
  {
    label: '02 / BLEND',
    title: 'Follow the season.',
    word: 'BLEND',
    copy: 'Traditional formulas change with the time of year and are measured with care.',
    color: '#9e765f',
  },
  {
    label: '03 / GRIND',
    title: 'Release the fragrance.',
    word: 'GRIND',
    copy: 'The selected ingredients are ground into a fragrant, even powder.',
    color: '#c59668',
  },
  {
    label: '04 / INFUSE',
    title: 'Measure, then wait.',
    word: 'INFUSE',
    copy: 'Add 5–6 grams to boiling water and allow 3–5 minutes for the cup to open.',
    color: '#aa6d62',
  },
  {
    label: '05 / SHARE',
    title: 'Keep the story in motion.',
    word: 'SHARE',
    copy: 'A cup offered at the table keeps knowledge, hospitality and memory alive.',
    color: '#9b8a72',
  },
];

export type Product = {
  id: string;
  name: string;
  chinese: string;
  category: string;
  description: string;
  color: string;
  gradient: string;
  origin: string;
  notes: string;
  ritual: string;
  model: string;
};

export const products: Product[] = [
  {
    id: 'winter',
    name: 'Winter / 01',
    chinese: '冬暖',
    category: 'WINTER FORMULA',
    description:
      'Fennel, long pepper, black pepper, galangal and ginger form a deep, warming aromatic profile.',
    color: '#a67a5b',
    gradient: '#54382e',
    origin: 'Hotan, Xinjiang',
    notes: 'Fennel · Ginger · Black pepper',
    ritual:
      'Use 5–6 grams and infuse with boiling water for 3–5 minutes before drinking.',
    model: '/models/tea-cup.glb',
  },
  {
    id: 'summer',
    name: 'Summer / 02',
    chinese: '夏香',
    category: 'SUMMER FORMULA',
    description:
      'Clove, cardamom, citrus peel, goji, rose and cinnamon create a bright, floral-spiced cup.',
    color: '#c2a08b',
    gradient: '#4d3939',
    origin: 'Hotan, Xinjiang',
    notes: 'Clove · Rose · Cardamom',
    ritual:
      'Use 5–6 grams and infuse with boiling water for 3–5 minutes before drinking.',
    model: '/models/tea-cup.glb',
  },
  {
    id: 'personal',
    name: 'Your Cup / 03',
    chinese: '因人配伍',
    category: 'GUIDED FORMULA',
    description:
      'Traditional formulas can be selected for the season and the individual with qualified guidance.',
    color: '#958370',
    gradient: '#403836',
    origin: 'Hotan, Xinjiang',
    notes: 'Season · Individual · Guidance',
    ritual:
      'Medicinal formulations should be selected with guidance from a qualified practitioner.',
    model: '/models/tea-cup.glb',
  },
];

export const milestones = [
  {
    year: '900',
    title: 'A tradition takes root.',
    story:
      'For about nine centuries, Hotan medicinal tea has been prepared and shared across southern Xinjiang.',
    source: heritageSource,
    sourceLabel: 'China Intangible Cultural Heritage',
  },
  {
    year: '3+',
    title: 'Knowledge travels hand to hand.',
    story:
      'Family transmission remains central; documented lineages extend through at least three generations of folk Uyghur medicine practitioners.',
    source: heritageSource,
    sourceLabel: 'China Intangible Cultural Heritage',
  },
  {
    year: '20+',
    title: 'One tradition, many formulas.',
    story:
      'More than twenty formulas draw from over thirty botanicals, with combinations changing across seasons.',
    source: heritageSource,
    sourceLabel: 'China Intangible Cultural Heritage',
  },
  {
    year: '2021',
    title: 'Recognized as national heritage.',
    story:
      'Uyghur medicine (Hotan medicinal tea preparation techniques) enters China’s fifth national list as an extension project.',
    source: heritageSource,
    sourceLabel: 'China Intangible Cultural Heritage',
  },
  {
    year: 'NOW',
    title: 'A living inheritance.',
    story:
      'The tradition continues at family tables and in the hands of practitioners—part medicine, part food culture and part hospitality.',
    source: '',
    sourceLabel: '',
  },
];
