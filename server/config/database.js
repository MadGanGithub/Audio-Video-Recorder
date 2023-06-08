import mongoose from "mongoose";

const connectionDB=()=>{
    mongoose.connect("mongodb+srv://tempemails047:XdrUsCagA2klZiwx@recorder.fn2bdjr.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(db_meth=>(
        console.log(`MongoDB database connected with the host: ${db_meth.connection.host}`)
    ))
}

export default connectionDB; 