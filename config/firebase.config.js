const Firebase = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_JSON);

const firebase = Firebase.initializeApp({
  credential:Firebase.credential.cert(serviceAccount),
  storageBucket: 'driveclone-2ef73.firebasestorage.app'
});


module.exports = Firebase;   