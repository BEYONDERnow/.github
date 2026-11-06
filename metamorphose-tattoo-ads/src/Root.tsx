import React from 'react';
import {Composition, Folder} from 'remotion';
import {AdVideo, type AdProps} from './AdVideo';
import './fonts';
import {storyboards, type HookKey, type Start} from './storyboards';
import {dimensions, FPS, type Format} from './theme';

const hooks: HookKey[] = ['A', 'B', 'C'];
const formats: Format[] = ['916', '45'];

// Composition-ID: MT-V2-Coverup-HookA-916-mit
export const RemotionRoot: React.FC = () => (
  <>
    {storyboards.map((sb) => (
      <Folder key={sb.id} name={sb.id.replace('_', '-')}>
        {hooks.flatMap((hook) =>
          formats.flatMap((format) =>
            (sb.hasStartVariant ? (['mit', 'ohne'] as Start[]) : (['mit'] as Start[])).map((start) => (
              <Composition
                key={`${hook}-${format}-${start}`}
                id={`MT-${sb.id.replace('_', '-')}-Hook${hook}-${format}${sb.hasStartVariant ? `-${start}` : ''}`}
                component={AdVideo}
                durationInFrames={sb.duration * FPS}
                fps={FPS}
                width={dimensions[format].width}
                height={dimensions[format].height}
                defaultProps={{video: sb.id, hook, start, format} satisfies AdProps}
              />
            )),
          ),
        )}
      </Folder>
    ))}
  </>
);
