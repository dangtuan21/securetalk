import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import "./HomeTab.css";
import { AppContext } from "../core/State";
import React, { useContext, useState } from "react";
import FriendItem from "../components/FriendItem";
const HomeTab = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <IonPage>
      <IonContent className="chat-screen">
        <IonList>
          {state.user.friends.map((friend: any) => (
            <FriendItem friend={friend} key={friend.user_id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
