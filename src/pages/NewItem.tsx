import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButton,
  IonIcon,
  IonLabel,
  IonInput,
  IonItem,
  IonButtons,
  IonBackButton,
  IonAlert,
} from "@ionic/react";
import { save, text } from "ionicons/icons";

import React, { useState } from "react";

const NewItem: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>New Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">New Item</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Task Name</IonLabel>
            <IonInput
              value={taskName}
              placeholder="Enter Input"
              onIonChange={(e) => setTaskName(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton onClick={() => setShowSuccess(true)}>
          <IonIcon slot="start" icon={save} />
          <IonLabel>Save</IonLabel>
        </IonButton>
      </IonContent>
      <IonAlert
        isOpen={showSuccess}
        header={"Saving Result"}
        message={`New task is ${taskName}`}
        buttons={["OK", "Cancel"]}
        onDidDismiss={() => setShowSuccess(false)}
      />
    </IonPage>
  );
};

export default NewItem;
