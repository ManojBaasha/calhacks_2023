import React, { useState } from "react";
import Chat from "./components/Chat.js";
import HomePage from "./components/HomePage.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/rootLayout.js";
import "./App.css";
/*
function ChatApp() {
  const [isAuth, setIsAuth] = useState(false);
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <div>
        <HomePage setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <Chat room="interview AI" />
  );
}
*/
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Route>
  )
);

export default function ChatApp() {
  return <RouterProvider router={router} />;
}