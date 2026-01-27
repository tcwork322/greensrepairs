import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const bikesDir = resolve(projectRoot, 'bikes');
const distBikesDir = resolve(projectRoot, 'dist', 'bikes');

try {
  if (!existsSync(bikesDir)) {
    console.warn('Bikes directory does not exist. Run "npm run generate-bikes" first.');
    process.exit(0);
  }

  if (!existsSync(distBikesDir)) {
    mkdirSync(distBikesDir, { recursive: true });
  }

  const bikeFiles = readdirSync(bikesDir).filter(file => file.endsWith('.html'));
  
  if (bikeFiles.length === 0) {
    console.warn('No bike HTML files found.');
    process.exit(0);
  }

  bikeFiles.forEach(file => {
    copyFileSync(
      resolve(bikesDir, file),
      resolve(distBikesDir, file)
    );
  });

  console.log(`✓ Copied ${bikeFiles.length} bike pages to dist/bikes/`);
} catch (e) {
  console.error('Error copying bike pages:', e.message);
  process.exit(1);
}
