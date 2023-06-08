import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import VideoRecorder from '../components/video.js';
import AudioRecorder from '../components/audio.js';
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import "./home.css"


const Home = () => {
    const[name,setName]=useState("")
    const [alignment, setAlignment] = useState('audio');
    const[audioData,setAudioData]=useState(null)
    const[videoData,setVideoData]=useState(null)
    const [loading,setLoading]=useState(false)

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(audioData === null){
        setLoading(true)
        // Store the recorded video
        const formData = new FormData();
        formData.append('video', videoData, 'recorded_video.webm');
        formData.append('name',name)

            await axios.post("https://audio-video-recorder.onrender.com/upload-video",formData)
            setLoading(false)
            window.location.reload()
            toast.success("Video Added")

        }else{
          setLoading(true)
          const formData = new FormData();
          formData.append('audio', audioData, 'recorded_audio.wav');
          formData.append('name',name)

            await axios.post("https://audio-video-recorder.onrender.com/upload-audio",formData)
            setLoading(false)
            window.location.reload()
            toast.success("Audio Added")

          }
    };

    const handleChange = (event, newAlignment) => {
        event.preventDefault();
        setAlignment(newAlignment);
    };
    

    const handleAudioData=(audioData)=>{
        setAudioData(audioData)
        
    }
    
    const handleVideoData=(videoData)=>{
        setVideoData(videoData)
    }

    const handleAudio=()=>{
      console.log("Audio time")
      setVideoData(null)
      console.log(videoData)
      console.log(audioData)
    }
    const handleVideo=()=>{
      console.log("Video time")
      setAudioData(null)
      console.log(videoData)
      console.log(audioData)
    }
    
      return (
        <div>
          {loading==false?
          <Container  maxWidth="sm">
            <Box 
              sx={{
                marginTop: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow:5,
                padding:5
              }}
            >
    
              <Typography component="h1" variant="h5">
                KNOW YOUR CUSTOMER
              </Typography>
    
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>          
              <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="off"
                      name="Name"
                      required
                      fullWidth
                      id="Name"
                      label="Name"
                      aria-describedby="invalid_format"
                      autoFocus
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                  <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="audio" onClick={handleAudio}>Audio</ToggleButton>
        <ToggleButton value="video" onClick={handleVideo}>Video</ToggleButton>
      </ToggleButtonGroup>

      {alignment === 'audio' ? (
        <Grid item xs={12}>
          <AudioRecorder dataFunc={handleAudioData} />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <VideoRecorder dataFunc={handleVideoData}/>
        </Grid>
      )}
    </div>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{backgroundColor:"black"}}
                
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Container>:<div id="loading-container">
  <div id="loading-icon"><CircularProgress/></div>
</div>}
        </div>
      );
    }

export default Home


  
  
