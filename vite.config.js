import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, existsSync } from 'fs';

// Get all generated bike HTML files (from generate-bikes + compile-pug-dev)
const bikePages = {};
try {
  const bikesDir = resolve(__dirname, 'bikes');
  if (existsSync(bikesDir)) {
    const bikeFiles = readdirSync(bikesDir).filter(file => file.endsWith('.html'));
    bikeFiles.forEach(file => {
      const name = file.replace('.html', '');
      bikePages[`bikes/${name}`] = resolve(__dirname, `bikes/${file}`);
    });
  }
} catch (e) {
  // Bikes directory might not exist yet
}

export default defineConfig({
  // Base path. Use '/greensrepairs/' for GitHub Pages at user.github.io/greensrepairs
  base: '/',
  
  plugins: [],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        bikes: resolve(__dirname, 'bikes.html'),
        contact: resolve(__dirname, 'contact.html'),
        ...bikePages
      }
    }
  },
  server: {
    port: 3000
  }
});
