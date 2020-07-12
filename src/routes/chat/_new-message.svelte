<input placeholder="Write your message"
       bind:value={newMessage}
       on:keyup={addMessage}
/>

<script>
  export let me, save
  let newMessage = ''

  const addMessage = key => {
    // Only save on enter key
    if (key.code !== 'Enter') return

    save({
      author: me,
      body: newMessage,
      created: new Date()
    })

    newMessage = ''
  }
</script>

<style>
  input {
    @apply w-full rounded border-solid border border-blue-200 pp-2;
  }
</style>