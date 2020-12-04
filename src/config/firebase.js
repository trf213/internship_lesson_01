import firebase from "firebase/app";

// Add the Firebase services that you want to use
// import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};
// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    console.log('Firebase already initialized')
}
// firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default db;