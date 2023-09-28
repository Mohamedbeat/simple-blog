import  Express  from "express";

const router = Express.Router();


router.get('/',(req, res)=>{
    res.json('this is users')
})

export default router;