import { defineConfig } from 'astro/config';

// https://astro.build/config
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],
  output: "server",
  adapter: deno()
});