import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./Home.css";

const projectlist = [
  {
    name: "Ionic Mobile Cross-Platform",
    desc:
      "Ionic is the app development platform for web developers. Build amazing cross platform mobile",
    subtitle: "ionic",
    image: "https://ionicframework.com/img/meta/ionic-framework-og.png",
  },
  {
    name: "Angular Web Platform",
    desc:
      "Angular is a platform for building mobile and desktop web applications. Join the community of millions of developers who build compelling user interfaces with ...",
    subtitle: "angular",
    image:
      "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2019/04/angular-homepage.jpg",
  },
  {
    name: "Django Web Framework",
    desc:
      "Meet Django. Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers",
    subtitle: "django",
    image: "https://miro.medium.com/max/1200/1*4QDbb-eO98wIB32CNNuWjw.png",
  },
];

const Projects = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Projects</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Projects</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSlides
          options={{
            freeMode: false,
          }}
        >
          {projectlist.map((project, i) => {
            return (
              <IonSlide key={i}>
                <IonCard>
                  <IonImg src={project.image}></IonImg>
                  <IonCardHeader>
                    <IonCardSubtitle>{project.subtitle}</IonCardSubtitle>
                    <IonCardTitle>{project.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{project.desc}</IonCardContent>
                </IonCard>
              </IonSlide>
            );
          })}
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Projects;
