import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const v2Index = join('dist', 'v2', 'index.html');
mkdirSync(dirname(v2Index), { recursive: true });
copyFileSync(join('dist', 'index.html'), v2Index);
console.log('copied dist/index.html -> dist/v2/index.html');
