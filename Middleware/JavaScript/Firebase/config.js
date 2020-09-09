import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDqAgqoLmh9z2pgyL_hXjcRunrEHLkb1jk",
    authDomain: "thetamiddlewarefirebase.firebaseapp.com",
    databaseURL: "https://thetamiddlewarefirebase.firebaseio.com",
    projectId: "thetamiddlewarefirebase",
    storageBucket: "thetamiddlewarefirebase.appspot.com",
    messagingSenderId: "206090277041",
    appId: "1:206090277041:web:794b8db0c320be75f49290",
    measurementId: "G-93K5SCZBRJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();