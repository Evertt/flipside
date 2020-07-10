<nav>
	<ul>
		{#each links as link}
			<li><a {...link}>{link.label}</a></li>
		{/each}
	</ul>
</nav>

<script>
	export let segment

	const nav = {
		home: '/',
		about: '/about',
		blog: '/blog'
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
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>
