import React, { useContext, useRef, useState } from "react";
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
import { fetchMessages, sendMessageBody } from "../api/DbServices";
import { sendSharp, happyOutline, linkOutline } from "ionicons/icons";

import ChatMessage from "../components/ChatMessage";
import { uuid } from "uuidv4";

import { Camera, CameraResultType, Photo } from "@capacitor/camera";

const ChatPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [message, setMessage]: [string, any] = useState("");
  let [messages, setChatMessages]: [any[], any] = useState([]);
  let messageSubscription: any = useRef(null);

  const onSnapshotCB = (querySnapshot: any) => {
    const messages: any[] = [];
    querySnapshot.forEach(function (doc: any) {
      messages.push(doc.data());
    });
    setChatMessages(messages);
  };
  const refreshChatSession = async () => {
    let channel1 = `${state.user.userId},${state.chattingWith.userId}`;
    let channel2 = `${state.chattingWith.userId},${state.user.userId}`;
    return await fetchMessages({ channel1, channel2, onSnapshotCB });
  };
  useIonViewDidEnter(async () => {
    messageSubscription.current = await refreshChatSession();
    console.log("messageSubscription unscribed");
  });

  useIonViewWillLeave(() => {
    dispatch({
      type: "setNoTabs",
      payload: false,
    });

    messageSubscription.current();
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
        messageId: uuid(),
        sent_by: state.user.userId,
        channel: `${state.user.userId},${state.chattingWith.userId}`,
        type: type,
        message: message || "",
        file_url: file,
        time: +Date.now(),
      };
      await sendMessageBody(messageBody);
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
        {messages.map((chat: any) => (
          <ChatMessage key={chat.messageId} chat={chat} />
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
