import * as admin from 'firebase-admin'
import * as serviceAccount from './firebase.json'

const params = serviceAccount as any

admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: 'https://mytryout-246d2.firebaseio.com'
})

export default admin.firestore()