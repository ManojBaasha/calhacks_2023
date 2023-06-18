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
  const [emotionData, setEmotionData] = useState([]);

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
      console.log(concatenatedResults)
      // let data = {data: concatenatedResults}
      const jsonData = JSON.stringify({ data: concatenatedResults });
      console.log(jsonData)
      const response = await axios.post('http://127.0.0.1:5000/process-string', jsonData, { headers: { 'Content-Type': 'application/json' } });
      // console.log(response.data)
      for(let i = 0; i < response.data["emotions"].length; i++){
        // console.log(response.data["emotions"][i].name, response.data["emotions"][i].score)
        // add another variable to store at random bg-success, bg-danger, bg-warning, bg-info and convert response.data["emotions"][i].score ro integer
        response.data["emotions"][i].score = Math.round(response.data["emotions"][i].score * 100)
      }
      // console.log(response)

      setEmotionData(response.data);
      localStorage.setItem('emotionData', response.data);

      // if ('speechSynthesis' in window && emotionData["chat-gpt"] != null) {
      //   const speechSynthesis = window.speechSynthesis;
      //   const utterance = new SpeechSynthesisUtterance(emotionData["chat-gpt"]);
      //   speechSynthesis.speak(utterance);
      // } else {
      //   console.log('Text-to-speech is not supported in this browser.');
      // }
      if(emotionData["chat-gpt"] != null){
        // responsiveVoice.speak(emotionData["chat-gpt"]);
        const speechSynthesis = window.speechSynthesis;
        console.log(emotionData["chat-gpt"])
        const speechText = new SpeechSynthesisUtterance(emotionData["chat-gpt"]);
        speechSynthesis.speak(speechText);
      }
    } catch (error) {
      console.log("hello world")
      console.error(error);
    }
  };


  const videoRef = useRef();

  const handleMicrophoneClick = () => {
    setIsMicrophonePressed(!isMicrophonePressed);
    if(!isRecording){
      startSpeechToText();
    }
    else{
      stopSpeechToText();
    }
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

  useEffect(() => {
    let concatenatedResults = ""; // Initialize an empty string to hold the concatenated results
    results.forEach((result) => {
      concatenatedResults += `${result.transcript}. `; // Concatenate the `transcript` property
    });
    handleSubmit(concatenatedResults);
    // console.log(concatenatedResults);
  }, [isRecording]);

  if(error){
    console.log(error);
    return (<p>error: {error}</p>);
  }

  return (
    <div>
      <TopNavBar />
      <div className="container-fluid vh-100 d-flex flex-column p-3">
        <div className="row flex-grow-1 mb-3">
          <div className="col-3">
            <div className="card bg-light p-3 h-100">
              <div className="scrollable-text-left">
                <p className="card-text">{emotionData["chat-gpt"]}</p>
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
                        <p key={result.timestamp}>{result.transcript}</p>
                      ))}
                      {interimResult && <p>{interimResult}</p>}
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