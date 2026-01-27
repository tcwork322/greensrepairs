import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pug from 'pug';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🏗️  Starting build process...\n');

// Step 1: Generate bike pages
console.log('📝 Step 1: Generating bike pages...');
try {
  execSync('node scripts/generate-bikes.js', { 
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('✓ Bike pages generated\n');
} catch (error) {
  console.error('✗ Error generating bike pages:', error.message);
  process.exit(1);
}

// Step 2: Compile Pug files to HTML
console.log('📝 Step 2: Compiling Pug templates to HTML...');

const pugFiles = [
  { input: 'index.pug', output: 'index.html' },
  { input: 'shop.pug', output: 'shop.html' },
  { input: 'contact.pug', output: 'contact.html' }
];

pugFiles.forEach(({ input, output }) => {
  const inputPath = join(projectRoot, input);
  const outputPath = join(projectRoot, output);
  
  if (!existsSync(inputPath)) {
    console.warn(`⚠️  Warning: ${input} not found, skipping...`);
    return;
  }
  
  try {
    console.log(`  Compiling ${input} → ${output}...`);
    const compiledFunction = pug.compileFile(inputPath, {
      pretty: true,
      basedir: projectRoot
    });
    
    const html = compiledFunction();
    writeFileSync(outputPath, html, 'utf-8');
    console.log(`  ✓ Created ${output}`);
  } catch (error) {
    console.error(`  ✗ Error compiling ${input}:`, error.message);
    process.exit(1);
  }
});

console.log('✓ All Pug files compiled\n');

// Step 3: Run Vite build
console.log('📦 Step 3: Bundling assets with Vite...');
try {
  execSync('vite build', { 
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  console.log('✓ Vite build complete\n');
} catch (error) {
  console.error('✗ Error during Vite build:', error.message);
  process.exit(1);
}

// Step 4: Copy static assets (images, favicon)
console.log('📁 Step 4: Copying static assets...');
const distDir = join(projectRoot, 'dist');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy images directory
const imagesSrc = join(projectRoot, 'images');
const imagesDest = join(distDir, 'images');
if (existsSync(imagesSrc)) {
  cpSync(imagesSrc, imagesDest, { recursive: true });
  console.log('  ✓ Copied images/');
}

// Copy favicon
const faviconSrc = join(projectRoot, 'favicon.ico');
const faviconDest = join(distDir, 'favicon.ico');
if (existsSync(faviconSrc)) {
  cpSync(faviconSrc, faviconDest);
  console.log('  ✓ Copied favicon.ico');
}

console.log('\n✓ Build complete!');
console.log('📁 Output directory: dist/');
console.log('\n✨ Ready for deployment to GitHub Pages!');
console.log('💡 Push the dist/ folder contents to your GitHub Pages branch');
