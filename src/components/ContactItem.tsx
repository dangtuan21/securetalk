import React, { useContext, useRef, useState, useEffect } from "react";

import { IonItem, IonAvatar, IonLabel, IonBadge } from "@ionic/react";

import { AppContext } from "../core/State";
import { addFriendToUser } from "../api/DbServices";

const ContactItem = ({ contact }: any) => {
  const { state, dispatch } = useContext(AppContext);
  const [lastMessage, setLastMessage]: [any, any] = useState({});
  const [newMessageCount, setNewMessageCount]: [number, any] = useState(0);
  const [previousLastMessage, setPreviousLastMessage]: [any, any] = useState(
    {}
  );

  useEffect(() => {
    if (lastMessage.messageId !== previousLastMessage.messageId) {
      setNewMessageCount(newMessageCount + 1);
    }
  }, [lastMessage]);

  let profile_image =
    contact.avatar ||
    "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0=";

  const addFriend = async () => {
    const user = state.user;
    const friend = Object.assign({}, contact);
    delete friend.friends;
    await addFriendToUser(user, friend);
    dispatch({
      type: "loadUser",
      payload: { user },
    });
  };
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={profile_image} alt="icon" />
      </IonAvatar>
      <IonLabel>
        <h2>{contact.name}</h2>
      </IonLabel>
      <IonBadge color="medium" slot="end" onClick={() => addFriend()}>
        Add
      </IonBadge>
    </IonItem>
  );
};

export default ContactItem;
