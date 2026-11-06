// Markenwerte Metamorphose Tattoo.
// Dunkellila aus logo-dunkellila.png ausgelesen (scripts/logo_color.py), Sans-Schrift aus dem Website-CSS.
export const theme = {
  plum: '#6E4F69', // Dunkellila aus dem Logo
  plumDeep: '#2A1E28',
  offWhite: '#F7F1EA',
  roseGold: '#C9967E',
  roseGoldLight: '#E8C2AE',
};

export const fonts = {
  serif: 'Cormorant Garamond', // Aussagen, kursiv
  sans: 'Plus Jakarta Sans', // Marke und CTA (Website-Schrift)
};

export const FPS = 30;

export type Format = '916' | '45';

export const dimensions: Record<Format, {width: number; height: number}> = {
  '916': {width: 1080, height: 1920},
  '45': {width: 1080, height: 1350},
};

// Text-Safe-Zone (y-Bereich in px). 9:16: 14 % oben, 35 % unten frei.
export const safeZone: Record<Format, {top: number; bottom: number}> = {
  '916': {top: 270, bottom: 1250},
  '45': {top: 120, bottom: 1150},
};
