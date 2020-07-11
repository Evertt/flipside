<script context="module">
	import { posts } from '/store'
	import { first } from 'rxjs/operators'

	export async function preload() {
		const preloaded = await posts.pipe(first()).toPromise()

		return { preloaded }
	}
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each ($posts || preloaded) as post}
		<li>
			<a href="/blog/{post.slug}" rel="prefetch">
				{post.title}
			</a>
		</li>
	{/each}
</ul>

<script>
	export let preloaded = []
</script>

<style>
	ul {
		@apply mb-4 leading-normal;
	}
</style>