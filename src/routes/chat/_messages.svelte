<div class="messages" bind:this={div} on:scroll={toggleAutoScroll}>
  {#each messages as message}
    <Message {message} {me} />
  {/each}
</div>

<script>
  import { tick, onMount } from 'svelte'
  import Message from './_message.svelte'

  export let me, messages = []

  let div, autoScroll = true

  // This turns off automatic scrolling
  // if the user manually scrolled up
  const toggleAutoScroll = () =>
    autoScroll = div.scrollHeight - div.scrollTop - div.clientHeight < 1

  const scrollToBottom = async () => {
    // Don't scroll to the bottom,
    // if auto scroll is turned off.
    if (!autoScroll) return

    // Wait one tick to make sure the UI is
    // up to date with the latest messages.
    await tick() 
    
    div && div.scrollTo(0, div.scrollHeight)
  }

  // Scroll to the bottom on initial load
  onMount(() => scrollToBottom())

  // And from then on whenever a new message arrives
  $: scrollToBottom(messages)
</script>

<style>
  .messages {
    @apply flex-shrink flex flex-col text-gray-700 overflow-y-auto mb-4 px-12;
  }
</style>