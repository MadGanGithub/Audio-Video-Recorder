import mongoose from "mongoose";

const Schema=mongoose.Schema;

const audioSchema=new Schema({
    name:{type: String,required:true},
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
}); 

export default mongoose.model("Audio",audioSchema);