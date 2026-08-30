// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: process.env.ASTRO_SITE || 'https://docs.inerate.com',
	base: process.env.ASTRO_BASE || '/',
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	integrations: [
		starlight({
			title: 'Inerate Docs',
			favicon: '/assets/favicon.png',
			description: 'Open source frameworks, microkernels, and tooling by Inerate.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/INERATE' }],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'script',
					attrs: {
						src: '/spa-nav.js?v=3',
						type: 'module',
					},
				},
			],
			sidebar: [
				{ label: 'acri Microkernel', items: [
					{ label: 'What is acri?', slug: 'index' },
					{ label: 'Installation & Quickstart', slug: 'acri/quickstart' },
					{ label: 'Microkernel Architecture', slug: 'acri/architecture' },
					{ label: 'Benchmark Receipts', slug: 'acri/benchmarks' },
				]},
				{ label: 'Atelier Framework', items: [
					{ label: 'What is Atelier?', slug: 'atelier' },
					{ label: 'Install & first project', slug: 'start/install' },
					{ label: 'Design law', slug: 'laws/design' },
					{ label: 'Clean-code law', slug: 'laws/clean-code' },
					{ label: 'Auth & structure laws', slug: 'laws/auth-structure' },
					{ label: 'Commands', slug: 'use/commands' },
					{ label: 'Self-learning', slug: 'use/learning' },
					{ label: 'Media & living graphics', slug: 'use/media' },
					{ label: 'Model routing & tokens', slug: 'use/routing' },
					{ label: 'Releasing & updates', slug: 'maintain/releasing' },
				]},
			],
		}),
	],
});
