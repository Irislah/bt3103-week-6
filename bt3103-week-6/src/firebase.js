import firebase from "firebase"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA89lLc1OkdmzHPt7u4ACXskgx68upk8do",
  authDomain: "bt3103-week-6-af836.firebaseapp.com",
  projectId: "bt3103-week-6-af836",
  storageBucket: "bt3103-week-6-af836.appspot.com",
  messagingSenderId: "888909654350",
  appId: "1:888909654350:web:528deff7797efbb9c1d61f",
  measurementId: "G-21PFYHTBED"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;