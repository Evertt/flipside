import { db } from './firebase'
import { readable } from 'svelte/store'

export function collection(ref, query) {
  if (typeof ref === 'string')
    ref = db.collection(ref)

  if (!query) query = ref

  const store = readable([], set => {
    const unsubscribe = query.onSnapshot(
      snapshot => set(snapshot.docs.map(
        doc => new Proxy(doc.data(), {
          set(target, prop, newValue) {
            return ref.doc(doc.id).update({
              [prop]: newValue,
              updated: new Date()
            })
          }
        })
      ))
    )

    return () => unsubscribe()
  })

  store.add = doc => ref.add(doc)

  return new Proxy(store, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(...arguments)
      }

      if (prop in query && typeof query[prop] === 'function') {
        const queryFunc = Reflect.get(query, prop, receiver).bind(query)

        return function() {
          const newQuery = queryFunc(...arguments)
          return collection(ref, newQuery)
        }
      }
    }
  })
}

export const preloader = store => ({ params }) => new Promise(
  resolve => store.subscribe(
    data => data.length && resolve(params)
  )
)
