import * as admin from 'firebase-admin'
import * as serviceAccount from './firebase.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mytryout-246d2.firebaseio.com'
})

export default admin.firestore()