import  Express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postsRoutes from './routes/postsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import authRoutes from './routes/authRoutes.js'
import multer from "multer";








const app = Express();
app.use(Express.json());
app.use(cors({ origin: true, credentials: true })); //
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })


const upload = multer({ storage: storage })
app.post('/uploads', upload.single('file'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const file = req.file
    res.status(200).json(file.filename)
  })

app.use('/blogie/auth',authRoutes)
app.use('/blogie/users',usersRoutes)
app.use('/blogie/posts',postsRoutes)


app.listen(8998,()=>{
    console.log('Server on');
})