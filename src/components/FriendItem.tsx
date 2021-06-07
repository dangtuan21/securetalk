import React, { useContext, useRef, useState, useEffect } from "react";

import {
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  useIonViewDidEnter,
} from "@ionic/react";

import { AppContext } from "../core/State";
import { useHistory } from "react-router";
import { fetchMessages } from "../api/db-service";

const FriendItem = ({ friend }: any) => {
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

  let history = useHistory();

  let profile_image =
    friend.avatar ||
    "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0=";

  useIonViewDidEnter(async () => {
    let channel1 = `${state.user.userId},${friend.userId}`;
    let channel2 = `${friend.userId},${state.user.userId}`;

    const limit = 1;
    const orderBy = "desc";

    const messages: any[] = await fetchMessages({
      channel1,
      channel2,
      limit,
      orderBy,
    });
    if (messages.length > 0) {
      setPreviousLastMessage(lastMessage);

      setLastMessage(messages[0]);
    }
  });

  const goToChat = () => {
    dispatch({
      type: "setNoTabs",
      payload: true,
    });
    dispatch({
      type: "setChattingWith",
      payload: friend,
    });
    history.push("/chatpage");
  };
  return (
    <IonItem onClick={() => goToChat()}>
      <IonAvatar slot="start">
        <img src={profile_image} alt="icon" />
      </IonAvatar>
      <IonLabel>
        <h2>{friend.name}</h2>
        <p>{lastMessage.message || "..."}</p>
      </IonLabel>
      {newMessageCount > 0 && (
        <IonBadge color="success" slot="end">
          {newMessageCount}
        </IonBadge>
      )}
    </IonItem>
  );
};

export default FriendItem;
