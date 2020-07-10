{#each [segment] as _ (segment)}
  <div in:_inTransition|local={appear} out:_outTransition|local={leave}>
    <slot />
  </div>
{/each}

<script>
  import * as transitions from 'svelte/transition'
  import * as easings from 'svelte/easing'

  export let segment
  export let params = {}
  export let inParams = {}
  export let outParams = {}
  export let duration = 200
  export let easing = 'sineOut'
  export let transition = 'fade'
  export let inTransition = transition
  export let outTransition = transition

  let delay, appear, leave, _easing
  let _inTransition, _outTransition

  $: {
    _inTransition = typeof inTransition === 'string'
      ? transitions[inTransition] : inTransition

    _outTransition = typeof outTransition === 'string'
      ? transitions[outTransition] : outTransition

    _easing = typeof easing === 'string'
      ? easings[easing] : easing

    leave = { duration, easing: _easing }
    appear = { ...leave, delay: duration }

    leave = { ...leave, ...params, ...outParams }
    appear = { ...appear, ...params, ...inParams }
  }
</script>