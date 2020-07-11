import * as admin from 'firebase-admin'

let serviceAccount = process.env.FIREBASE_ADMIN_AUTH as string|object

if (typeof serviceAccount === 'string') {
    serviceAccount = JSON.parse(serviceAccount)
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mytryout-246d2.firebaseio.com'
})

export default admin.firestore()
