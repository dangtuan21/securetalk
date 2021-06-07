import firebase from "firebase";
import dbConfig from "./db-config.json";
const firebaseApp = firebase.initializeApp(dbConfig);
const firestoreDb = firebaseApp.firestore();

export { firebaseApp, firestoreDb };
export default firestoreDb;
