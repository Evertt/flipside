<script context="module">
  export function preload({ params }) {
    return params
  }
</script>

<svelte:head>
  <title>Chat - {slug}</title>
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

    <div class="editing-info text-gray-700" class:text-opacity-0={!editingMessage}>
      Editing message:
      <small>(you can also delete it by submitting it empty)</small>
    </div>

    <MessageInput {...editingMessage} {save} cancel={stopEditing} />
  </div>

{/if}
<script>
  import { collection } from '/store'
  import { db } from '/store/firebase'
  import SignIn from './_sign-in.svelte'
  import Messages from './_messages.svelte'
  import MessageInput from './_message-input.svelte'
  import { writable as cookieStore } from '/store/cookie'

  const name = cookieStore('name', '')

  export let slug = null
  const room = db.collection('rooms').doc(slug)
  const messages = collection('messages')
    .where('room', '==', room)
    .orderBy('created')

  const saveNewMessage = body =>
    messages.add({ author: $name, body, room })

  let editingMessage = false

  const startEditing = message =>
    editingMessage = message

  const stopEditing = () =>
    editingMessage = false

  const updateMessage = body => {
    editingMessage.body = body
    stopEditing()
  }

  const deleteMessage = () => {
    editingMessage.delete()
    stopEditing()
  }

  // Choose between saving a new message
  // or updating an existing message.
  const save = body => editingMessage.body === undefined
    ? body && saveNewMessage(body)
    : body
      ? updateMessage(body)
      : deleteMessage()
</script>


<style>
  .chat {
    @apply flex flex-col
    -mt-4 mx-auto
    rounded border border-gray-300
    h-full p-4
    bg-blue-100 bg-opacity-50;

    max-width: 50rem;
    max-height: calc(100vh - 110px);
  }

  .editing-info {
    @apply pt-4 -mt-4 z-10;
    background: linear-gradient(0deg, rgba(246,251,255,1) 50%, rgba(246,251,255,0) 100%);
  }
</style>
