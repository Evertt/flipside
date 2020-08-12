<input placeholder="Fill in your name and press enter to save"
       bind:value={newName} on:keyup={saveName} autofocus />

<script>
  export let name
  let newName
  $: newName = $name

  const saveName = key => {
    if (key.code === 'Enter') {
      $name = newName
    }
  }
</script>

<style>
  input {
    @apply block mx-auto rounded border border-blue-200 pp-2;
    width: 20rem;
  }
</style>