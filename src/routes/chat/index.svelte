<script context="module">
  import { collection, preloader } from '/store'

  const rooms = collection('rooms')

  export const preload = preloader(rooms)
</script>

<svelte:head>
  <title>Chat</title>
</svelte:head>


  <!-- We don't have a real authentication flow, but we do
       need to at least have a name of the current user. -->
  <SignIn {name} />

{#if $name}

  <h2>Rooms</h2>

  <ul class="rooms">
    {#each $rooms as room}
      <li><a href="/chat/{room.id}">&rarr; {room.title}</a></li>
    {/each}
  </ul>

{/if}

<script>
  import SignIn from './_sign-in.svelte'
  import { writable as cookieStore } from '/store/cookie'

  const name = cookieStore('name', '')
</script>

<style>
  .rooms a {
    @apply text-blue-500 leading-loose;
  }
</style>