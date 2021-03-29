import {
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import React from "react";
import ExploreContainer from "../components/ExploreContainer";
import { useGetInfo } from "@ionic/react-hooks/device";
import { useCurrentPosition } from "@ionic/react-hooks/geolocation";
import "./Home.css";

const { OpenMap } = Plugins;

const Home: React.FC = () => {
  const { info } = useGetInfo();
  const { currentPosition } = useCurrentPosition();
  const clickOpenMap = () => {
    const {
      coords: { longitude, latitude },
    } = currentPosition || { coords: {} };
    OpenMap.echo({
      value: `Your current location is latitude: ${latitude}, latitude: ${longitude}`,
    });
    OpenMap.open({
      longitude,
      latitude,
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer /> */}
        <IonLabel>{JSON.stringify(info)}</IonLabel>
        <hr />
        <IonLabel>{JSON.stringify(currentPosition)}</IonLabel>
        <hr />
        <IonButton onClick={clickOpenMap}>Open Map</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
