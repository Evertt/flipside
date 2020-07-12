<script context="module">
	import { collection, preloader } from '/store'

	const posts = collection('posts')
	export const preload = preloader(posts)
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each $posts as post}
		<li>
			<a href="/blog/{post.slug}" rel="prefetch">
				{post.title}
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		@apply mb-4 leading-normal;
	}
</style>