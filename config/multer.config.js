const multer = require('multer');
const firebasestorage = require("multer-firebase-storage");
const firebaseAdmin = require("firebase-admin"); // Import admin module directly
const serviceAccount = require("../driveclone-2ef73-firebase-adminsdk-fbsvc-46ed5faf8a.json");

const storage = firebasestorage({
    credentials: firebaseAdmin.credential.cert(serviceAccount), // Use admin module here
    bucketName: 'driveclone-2ef73.firebasestorage.app',
    unique: true,
});

const upload = multer({
    storage: storage
});

module.exports = upload;