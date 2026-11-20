// gta6-clipper-01 entry program (Node 22, standard library only).
// It copies VIDEO.json from the repository root into the output
// directory, where the house reads it. The entry itself is the
// YouTube video named in VIDEO.json; nothing this program writes
// about the video is scored.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
try {
  const parsed = JSON.parse(readFileSync(join(botDir, 'VIDEO.json'), 'utf8')) as unknown;
  if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
    throw new Error('VIDEO.json has no url string');
  }
  copyFileSync(join(botDir, 'VIDEO.json'), join(outDir, 'VIDEO.json'));
} catch (error) {
  console.error(`could not copy VIDEO.json from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
