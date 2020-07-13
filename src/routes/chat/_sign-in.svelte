<input placeholder="Fill in your name and press enter"
       bind:value={newName} on:keyup={saveName} autofocus />

<script>
  export let name
  let newName = ''

  const saveName = key => {
    if (key.code === 'Enter') {
      $name = newName
    }
  }
</script>

<style>
  input {
    @apply mx-auto block rounded border-solid border border-blue-200 pp-2;
    width: 17rem;
  }
</style>