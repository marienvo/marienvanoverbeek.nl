/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			backgroundColor: {
				'accent-100': 'rgb(230,64,64)',
				'accent-200': 'rgb(212,64,64)',
			},
			textColor: {
				'accent-100': 'rgb(230,64,64)',
				'accent-200': 'rgb(212,64,64)',
			},
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
}
