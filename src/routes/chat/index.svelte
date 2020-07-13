<script context="module">
  import { collection, preloader } from '/store'

  const messages = collection('messages').orderBy('created')

  export const preload = preloader(messages)
</script>

<svelte:head>
  <title>Chat</title>
</svelte:head>

{#if !$name}

  <!-- We don't have a real authentication flow, but we do
       need to at least have a name of the current user. -->
  <SignIn {name} />

{:else}

  <div class="chat">
    <!-- This component shows the list of messages and can
         initiate an edit on one of the current user's messages. -->
    <Messages messages={$messages} me={$name} {startEditing} />

    {#if !editingMessage}

      <!-- This is the normal input box for writing new messages -->
      <MessageInput author={$name} save={saveNewMessage} />

    {:else}

      <!-- And this is for when we're in editing mode -->
      <span>
        Editing message:
        <small>(you can also delete it by submitting it empty)</small>
      </span>
      <MessageInput {...editingMessage} save={updateMessage} cancel={stopEditing} />

    {/if}
  </div>

{/if}

<script>
  import SignIn from './_sign-in.svelte'
  import Messages from './_messages.svelte'
  import MessageInput from './_message-input.svelte'
  import { writable as cookieStore } from '/store/cookie'

  const name = cookieStore('name', '')

  /// SAVING NEW MESSAGE FEATURE ///

  const saveNewMessage = newMessage => {
    if (newMessage.body !== '') {
      messages.add(newMessage)
    }
  }

  /// EDITING MESSAGE FEATURE ///

  let editingMessage = false

  const startEditing = message =>
    editingMessage = message

  const stopEditing = () =>
    editingMessage = false

  const updateMessage = newMessage => {
    if (newMessage.body === '') {
      editingMessage.delete()
    } else {
      editingMessage.body = newMessage.body
    }

    stopEditing()
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
