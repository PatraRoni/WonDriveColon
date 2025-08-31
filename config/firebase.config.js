const Firebase = require('firebase-admin')

const serviceAccount = require('../drive-f3038-firebase-adminsdk-fbsvc-969183edc0.json')

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket:'drive-f3038.firebasestorage.app'
})

module.exports = Firebase;