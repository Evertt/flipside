<Nav {segment}/>

<main id="main" class="container">
	<RouteTransition {segment}>
		<slot />
	</RouteTransition>
</main>

<script>
	import Nav from '/components/Nav.svelte'
	import RouteTransition from '/components/RouteTransition.svelte'

	export let segment
</script>

<style global>
	@import '../styles/tailwind.css';

	body > #main {
		@apply mt-8;
		max-width: 52rem;
	}
</style>