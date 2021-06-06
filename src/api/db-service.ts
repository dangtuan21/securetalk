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
    friends: [
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
    user = doc.data();
  });
  return user;
};
export const fetchMessages = async ({
  channel1,
  channel2,
  limit = 0,
  orderBy = "",
}: any) => {
  let prefetchData = await firestoreDb
    .collection("messages")
    .where("channel", "in", [channel1, channel2]);

  if (orderBy) {
    prefetchData = await prefetchData.orderBy("time", orderBy);
  } else {
    prefetchData = await prefetchData.orderBy("time");
  }

  let fetchData: any = {};
  if (limit) {
    fetchData = await prefetchData.limit(limit).get();
  } else {
    fetchData = await prefetchData.get();
  }
  const messages: any[] = [];
  fetchData.forEach((doc: any) => {
    messages.push(doc.data());
  });
  return messages;
};

export const fetchNotFriendContacts = async (user: any) => {
  const emails = user.friends.map((item: any) => item.email);
  emails.push(user.email);

  //  find users which does not exist in user.friends
  let fetchData = await firestoreDb
    .collection("users")
    .where("email", "not-in", emails)
    .get();

  const users: any[] = [];
  fetchData.forEach((doc: any) => {
    users.push(doc.data());
  });
  return users;
};

export const addFriendToUser = async (user: any, friend: any) => {
  const docRef = await firestoreDb.collection("users");
  const friends = [...user.friends];
  friends.push(friend);
  docRef.doc(user.user_id).update({ friends: friends });
  // .then((_) => print("Success"))
  // .catchError((error) => print("Failed: $error"));
};

export const sendMessageBody = async (messageBody: any) => {
  await firestoreDb.collection("messages").add(messageBody);
};
