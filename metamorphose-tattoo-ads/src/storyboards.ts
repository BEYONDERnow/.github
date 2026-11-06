// Storyboards V1–V4 (Briefing Abschnitt 7), angepasst an das echte Material in assets/selected/.
// Zeiten in Sekunden. Hook-Varianten tauschen nur 0–3 s; der Rest bleibt identisch.
// Steffi erscheint in jedem Video spätestens ab Sekunde 7–10 (Porträt + Namenszeile).

export type Focus = {x: number; y: number}; // 0–1, Bildausschnitt-Mittelpunkt

export type Scene = {
  from: number;
  to: number;
  image: string;
  text?: string;
  zoom?: [number, number]; // Ken-Burns Start-/Endzoom (1 = bildfüllend)
  focus?: Focus;
  needleLine?: boolean; // Signatur-Linie zeichnet sich
  nameTag?: boolean; // «Steffi Völker · Tattoo-Künstlerin»
};

export type HookKey = 'A' | 'B' | 'C';
export type Start = 'mit' | 'ohne'; // Ausgangszustand sichtbar (mit) oder nur Prozess/Ergebnis (ohne)

export type Storyboard = {
  id: string;
  title: string;
  duration: number;
  hasStartVariant: boolean;
  hooks: Record<HookKey, Record<Start, Scene>>;
  scenes: Scene[];
  endCard: {from: number; lastLine?: string};
};

const hook = (image: string, text: string, extra: Partial<Scene> = {}): Scene => ({
  from: 0,
  to: 3,
  image,
  text,
  zoom: [1.08, 1.0],
  ...extra,
});
const same = (s: Scene): Record<Start, Scene> => ({mit: s, ohne: s});

const steffi = (from: number, to: number, text: string): Scene => ({
  from,
  to,
  image: 'steffi_portrait.jpg',
  text,
  zoom: [1.0, 1.06],
  focus: {x: 0.6, y: 0.4},
  nameTag: true,
});

