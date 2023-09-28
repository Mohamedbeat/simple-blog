import  Express  from "express";

import { login, logout, register } from "../controllers/authCtrl.js";

const router = Express.Router();


router.post('/register',register) 

router.post('/login',login) 

router.post('/logout',logout) 

export default router;