// Storyboards V1–V4 laut Briefing (Abschnitt 7).
// Zeiten in Sekunden. Bilder liegen in public/img/ (Dateinamen wie auf der Website).
// Hook-Varianten tauschen nur Szene 0 (0–3 s); der Rest bleibt identisch.

export type Focus = {x: number; y: number}; // 0–1, Bildausschnitt-Mittelpunkt

export type Scene = {
  from: number;
  to: number;
  image: string;
  text?: string;
  // Ken-Burns: Start- und Endzoom (1 = bildfüllend)
  zoom?: [number, number];
  focus?: Focus;
  // Nadel-Linie zeichnet sich über das Bild
  needleLine?: boolean;
};

export type HookKey = 'A' | 'B' | 'C';
export type Start = 'mit' | 'ohne'; // Ausgangszustand sichtbar (mit) oder nur Prozess/Ergebnis (ohne)

export type Storyboard = {
  id: string; // z. B. V1_Narbe
  title: string;
  duration: number;
  hasStartVariant: boolean;
  hooks: Record<HookKey, Record<Start, Scene>>;
  scenes: Scene[]; // ab Sekunde 3
  endCard: {from: number; lastLine?: string};
  voiceover?: string;
};

const hook = (image: string, text: string, extra: Partial<Scene> = {}): Scene => ({
  from: 0,
  to: 3,
  image,
  text,
  zoom: [1.06, 1.0],
  ...extra,
});

const same = (s: Scene): Record<Start, Scene> => ({mit: s, ohne: s});

export const storyboards: Storyboard[] = [
  {
    id: 'V1_Narbe',
    title: 'Narbentattoo',
    duration: 25,
    hasStartVariant: true,
    hooks: {
      A: {
        mit: hook('Narben1.jpg', 'Die Narbe bleibt.'),
        ohne: hook('Narben2.jpg', 'Die Narbe bleibt.', {zoom: [1.35, 1.25]}),
      },
      B: {
        mit: hook('Narben1.jpg', 'Die Narbe bleibt.', {zoom: [1.4, 1.3]}),
        ohne: hook('Narben2.jpg', 'Die Narbe bleibt.', {zoom: [1.5, 1.38]}),
      },
      C: {
        mit: hook('Narben1.jpg', 'Was, wenn eine Narbe Kunst wird?'),
        ohne: hook('Narben2.jpg', 'Was, wenn eine Narbe Kunst wird?', {zoom: [1.35, 1.25]}),
      },
    },
    scenes: [
      {from: 3, to: 7, image: 'Narben2.jpg', text: 'Der Blick darauf darf sich ändern.', zoom: [1.3, 1.2], needleLine: true},
      {from: 7, to: 13, image: 'Studio3.jpg', text: 'Jedes Motiv entsteht für diese eine Haut.', zoom: [1.0, 1.06]},
      {from: 13, to: 19, image: 'Narben2.jpg', text: 'Aus Narben werden Zeichen von Stärke.', zoom: [1.0, 1.08]},
      {from: 19, to: 22, image: 'Studio2.jpg', zoom: [1.04, 1.0]},
    ],
    endCard: {from: 22},
    voiceover:
      'Die Narbe bleibt. Aber der Blick darauf darf sich ändern. Ich entwerfe jedes Motiv für genau diese Haut – damit du dich ansiehst und denkst: Wow. Das bin ich.',
  },
  {
    id: 'V2_Coverup',
    title: 'Cover-Up',
    duration: 25,
    hasStartVariant: true,
    hooks: {
      A: {
        mit: hook('CoverUp1.jpg', 'Ein Cover-up darf mehr sein als wegmachen.'),
        ohne: hook('CoverUp2.jpg', 'Ein Cover-up darf mehr sein als wegmachen.', {zoom: [1.6, 1.45]}),
      },
      B: {
        mit: hook('CoverUp1.jpg', 'Ein Tattoo aus einem früheren Leben?', {zoom: [1.3, 1.2]}),
        ohne: hook('CoverUp2.jpg', 'Ein Tattoo aus einem früheren Leben?', {zoom: [1.7, 1.55]}),
      },
      C: {
        mit: hook('CoverUp1.jpg', 'Was passiert mit einem alten Tattoo?'),
        ohne: hook('CoverUp2.jpg', 'Was passiert mit einem alten Tattoo?', {zoom: [1.6, 1.45]}),
      },
    },
    scenes: [
      {from: 3, to: 8, image: 'Studio4.jpg', text: 'Ein Cover-up darf mehr sein als wegmachen.', zoom: [1.0, 1.06], needleLine: true},
      {from: 8, to: 15, image: 'CoverUp2.jpg', text: 'Neu entworfen. Nicht übermalt.', zoom: [1.6, 1.0]},
      {from: 15, to: 20, image: 'CoverUp2.jpg', text: 'Es darf zu dir passen. Heute.', zoom: [1.0, 1.05]},
    ],
    endCard: {from: 20},
  },
  {
    id: 'V3_Seelentier',
    title: 'Seelentier',
    duration: 25,
    hasStartVariant: false,
    hooks: {
      A: same(hook('Seelentier2.jpg', 'Ein Seelentier ist kein Haustier.', {zoom: [1.6, 1.45]})),
      B: same(hook('Seelentier2.jpg', 'Ein Seelentier ist kein Haustier.', {zoom: [1.9, 1.7]})),
      C: same(hook('Seelentier2.jpg', 'Wie tätowiert man einen Blick?', {zoom: [1.6, 1.45]})),
    },
    scenes: [
      {from: 3, to: 8, image: 'Seelentier2.jpg', text: 'Es ist Begleiter. Lehrer. Haltgeber.', zoom: [1.3, 1.1]},
      {from: 8, to: 15, image: 'Seelentier2.jpg', text: 'Darum kopiere ich kein Foto.', zoom: [1.0, 1.12], needleLine: true},
      {from: 15, to: 20, image: 'Seelentier1-1.jpg', text: 'Ich höre die Geschichte.', zoom: [1.0, 1.06]},
    ],
    endCard: {from: 20},
  },
  {
    id: 'V4_Seelentattoo',
    title: 'Keine Fotokopie',
    duration: 25,
    hasStartVariant: false,
    hooks: {
      A: same(hook('Seelen.jpg', 'Ich tätowiere keine Fotos.')),
      B: same(hook('Studio2.jpg', 'Ich tätowiere keine Fotos.')),
      C: same(hook('Seelen.jpg', 'Was bleibt von einem Menschen?')),
    },
    scenes: [
      {from: 3, to: 7, image: 'Seelen3.jpg', text: 'Ich tätowiere Geschichten.', zoom: [1.0, 1.06], needleLine: true},
      {from: 7, to: 9.5, image: 'Studio2.jpg', text: 'Erst das Gespräch.', zoom: [1.0, 1.05]},
      {from: 9.5, to: 12, image: 'Studio3.jpg', text: 'Dann die Skizze.', zoom: [1.0, 1.05]},
      {from: 12, to: 14, image: 'Studio4.jpg', text: 'Dann die Haut.', zoom: [1.0, 1.05]},
      {from: 14, to: 19, image: 'Seelen.jpg', text: 'Über 12 Jahre Erfahrung.', zoom: [1.0, 1.08]},
    ],
    endCard: {from: 19, lastLine: 'Wow. Das bin ich.'},
  },
];
