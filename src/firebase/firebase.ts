import firebase from "firebase/app";
import "firebase/auth";

import { LocalEnvironment } from "../environment/environment";

if (firebase.apps.length === 0) {
  firebase.initializeApp(LocalEnvironment.firebase);

  if (__DEV__) {
    firebase.auth().useEmulator("http://localhost:9099");
  }
}

export default firebase;
