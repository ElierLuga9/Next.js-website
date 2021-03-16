const firebase = require('firebase-admin');

const serviceAccount = require('../../../outer-reach-beyond-firebase-adminsdk-nnza0-caa011208b.json')
if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://outer-reach-beyond.firebaseio.com"
    });
}
const firebaseDB = firebase.database()

export default firebaseDB