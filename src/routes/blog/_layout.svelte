<RouteTransition transition="fly" params={{y: 500}} {segment}>
  <slot />
</RouteTransition>

<script>
  import RouteTransition from '/components/RouteTransition.svelte'

  export let segment
</script>
