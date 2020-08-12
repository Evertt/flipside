<input placeholder="Write your message"
       bind:value={body}
       on:keyup={onKeyUp}
/>

<script>
  export let save
  export let body = ''
  export let cancel = () => {}

  const onKeyUp = key => {
    switch (key.code) {
      case 'Escape':
        return cancel()

      case 'Enter':
        save(body)
        body = ''
    }
  }
</script>

<style>
  input {
    @apply rounded border border-blue-200
           w-full pp-2;
  }
</style>