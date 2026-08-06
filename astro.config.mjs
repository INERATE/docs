// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://forge.inerate.com',
	base: '/atelier/docs',
	integrations: [
		starlight({
			title: 'Atelier Docs',
			description: 'The craftsman\'s framework for AI-built software.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/INERATE/atelier' }],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{ label: 'Start here', items: [
					{ label: 'What is Atelier?', slug: 'index' },
					{ label: 'Install & first project', slug: 'start/install' },
				]},
				{ label: 'The laws', items: [
					{ label: 'Design law', slug: 'laws/design' },
					{ label: 'Clean-code law', slug: 'laws/clean-code' },
					{ label: 'Auth & structure laws', slug: 'laws/auth-structure' },
				]},
				{ label: 'Using Atelier', items: [
					{ label: 'Commands', slug: 'use/commands' },
					{ label: 'Self-learning', slug: 'use/learning' },
					{ label: 'Media & living graphics', slug: 'use/media' },
					{ label: 'Model routing & tokens', slug: 'use/routing' },
				]},
				{ label: 'Maintainers', items: [
					{ label: 'Releasing & updates', slug: 'maintain/releasing' },
				]},
			],
		}),
	],
});
