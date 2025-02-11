// tailwind.config.ts

// Importing Tailwind plugins for additional features:
// - containerQueries: Enables container queries in your designs.
// - forms: Provides a base style for form elements.
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';

// Import the Tailwind CSS Config type for TypeScript type checking.
import type { Config } from 'tailwindcss';

export default {
  // Specify the files Tailwind should scan for class names.
  // This includes your Svelte, HTML, JS, and TS files, as well as Flowbite plugin files.
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite/**/*.js'
  ],
  
  // Customize the default theme.
  theme: {
    // Extend the default Tailwind theme with your custom values.
    extend: {
      // Define custom colors for your design.
      // Each color (primary, secondary, third) has a default value and a hover variant.
      colors: {
        primary: { DEFAULT: '#2563eb', hover: '#1d4ed8' },
        secondary: { DEFAULT: '#64748b', hover: '#475569' },
        third: { DEFAULT: '#f43f5e', hover: '#e11d48' },
        // Add more colors as needed…
      },
      
      // Define custom font families.
      // These can be applied using Tailwind's font utilities.
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],  // Default sans-serif font stack.
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'], // For headings.
        mono: ['Inconsolata', 'ui-monospace', 'monospace'] // For monospaced text.
      },
      
      // Add custom spacing values.
      // This extends Tailwind's spacing scale with additional sizes.
      spacing: {
        '76': '19rem',  // Custom spacing value.
        '112': '28rem'  // Another custom spacing value.
      }
    },
  },
  
  // Register additional plugins to enhance Tailwind's functionality.
  plugins: [
    forms,             // For styling form elements.
    containerQueries,  // For responsive container queries.
    require('flowbite/plugin') // For Flowbite component styles.
  ],
} satisfies Config;  // TypeScript assertion to ensure our config matches Tailwind's Config type.

