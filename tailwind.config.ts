import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite/**/*.js'],

	theme: {
		extend: {}
	},

	plugins: [forms, containerQueries]
} satisfies Config;




/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  './src/**/*.{html,js,svelte,ts}',
	  './node_modules/flowbite/**/*.js'
	],
	theme: {
	  extend: {
		colors: {
			// Define a custom color scheme for your buttons (and other components)
			primary: {
			  DEFAULT: '#fbc12c',  // This will be used as the default background (e.g., bg-primary) Türkis
			  hover: '#FAD26B'     // This will be used on hover (e.g., hover:bg-primary-hover)
			},
			secondary: {
			  DEFAULT: '#fba82b', //orange
			  hover: '#1FDBB58'
			},
			third: {
				DEFAULT: '#f84d42', // rot
				hover: '#F86257'
			  },
			dark: {
				DEFAULT: '#1F2937',
				lighter: '#374151',
				lightest: '#6B7280',
			  },
			light: {
				DEFAULT: '#F3F4F6',
				darker: '#E5E7EB'
			  }
			// You can define more colors as needed
		},
	  }
	},
	plugins: [
	  require('flowbite/plugin') // Include the Flowbite plugin
	]
  };
  