<div class="messages" bind:this={div} on:scroll={toggleAutoScroll}>
  {#each messages as message (message.id)}
    <div transition:slide={{ duration: 5000 }}
      on:dblclick={() => requestEdit(message)}>
      <Message {message} {me} />
    </div>
  {/each}

  <div class="spacer">&nbsp;</div>
</div>

<script>
  import { tick } from 'svelte'
  import Message from './_message.svelte'
  import { tweened } from 'svelte/motion'
  import { sineOut as easing } from 'svelte/easing'
  import { slide } from 'svelte/transition'

  export let startEditing, me, messages = []

  const requestEdit = message => {
    if (message.author === me) {
      startEditing(message)
    }
  }

  let div = null
  let autoScroll = true
  let firstScroll = true
  const duration = 250

  let scrollY = tweened(0, { easing, duration })

  // This toggles automatic scrolling depending
  // on whether the user manually scrolled up.
  const toggleAutoScroll = () => autoScroll =
    div.scrollHeight - div.scrollTop - div.clientHeight < 1

  const scrollToBottom = async () => {
    // We can't scroll a div
    // if it hasn't been loaded yet
    if (div == null) return

    // When this component just loaded we want to scroll
    // to the bottom instantly, without any animation.
    const d = firstScroll ? 0 : duration
    firstScroll = false

    // Wait one tick to make sure the UI is
    // up to date with the latest messages.
    await tick()
    
    scrollY.set(div.scrollHeight - div.clientHeight, { duration: d })
  }

  // When auto scrolling is turned on,
  // scroll to the bottom whenever a new message arrives.
  $: messages && autoScroll && scrollToBottom()
  $: div && div.scrollTo(0, $scrollY)
</script>

<style>
  .messages {
    @apply flex flex-col flex-shrink
           overflow-y-auto px-4
           text-gray-700;

    @screen sm {
      @apply px-8;
    }

    @screen md {
      @apply px-12;
    }
  }

  .spacer {
    @apply h-4;
  }
</style>