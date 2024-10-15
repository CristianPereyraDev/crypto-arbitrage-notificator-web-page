const defaultTheme = require('tailwindcss/defaultTheme')

import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
	content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter Variable', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)'
			},
			textColor: {
				default: 'var(--color-text)',
				offset: 'var(--color-text-offset)'
			},
			backgroundColor: {
				default: 'var(--color-background)',
				offset: 'var(--color-background-offset)',
				surface: 'var(--color-surface)',
				surfaceOffset: 'var(--color-surface-offset)',
				onSurface: 'var(--color-surface-offset)'
			},
			borderColor: {
				default: 'var(--color-border)'
			},
			animation: {
				'spin-slow': 'spin 2s linear infinite',
			}
		}
	},
	corePlugins: {
		fontSize: false
	},
	plugins: [require('tailwindcss-fluid-type')]
})
