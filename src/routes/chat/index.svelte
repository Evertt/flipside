<script context="module">
  import { collection, preloader } from '/store'

  const messages = collection('messages').orderBy('created')

  export const preload = preloader(messages)
</script>

<svelte:head>
  <title>Chat</title>
</svelte:head>

{#if !$name}
  <SignIn {name} />
{:else}
  <div class="chat">
    <Messages messages={$messages} me={$name} {startEdit} />
    {#if editingMessage}
      <span>
        Editing message:
        <small>(you can also delete it by submitting it empty)</small>
      </span>
      <MessageInput save={update}
                    me={editingMessage.author}
                    draft={editingMessage.body}
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
  const startEdit = message => editingMessage = message

  const update = newMessage => {
    if (newMessage.body === '') {
      editingMessage.delete()
    } else {
      editingMessage.body = newMessage.body
    }

    editingMessage = null
  }
</script>

<style>
  .chat {
    @apply flex flex-col h-full mx-auto bg-blue-100 p-4 -mt-4
    bg-opacity-50 rounded border border-gray-300;

    max-width: 50rem;
    max-height: calc(100vh - 110px);
  }
</style>
