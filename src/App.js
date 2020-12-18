import React from "react";
import "./App.css";

// Firebase SDK
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firebase Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDKcav46dWg2D-nldnWtcGTPMu07-jYUvo",
  authDomain: "superchat-dev-8a539.firebaseapp.com",
  projectId: "superchat-dev-8a539",
  storageBucket: "superchat-dev-8a539.appspot.com",
  messagingSenderId: "129583296711",
  appId: "1:129583296711:web:5b95555a8dede24d2a4ee2",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header"></header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={googleSignIn}>Google Sign in</button>;
}

function SignOut() {
  const googleSignOut = () => auth.signOut();

  return auth.currentUser && <button onClick={googleSignOut}>Sign out</button>;
}

export default App;
