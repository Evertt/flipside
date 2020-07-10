<script context="module">
	export async function preload() {
		const resp = await this.fetch('blog.json')
		const posts = await resp.json()

		return { posts }
	}
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<li>
			<a href="/blog/{post.slug}">
				{post.title}
			</a>
		</li>
	{/each}
</ul>

<script>
	export let posts
</script>

<style>
	ul {
		@apply mb-4 leading-normal;
	}
</style>