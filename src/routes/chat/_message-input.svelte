<input placeholder="Write your message"
       bind:value={draft}
       on:keyup={addMessage}
       autofocus
/>

<script>
  export let me, save, cancel = () => {}, draft = ''

  const addMessage = key => {
    if (key.code === 'Escape') {
      return cancel()
    }

    // Only save on enter key
    if (key.code !== 'Enter') return

    save({
      author: me,
      body: draft,
      created: new Date()
    })

    draft = ''
  }
</script>

<style>
  input {
    @apply w-full rounded border-solid border border-blue-200 pp-2;
  }
</style>