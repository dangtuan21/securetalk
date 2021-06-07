import React, { useContext, useState } from "react";
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
import { fetchMessages, sendMessageBody } from "../api/db-service";
import { sendSharp, happyOutline, linkOutline } from "ionicons/icons";

import Utility from "../core/Utility";
import ChatMessage from "../components/ChatMessage";

import { Camera, CameraResultType, Photo } from "@capacitor/camera";

const ChatPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [message, setMessage]: [string, any] = useState("");
  let [messages, setChatMessages]: [any[], any] = useState([]);

  const getMessages = async ({ channel1, channel2 }: any) => {
    return await fetchMessages({ channel1, channel2 });
  };

  const refreshChatSession = async () => {
    let channel1 = `${state.user.authId},${state.chattingWith.authId}`;
    let channel2 = `${state.chattingWith.authId},${state.user.authId}`;
    messages = await getMessages({ channel1, channel2 });
    setChatMessages(messages);
  };
  useIonViewDidEnter(async () => {
    await refreshChatSession();
  });

  useIonViewWillLeave(() => {
    dispatch({
      type: "setNoTabs",
      payload: false,
    });
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
        sent_by: state.user.authId,
        channel: `${state.user.authId},${state.chattingWith.authId}`,
        type: type,
        message: message || "",
        file_url: file,
        time: +Date.now(),
      };
      await sendMessageBody(messageBody);
      setMessage("");
      await refreshChatSession();
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
