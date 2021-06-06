import React, { useContext, useState, useRef } from "react";
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
} from "@ionic/react";

import { AppContext } from "../core/State";
import firestoreDb from "../api/FireStore";
import { sendSharp, happyOutline, linkOutline } from "ionicons/icons";

import Utility from "../core/Utility";
import ChatMessage from "../components/ChatMessage";

import { Camera, CameraResultType, Photo } from "@capacitor/camera";

const ChatPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [message, setMessage]: [string, any] = useState("");
  const [chatMessages, setChatMessages]: [any[], any] = useState([]);

  let messageSubscription: any = useRef(null);

  useIonViewDidEnter(async () => {
    let channel1 = `${state.user.user_id},${state.chattingWith.user_id}`;
    let channel2 = `${state.chattingWith.user_id},${state.user.user_id}`;

    messageSubscription = await firestoreDb
      .collection("messages")
      .where("channel", "in", [channel1, channel2])
      .orderBy("time")
      .limit(100)
      .onSnapshot(function (querySnapshot) {
        const messages: any[] = [];
        querySnapshot.forEach(function (doc) {
          messages.push(doc.data());
        });

        setChatMessages(messages);

        console.log(messages);
      });
  });

  useIonViewWillLeave(() => {
    dispatch({
      type: "setNoTabs",
      payload: false,
    });

    //Unsubscribe
    messageSubscription();
  });

  const getImage = async () => {
    const image: Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });

    await sendMessage("media", image.base64String);
  };

  const sendMessage = async (
    type: string = "text",
    file: string | undefined
  ) => {
    if (message || type === "media") {
      let messageBody = {
        message_id: Utility.genRandom(),
        sent_by: state.user.user_id,
        channel: `${state.user.user_id},${state.chattingWith.user_id}`,
        type: type,
        message: message || "",
        file_url: file,
        time: +Date.now(),
      };
      console.log("ttt mess", messageBody);
      await firestoreDb.collection("messages").add(messageBody);
      setMessage("");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="login-bar">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle slot="end">{state.chattingWith.name}</IonTitle>
          <IonAvatar
            slot="end"
            style={{ width: "40px", height: "40px", marginLeft: "10px" }}
          >
            <img src={state.chattingWith.avatar} alt="Profile" />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="chat-page-content">
        {chatMessages.map((chat: any) => (
          <ChatMessage key={chat.message_id} chat={chat} />
        ))}
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonGrid>
                  <IonRow>
                    <IonCol size="2">
                      <IonIcon icon={happyOutline} size="large"></IonIcon>
                    </IonCol>
                    <IonCol>
                      <IonInput
                        value={message}
                        placeholder="Type a message"
                        onIonChange={(e: any) => setMessage(e.detail.value)}
                      ></IonInput>
                    </IonCol>
                    <IonCol size="2">
                      <IonIcon
                        icon={linkOutline}
                        size="large"
                        className="media-icon"
                        onClick={() => getImage()}
                      ></IonIcon>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
              <IonCol size="2">
                <IonButton
                  className="chat-send-button"
                  onClick={() => sendMessage("text", "")}
                >
                  <IonIcon icon={sendSharp} size="large"></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ChatPage;
