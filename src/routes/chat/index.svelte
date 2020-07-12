<script context="module">
  import { collection, preloader } from '/store'

  const messages = collection('messages').orderBy('created')

  export const preload = preloader(messages)
</script>

{#if !$name}
  <SignIn {name} />
{:else}
  <div class="chat">
    <Messages messages={$messages} me={$name} />
    <NewMessage save={messages.add} me={$name} />
  </div>
{/if}

<script>
  import SignIn from './_sign-in.svelte'
  import Messages from './_messages.svelte'
  import NewMessage from './_new-message.svelte'
  import { writable } from 'svelte-persistent-store/dist/session'

  const name = writable('name', '')
</script>

<style>
  .chat {
    @apply flex flex-col h-full mx-auto bg-gray-300 p-4 -mt-4 bg-opacity-25;
    max-width: 50rem;
    max-height: calc(100vh - 110px);
  }
</style>
