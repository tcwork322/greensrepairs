import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';
import { resolve } from 'path';

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
    // Note: Bike pages are copied after build via npm script
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        contact: resolve(__dirname, 'contact.html')
        // Note: Bike pages are copied as static assets, not processed by Vite
      }
    }
  },
  server: {
    port: 3000
  }
  server: {
    port: 3000
  }
});
