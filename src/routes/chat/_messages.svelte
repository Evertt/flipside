<div class="messages" bind:this={div} on:scroll={toggleAutoScroll}>
  {#each messages as message}
    <div on:dblclick={() => requestEdit(message)}>
      <Message {message} {me} />
    </div>
  {/each}
</div>

<script>
  import { tick, onMount } from 'svelte'
  import Message from './_message.svelte'

  const requestEdit = message => {
    if (message.author === me) {
      startEdit(message)
    }
  }

  export let startEdit, me, messages = []

  let div, autoScroll = true

  // This toggles automatic scrolling depending
  // on whether the user manually scrolled up.
  const toggleAutoScroll = () =>
    autoScroll = div.scrollHeight - div.scrollTop - div.clientHeight < 1

  const scrollToBottom = async () => {
    // Wait one tick to make sure the UI is
    // up to date with the latest messages.
    await tick()
    
    div && div.scrollTo(0, div.scrollHeight)
  }

  onMount(scrollToBottom)

  $: autoScroll && scrollToBottom(messages)
</script>

<style>
  .messages {
    @apply flex-shrink flex flex-col text-gray-700 overflow-y-auto mb-4 px-4;

    @screen sm {
      @apply px-8;
    }

    @screen md {
      @apply px-12;
    }
  }
</style>