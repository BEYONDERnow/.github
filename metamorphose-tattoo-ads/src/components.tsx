import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import available from './available.json';
import {fonts, safeZone, theme, type Format} from './theme';
import type {Focus} from './storyboards';

const has = (file: string) => (available as string[]).includes(file);

// Ken-Burns-Bild. Fehlt die Datei, erscheint ein klar beschrifteter Platzhalter (nur Layout-Vorschau).
export const KenBurns: React.FC<{image: string; durationInFrames: number; zoom?: [number, number]; focus?: Focus}> = ({
  image,
  durationInFrames,
  zoom = [1.0, 1.05],
  focus = {x: 0.5, y: 0.5},
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], zoom, {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.sin),
  });
  if (!has(image)) {
    return (
      <AbsoluteFill
        style={{
          background: `repeating-linear-gradient(135deg, ${theme.plumDeep} 0 40px, ${theme.plum} 40px 80px)`,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 60,
        }}
      >
        <div style={{fontFamily: fonts.sans, fontSize: 34, color: theme.roseGoldLight, letterSpacing: 2}}>
          MATERIAL FEHLT · {image}
        </div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: theme.plumDeep}}>
      <Img
        src={staticFile(`img/${image}`)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: `${focus.x * 100}% ${focus.y * 100}%`,
          transform: `scale(${scale})`,
          transformOrigin: `${focus.x * 100}% ${focus.y * 100}%`,
        }}
      />
      {/* warme Abdunklung für Textkontrast */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(42,30,40,0.15) 0%, rgba(42,30,40,0.45) 45%, rgba(42,30,40,0.55) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// Aussage in Serif kursiv, Bildmitte innerhalb der Safe Zone. Erscheint ab Frame 0 sichtbar (kein leerer erster Frame).
export const Statement: React.FC<{text: string; format: Format; durationInFrames: number; instant?: boolean; low?: boolean /* true = oben in der Safe Zone (Porträt-Szenen, Gesicht frei) */}> = ({
  text,
  format,
  durationInFrames,
  instant,
  low,
}) => {
  const frame = useCurrentFrame();
  const sz = safeZone[format];
  const inF = instant ? 0 : 8;
  const opacity = interpolate(frame, [0, Math.max(inF, 1), durationInFrames - 6, durationInFrames], [instant ? 1 : 0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [0, 14], [instant ? 0 : 18, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: sz.top,
        height: sz.bottom - sz.top,
        display: 'flex',
        alignItems: low ? 'flex-start' : 'center',
        justifyContent: 'center',
        paddingTop: 0,
      }}
    >
      <div
        style={{
          // weicher Schatten-Hof hinter dem Text für Kontrast auf hellen Bildern
          background: 'radial-gradient(ellipse at center, rgba(30,20,28,0.55) 0%, rgba(30,20,28,0.25) 50%, rgba(30,20,28,0) 72%)',
          padding: '70px 50px',
          fontFamily: fonts.serif,
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: format === '916' ? 100 : 88,
          lineHeight: 1.08,
          color: theme.offWhite,
          textAlign: 'center',
          textShadow: '0 2px 24px rgba(30,20,28,0.85), 0 1px 3px rgba(30,20,28,0.9)',
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

// Signatur-Element: feine Linie mit Leuchtpunkt, die sich wie eine Nadel zeichnet.
export const NeedleLine: React.FC<{format: Format; durationInFrames: number; y?: number}> = ({format, durationInFrames, y}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const sz = safeZone[format];
  const lineY = y ?? sz.top + (sz.bottom - sz.top) * 0.78;
  const p = interpolate(frame, [0, Math.min(durationInFrames, 45)], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const x0 = width * 0.22;
  const x1 = width * 0.78;
  const x = x0 + (x1 - x0) * p;
  return (
    <svg width={width} height={lineY + 40} style={{position: 'absolute', left: 0, top: 0}}>
      <defs>
        <radialGradient id="glow">
          <stop offset="0%" stopColor={theme.roseGoldLight} stopOpacity={1} />
          <stop offset="100%" stopColor={theme.roseGold} stopOpacity={0} />
        </radialGradient>
      </defs>
      <line x1={x0} y1={lineY} x2={x} y2={lineY} stroke={theme.roseGold} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={x} cy={lineY} r={22} fill="url(#glow)" opacity={p < 1 ? 1 : 0.5} />
      <circle cx={x} cy={lineY} r={4} fill={theme.offWhite} />
    </svg>
  );
};

// Schmetterlings-Linie (Metamorphose-Symbol), zeichnet sich per stroke-dashoffset.
export const ButterflyLine: React.FC<{size: number; progress: number}> = ({size, progress}) => {
  const len = 1400;
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 200 160">
      <path
        d="M100 140 C100 110 100 60 100 30 M100 70 C80 20 20 10 22 50 C24 85 70 90 100 78 C70 95 35 120 52 142 C68 160 96 125 100 100 M100 70 C120 20 180 10 178 50 C176 85 130 90 100 78 C130 95 165 120 148 142 C132 160 104 125 100 100 M100 30 C95 18 88 12 82 10 M100 30 C105 18 112 12 118 10"
        fill="none"
        stroke={theme.roseGold}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)}
      />
    </svg>
  );
};

export const EndCard: React.FC<{format: Format; lastLine?: string}> = ({format, lastLine}) => {
  const frame = useCurrentFrame();
  const sz = safeZone[format];
  const fade = (start: number) =>
    interpolate(frame, [start, start + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const draw = interpolate(frame, [0, 50], [0, 1], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const logo = has('logo-dunkellila.png');
  return (
    <AbsoluteFill style={{backgroundColor: theme.offWhite}}>
      <div
        style={{
          position: 'absolute',
          top: sz.top,
          height: sz.bottom - sz.top,
          left: 80,
          right: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: format === '916' ? 34 : 24,
          textAlign: 'center',
        }}
      >
        <ButterflyLine size={format === '916' ? 150 : 120} progress={draw} />
        {logo ? (
          <Img src={staticFile('img/logo-dunkellila.png')} style={{width: format === '916' ? 760 : 640, opacity: fade(6)}} />
        ) : (
          <div style={{opacity: fade(6)}}>
            <div style={{fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 84, color: theme.plum}}>
              Metamorphose
            </div>
            <div style={{fontFamily: fonts.sans, fontSize: 28, letterSpacing: 10, color: theme.plum}}>TATTOO · STEFFI VÖLKER</div>
          </div>
        )}
        {lastLine ? (
          <div style={{fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 70, color: theme.plum, opacity: fade(16)}}>
            {lastLine}
          </div>
        ) : null}
        <div
          style={{
            opacity: fade(24),
            fontFamily: fonts.sans,
            fontWeight: 600,
            fontSize: 44,
            color: theme.offWhite,
            backgroundColor: theme.plum,
            padding: '26px 56px',
            borderRadius: 999,
          }}
        >
          Erstgespräch buchen
        </div>
        <div style={{opacity: fade(32), fontFamily: fonts.sans, fontSize: 32, color: theme.plum, lineHeight: 1.5}}>
          Veltheim AG
          <br />
          steffi-voelker.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Namenszeile, damit Steffi im Bild eindeutig erkennbar ist (unterer Rand der Safe Zone).
export const NameTag: React.FC<{format: Format}> = ({format}) => {
  const frame = useCurrentFrame();
  const sz = safeZone[format];
  const opacity = interpolate(frame, [6, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: sz.bottom - 90,
        textAlign: 'center',
        opacity,
        fontFamily: fonts.sans,
        fontWeight: 600,
        fontSize: 34,
        letterSpacing: 3,
        color: theme.offWhite,
        textShadow: '0 1px 12px rgba(30,20,28,0.9)',
      }}
    >
      STEFFI VÖLKER <span style={{color: theme.roseGoldLight}}>·</span> TATTOO-KÜNSTLERIN
    </div>
  );
};
