import * as cookie from 'cookie'
import * as store from 'svelte/store'
import * as internal from 'svelte/internal'

function isSimpleDeriver(deriver) {
  return deriver.length < 2;
}
function generator(storage) {
  /**
   * Creates a `Readable` store that allows reading by subscription.
   * @param key storage key
   * @param value initial value
   * @param {StartStopNotifier}start start and stop notifications for subscriptions
   */
  function readable(key, value, start) {
    return {
      subscribe: writable(key, value, start).subscribe
    };
  }
  /**
   * Create a `Writable` store that allows both updating and reading by subscription.
   * @param key storage key
   * @param {*=}value default value
   * @param {StartStopNotifier=}start start and stop notifications for subscriptions
   */
  function writable(key, value, start = internal.noop) {
    function wrap_start(ogSet) {
      return start(function wrap_set(new_value) {
        if (storage) {
          storage.setItem(key, JSON.stringify(new_value));
        }
        return ogSet(new_value);
      });
    }
    if (storage) {
      if (storage.getItem(key)) {
        value = JSON.parse(storage.getItem(key));
      }
      storage.setItem(key, JSON.stringify(value));
    }
    const ogStore = store.writable(value, start ? wrap_start : undefined);
    function set(new_value) {
      if (storage) {
        storage.setItem(key, JSON.stringify(new_value));
      }
      ogStore.set(new_value);
    }
    function update(fn) {
      set(fn(store.get(ogStore)));
    }
    function subscribe(run, invalidate = internal.noop) {
      return ogStore.subscribe(run, invalidate);
    }
    return { set, update, subscribe };
  }
  /**
   * Derived value store by synchronizing one or more readable stores and
   * applying an aggregation function over its input values.
   * @param key storage key
   * @param {Stores} stores input stores
   * @param {function(Stores=, function(*)=):*}fn function callback that aggregates the values
   * @param {*=}initial_value when used asynchronously
   */
  function derived(key, stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
      ? [stores]
      : stores;
    if (storage && storage.getItem(key)) {
      initial_value = JSON.parse(storage.getItem(key));
    }
    return readable(key, initial_value, (set) => {
      let inited = false;
      const values = [];
      let pending = 0;
      let cleanup = internal.noop;
      const sync = () => {
        if (pending) {
          return;
        }
        cleanup();
        const input = single ? values[0] : values;
        if (isSimpleDeriver(fn)) {
          set(fn(input));
        }
        else {
          const result = fn(input, set);
          cleanup = internal.is_function(result) ? result : internal.noop;
        }
      };
      const unsubscribers = stores_array.map((store, i) => store.subscribe((value) => {
        values[i] = value;
        pending &= ~(1 << i);
        if (inited) {
          sync();
        }
      }, () => {
        pending |= (1 << i);
      }));
      inited = true;
      sync();
      return function stop() {
        internal.run_all(unsubscribers);
        cleanup();
      };
    });
  }
  return {
    readable,
    writable,
    derived,
    get: store.get
  };
}

let storage
export let readable, writable, derived, get

function initServerStorage(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '')

  return {
    getItem: key => cookies[key],
    setItem(key, value) {
      cookies[key] = value
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(`${key}`, `${value}`)
      )
    }
  }
}

function initClientStorage() {
  const cookies = cookie.parse(document.cookie || '')

  return {
    getItem: key => cookies[key],
    setItem(key, value) {
      cookies[key] = value
      document.cookie = Object.entries(cookies)
        .map(([key, value]) => cookie.serialize(`${key}`, `${value}`))
        .join('; ')
    }
  }
}

export function initStore(req, res) {
  if (process.browser) {
    storage = initClientStorage()
  } else {
    storage = initServerStorage(req, res)
  }

  ({ readable, writable, derived, get } = generator(storage))
}
