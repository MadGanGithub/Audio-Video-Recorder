import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import Audio from "./models/Audio.js";
import Video from "./models/Video.js";
import fs from 'fs';

const app=express();

//cors 
app.use(cors({
    origin: 'https://audio-video-recorder.vercel.app',
    credentials: true
  }));

// Multer configuration
const upload = multer({ dest: 'uploads/' });

app.post('/upload-audio', upload.single('audio'), async(req, res) => {
    try{
    const audioFile = req.file;

    if (!audioFile) {
      res.status(400).json({ error: 'No audio file provided' });
      return;
    }
    const data = fs.readFileSync(audioFile.path)

    await Audio.create({
        name:req.body.name,
        fieldname: audioFile.fieldname,
        originalname: audioFile.originalname,
        encoding: audioFile.encoding,
        mimetype: audioFile.mimetype,
        destination: audioFile.destination,
        filename: audioFile.filename,
        path: audioFile.path,
        size: audioFile.size,
        data: Buffer.from(data),
    })
    console.log("Audio final")
    res.status(200).json({ message: 'Audio file stored successfully' });

}catch(error){
    console.error('Failed to store audio file:', error);
    res.status(500).json({ error: 'Failed to store audio file' });
}
});

  app.post('/upload-video', upload.single('video'), async (req, res) => {
    const videoFile = req.file;
    const name=req.body.name
    
  
    try {
        const video = await Video.create({
            name: name,
            filename: videoFile.originalname,
            contentType: videoFile.mimetype,
            size: videoFile.size,
            data: fs.readFileSync(videoFile.path),
          });
      console.log('Video saved:', video);
  
      res.status(200).json({ message: 'Video file stored successfully' });
    } catch (error) {
      console.error('Failed to store video file:', error);
      res.status(500).json({ error: 'Failed to store video file' });
    }
  });




//This converts request body to json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//body parser(To view in postman)
//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())




export default app
