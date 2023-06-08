import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Recorder from 'recorder-js';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { red } from '@mui/material/colors';


const AudioRecorder = ({dataFunc}) => {
  const [isRecording,setRecording]=useState(false)
  const audioRef = useRef(null);
  const recorderRef = useRef(null);

  const startRecording = () => {
    setRecording(true)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new Recorder(audioContext, {
      numChannels: 1,
    });

    recorderRef.current = recorder;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        recorder.init(stream).then(() => {
          recorder.start();
        });
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    const recorder = recorderRef.current;
    setRecording(false)
    

    if (recorder) {
      recorder.stop().then(({ blob }) => {
        audioRef.current.src = URL.createObjectURL(blob);
        dataFunc(blob)
        uploadAudio(blob);

      });
    }
  };

  
  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recorded_audio.wav');
    formData.append('name',"shit")

    // try {
    //   console.log("inside try block")
    //   await axios.post('http://localhost:4200/upload-audio', formData);
    //   console.log('Audio file uploaded successfully');
    // } catch (error) {
    //   console.error('Failed to upload audio file:', error);
    // }
  };

  return (
    <div>
      <div style={{paddingTop:20,paddingBottom:10}}>
        <Button variant="contained" color="primary" onClick={startRecording} disabled={isRecording} style={{backgroundColor:"#C62828"}}>
          <RadioButtonCheckedOutlinedIcon />
        </Button>

        <Button variant="contained" color="secondary" onClick={stopRecording} disabled={!isRecording}>
          <StopCircleOutlinedIcon/>
        </Button>
      </div>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default AudioRecorder;