export const storyboards: Storyboard[] = [
  {
    id: 'V1_Narbe',
    title: 'Narbentattoo',
    duration: 25,
    hasStartVariant: true,
    hooks: {
      A: {
        mit: hook('narbe_brandnarbe.jpg', 'Die Narbe bleibt.', {focus: {x: 0.5, y: 0.4}}),
        ohne: hook('narbe_phoenix.jpg', 'Die Narbe bleibt.', {zoom: [1.3, 1.2], focus: {x: 0.5, y: 0.45}}),
      },
      B: {
        mit: hook('narbe_brandnarbe.jpg', 'Die Narbe bleibt.', {zoom: [1.35, 1.2], focus: {x: 0.55, y: 0.35}}),
        ohne: hook('narbe_koi.jpg', 'Die Narbe bleibt.', {zoom: [1.4, 1.25], focus: {x: 0.45, y: 0.6}}),
      },
      C: {
        mit: hook('narbe_brandnarbe.jpg', 'Was, wenn eine Narbe Kunst wird?', {focus: {x: 0.5, y: 0.4}}),
        ohne: hook('narbe_phoenix.jpg', 'Was, wenn eine Narbe Kunst wird?', {zoom: [1.3, 1.2]}),
      },
    },
    scenes: [
      {from: 3, to: 7, image: 'narbe_brand_tattoo.jpg', text: 'Der Blick darauf darf sich ändern.', zoom: [1.12, 1.0], focus: {x: 0.45, y: 0.4}, needleLine: true},
      steffi(7, 10, 'Ich entwerfe für genau diese Haut.'),
      {from: 10, to: 13, image: 'prozess_nadel.jpg', text: 'Jedes Motiv entsteht neu.', zoom: [1.0, 1.08], focus: {x: 0.45, y: 0.5}},
      {from: 13, to: 17, image: 'narbe_phoenix.jpg', text: 'Aus Narben werden Zeichen von Stärke.', zoom: [1.25, 1.0], focus: {x: 0.5, y: 0.4}},
      {from: 17, to: 20, image: 'narbe_koi.jpg', text: 'Individuell und ästhetisch.', zoom: [1.0, 1.06], focus: {x: 0.5, y: 0.45}},
    ],
    endCard: {from: 20},
  },
  {
    id: 'V2_Coverup',
    title: 'Cover-Up',
    duration: 25,
    hasStartVariant: true,
    hooks: {
      A: {
        mit: hook('cover_stencil.jpg', 'Ein Cover-up darf mehr sein als wegmachen.', {focus: {x: 0.35, y: 0.5}}),
        ohne: hook('cover_leopard.jpg', 'Ein Cover-up darf mehr sein als wegmachen.', {zoom: [1.35, 1.25], focus: {x: 0.72, y: 0.36}}),
      },
      B: {
        mit: hook('cover_stencil.jpg', 'Ein Tattoo aus einem früheren Leben?', {zoom: [1.3, 1.15], focus: {x: 0.45, y: 0.3}}),
        ohne: hook('cover_leopard.jpg', 'Ein Tattoo aus einem früheren Leben?', {zoom: [1.45, 1.32], focus: {x: 0.72, y: 0.36}}),
      },
      C: {
        mit: hook('cover_stencil.jpg', 'Was passiert mit einem alten Tattoo?', {focus: {x: 0.35, y: 0.5}}),
        ohne: hook('cover_leopard.jpg', 'Was passiert mit einem alten Tattoo?', {zoom: [1.35, 1.25], focus: {x: 0.72, y: 0.36}}),
      },
    },
    scenes: [
      {from: 3, to: 6, image: 'cover_linework.jpg', text: 'Neu entworfen. Nicht übermalt.', zoom: [1.0, 1.1], focus: {x: 0.55, y: 0.45}, needleLine: true},
      steffi(6, 9, 'Ich entwerfe, was heute zu dir passt.'),
      {from: 9, to: 11.5, image: 'prozess_nadel.jpg', text: 'Schicht für Schicht.', zoom: [1.05, 1.0], focus: {x: 0.45, y: 0.5}},
      {from: 11.5, to: 17, image: 'cover_leopard.jpg', text: 'Es darf zu dir passen. Heute.', zoom: [1.4, 1.0], focus: {x: 0.66, y: 0.4}},
      {from: 17, to: 18.5, image: 'cover_loewe.jpg', zoom: [1.0, 1.05], focus: {x: 0.45, y: 0.4}},
      {from: 18.5, to: 20, image: 'cover_panther.jpg', zoom: [1.0, 1.05], focus: {x: 0.5, y: 0.4}},
    ],
    endCard: {from: 20},
  },
  {
    id: 'V3_Seelentier',
    title: 'Seelentier',
    duration: 25,
    hasStartVariant: false,
    hooks: {
      A: same(hook('tier_kira.jpg', 'Ein Seelentier ist kein Haustier.', {zoom: [1.35, 1.22], focus: {x: 0.42, y: 0.5}})),
      B: same(hook('tier_dexter.jpg', 'Ein Seelentier ist kein Haustier.', {zoom: [1.4, 1.25], focus: {x: 0.5, y: 0.42}})),
      C: same(hook('tier_kira.jpg', 'Wie tätowiert man einen Blick?', {zoom: [1.35, 1.22], focus: {x: 0.42, y: 0.5}})),
    },
    scenes: [
      {from: 3, to: 7, image: 'tier_kira.jpg', text: 'Es ist Begleiter. Lehrer. Haltgeber.', zoom: [1.3, 1.0], focus: {x: 0.45, y: 0.5}},
      steffi(7, 10, 'Darum kopiere ich kein Foto.'),
      {from: 10, to: 14, image: 'design_wolf.jpg', text: 'Ich höre die Geschichte.', zoom: [1.0, 1.15], focus: {x: 0.55, y: 0.3}, needleLine: true},
      {from: 14, to: 17.5, image: 'tier_dexter.jpg', text: 'Und zeichne den Blick.', zoom: [1.35, 1.1], focus: {x: 0.5, y: 0.45}},
      {from: 17.5, to: 20, image: 'tier_adler.jpg', zoom: [1.0, 1.06], focus: {x: 0.45, y: 0.3}},
    ],
    endCard: {from: 20},
  },
  {
    id: 'V4_Seelentattoo',
    title: 'Keine Fotokopie',
    duration: 25,
    hasStartVariant: false,
    hooks: {
      A: same(hook('cover_loewe.jpg', 'Ich tätowiere keine Fotos.', {zoom: [1.2, 1.08], focus: {x: 0.4, y: 0.45}})),
      B: same(hook('steffi_portrait.jpg', 'Ich tätowiere keine Fotos.', {focus: {x: 0.6, y: 0.4}})),
      C: same(hook('tier_adler.jpg', 'Was bleibt von einem Menschen?', {zoom: [1.2, 1.08], focus: {x: 0.45, y: 0.3}})),
    },
    scenes: [
      {from: 3, to: 7, image: 'design_pferdfrau.jpg', text: 'Ich tätowiere Geschichten.', zoom: [1.0, 1.08], focus: {x: 0.5, y: 0.3}, needleLine: true},
      steffi(7, 9.5, 'Erst das Gespräch.'),
      {from: 9.5, to: 12, image: 'design_wolf.jpg', text: 'Dann die Skizze.', zoom: [1.0, 1.08], focus: {x: 0.55, y: 0.3}},
      {from: 12, to: 14, image: 'prozess_nadel.jpg', text: 'Dann die Haut.', zoom: [1.0, 1.06], focus: {x: 0.45, y: 0.5}},
      {from: 14, to: 19, image: 'atelier_lounge.jpg', text: 'Über 12 Jahre Erfahrung.', zoom: [1.0, 1.06], focus: {x: 0.5, y: 0.5}},
    ],
    endCard: {from: 19, lastLine: 'Wow. Das bin ich.'},
  },
];
