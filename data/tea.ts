export const brand = {
  name: 'NATURE',
  chinese: '自然宇宙',
  tagline: 'A cup of tea. Shaped by time.',
};
export const tea = {
  name: 'Wuyi Rock Oolong',
  chinese: '武夷岩茶',
  origin: 'Wuyi Mountains, Fujian',
  altitude: 'Mountain-grown',
  harvest: 'Spring leaves',
  processing: 'Withered. Rolled. Slowly roasted.',
  notes: 'Mineral depth. A quiet floral finish.',
};
export const reasons = [
  {
    id: 'origin',
    title: 'ORIGIN',
    headline: 'A place you can taste.',
    copy: 'Rock, mist and mountain air. A tea shaped by the landscape long before it reaches the cup.',
    detail: 'WUYI MOUNTAINS · FUJIAN',
  },
  {
    id: 'growth',
    title: 'GROWTH',
    headline: 'Grown at nature’s pace.',
    copy: 'New growth, changing light, the return of spring. A slower rhythm gives every leaf its character.',
    detail: 'SEASONAL GROWTH · SPRING LEAVES',
  },
  {
    id: 'aroma',
    title: 'AROMA',
    headline: 'Let the layers unfold.',
    copy: 'Warm mineral notes give way to a delicate floral finish. Each infusion reveals another side.',
    detail: 'MINERAL · FLORAL · LINGERING',
  },
  {
    id: 'craft',
    title: 'CRAFT',
    headline: 'The human touch.',
    copy: 'Withering, rolling and roasting. Small decisions, made with care, turn a fresh leaf into something lasting.',
    detail: 'TIME · TEMPERATURE · ATTENTION',
  },
];
export const advantages = [
  {
    label: '01 / ORIGIN',
    title: 'Rooted in place.',
    word: 'EARTH',
    copy: 'The first ingredient is a landscape.',
    color: '#a1af77',
  },
  {
    label: '02 / ENVIRONMENT',
    title: 'Between mist & light.',
    word: 'AIR',
    copy: 'An entire season, held in a leaf.',
    color: '#c0c6b2',
  },
  {
    label: '03 / PROCESS',
    title: 'Nothing is hurried.',
    word: 'FIRE',
    copy: 'A slow roast. A patient hand. A deeper character.',
    color: '#cba078',
  },
  {
    label: '04 / AROMA',
    title: 'A moment that stays.',
    word: 'SENSE',
    copy: 'Lift the lid. Let the fragrance arrive first.',
    color: '#b7bd8a',
  },
  {
    label: '05 / THE VESSEL',
    title: 'Made to be kept.',
    word: 'FORM',
    copy: 'A smooth metal vessel. A precise twist. A daily companion.',
    color: '#b8b09e',
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
    id: 'rock',
    name: 'Mountain / 01',
    chinese: '岩韵',
    category: 'ROASTED OOLONG',
    description: 'The depth of the mountain. The warmth of a slow roast.',
    color: '#b9ab89',
    gradient: '#3c3f2b',
    origin: 'Fujian, China',
    notes: 'Mineral · Orchid · Roasted grain',
    ritual:
      'Begin with a quiet moment. Warm the vessel, add your leaves and let the first aroma rise.',
    model: '/models/tea-cup.glb',
  },
  {
    id: 'mist',
    name: 'Mist / 02',
    chinese: '云白',
    category: 'WHITE TEA',
    description: 'Soft, open and unhurried. A delicate expression of the leaf.',
    color: '#c3c5b9',
    gradient: '#344037',
    origin: 'Fujian, China',
    notes: 'Meadow · Soft sweetness · Fresh hay',
    ritual:
      'Leave a little room for the leaves to open. Notice how the fragrance changes between infusions.',
    model: '/models/tea-cup.glb',
  },
  {
    id: 'ember',
    name: 'Ember / 03',
    chinese: '暮山',
    category: 'BLACK TEA',
    description: 'An amber infusion. Round, deep and quietly generous.',
    color: '#86745f',
    gradient: '#44332b',
    origin: 'Yunnan, China',
    notes: 'Malt · Cacao · Dried fruit',
    ritual:
      'Pour slowly. Let the amber colour settle, then take the first sip without distraction.',
    model: '/models/tea-cup.glb',
  },
];
export const milestones = [
  {
    year: '760',
    title: 'Tea finds its words.',
    story:
      'Lu Yu’s Classic of Tea gives a daily practice a language of its own. Leaf, water and vessel become an art of attention.',
    source: 'https://www.britishmuseum.org/collection/object/A_PDF-214',
    sourceLabel: 'British Museum',
  },
  {
    year: '960',
    title: 'A vessel for a ritual.',
    story:
      'A Northern Song tea bowl carries the story forward. Its quiet green glaze reflects a long dialogue between tea and the objects made for it.',
    source: 'https://www.britishmuseum.org/collection/object/A_PDF-214',
    sourceLabel: 'British Museum',
  },
  {
    year: '2022',
    title: 'A living inheritance.',
    story:
      'China’s traditional tea processing techniques and associated social practices enter UNESCO’s Intangible Cultural Heritage list.',
    source: 'https://ich.unesco.org/en/RL/01884',
    sourceLabel: 'UNESCO',
  },
  {
    year: '2023',
    title: 'A landscape remembered.',
    story:
      'The old tea forests of Jingmai Mountain become a UNESCO World Heritage site: a cultural landscape shaped by generations of shared knowledge.',
    source: 'https://whc.unesco.org/en/list/1665/',
    sourceLabel: 'UNESCO',
  },
  {
    year: 'NOW',
    title: 'The story is in your hands.',
    story:
      'A leaf. A vessel. A little time. The next chapter begins in an ordinary moment, made a little more considered.',
    source: '',
    sourceLabel: '',
  },
];
