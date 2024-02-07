import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://cryptoarbitrage.netlify.app/",
  integrations: [tailwind(), react(), icon()],
  adapter: netlify()
});