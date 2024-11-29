import { defineConfig } from 'cypress';
import viteConfig from './vite.config';



export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
     // Configuration for component tests
    specPattern: 'cypress/component/**/*.{js,jsx,ts,tsx}'
  },

  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Configuration for E2E tests
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  },
});
