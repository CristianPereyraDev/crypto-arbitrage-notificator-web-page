import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://cryptoarbitrage.netlify.app/",
  integrations: [tailwind(), react(), icon()],
});
