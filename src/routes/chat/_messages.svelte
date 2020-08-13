<div class="messages flip">
  <div class="flip">
    {#each messages as message (message.id)}
      <div class="message" transition:slide|local
           on:dblclick={_ => requestEdit(message)}>
        <Message {message} {me} />
      </div>
    {/each}

    <div class="spacer">&nbsp;</div>
  </div>
</div>

<script>
  import Message from './_message.svelte'
  import { slide } from './_transition'

  export let startEditing, me, messages = []

  const requestEdit = message => {
    if (message.author === me) {
      startEditing(message)
    }
  }
</script>

<style>
  .messages {
    @apply flex-shrink
           overflow-y-auto px-4
           text-gray-700;

    @screen sm {
      @apply px-8;
    }

    @screen md {
      @apply px-12;
    }
  }

  .messages > div {
    @apply flex flex-col;
  }

  .message {
    @apply mb-2;
  }

  .flip {
    transform: scaleY(-1);
  }

  .spacer {
    @apply h-4;
  }
</style>