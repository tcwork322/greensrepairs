import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pug from 'pug';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Function to generate URL-friendly slug from bike name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .trim();
}

// Read bikes data
const bikesDataPath = join(projectRoot, 'js', 'bikes-data.js');
let bikesDataContent = readFileSync(bikesDataPath, 'utf-8');

// Extract the bikesData array from the JS file
const match = bikesDataContent.match(/const bikesData = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find bikesData in bikes-data.js');
  process.exit(1);
}

const bikesData = eval(match[1]);

// Add slugs to each bike
bikesData.forEach(bike => {
  bike.slug = generateSlug(bike.name);
});

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

// Get base path (same logic as vite.config.js)
const getBasePath = () => {
  if (process.env.NODE_ENV !== 'production') return '/';
  
  // Try to get from GitHub Actions environment
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    return `/${repoName}/`;
  }
  
  // Fallback: Change this to your actual repository name
  return '/greensrepairs/';
};

const basePath = getBasePath();

// Generate a page for each bike
bikesData.forEach((bike) => {
  console.log(`Generating page for: ${bike.name}`);
  
  // Generate HTML from template
  const html = compiledFunction({ bike, basePath });
  
  // Write to bikes directory using slug
  const filename = `${bike.slug}.html`;
  const filepath = join(bikesDir, filename);
  writeFileSync(filepath, html, 'utf-8');
  
  console.log(`  ✓ Created bikes/${filename}`);
});

console.log(`\n✨ Generated ${bikesData.length} bike pages!`);
