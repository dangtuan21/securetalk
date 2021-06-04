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
import "./ChatTab.css";
import { AppContext } from "../core/State";
import React, { useContext, useState } from "react";
import ChatItem from "../components/ChatItem";
const ChatTab = () => {
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

export default ChatTab;
