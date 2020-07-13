This is the sapper starter template with the following features added:

* Use of firebase-admin on the server side.
* Use of firebase-app on the client side.
* Tailwindcss.

And finally, I wrote a wrapper around firebase's firestore that allows you to do this:

```html
<script>
  import { collection } from '/store'

  const posts = collection('posts')
  // posts is now a svelte store, which auto updates
  // itself from live snapshots from firestore.

  // But there's more. You can also very simply
  // add a new post to the collection, by doing this:
  posts.add({ title: 'Hello World', html: 'This is my new post, yay!' })
  // And both firestore and the template will automatically be updated.

  // But there's more. You can also very simply
  // update a post and have that update automatically
  // be reflected in firestore and the template, by doing this:
  const firstPost = $posts[0]
  firstPost.title = 'New Title'

  // Come on, isn't that awesome?
</script>

<ul>
  {#each $posts as post}
    <li>{post.title}</li>    
  {/each}
</ul>
```
