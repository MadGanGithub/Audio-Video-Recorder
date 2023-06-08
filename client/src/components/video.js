import React, { useState } from 'react';
import RecordRTC from 'recordrtc';
import Button from '@mui/material/Button';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

const VideoRecorder = ({dataFunc}) => {
  const [mediaStream, setMediaStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [isVRecording, setIsVRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const startVRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setMediaStream(stream);
        const newRecorder = RecordRTC(stream, {
          type: 'video',
          mimeType: 'video/webm',
        });
        setRecorder(newRecorder);
        newRecorder.startRecording();
        setIsVRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };

  const stopVRecording = () => {
    if (recorder) {
      recorder.stopRecording(async() => {
        const blob = recorder.getBlob();
        setRecordedBlob(blob);
        setIsVRecording(false);
        dataFunc(blob)
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }

        // // Store the recorded video
        // const formData = new FormData();
        // formData.append('video', blob, 'recorded_video.webm');
        

        // try {
        //   const response = await axios.post('http://localhost:4200/upload-video', formData);
        //   console.log(response.data)
        // } catch (error) {
        //   console.error('Error during video upload:', error);
        // }


      });
    }
  };

  return (
    <div style={{paddingTop:20}}>
      <Button
        variant="contained"
        color={isVRecording ? 'primary' : 'error'}
        onClick={isVRecording ? stopVRecording : startVRecording}
      >
        {isVRecording ? <StopCircleOutlinedIcon/> : <RadioButtonCheckedOutlinedIcon/>}
      </Button>
      {recordedBlob && (
        <video src={URL.createObjectURL(recordedBlob)} controls autoPlay style={{width:200,height:100,paddingTop:10}}/>
      )}

    </div>
  );
};

export default VideoRecorder;
