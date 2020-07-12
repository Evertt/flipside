<div class="message" class:mine={message.author === me}>
  <small class="author">
    {message.author === me ? 'You' : message.author}
  </small>

  {message.body}
</div>

<script>
  export let message, me
</script>

<style>
  .message {
    @apply bg-blue-200 rounded pp-2 mb-2 inline-block self-start bg-opacity-50;
    max-width: calc(100% - 4rem)
  }

  .mine {
    @apply self-end bg-green-200 bg-opacity-50;
  }

  .author {
    @apply block;
  }
</style>