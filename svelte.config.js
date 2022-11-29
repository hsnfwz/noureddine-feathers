import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'$components': resolve('./src/components/'),
			'$interfaces': resolve('./src/interfaces/'),
			'$stores': resolve('./src/stores/'),
			'$config': resolve('./src/config/'),
			'$api': resolve('./src/api/'),
			'$helpers': resolve('./src/helpers/'),
    }
	},
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;