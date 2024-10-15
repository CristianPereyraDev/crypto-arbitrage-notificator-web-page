declare let self: ServiceWorkerGlobalScope

import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST || [])

// registerRoute(
//   ({ request }) => request.mode === 'navigate',
//   createHandlerBoundToURL('/index.html')
// );

self.addEventListener('install', () => void self.skipWaiting())
self.addEventListener('activate', () => void self.clients.claim())

self.addEventListener('notificationclick', (event) => {
	event.waitUntil(self.clients.openWindow(event.notification.tag))
	event.notification.close()
})

// @ts-expect-error periodicsync is not included in the default SW interface.
self.addEventListener('periodicsync', (event: PeriodicBackgroundSyncEvent) => {
	if (event.tag === 'update-check') {
		//event.waitUntil(checkForUpdates());
	}
})

self.addEventListener('message', (event) => {
	if (event.data === 'update-check') {
		self.skipWaiting()
		//event.waitUntil(checkForUpdates());
	}
})

self.addEventListener('push', (event) => {
	const data = event.data?.json()

	console.log(data)

	self.registration
		.showNotification(data.title, {
			body: `${data.message[0].askExchange} <-> ${
				data.message[0].bidExchange
			}\nProfit = ${Number(data.message[0].profit).toFixed(2)}`,
			icon: 'pwa-192x192.png'
		})
		.catch((error) => console.log(error))
})
