import React, { useState, useEffect, useRef } from "react";
import EmotionBars from "./EmotionBars";
import "../styles/Chat.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import useSpeechToText from 'react-hook-speech-to-text';
import axios from 'axios';
import TopNavBar from "./TopBar";

//This is the product side of the web app
// const { Configuration, OpenAIApi } = require("openai");

const Chat = ({ room }) => {
  const [isPressed, setIsPressed] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const handleSubmit = async (concatenatedResults) => {
    try {
      const response = await axios.post('/process-string', { data: concatenatedResults });
      console.log(response.data);  // Handle the response from the server
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let concatenatedResults = ""; // Initialize an empty string to hold the concatenated results
    results.forEach((result) => {
      concatenatedResults += `${result.transcript}. `; // Concatenate the `transcript` property
    });
    handleSubmit(concatenatedResults);
    console.log(concatenatedResults);
  }, [isRecording]);
  // const handleStop = () => {
  //   console.log(interimResult) 
  // };

  //if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  const handleClick = () => {
    setIsPressed(!isPressed);
  };

  return (
    <div>
      <TopNavBar/>
      <div className="container-fluid vh-100 d-flex flex-column p-3">
        
        <div className="row flex-grow-1 mb-3">
          <div className="col-3">
            <div className="card bg-light p-3 h-100">
              <div className="scrollable-text-left">
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id ultricies felis. Vestibulum auctor mattis pellentesque. Aenean at varius leo. Donec dui nisi, tincidunt nec pellentesque ac, faucibus eget justo. Morbi luctus tortor ac purus fermentum bibendum. Quisque maximus auctor enim finibus maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed ultricies lectus malesuada augue faucibus, faucibus laoreet lectus suscipit. Ut ac sem semper, commodo nunc at, porttitor risus.
                </p>
                <p>Morbi dignissim mi at ipsum sodales, nec varius metus luctus. Fusce egestas sed nisl sed molestie. Cras mattis, elit id eleifend semper, orci enim suscipit nisl, sit amet imperdiet enim neque eu quam. Donec ornare volutpat lobortis. Etiam ac euismod nulla. Vestibulum quis congue velit. Ut non molestie orci, ullamcorper auctor orci. Curabitur fringilla ante ut orci volutpat suscipit. Donec consectetur pretium felis a rhoncus. Curabitur pulvinar arcu lacus, id pellentesque lorem tempus nec.
                </p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="card bg-white d-flex flex-column align-items-center justify-content-start p-3 h-100">
              <div className="image-container">
                <img className="half-card-image" src={require('../assets/profilePicture2.jpeg')} alt="Profile Picture" />
              </div>
              <div className="d-flex align-items-center">
                <button className="btn" onClick={handleClick}>
                  {isRecording ? (
                    <img src={require('../assets/redMicrophone.png')} alt="Red Microphone" style={{ width: '70%', height: '70%' }} /> , stopSpeechToText
                  ) : (
                    <img src={require('../assets/blackMicrophone.png')} alt="Black Microphone" style={{ width: '70%', height: '70%' }} /> , startSpeechToText
                  )}
                </button>
                <div className="card bg-light p-3">
                  <div className="scrollable-text-inside">
                    <p className="card-text"></p>
                      <ul>
                        {results.map((result) => (
                          <li key={result.timestamp}>{result.transcript}</li>
                        ))}
                        {interimResult && <li>{interimResult}</li>}
                      </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="card bg-light p-3 h-100">
              <EmotionBars/> {/*parameter is emotions from app.py*/}
            </div>
          </div>

        </div>

        <div className="row flex-grow-4 mt-3 pb-3">
          <div className="col">
            <div className="card bg-light p-3 h-100">
              <div className="scrollable-text-bottom">
                <p className="card-text">Etiam vitae velit quis mi luctus laoreet vel eget dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Sed tincidunt sed arcu nec rhoncus. Curabitur eget purus enim. Proin commodo orci id sollicitudin accumsan. Integer a maximus purus. Sed ullamcorper dapibus neque, imperdiet lobortis nunc interdum id. Morbi id lacus vitae sapien abe mollis pellentesque. Curabitur at tellus dapibus, pretium felis et, sagittis mauris. Integer id tortor suscipit, ullamcorper ligula vitae, ornare turpis. Morbi eu dui eu massa faucibus blandit. Etiam a ullamcorper urna.
                </p>
              </div>
            </div>

          </div> 
        </div>
      </div>
    </div>
  );
};

export default Chat;