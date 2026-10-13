// Rendert alle Kompositionen und mischt den Ton.
// Ton: audio/music/<Video>.(mp3|wav) und optional audio/vo/<Video>.(wav|m4a|mp3).
// Mischung: Musik ab Frame 1, unter Voiceover -11 dB (Sidechain-Ducking), Lautheit -14 LUFS, True Peak -1 dBTP.
// Ohne Musik wird das Video stumm als *_PREVIEW_STUMM.mp4 abgelegt (nicht für Ads).
// Aufruf: node scripts/render-all.mjs [Filter, z. B. V2]
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const filter = process.argv[2] ?? '';
const browser = process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const env = {...process.env, REMOTION_BROWSER: browser};
const run = (cmd, args) => execFileSync(cmd, args, {cwd: root, stdio: ['ignore', 'pipe', 'inherit'], env}).toString();

const ids = run('npx', ['remotion', 'compositions', 'src/index.ts', '--quiet']).trim().split(/\s+/).filter((id) => id.startsWith('MT-') && id.includes(filter));
const findAudio = (dir, video) =>
  ['wav', 'mp3', 'm4a', 'aac', 'flac'].map((e) => path.join(root, dir, `${video}.${e}`)).find((p) => fs.existsSync(p));

fs.mkdirSync(path.join(root, 'out/tmp'), {recursive: true});
for (const id of ids) {
  // MT-V2-Coverup-HookA-916-mit  ->  MT_V2_Coverup_HookA_916_mit
  const parts = id.split('-');
  const video = `${parts[1]}_${parts[2]}`;
  const name = parts.join('_');
  const silent = path.join(root, 'out/tmp', `${name}.mp4`);
  console.log(`▶ ${id}`);
  run('npx', ['remotion', 'render', 'src/index.ts', id, silent, '--muted', '--crf=18', '--log=error']);

  const music = findAudio('audio/music', video);
  const vo = findAudio('audio/vo', video);
  if (!music && !vo) {
    fs.renameSync(silent, path.join(root, 'out', `${name}_PREVIEW_STUMM.mp4`));
    continue;
  }
  const inputs = ['-i', silent];
  let graph;
  if (music && vo) {
    inputs.push('-i', music, '-i', vo);
    graph =
      '[2:a]aformat=channel_layouts=stereo,adelay=300|300,asplit[vo][sc];' +
      '[1:a]aformat=channel_layouts=stereo[m];' +
      '[m][sc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=400:makeup=1[duck];' +
      '[duck][vo]amix=inputs=2:normalize=0,';
  } else {
    inputs.push('-i', music ?? vo);
    graph = '[1:a]aformat=channel_layouts=stereo,';
  }
  graph += 'afade=t=out:st=23.5:d=1.5,loudnorm=I=-14:TP=-1:LRA=11[a]';
  const final = path.join(root, 'out', `${name}.mp4`);
  run('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', graph, '-map', '0:v', '-map', '[a]',
    '-c:v', 'libx264', '-crf', '20', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', '-movflags', '+faststart', final]);
  fs.rmSync(silent);
}
console.log('fertig');
