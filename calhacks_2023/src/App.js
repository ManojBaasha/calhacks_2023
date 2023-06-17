import React from 'react';
import microphone from './resources/microphone-icon.svg';
import lady from './resources/interviewer.jpg';
import useSpeechToText from 'react-hook-speech-to-text'; 
import { useEffect } from 'react';
import axios from 'axios';

export default function AnyComponent() {
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

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <img src={lady} className="lady" alt="lady"/>
      <button
        onClick={isRecording ? stopSpeechToText : (startSpeechToText)}
      >
        <img src={microphone} alt="microphone"></img>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>

    </div>
  );
}
