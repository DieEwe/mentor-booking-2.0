// tailwind.config.ts
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563eb', hover: '#1d4ed8' },
        secondary: { DEFAULT: '#64748b', hover: '#475569' },
        third: { DEFAULT: '#f43f5e', hover: '#e11d48' },
        // Other colours as needed…
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        mono: ['Inconsolata', 'ui-monospace', 'monospace']
      },
      spacing: {
        // For example, custom spacing values
        '76': '19rem',
        '112': '28rem'
      }
    },
  },
  plugins: [forms, containerQueries, require('flowbite/plugin', )], 
} satisfies Config;
