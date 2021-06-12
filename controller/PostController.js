import PostMessage from "../models/PostModels.js";
import mongoose from "mongoose";

export const getPost = async (req,res) => {
    try{
        const post = await PostMessage.find().sort({_id:-1});
        res.status(200).json(post);
    }catch(error){
        console.log(error);
    }
}

export const savePost = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage({...post,creator:req.userID,createdAt:new Date().toISOString()});
    try{
        await newPost.save();
        res.status(200).json(newPost)
    }catch(error){
        res.status(409).json({message:error})
    }
}

export const updatePost = async (req,res) =>{
    const {id} = req.params;
    const post = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post found with that id")
    try{
        const updatedPost =await PostMessage.findByIdAndUpdate(id,{...post,_id:id},{new:true});
        res.status(200).json(updatedPost);
    }
    catch(error){
        res.status(409).json({message:error})
        console.log(error)
    }
}

export const deletePost =async (req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post found with that id")
    try{
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({message:"deleted successfully"});
    }catch(error){
        console.log(error)
    }
}

export const likePost = async (req,res) => {
    const {id} = req.params

    if(!req.userID) return res.json({message:'unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post found with that id")
    try{
        const post = await PostMessage.findById(id);
        // finding the index if user has liked it 
        const index = post.likes.findIndex((id)=>id===req.userID)

        if(index===-1){
            post.likes.push(req.userID);
        }
        else{
            post.likes = post.likes.filter((id)=>id!==String(req.userID));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
        res.status(200).json(updatedPost)
    }
    catch(error){
        console.log(error)
    }
}