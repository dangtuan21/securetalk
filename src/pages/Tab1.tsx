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
import "./Tab1.css";
import { AppContext } from "../State";
import React, { useContext, useState } from "react";
import ChatItem from "../components/ChatItem";
const Tab1 = () => {
  const { state, dispatch } = useContext(AppContext);
  console.log("ttt state", state);

  return (
    <IonPage>
      <IonContent className="chat-screen">
        <IonList>
          {state.user.contacts.map((contact: any) => (
            <ChatItem contact={contact} key={contact.user_id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
