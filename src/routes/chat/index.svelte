<script context="module">
  import { first } from 'rxjs/operators'
  import { db, collectionData } from '/store'
  import { writable } from 'svelte-persistent-store/dist/session'

  const name = writable('name', '')
  const messagesRef = db.collection('messages')
  const messages = collectionData(
    messagesRef.orderBy('created')
  )

  export async function preload() {
    const preloaded = await messages.pipe(first()).toPromise()

    return { preloaded }
  }
</script>

{#if !$name}
  <input bind:value={newName} on:keyup={saveName} placeholder="Please fill in your name" />
{:else}
  {#each ($messages || preloaded) as message}
    <div>{message.body}</div>
  {/each}

  <input bind:value={newMessage} on:keyup={addMessage} placeholder="Write your message" />
{/if}

<script>
  let newName = '', newMessage = '', preloaded = []

  const saveName = e => {
    if (e.code === 'Enter') {
      $name = newName
    }
  }

  const addMessage = e => {
    if (e.code === 'Enter') {
      messagesRef.add({
        author: $name,
        body: newMessage,
        created: new Date()
      })

      newMessage = ''
    }
  }
</script>