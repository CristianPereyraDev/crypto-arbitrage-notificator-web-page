export async function subscribeToArbitrage(
	minProfit: number = 0.8,
	volume: number = 1.0,
	crypto: string = 'USDT',
	fiat: string = 'ARS'
) {
	if ('serviceWorker' in navigator) {
		const registration = await navigator.serviceWorker.getRegistrations()

		if (registration) {
			const subscription = await generateSubscribeEndPoint(registration[0])

			if (!subscription) {
				throw new Error('Error al generar la subscripción')
			}

			const strSubscription = JSON.stringify({
				...subscription.toJSON(),
				minProfit,
				volume,
				crypto,
				fiat
			})

			console.log(strSubscription)

			const baseUrl = 'https://crypto-arbitrage-monsarca-dev.koyeb.app'

			const response = await fetch(`${baseUrl}/api/webpush/subscription`, {
				method: 'POST',
				body: strSubscription,
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error('Subscription error.')
			}

			localStorage.setItem('pushSubscription', strSubscription)
		}
	}
}

export async function unsubscribeToArbitrage() {
	if ('serviceWorker' in navigator) {
		const registration = await navigator.serviceWorker.getRegistrations()

		if (registration) {
			const strSubscription = localStorage.getItem('pushSubscription')

			const baseUrl = 'https://crypto-arbitrage-monsarca-dev.koyeb.app'
			const response = await fetch(`${baseUrl}/api/webpush/unsubscribe`, {
				method: 'POST',
				body: strSubscription,
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error('Unsubscribe error')
			}

			localStorage.removeItem('pushSubscription')
		}
	}
}

async function generateSubscribeEndPoint(newRegistration: ServiceWorkerRegistration) {
	const applicationServerKey = import.meta.env.PUBLIC_VAPID_KEY

	const options = {
		applicationServerKey: applicationServerKey,
		userVisibleOnly: true
	}
	try {
		const subscription = await newRegistration.pushManager.subscribe(options)

		return subscription
	} catch (error) {
		console.log(error)
		return null
	}
}
