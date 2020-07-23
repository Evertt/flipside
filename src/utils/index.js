export function throttle(fn, ...delays) {
  let t1, t2, activeDelay = 0

  return function() {
    if (t2) {
      clearTimeout(t2)
      t2 = undefined
    }

    if (t1) {
      return
    }

    t1 = setTimeout(() => {
      fn(...arguments)
      t1 = undefined

      // Increment the active delay each time
      // and then stick with the last one.
      activeDelay = Math.min(++activeDelay, delays.length - 1)

      // Set a 2nd `Timeout` that resets the
      // active delay back to the first one.
      setTimeout(() => {
        activeDelay = 0
        t2 = undefined
      }, delays[activeDelay])

    }, delays[activeDelay])
  }
}
