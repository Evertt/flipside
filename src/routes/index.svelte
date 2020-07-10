<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt='Success Kid' src='/successkid.jpg'>
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>

<style>
	h1, figure, p {
		@apply text-center mx-auto;
	}

	h1 {
		@apply uppercase;
	}

	figure {
		@apply mb-4;
	}

	img {
		@apply w-full mb-4 mx-auto;
		max-width: 400px;
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
