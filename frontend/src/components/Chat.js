import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const { Configuration, OpenAIApi } = require("openai");



export const Chat = ({ room }) => {

  return (
<div className="container-fluid vh-100 d-flex flex-column p-3">
  <div className="row flex-grow-1 mb-3">
    <div className="col-3">
      <div className="card bg-light p-3 h-100">
        <p className="card-text">This is the left text box</p>
      </div>
    </div>
    <div className="col-6">
      <div className="card bg-white d-flex flex-column align-items-center justify-content-start p-3 h-100">
        <div className="image-container">
          <img className="half-card-image" src={require('../assets/profilePicture.jpg')} alt="Profile Picture" />
        </div>
        <button className="btn btn-primary mt-3">Microphone</button>
      </div>
    </div>
    <div className="col-3">
      <div className="card bg-light p-3 h-100">
        <p className="card-text">This is the right text box</p>
      </div>
    </div>
  </div>
  <div className="row flex-grow-4 mt-3">
    <div className="col">
      <div className="card bg-light p-3 h-100">
        <p className="card-text">This is the long text box</p>
      </div>
    </div>
  </div>
</div>



  );
};