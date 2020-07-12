<input placeholder="Write your message"
       bind:value={draft}
       on:keyup={onKeyUp}
       autofocus
/>

<script>
  export let me, save, cancel = () => {}, draft = ''

  const onKeyUp = key => {
    switch (key.code) {
      case 'Escape':
        return cancel();

      case 'Enter':
        save({
          author: me,
          body: draft,
          created: new Date()
        })

        draft = ''
    }
  }
</script>

<style>
  input {
    @apply w-full rounded border-solid border border-blue-200 pp-2;
  }
</style>