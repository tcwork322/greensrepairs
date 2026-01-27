import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Get all generated bike HTML files
const bikePages = {};
try {
  const bikesDir = resolve(__dirname, 'bikes');
  const bikeFiles = readdirSync(bikesDir).filter(file => file.endsWith('.html'));
  bikeFiles.forEach(file => {
    const name = file.replace('.html', '');
    bikePages[`bikes/${name}`] = resolve(__dirname, `bikes/${file}`);
  });
} catch (e) {
  // Bikes directory might not exist yet
}

// Get repository name from environment or default
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

export default defineConfig({
  base: basePath,
  
  plugins: [
    pugPlugin({}, {
      // Pass base path to all Pug templates
      basePath: basePath
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        contact: resolve(__dirname, 'contact.html'),
        ...bikePages
      }
    }
  },
  server: {
    port: 3000
  }
});
