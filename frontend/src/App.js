import React, { useState } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import "./App.css";


function ChatApp() {
  const [isAuth, setIsAuth] = useState(false);
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <Chat room="interview AI" />
  );
}

const styles = {
  button : {
    backgroundColor: 'tomato',
    color: 'white',         // Change the text color to white
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
export default ChatApp;