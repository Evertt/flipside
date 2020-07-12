<script context="module">
  const authors = {}
</script>

<div class="message" class:mine={message.author === me}>
  <small class="author {authors[message.author]}">
    {message.author}
  </small>

  {message.body}
</div>

<script>
  export let message, me

  const colors = [
    'text-red-500',
    'text-green-500',
    'text-orange-500',
    'text-blue-500',
    'text-yellow-500',
    'text-purple-500',
    'text-teal-500',
    'text-pink-500',
    'text-indigo-500',
  ]

  /**
   * What's happening here is that we're assigning a color
   * to each unique author. So that we can make their names
   * visually distinct in the chat box.
   */
  if (message.author !== me && !authors[message.author]) {
    const i = Object.keys(authors).length
    const n = colors.length
    authors[message.author] = colors[i%n]
  }
</script>

<style>
  .message {
    @apply bg-white rounded-lg pp-2 mb-2 inline-block
    float-left shadow-sm border border-gray-200;

    max-width: calc(100% - 4rem);
  }

  .mine {
    @apply float-right bg-green-200 border-green-300;

    .author {
      @apply hidden;
    }
  }

  .author {
    @apply block font-medium;
  }
</style>