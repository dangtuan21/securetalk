import { firebaseApp, firestoreDb } from "./FireStore";
export const signUp = async ({ name, email, password }: any) => {
  const resp = await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password);

  const signedUpUser: any = resp.user;
  const newUser = {
    user_id: signedUpUser.uid,
    name,
    email,
    passcode: "0000",
    avatar:
      "https://images.pexels.com/photos/5968120/pexels-photo-5968120.jpeg",
    last_seen: "0",
    contacts: [
      {
        user_id: "125489007",
        name: "John Doe", //ttt fake
        avatar:
          "https://images.pexels.com/photos/208139/pexels-photo-208139.jpeg",
      },
    ],
  };

  await firestoreDb.collection("users").add(newUser);

  return newUser;
};

export const signIn = async ({ email, password }: any) => {
  const resp = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password);

  const signedInUser: any = resp.user;
  const fetchUser = await firestoreDb
    .collection("users")
    .where("email", "==", signedInUser.email)
    .get();
  let user;
  fetchUser.forEach((doc) => {
    debugger;
    user = doc.data();
  });
  console.log(user);
  return user;
};
