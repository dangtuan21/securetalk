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
import React, { useContext } from "react";
import ContactItem from "../components/ContactItem";
const ContactsTab = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="login-bar">
          <IonSearchbar color="light"></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent className="chat-screen">
        <IonList>
          {state.user.friends.map((friend: any) => (
            <ContactItem friend={friend} key={friend.user_id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ContactsTab;
