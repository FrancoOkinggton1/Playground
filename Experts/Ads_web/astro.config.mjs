// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f906f9',
        dark: { base: '#0a0510', card: '#150a1f' }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] }
    },
  }
}