import React, { useState, useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonButton,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonAlert,
  IonIcon,
} from "@ionic/react";

import "../theme/style.css";

import { signIn } from "../api/db-service";
import { AppContext } from "../core/State";
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router";

function validateEmail(email: string) {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}
const SignIn = () => {
  const [name, setName]: [string, any] = useState("");
  const [email, setEmail]: [string, any] = useState("");
  const [password, setPassword]: [string, any] = useState("");
  const [showLoading, setShowLoading]: [boolean, any] = useState(false);
  const [message, setMessage]: [string, any] = useState("");
  const [iserror, setIserror]: [boolean, any] = useState(false);

  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  const handleSignIn = async () => {
    if (!email) {
      setMessage("Please enter a valid email");
      setIserror(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage("Your email is invalid");
      setIserror(true);
      return;
    }

    if (!password || password.length < 6) {
      setMessage("Your password must be at least 6 characters length");
      setIserror(true);
      return;
    }

    setShowLoading(true);

    const user = await signIn({ email, password });
    dispatch({
      type: "loadUser",
      payload: { user },
    });

    dispatch({
      type: "setNoTabs",
      payload: false,
    });

    setShowLoading(false);

    history.push("/home");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleSignIn}>
                Sign In
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
          duration={5000}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
