const multer = require('multer')
const firebasestorage = require('multer-firebase-storage')
const firebase = require('./firebase.config')
const serviceAccount = require('../drive-f3038-firebase-adminsdk-fbsvc-969183edc0.json')


const storage = firebasestorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName:'drive-f3038.firebasestorage.app',
    unique:true
})

const uplod = multer({
    storage:storage,
    
})

module.exports = uplod;