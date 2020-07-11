import { __assign } from 'tslib'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

function fromRef(ref, options) {
  return new Observable(function (subscriber) {
    var unsubscribe = process.browser
      ? ref.onSnapshot(options || {}, subscriber)
      : ref.onSnapshot(
        subscriber.next.bind(subscriber),
        subscriber.error.bind(subscriber)
      );

    return { unsubscribe: unsubscribe };
  });
}

function fromCollectionRef(ref, options) {
  return fromRef(ref, options);
}

function snapToData(snapshot, idField) {
  var _a;
  return __assign(__assign({}, snapshot.data()), (idField ? (_a = {}, _a[idField] = snapshot.id, _a) : null));
}

/**
 * Return a stream of document snapshots on a query. These results are in sort order.
 * @param query
 */
function collection(query) {
  return fromCollectionRef(query)
    .pipe(map(function (changes) { return changes.docs; }))
  ;
}

/**
 * Returns a stream of documents mapped to their data payload, and optionally the document ID
 * @param query
 */
export function collectionData(query, idField) {
  return collection(query).pipe(map(function (arr) {
    return arr.map(function (snap) { return snapToData(snap, idField); });
  }));
}