import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyASOWQEarTTPccr2Od2u9NED4yXJmxQCdY",
  authDomain: "react-coder-988f2.firebaseapp.com",
  projectId: "react-coder-988f2",
  storageBucket: "react-coder-988f2.appspot.com",
  messagingSenderId: "8432269802",
  appId: "1:8432269802:web:bdeb94edd2e56da6471a93"
}

const app = firebase.initializeApp(firebaseConfig);

export function getFirestore () {
  return firebase.firestore(app);
}