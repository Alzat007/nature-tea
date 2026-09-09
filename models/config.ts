export const MODEL_CONFIG = {
  url: '/models/tea-cup.glb',
  dracoPath: '/draco/',
  names: { body: 'Cup_Body', lid: 'Cup_Lid', inner: 'Cup_Inner', logo: 'Logo' },
  rotationY: -Math.PI / 2,
  lidBase: 0.837,
  lidLift: 0.72,
  openingRotation: Math.PI * 4,
  openingDuration: 2.8,
} as const;
export const chapterIds = [
  'home',
  'ritual',
  'leaf',
  'why',
  'craft',
  'collection',
  'history',
] as const;
export type Chapter = (typeof chapterIds)[number];
export type DebugConfig = {
  cameraDistance: number;
  cupRotation: number;
  lidLift: number;
  lighting: number;
  leafCount: number;
  scrollSpeed: number;
  timing: number;
};
export const defaultDebug: DebugConfig = {
  cameraDistance: 6.2,
  cupRotation: 0,
  lidLift: 0.72,
  lighting: 1,
  leafCount: 420,
  scrollSpeed: 1,
  timing: 2.8,
};
export type MotionState = {
  chapter: Chapter;
  progress: number;
  whyProgress: number;
  craftProgress: number;
  historyProgress: number;
  openProgress: number;
  hovered: boolean;
  pointerX: number;
  pointerY: number;
  debug: DebugConfig;
};
export const initialMotion = (): MotionState => ({
  chapter: 'home',
  progress: 0,
  whyProgress: 0,
  craftProgress: 0,
  historyProgress: 0,
  openProgress: 0,
  hovered: false,
  pointerX: 0,
  pointerY: 0,
  debug: { ...defaultDebug },
});
