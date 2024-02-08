import type { APIContext, APIRoute } from "astro";

export const GET: APIRoute = async (context: APIContext) => {
  const cryptoArbitrageAPIURL = import.meta.env.PUBLIC_CRYPTO_ARBITRAGE_API_URL
  const cryptoArbitrageAPIKey = import.meta.env.PUBLIC_CRYPTO_ARBITRAGE_API_KEY

  try {
    const response = await fetch(`${cryptoArbitrageAPIURL}/api/apiToken`, {
      method: 'POST',
      headers: {
        "x-api-key": cryptoArbitrageAPIKey,
      }
    })

    if (response.ok) {
      const token = (await response.json())

      return new Response(JSON.stringify(token), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      })
    } else {
      return new Response(null, { status: 400 })
    }
  } catch (error) {
    return new Response(null, { status: 400 })
  }
}
