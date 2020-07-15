<script context="module">
	import { collection, preloader } from '/store'

	const posts = collection('posts')
	export const preload = preloader(posts)
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class='content'>
	{@html post.html}
</div>

<script>
	// The preloader above secretly
	// exports all the route parameters,
	// so that's why I can catch the slug here.
	export let slug
	let post = {}

	$: post = $posts.find(post => post.slug === slug)
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		@apply text-2xl font-medium;
	}

	.content :global(pre) {
		@apply overflow-x-auto shadow-inner rounded p-2 bg-gray-100;
	}

	.content :global(ul) {
		@apply leading-normal;
	}

	.content :global(li) {
		@apply mb-2;
	}
</style>