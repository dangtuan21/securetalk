import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonInput,
  useIonViewWillLeave,
  useIonViewDidEnter,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonList,
} from "@ionic/react";
import "./HomeTab.css";
import { AppContext } from "../core/State";
import React, { useContext, useState } from "react";
import ContactItem from "../components/ContactItem";
import { fetchNotFriendContacts } from "../api/db-service";

const ContactsTab = () => {
  const { state, dispatch } = useContext(AppContext);
  let [contacts, setMessages]: [any[], any] = useState([]);

  const getContacts = async (user: any) => {
    return await fetchNotFriendContacts(user);
  };

  const refreshContactList = async () => {
    contacts = await getContacts(state.user);
    setMessages(contacts);
  };

  useIonViewDidEnter(async () => {
    await refreshContactList();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="login-bar">
          <IonSearchbar color="light"></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent className="chat-screen">
        <IonList>
          {contacts.map((contact: any) => (
            <ContactItem contact={contact} key={contact.user_id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ContactsTab;
