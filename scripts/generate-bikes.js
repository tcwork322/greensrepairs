import { writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pug from 'pug';
import { bikesData } from '../js/bikes-data.js';
import { generateSlug } from '../js/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Create bikes directory if it doesn't exist
const bikesDir = join(projectRoot, 'bikes');
if (!existsSync(bikesDir)) {
  mkdirSync(bikesDir, { recursive: true });
}

// Compile the Pug template
const templatePath = join(projectRoot, 'src', 'templates', 'bike-detail.pug');
const compiledFunction = pug.compileFile(templatePath, {
  pretty: true,
  basedir: projectRoot
});

// Set of current slugs (so we can remove old bike pages)
const currentSlugs = new Set(bikesData.map((bike) => generateSlug(bike.name)));

// Generate a page for each bike
bikesData.forEach((bike) => {
  const slug = generateSlug(bike.name);
  console.log(`Generating page for: ${bike.name}`);

  const html = compiledFunction({ bike });
  const filename = `${slug}.html`;
  const filepath = join(bikesDir, filename);
  writeFileSync(filepath, html, 'utf-8');

  console.log(`  ✓ Created bikes/${filename}`);
});

// Remove old bike HTML files no longer in inventory
const existingFiles = readdirSync(bikesDir).filter((f) => f.endsWith('.html'));
existingFiles.forEach((file) => {
  const slug = file.replace(/\.html$/, '');
  if (!currentSlugs.has(slug)) {
    unlinkSync(join(bikesDir, file));
    console.log(`  🗑 Removed bikes/${file}`);
  }
});

console.log(`\n✨ Generated ${bikesData.length} bike pages!`);
