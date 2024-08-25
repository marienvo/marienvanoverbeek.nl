import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { copyFiles } from './scripts/build/CopyFiles.js';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    copyFiles({ src: 'src/content', dest: 'public/assets' })
  ],
});