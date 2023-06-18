import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// const { Configuration, OpenAIApi } = require("openai");

export const Chat = ({ room }) => {
  const [isMicrophonePressed, setIsMicrophonePressed] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isCameraStopped, setIsCameraStopped] = useState(true);
  const [videoStream, setVideoStream] = useState(null);


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
              <img className="half-card-image" src={require('../assets/profilePicture.jpg')} alt="Profile Picture" />
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
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis magna dolor, eget lobortis ipsum iaculis in. Donec in ornare purus. Sed aliquet mi et magna iaculis sollicitudin. Sed dictum condimentum lorem, sit amet fermentum ligula aliquam et. Aliquam a venenatis nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris mattis tincidunt justo, ac eleifend nunc scelerisque vitae. Donec nec lorem libero. Mauris pellentesque ultricies nulla, nec fringilla leo accumsan ut. Pellentesque nunc dui, pretium a aliquet in, pulvinar vel ante. Morbi quis libero nec tortor aliquet feugiat. Nunc vel posuere sem, id rutrum quam. Phasellus nec risus nunc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card bg-light p-3 h-100">
            <div>
              <h6>Confidence</h6>
              <div className="progress mb-3">
                <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                  <strong style={{ color: '#fff' }}>25%</strong>
                </div>
              </div>
              <h6>Enthusiasm</h6>
              <div className="progress mb-2">
                <div className="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                  <strong style={{ color: '#fff' }}>55%</strong>
                </div>
              </div>
              <h6>Positivity</h6>
              <div className="progress mb-2">
                <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  <strong style={{ color: '#fff' }}>75%</strong>
                </div>
              </div>
              <h6>Professionalism</h6>
              <div className="progress mb-2">
                <div className="progress-bar progress-bar-striped bg-danger progress-bar-animated" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                  <strong style={{ color: '#fff' }}>100%</strong>
                </div>
              </div>
            </div>
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
                <div className="btn-margin-left"><a className="btn btn-secondary" href="#" role="button" >Next Question &gt;&gt;</a></div>
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
                <div className="btn-margin-left"><button className="btn btn-secondary" onClick={handleStopCameraClick} disabled={isCameraStopped}>
                  {isCameraStopped ? "Camera Stopped" : "Stop Camera"}
                </button></div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};