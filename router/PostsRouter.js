import express from "express";
import {getPost,savePost,updatePost,deletePost,likePost} from "../controller/PostController.js"
import {auth} from "../middleware/auth.js";


const router = express.Router()

router.get('/',getPost);

//post request for saving post to db
router.post("/",auth,savePost);

//update post
router.patch("/:id",auth,updatePost);

//delete post
router.delete("/:id",auth,deletePost);

router.patch("/:id/likepost",auth,likePost);

export default router;