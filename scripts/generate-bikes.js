import { writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pug from 'pug';
import { bikesData } from '../js/bikes-data.js';
import { bikesDataRegular } from '../js/bikes-data-regular.js';
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

// Electric + regular bikes – all detail pages go in bikes/
const allBikes = [...bikesData, ...bikesDataRegular];
const currentSlugs = new Set(allBikes.map((bike) => generateSlug(bike.name)));

// Generate a page for each electric bike
bikesData.forEach((bike) => {
  const slug = generateSlug(bike.name);
  console.log(`Generating page for: ${bike.name}`);

  const html = compiledFunction({
    bike,
    backHref: '/shop.html',
    backLabel: 'Back to Electric Bikes'
  });
  const filename = `${slug}.html`;
  const filepath = join(bikesDir, filename);
  writeFileSync(filepath, html, 'utf-8');

  console.log(`  ✓ Created bikes/${filename}`);
});

// Generate a page for each regular bike
bikesDataRegular.forEach((bike) => {
  const slug = generateSlug(bike.name);
  console.log(`Generating page for: ${bike.name}`);

  const html = compiledFunction({
    bike,
    backHref: '/bikes.html',
    backLabel: 'Back to Bikes'
  });
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

console.log(`\n✨ Generated ${allBikes.length} bike pages (${bikesData.length} electric + ${bikesDataRegular.length} regular)!`);
