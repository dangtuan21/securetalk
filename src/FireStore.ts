import firebase from "firebase";

const firebaseConfig: any = {
  apiKey: "AIzaSyDjN_xR7YEwoGR9wED9erh6KNFXKPeyyX4",
  authDomain: "td-app3.firebaseapp.com",
  databaseURL: "https://td-app3-default-rtdb.firebaseio.com",
  projectId: "td-app3",
  storageBucket: "td-app3.appspot.com",
  messagingSenderId: "762295805235",
  appId: "1:762295805235:web:eb385cf97c6f78767dca46",
  measurementId: "G-8T7374G5QP",
};

const db = firebase.initializeApp(firebaseConfig).firestore();

export default db;
