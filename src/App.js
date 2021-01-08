import React, { useState } from "react";
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
      <header></header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={googleSignIn}>Sign-In with Google</button>;
}

function SignOut() {
  const googleSignOut = () => auth.signOut();

  return auth.currentUser && <button onClick={googleSignOut}>Sign-Out</button>;
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const getMessagesQuery = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(getMessagesQuery, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  return (
    <React.Fragment>
      <div>
        {messages &&
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </React.Fragment>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default App;
