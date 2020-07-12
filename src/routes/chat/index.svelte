<script context="module">
  import { collection, preloader } from '/store'

  const messages = collection('messages').orderBy('created')

  export const preload = preloader(messages)
</script>

{#if !$name}
  <SignIn {name} />
{:else}
  <div class="chat">
    <Messages messages={$messages} me={$name} on:edit={startEdit} />
    {#if editingMessage}
      <MessageInput me={editingMessage.author}
                    draft={editingMessage.body}
                    save={update(editingMessage)}
                    cancel={() => editingMessage = null} />
    {:else}
      <MessageInput me={$name} save={messages.add} />
    {/if}
  </div>
{/if}

<script>
  import SignIn from './_sign-in.svelte'
  import Messages from './_messages.svelte'
  import MessageInput from './_message-input.svelte'
  import { writable } from 'svelte-persistent-store/dist/session'

  const name = writable('name', '')
  let editingMessage = null
  const startEdit = e => editingMessage = e.detail

  const update = originalMessage => newMessage => {
    originalMessage.body = newMessage.body
    editingMessage = null
  }
</script>

<style>
  .chat {
    @apply flex flex-col h-full mx-auto bg-gray-300 p-4 -mt-4 bg-opacity-25;
    max-width: 50rem;
    max-height: calc(100vh - 110px);
  }
</style>
