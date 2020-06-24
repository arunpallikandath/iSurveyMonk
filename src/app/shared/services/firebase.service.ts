import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

   private firebaseConfig = {
     apiKey: "AIzaSyDchhMgNsZril64ELCNWUoB1j7wxVmywd0",
     authDomain: "survey-monk-2020.firebaseapp.com",
     databaseURL: "https://survey-monk-2020.firebaseio.com",
     projectId: "survey-monk-2020",
     storageBucket: "survey-monk-2020.appspot.com",
     messagingSenderId: "486580265443",
     appId: "1:486580265443:web:ed5c2919ac36e5a3ce80d6",
     measurementId: "G-QNETXHDYLJ"
   };

  constructor() {

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     const displayName = user.displayName;
    //     const email = user.email;
    //     const emailVerified = user.emailVerified;
    //     const photoURL = user.photoURL;
    //     const isAnonymous = user.isAnonymous;
    //     const uid = user.uid;
    //     const providerData = user.providerData;
    //     console.log(displayName);
    //   } else {
    //     console.log('signed out');
    //     // User is signed out.
    //     // ...
    //   }
    // });

  }

  public initializeFirebase() {
    if(firebase.apps.length === 0) {
      console.log('Initializing firebase');
      firebase.initializeApp(environment.firebaseConfig);
    }
  }

}
