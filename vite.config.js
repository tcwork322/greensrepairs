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

export default defineConfig({
  // Set base path for GitHub Pages
  // Change 'greensrepairs' to your actual repository name
  base: process.env.NODE_ENV === 'production' ? '/greensrepairs/' : '/',
  
  plugins: [
    pugPlugin()
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
