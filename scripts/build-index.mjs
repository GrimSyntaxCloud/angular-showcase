import { mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
mkdirSync('dist', { recursive: true });
copyFileSync('showcase.html', 'dist/index.html');
writeFileSync('dist/.nojekyll', '');
