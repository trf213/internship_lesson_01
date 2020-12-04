import firebase from "firebase/app";

// Add the Firebase services that you want to use
// import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBzoy-vk0VIHIBudLO4RniEMnTC7to4qrI",
    authDomain: "webstart-internship.firebaseapp.com",
    projectId: "webstart-internship",
    storageBucket: "webstart-internship.appspot.com",
    messagingSenderId: "226681063197",
    appId: "1:226681063197:web:91e17ae0907f2bd6cb83f4",
    measurementId: "G-J136N87V9P"
};
// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    console.log('Firebase already initialized', err)
}

const db = firebase.firestore()

export default db;