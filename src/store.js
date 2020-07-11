import { authState } from 'rxfire/auth'
import { filter } from 'rxjs/operators'
import { collectionData } from './rxfire'

let fb, firebaseConfig

if (process.browser) {
  fb = firebase
  firebaseConfig = {
    apiKey: 'AIzaSyA1KyA-IPdV18EbhjVwtCs_DiACWI_l3po',
    authDomain: 'mytryout-246d2.firebaseapp.com',
    databaseURL: 'https://mytryout-246d2.firebaseio.com',
    projectId: 'mytryout-246d2',
    storageBucket: 'mytryout-246d2.appspot.com',
    messagingSenderId: '283873800239',
    appId: '1:283873800239:web:aee2367ae33287cf07d6da'
  }
} else {
  fb = require('firebase-admin')
  firebaseConfig = process.env.FIREBASE_ADMIN_AUTH

  if (typeof firebaseConfig === 'string') {
    firebaseConfig = JSON.parse(serviceAccount)
  }

  firebaseConfig = {
    credential: fb.credential.cert(firebaseConfig),
    databaseURL: 'https://mytryout-246d2.firebaseio.com'
  }
}

const app = fb.initializeApp(firebaseConfig)

const user = authState(app.auth()).pipe(filter(user => user !== null))
const db = app.firestore()
if (db.enablePersistence) db.enablePersistence()

const postsRef = db.collection('posts')
const posts = collectionData(postsRef)

export { db, user, posts }
