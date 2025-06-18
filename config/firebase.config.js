const Firebase = require("firebase-admin");

const serviceAccount = require("../driveclone-2ef73-firebase-adminsdk-fbsvc-46ed5faf8a.json");

const firebase = Firebase.initializeApp({
  credential:Firebase.credential.cert(serviceAccount),
  storageBucket: 'driveclone-2ef73.firebasestorage.app'
});


module.exports = Firebase;   