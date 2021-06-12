import jwt from "jsonwebtoken";

export const auth = async(req,res,next)=>{
    try {
        // get the token
        console.log("token is ",req.headers)
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length<500;
        
        let decodedata;

        if(isCustomAuth){
            decodedata = jwt.verify(token,'privatekey');
            req.userID = decodedata.id;
        }else{
            decodedata = jwt.decode(token);
            req.userID = decodedata.sub;
        }

        next();

    } catch (error) {
        console.log(error)
    }
}