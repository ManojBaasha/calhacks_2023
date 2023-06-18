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
  const [isMicrophonePressed, setIsMicrophonePressed] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isCameraStopped, setIsCameraStopped] = useState(true);
  const [videoStream, setVideoStream] = useState(null);
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

  const videoRef = useRef();

  const handleMicrophoneClick = () => {
    setIsMicrophonePressed(!isMicrophonePressed);
  };

  const handleStartCameraClick = () => {
    setIsCameraStarted(true);
    setIsCameraStopped(false);
  };

  const handleStopCameraClick = () => {
    setIsCameraStarted(false);
    setIsCameraStopped(true);
  };


  useEffect(() => {
    const getVideoStream = async () => {
      try {
        if (isCameraStarted) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setVideoStream(stream);
        } else if (isCameraStopped) {
          videoStream.getTracks().forEach((track) => track.stop());
          setVideoStream(null);
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getVideoStream();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraStarted, isCameraStopped]);


  useEffect(() => {
    if (videoStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div>
      <TopNavBar />
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
                <button className="btn" onClick={handleMicrophoneClick}>
                  {isMicrophonePressed ? (
                    <img src={require('../assets/redMicrophone.png')} alt="Red Microphone" style={{ width: '70%', height: '70%' }} />
                  ) : (
                    <img src={require('../assets/blackMicrophone.png')} alt="Black Microphone" style={{ width: '70%', height: '70%' }} />
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
              <EmotionBars /> {/*parameter is emotions from app.py*/}
              {isCameraStarted && (
                <div className="video-container">
                  {videoStream && <video ref={videoRef} autoPlay muted playsInline width="100%" height="auto" style={{ objectFit: 'cover' }} />}
                </div>
              )}
              {!isCameraStarted && (
                <div className="not-started-card">
                  <h5 className="card-title text-center word-wrap">Camera not started</h5>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="row flex-grow-4 mt-3 pb-3">
          <div className="col">
            <div className="card bg-light p-3 h-100">
              <div className="bottom-box d-flex justify-content-between p-1">
                <div className="d-flex justify-content-between">
                  <div><a className="btn btn-secondary" href="#" role="button">&lt;&lt; Previous Question</a></div>
                  <div className="btn-margin-left"><a className="btn btn-secondary" href="#" role="button">Next Question &gt;&gt;</a></div>
                </div>
                {/* Uncomment if we want to readd middle buttons */}
                {/* <div>
                <a className="btn btn-secondary" href="#" role="button">Repeat Response</a>
              </div>
              <div>
                <a className="btn btn-secondary" href="#" role="button">Return Home</a>
              </div> */}
                <div className="d-flex justify-content-between">
                  <div>
                    <button className="btn btn-secondary" onClick={handleStartCameraClick} disabled={isCameraStarted}>
                      {isCameraStarted ? "Camera Started" : "Start Camera"}
                    </button>
                  </div>
                  <div className="btn-margin-left">
                    <button className="btn btn-secondary" onClick={handleStopCameraClick} disabled={isCameraStopped}>
                      {isCameraStopped ? "Camera Stopped" : "Stop Camera"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;