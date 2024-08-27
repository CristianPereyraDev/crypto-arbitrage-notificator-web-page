import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://cryptoarbitrage.netlify.app/",
  integrations: [tailwind(), icon(), preact({ devtools: true })],
  adapter: netlify()
});