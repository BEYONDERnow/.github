// Rendert alle Kompositionen und mischt den Ton.
// Ton: audio/music/<Video>.(mp3|wav) und optional audio/vo/<Video>.(wav|m4a|mp3).
// Mischung siehe scripts/mix.mjs (Musik ab Frame 1, Ducking −11 dB, Zwei-Pass-Loudnorm −14 LUFS, True Peak ≤ −1 dBTP).
// Ohne Musik wird das Video stumm als *_PREVIEW_STUMM.mp4 abgelegt (nicht für Ads).
// Aufruf: node scripts/render-all.mjs [Filter, z. B. V2]
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {mix} from './mix.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const filter = process.argv[2] ?? '';
const browser = process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const env = {...process.env, REMOTION_BROWSER: browser};
const run = (cmd, args) => execFileSync(cmd, args, {cwd: root, stdio: ['ignore', 'pipe', 'inherit'], env}).toString();

const ids = run('npx', ['remotion', 'compositions', 'src/index.ts', '--quiet']).trim().split(/\s+/).filter((id) => id.startsWith('MT-') && id.includes(filter));
fs.mkdirSync(path.join(root, 'out/tmp'), {recursive: true});
for (const id of ids) {
  // MT-V2-Coverup-HookA-916-mit  ->  MT_V2_Coverup_HookA_916_mit
  const parts = id.split('-');
  const video = `${parts[1]}_${parts[2]}`;
  const name = parts.join('_');
  const silent = path.join(root, 'out/tmp', `${name}.mp4`);
  console.log(`▶ ${id}`);
  run('npx', ['remotion', 'render', 'src/index.ts', id, silent, '--muted', '--crf=18', '--log=error']);

  const final = path.join(root, 'out', `${name}.mp4`);
  if (!mix(silent, video, final)) {
    fs.renameSync(silent, path.join(root, 'out', `${name}_PREVIEW_STUMM.mp4`));
    continue;
  }
  fs.rmSync(silent);
}
console.log('fertig');
