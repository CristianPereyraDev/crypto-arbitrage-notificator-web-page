import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import netlify from '@astrojs/netlify'
import AstroPWA from '@vite-pwa/astro'

import preact from '@astrojs/preact'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	site: 'https://cryptoarbitrage.netlify.app/',
	integrations: [
		tailwind(),
		icon(),
		preact({ devtools: true, include: '**/preact/*' }),
		react({ include: '**/react/*' }),
		AstroPWA({
			srcDir: 'src/pwa',
			filename: 'sw.ts',
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			injectRegister: false,
			manifest: {
				name: 'CryptoARbitrage Notifier',
				short_name: 'CryptoARbitrage Notifier',
				description: 'Get notifications when exist an arbitrage.',
				theme_color: '#ced4da',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},
			devOptions: {
				enabled: true,
				type: 'module'
			}
		})
	],
	adapter: netlify()
})
