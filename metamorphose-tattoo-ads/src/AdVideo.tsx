import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {EndCard, KenBurns, NeedleLine, Statement} from './components';
import {storyboards, type HookKey, type Scene, type Start} from './storyboards';
import {FPS, type Format} from './theme';

export type AdProps = {
  video: string; // Storyboard-ID, z. B. V2_Coverup
  hook: HookKey;
  start: Start;
  format: Format;
};

const f = (s: number) => Math.round(s * FPS);

const SceneView: React.FC<{scene: Scene; format: Format; isHook?: boolean}> = ({scene, format, isHook}) => {
  const dur = f(scene.to) - f(scene.from);
  return (
    <AbsoluteFill>
      <KenBurns image={scene.image} durationInFrames={dur} zoom={scene.zoom} focus={scene.focus} />
      {scene.needleLine ? <NeedleLine format={format} durationInFrames={dur} /> : null}
      {/* Hook-Text ist ab Frame 1 voll sichtbar */}
      {scene.text ? <Statement text={scene.text} format={format} durationInFrames={dur} instant={isHook} /> : null}
    </AbsoluteFill>
  );
};

export const AdVideo: React.FC<AdProps> = ({video, hook, start, format}) => {
  const sb = storyboards.find((s) => s.id === video);
  if (!sb) throw new Error(`Unbekanntes Storyboard: ${video}`);
  const hookScene = sb.hooks[hook][sb.hasStartVariant ? start : 'mit'];
  return (
    <AbsoluteFill style={{backgroundColor: '#1E0F27'}}>
      <Sequence from={0} durationInFrames={f(hookScene.to)} premountFor={15}>
        <SceneView scene={hookScene} format={format} isHook />
      </Sequence>
      {sb.scenes.map((s, i) => (
        <Sequence key={i} from={f(s.from)} durationInFrames={f(s.to) - f(s.from)} premountFor={15}>
          <SceneView scene={s} format={format} />
        </Sequence>
      ))}
      <Sequence from={f(sb.endCard.from)} durationInFrames={f(sb.duration) - f(sb.endCard.from)} premountFor={15}>
        <EndCard format={format} lastLine={sb.endCard.lastLine} />
      </Sequence>
    </AbsoluteFill>
  );
};
