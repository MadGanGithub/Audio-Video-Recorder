import mongoose from "mongoose";

const Schema=mongoose.Schema;

const postSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    audio_file:{
        type:Object,
    },
    video_file:{
        type:Object,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}); 

export default mongoose.model("Post",postSchema);