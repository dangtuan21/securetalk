import React, { useContext } from "react";
import { AppContext } from "./core/State";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  IonTitle,
  IonPage,
  IonHeader,
  IonContent,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import ChatTab from "./pages/ChatTab";
// import Tab2 from "./pages/Tab2";
// import Tab3 from "./pages/Tab3";
import Passcode from "./pages/Passcode";
import "./theme/style.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import ChatPage from "./pages/ChatPage";

const AppView = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <IonApp>
      {state.user ? (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={ChatTab} exact={true} />
              <Route path="/chatpage" component={ChatPage} exact={true} />
              <Route
                path="/"
                render={() => <Redirect to="/home" />}
                exact={true}
              />
            </IonRouterOutlet>
            {state.noTabs ? (
              <IonTabBar></IonTabBar>
            ) : (
              <IonTabBar slot="top" className="menu-bar">
                <IonTabButton tab="tab1" href="/tab1" className="tabButton">
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                {/* <IonTabButton tab="tab2" href="/tab2" className="tabButton">
                  <IonLabel>STATUS</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3" className="tabButton">
                  <IonLabel>CALLS</IonLabel>
                </IonTabButton> */}
              </IonTabBar>
            )}
          </IonTabs>
        </IonReactRouter>
      ) : (
        <Passcode />
      )}
    </IonApp>
  );
};
export default AppView;
