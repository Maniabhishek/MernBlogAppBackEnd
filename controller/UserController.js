import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js";

export const signin = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        
        if(!existingUser) return res.status(404).json({message:"User doesn't exists."});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Password"});
        
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'privatekey',{expiresIn:'1h'});

        res.status(200).json({result:existingUser,token});

    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
}

export const signup = async (req,res) =>{
    const {firstName,lastName,email,password,confirmPassword} = req.body;

    try{
        
        const existingUser = await User.findOne({email});
        
        //check if user exists or not
        if(existingUser) res.status(400).json({message:"user already exists"});
        
        if(password !== confirmPassword) res.status(400).json({message:"password does not matches"});
        //hash password
        const hashedPassword = await bcrypt.hash(password,12);
        console.log("creating user")
        const user = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});
        console.log("sign token creation")
        const token = jwt.sign({email:user.email,id:user._id},'privatekey',{expiresIn:'1h'})
        console.log("sending response",token)
        
        res.status(201).json({user,token})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }

    
}