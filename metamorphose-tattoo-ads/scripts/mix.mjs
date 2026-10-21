// Tonmischung für ein gerendertes Video: Musik ab Frame 1, optional Voiceover mit Ducking (−11 dB),
// Ausblende ab 23,5 s, Zwei-Pass-Loudnorm auf −14 LUFS / −1 dBTP (linear, kein Pumpen).
// Aufruf als Skript: node scripts/mix.mjs [Filter]  → mischt den Ton aller Dateien in out/ neu (Bild wird kopiert).
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const findAudio = (dir, video) =>
  ['wav', 'flac', 'mp3', 'm4a', 'aac'].map((e) => path.join(root, dir, `${video}.${e}`)).find((p) => fs.existsSync(p));

const ff = (args) => execFileSync('ffmpeg', ['-hide_banner', '-y', ...args], {stdio: ['ignore', 'pipe', 'pipe']});

export function mix(videoIn, video, outFile, videoCopy = false) {
  const music = findAudio('audio/music', video);
  const vo = findAudio('audio/vo', video);
  if (!music && !vo) return false;
  const inputs = ['-i', videoIn];
  let pre;
  if (music && vo) {
    inputs.push('-i', music, '-i', vo);
    pre =
      '[2:a]aformat=channel_layouts=stereo,adelay=300|300,asplit[vo][sc];[1:a]aformat=channel_layouts=stereo[m];' +
      '[m][sc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=400:makeup=1[duck];[duck][vo]amix=inputs=2:normalize=0,';
  } else {
    inputs.push('-i', music ?? vo);
    pre = '[1:a]aformat=channel_layouts=stereo,';
  }
  pre += 'atrim=0:25,afade=t=out:st=23.5:d=1.5';
  // Pass 1: messen
  const log = execFileSync('bash', ['-c', `ffmpeg -hide_banner ${inputs.map((a) => `'${a}'`).join(' ')} -filter_complex "${pre},loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json[a]" -map "[a]" -f null - 2>&1 | tail -14`]).toString();
  const m = JSON.parse(log.slice(log.indexOf('{')));
  const ln = `loudnorm=I=-14:TP=-1.5:LRA=11:linear=true:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}`;
  // Pass 2: anwenden; Limiter als Sicherheit gegen True-Peak-Überschreitung nach AAC-Kodierung
  const vcodec = videoCopy ? ['-c:v', 'copy'] : ['-c:v', 'libx264', '-crf', '20', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-r', '30'];
  ff([...inputs, '-filter_complex', `${pre},${ln},alimiter=limit=0.84:level=false,aresample=48000[a]`, '-map', '0:v', '-map', '[a]',
    ...vcodec, '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', '25', '-movflags', '+faststart', outFile]);
  return true;
}

if (process.argv[1] && process.argv[1].endsWith('mix.mjs')) {
  const filter = process.argv[2] ?? '';
  const files = fs.readdirSync(path.join(root, 'out')).filter((f) => f.startsWith('MT_') && f.endsWith('.mp4') && f.includes(filter));
  for (const f of files) {
    const [, v, name] = f.split('_');
    const src = path.join(root, 'out', f);
    const tmp = path.join(root, 'out/tmp', `remix_${f}`);
    if (mix(src, `${v}_${name}`, tmp, true)) fs.renameSync(tmp, src);
    console.log(`♪ ${f}`);
  }
}
