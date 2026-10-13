// Markenwerte Metamorphose Tattoo.
// VORLÄUFIG: Website und Logo waren aus der Produktionsumgebung nicht erreichbar.
// Sobald logo-dunkellila.png und das Website-CSS vorliegen, hier die exakten Werte eintragen
// (python3 scripts/logo_color.py public/img/logo-dunkellila.png).
export const theme = {
  plum: '#3D1F4E', // Dunkellila (Platzhalter bis Logo ausgelesen)
  plumDeep: '#1E0F27',
  offWhite: '#F7F1EA',
  roseGold: '#C9967E',
  roseGoldLight: '#E8C2AE',
};

export const fonts = {
  serif: 'Cormorant Garamond', // Aussagen, kursiv
  sans: 'Poppins', // Marke und CTA
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
