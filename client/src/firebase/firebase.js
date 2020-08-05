import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBTQ6fPkRWFhLVx8u7KBggwmH3PmrkAmrk",
    authDomain: "postbook-1dd86.firebaseapp.com",
    databaseURL: "https://postbook-1dd86.firebaseio.com",
    projectId: "postbook-1dd86",
    storageBucket: "postbook-1dd86.appspot.com",
    messagingSenderId: "499792115564",
    appId: "1:499792115564:web:a7496f9405aa3da2016549",
    measurementId: "G-VD8FKGE37R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  const storage =firebase.storage();
  
  export {
      storage,firebase as default
  }