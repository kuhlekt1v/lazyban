import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://lazyban.dev',
	compressHTML: true,
	build: {
		inlineStylesheets: 'auto',
	},
});
