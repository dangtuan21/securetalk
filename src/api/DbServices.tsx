import { firebaseApp, firestoreDb } from "./FireStore";
import { uuid } from "uuidv4";

export const signUp = async ({ name, email, password }: any) => {
  const resp = await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password);
  const signedUpUser: any = resp.user;
  const userId = uuid();

  let newUser: any = {
    authId: signedUpUser.uid,
    name,
    email,
    passcode: "0000",
    avatar:
      "https://images.pexels.com/photos/5968120/pexels-photo-5968120.jpeg",
    last_seen: "0",
    friends: [],
    userId,
  };

  const docRef = await firestoreDb.collection("users").doc(userId);
  await docRef.set(newUser);
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
  onSnapshotCB,
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
    fetchData = await prefetchData.limit(limit).onSnapshot(onSnapshotCB);
  } else {
    fetchData = await prefetchData.onSnapshot(onSnapshotCB);
  }

  return fetchData;
};

export const fetchNotFriendContacts = async (user: any) => {
  //  find users which does not exist in user.friends
  let emails = user.friends.map((item: any) => item.email);
  emails = emails || [];
  emails.push(user.email);

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
  await docRef.doc(user.userId).update({ friends: friends });
};

export const sendMessageBody = async (messageBody: any) => {
  const docRef = await firestoreDb
    .collection("messages")
    .doc(messageBody.messageId);
  await docRef.set(messageBody);
};
