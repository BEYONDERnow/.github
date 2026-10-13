// Kopiert Bilder aus assets/website (und optional weiteren Ordnern) nach public/img
// und schreibt src/available.json, damit die Komposition weiss, welches Material vorhanden ist.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const sources = ['assets/website', 'assets/instagram', 'assets/selected'];
const dest = path.join(root, 'public/img');
fs.mkdirSync(dest, {recursive: true});

for (const dir of sources) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs)) {
    if (/\.(jpe?g|png|webp)$/i.test(f)) fs.copyFileSync(path.join(abs, f), path.join(dest, f));
  }
}
const files = fs.readdirSync(dest).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
fs.writeFileSync(path.join(root, 'src/available.json'), JSON.stringify(files, null, 2) + '\n');
console.log(`${files.length} Bilder verfügbar in public/img`);
