<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		@apply mx-auto;
	}

	h1 {
		@apply mb-2 font-bold;
	}

	p {
		@apply my-4 mx-auto;
	}

	@screen sm {
		h1 {
			@apply text-5xl;
		}
	}
</style>
