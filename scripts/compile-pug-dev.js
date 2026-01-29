/**
 * Dev-only: generate bike pages + compile Pug to HTML.
 * Run before `vite` and watch for .pug / bikes-data changes.
 */
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
import pug from 'pug';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('📝 Compiling Pug (dev)...');

// 1. Generate bike pages
execSync('node scripts/generate-bikes.js', { cwd: projectRoot, stdio: 'inherit' });

// 2. Compile main Pug files to HTML
const pugFiles = [
  { input: 'index.pug', output: 'index.html' },
  { input: 'shop.pug', output: 'shop.html' },
  { input: 'contact.pug', output: 'contact.html' }
];

pugFiles.forEach(({ input, output }) => {
  const inputPath = join(projectRoot, input);
  const outputPath = join(projectRoot, output);
  if (!existsSync(inputPath)) return;
  const fn = pug.compileFile(inputPath, { pretty: true, basedir: projectRoot });
  writeFileSync(outputPath, fn(), 'utf-8');
  console.log(`  ✓ ${input} → ${output}`);
});

console.log('✓ Pug compile done.\n');
