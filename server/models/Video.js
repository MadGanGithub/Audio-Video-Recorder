import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: Buffer, required: true },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
