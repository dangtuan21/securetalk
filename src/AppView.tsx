import { useContext } from "react";
import { AppContext } from "./core/State";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomeTab from "./pages/HomeTab";
import ContactsTab from "./pages/ContactsTab";
import Passcode from "./pages/Passcode";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
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
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              path="/"
              render={() => <Redirect to="/home" />}
              exact={true}
            />
            <Route path="/home" component={HomeTab} exact={true} />
            <Route path="/contacts" component={ContactsTab} exact={true} />
            <Route path="/chatpage" component={ChatPage} exact={true} />
            <Route path="/passcode" component={Passcode} exact={true} />
            <Route path="/signup" component={SignUp} exact={true} />
            <Route path="/signin" component={SignIn} exact={true} />
          </IonRouterOutlet>
          {state.noTabs ? (
            <IonTabBar></IonTabBar>
          ) : (
            <IonTabBar slot="top" className="menu-bar">
              <IonTabButton tab="home" href="/home" className="tabButton">
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton
                tab="contacts"
                href="/contacts"
                className="tabButton"
              >
                <IonLabel>Contacts</IonLabel>
              </IonTabButton>
              {/* <IonTabButton tab="tab3" href="/tab3" className="tabButton">
                  <IonLabel>CALLS</IonLabel>
                </IonTabButton> */}
            </IonTabBar>
          )}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};
export default AppView;
