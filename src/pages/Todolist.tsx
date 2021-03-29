import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonAlert,
  useIonViewDidLeave,
  useIonViewDidEnter,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonActionSheet,
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { add, trashBin, copy } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import Todo from "../components/Todo";

const todos = [
  { id: 1, name: "Go To Work", deadline: 5 },
  { id: 2, name: "Buy a Skooldio Course", deadline: 2 },
  { id: 3, name: "Finish a Skooldio Course", deadline: 1 },
];

const { Haptics } = Plugins;

const Todolist: React.FC<RouteComponentProps> = (props) => {
  useIonViewWillEnter(() => console.log("Ion View Will Enter Todo page"));
  useIonViewDidEnter(() => console.log("Ion View Did Enter Todo page"));
  useIonViewWillLeave(() => console.log("Ion View Will Leave Todo page"));
  useIonViewDidLeave(() => console.log("Ion View Did Leave Todo page"));

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todolist Auttapol</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Todolist Auttapol</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {todos.map((todo, i) => {
            return (
              <Todo
                {...todo}
                key={i}
                onClick={() => {
                  setShowActionSheet(true);
                  setSelectedId(todo.id);
                  Haptics.vibrate();
                }}
              />
            );
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => props.history.push("/new")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonActionSheet
          isOpen={showActionSheet}
          buttons={[
            {
              text: "Delete",
              icon: trashBin,
              role: "destructive", // only ios
              handler: () => {
                alert(`Delete Task ${selectedId}`);
              },
            },
            {
              text: "Duplicate",
              icon: copy,
              handler: () => {
                alert(`Duplicate Task ${selectedId}`);
              },
            },
          ]}
          onDidDismiss={() => setShowActionSheet(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Todolist;
