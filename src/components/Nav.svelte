<nav>
	<ul>
		{#each links as link}
			<li><a {...link} rel="prefetch">{link.label}</a></li>
		{/each}
	</ul>
</nav>

<script>
	export let segment

	const nav = {
		home: '/',
		about: '/about',
		blog: '/blog',
		chat: '/chat',
	}

	const current = (segment = '', page = '') =>
		segment === page.replace('/', '')
			? 'page' : undefined

	let links

	$: links = Object.entries(nav).map(([label, href]) => ({
		href, label, 'aria-current': current(segment, href)
	}))
</script>

<style>
	nav {
		@apply border-b border-solid border-red-200 font-light px-4;
	}

	ul {
		@apply flex;
	}

	[aria-current] {
		@apply border-b-2 border-red-500;
	}

	a {
		@apply py-4 px-2 block;
	}
</style>
