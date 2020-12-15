import firebase from 'firebase';
import 'firebase/firestore';
const settings= {timestampsInSnapshots: true};

var firebaseConfig = {
    apiKey: "AIzaSyAkIo___UYfCh2zJKcq5u0kAzq3jLddGQo",
    authDomain: "thetamiddleware-c7193.firebaseapp.com",
    projectId: "thetamiddleware-c7193",
    storageBucket: "thetamiddleware-c7193.appspot.com",
    messagingSenderId: "627186525590",
    appId: "1:627186525590:web:04726b6b99c1456c8669b7",
    measurementId: "G-L49C0K4TE8"
  };
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
  const db= firebase.firestore();
  //const fr= firebase.storage();
  //var database=firebase.database();
  //firebase.analytics();
  //firebase.firestone().settings(settings);

  export default  db ;