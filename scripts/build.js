import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync, readdirSync } from 'fs';
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
  { input: 'bikes.pug', output: 'bikes.html' },
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

// Step 5: Fix CSS/script order in HTML files to prevent FOUC
console.log('🔧 Step 5: Fixing CSS/script order in HTML files...');
function fixHtmlFile(filePath) {
  let html = readFileSync(filePath, 'utf-8');
  
  // Extract CSS links and script tags from head
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch) return;
  
  const headContent = headMatch[1];
  const cssLinks = [];
  const scripts = [];
  
  // Find all CSS links
  const cssRegex = /<link[^>]*rel=["']stylesheet["'][^>]*>/gi;
  let match;
  while ((match = cssRegex.exec(headContent)) !== null) {
    cssLinks.push(match[0]);
  }
  
  // Find all script tags
  const scriptRegex = /<script[^>]*>[\s\S]*?<\/script>|<script[^>]*>/gi;
  while ((match = scriptRegex.exec(headContent)) !== null) {
    scripts.push(match[0]);
  }
  
  // Only proceed if we found CSS or scripts
  if (cssLinks.length === 0 && scripts.length === 0) return;
  
  // Remove CSS links and scripts from HTML
  let newHtml = html;
  cssLinks.forEach(link => {
    const escapedLink = link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    newHtml = newHtml.replace(new RegExp(escapedLink, 'g'), '');
  });
  scripts.forEach(script => {
    const escapedScript = script.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    newHtml = newHtml.replace(new RegExp(escapedScript.replace(/\n/g, '\\n'), 'g'), '');
  });
  
  // Clean up extra blank lines
  newHtml = newHtml.replace(/\n{3,}/g, '\n\n');
  
  // Find insertion point (before </head>)
  const headCloseIndex = newHtml.indexOf('</head>');
  if (headCloseIndex !== -1) {
    // Add preload hints for CSS files (helps browser prioritize CSS loading)
    const cssPreloads = [];
    cssLinks.forEach(link => {
      const hrefMatch = link.match(/href=["']([^"']+)["']/);
      if (hrefMatch && hrefMatch[1].startsWith('/assets/')) {
        // Add preload for CSS
        cssPreloads.push(`<link rel="preload" href="${hrefMatch[1]}" as="style">`);
      }
    });
    
    // Ensure CSS links don't have async/defer (they should load synchronously)
    const cssHtml = cssLinks.map(link => {
      // Remove any async/defer from CSS links
      return link.replace(/\s+(async|defer)=["'][^"']*["']/gi, '');
    }).join('\n    ');
    
    // Ensure scripts are deferred (type="module" scripts are already deferred by default)
    const scriptsHtml = scripts.map(script => {
      // type="module" scripts are automatically deferred, but we can be explicit
      if (script.includes('type="module"') && !script.includes('defer')) {
        // Don't add defer to module scripts - they're already deferred
        return script;
      }
      // For non-module scripts, ensure they're deferred
      if (!script.includes('defer') && !script.includes('async')) {
        return script.replace('>', ' defer>');
      }
      return script;
    }).join('\n    ');
    
    // Insert: preloads first, then CSS, then scripts
    const preloadHtml = cssPreloads.length > 0 ? cssPreloads.join('\n    ') + '\n    ' : '';
    const insertion = '\n    ' + preloadHtml + cssHtml + '\n    ' + scriptsHtml;
    
    // Insert before </head>, trimming any trailing whitespace
    const beforeInsert = newHtml.slice(0, headCloseIndex).trimEnd();
    newHtml = beforeInsert + insertion + '\n  ' + newHtml.slice(headCloseIndex);
    
    writeFileSync(filePath, newHtml, 'utf-8');
  }
}

// Fix all HTML files in dist
function fixHtmlFiles(dir) {
  const files = readdirSync(dir, { withFileTypes: true });
  files.forEach(file => {
    const filePath = join(dir, file.name);
    if (file.isDirectory()) {
      fixHtmlFiles(filePath);
    } else if (file.name.endsWith('.html')) {
      fixHtmlFile(filePath);
    }
  });
}

fixHtmlFiles(distDir);
console.log('  ✓ Fixed CSS/script order in HTML files\n');

console.log('✓ Build complete!');
console.log('📁 Output directory: dist/');
console.log('\n✨ Ready for deployment to GitHub Pages!');
console.log('💡 Push the dist/ folder contents to your GitHub Pages branch');
