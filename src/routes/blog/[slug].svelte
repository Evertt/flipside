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
	export let slug
	let post

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
		@apply bg-gray-100 shadow-inner p-2 rounded overflow-x-auto;
	}

	.content :global(pre) :global(code) {
		@apply bg-transparent p-0;
	}

	.content :global(ul) {
		@apply leading-normal;
	}

	.content :global(li) {
		@apply mb-2;
	}
</style>