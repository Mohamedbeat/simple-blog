import  Express  from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postsCtrl.js";

const router = Express.Router();


router.get('/',getPosts) 
router.get('/:id',getPost) 
router.post('/',addPost) 
router.delete('/:id',deletePost) 
router.put('/:id',updatePost) 

export default router;