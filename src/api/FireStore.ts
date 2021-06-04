import firebase from "firebase";
import dbConfig from "./db-config.json";
const db = firebase.initializeApp(dbConfig).firestore();

export default db;
