import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  const currency = params.currency;
  const counter = params.counter;

  const pair = {currency, counter}

  const response = await fetch(`http://crypto-arbitrage-monsarca-dev.koyeb.app/api/currencies/${pair.currency}/${pair.counter}`)

  if (response.ok) {
    const json = await response.json()
    return new Response(
      JSON.stringify(json)
    )
  }

  return new Response(null, {
      status: 404,
      statusText: "Not found"
  })
  

}

export const prerender = false