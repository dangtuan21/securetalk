// import firebase from "firebase/app";
// import "firebase/auth";
// import { auth } from "./firebase";
// export const auth = firebase.auth();
import db from "./FireStore";
export const register = async ({ email, password }) => {
  const resp = await db.auth().createUserWithEmailAndPassword(email, password);
  return resp.user;
};

export const login = async ({ email, password }) => {
  const res = await db.auth().signInWithEmailAndPassword(email, password);
  return res.user;
};
