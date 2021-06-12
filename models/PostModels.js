import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    creator:String,
    title:String,
    message:String,
    name:String,
    selectedFile:String,
    createdAt:{
        type:Date,
        default:new Date(),

    },
    likes:{
        type:[String],
        default:[],
    },
    tags:[String]

    
})

const postModel = mongoose.model('PostModel',postSchema);
export default postModel;