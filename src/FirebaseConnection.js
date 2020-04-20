import firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyB8q0mV2SD52Ecwy-Vj1jftBSV_wsz0Zqw",
    authDomain: "react-api-2c848.firebaseapp.com",
    databaseURL: "https://react-api-2c848.firebaseio.com",
    projectId: "react-api-2c848",
    storageBucket: "react-api-2c848.appspot.com",
    messagingSenderId: "671275236674",
    appId: "1:671275236674:web:8c4b5bd4c0d4cbbe9cdcdb",
    measurementId: "G-WVQ405Z0ZY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase