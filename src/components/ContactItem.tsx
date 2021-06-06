import React, { useContext, useRef, useState, useEffect } from "react";

import {
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  useIonViewDidEnter,
  IonButton,
  IonIcon,
} from "@ionic/react";

import { AppContext } from "../core/State";
import { useHistory } from "react-router";
import firestoreDb from "../api/FireStore";

const ContactItem = ({ friend }: any) => {
  const { state, dispatch } = useContext(AppContext);
  const [lastMessage, setLastMessage]: [any, any] = useState({});
  const [newMessageCount, setNewMessageCount]: [number, any] = useState(0);
  const [previousLastMessage, setPreviousLastMessage]: [any, any] = useState(
    {}
  );

  useEffect(() => {
    if (lastMessage.message_id !== previousLastMessage.message_id) {
      setNewMessageCount(newMessageCount + 1);
    }
  }, [lastMessage]);

  let history = useHistory();

  let profile_image =
    friend.avatar ||
    "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0=";

  let messageSubscription: any = useRef(null);

  useIonViewDidEnter(async () => {
    let channel1 = `${state.user.user_id},${friend.user_id}`;
    let channel2 = `${friend.user_id},${state.user.user_id}`;

    messageSubscription = await firestoreDb
      .collection("messages")
      .where("channel", "in", [channel1, channel2])
      .orderBy("time", "desc")
      .limit(1)
      .onSnapshot(function (querySnapshot) {
        const messages: any[] = [];
        querySnapshot.forEach(function (doc) {
          messages.push(doc.data());
        });

        if (messages.length > 0) {
          setPreviousLastMessage(lastMessage);

          setLastMessage(messages[0]);
        }
      });
  });
  const addFriend = async (type: string = "text", file: string | undefined) => {
    console.log("ttt");
  };
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={profile_image} alt="icon" />
      </IonAvatar>
      <IonLabel>
        <h2>{friend.name}</h2>
      </IonLabel>
      <IonBadge color="medium" slot="end" onClick={() => addFriend("text", "")}>
        Add
      </IonBadge>
    </IonItem>
  );
};

export default ContactItem;
