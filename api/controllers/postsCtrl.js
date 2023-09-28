import db from '../db.js'
import  jwt  from 'jsonwebtoken'
export const getPosts = (req, res)=>{
const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts"

db.query(q,[req.query.cat], (err, data)=>{
    if (err) return res.status(500).send(err)

    return res.status(200).json(data)
})

}


export const getPost = (req, res)=>{

    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userimg, `cat`, `date` FROM users u JOIN posts p on u.id=p.uid WHERE p.id = ? "

    db.query(q,[req.params.id], (err, data)=>{
        if(err) return res.status(500).json(err)

        res.status(200).json(data[0])
        console.log(data[0]);
    })
}


export const addPost = (req, res)=>{
    const token = req.cookies.access_token;

    if(!token) return res.status(401).json('You are no athenticated!')
console.log(token);
    //chech token
    jwt.verify(token, "jwtkey",(err, userInfo)=>{
        if(err) return res.status(403).json('Token is not valid!')

        const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?) "
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]
console.table(values);
        db.query(q,[values], (err, data)=>{
            if (err) return res.status(500).json(err)
            
            return res.status(200).json('Post has been created!')
            
        })
    })
}


export const deletePost = (req, res)=>{
    //check athentication

    const token = req.cookies.access_token;
    // console.log(token);
    // const cookie = req.headers.cookie;
    // console.log("cookie " +cookie);
    if(!token) return res.status(401).json('You are no athenticated!')

    //chech token
    jwt.verify(token, "jwtkey",(err, userInfo)=>{
        if(err) return res.status(403).json('Token is not valid!')


        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(q,[postId, userInfo.id], (err, data)=>{
            if(err) return res.status(403).json('You can delete only ypu own posts!')

            return res.status(200).json('Post has been deleted!')
        })
    })
}


export const updatePost = (req, res)=>{
    const token = req.cookies.access_token;
    
    if(!token) return res.status(401).json('You are no athenticated!')

    //chech token
    jwt.verify(token, "jwtkey",(err, userInfo)=>{
        if(err) return res.status(403).json('Token is not valid!')

        const postId = req.params.id;
        const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=? "
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]
console.log(postId);
        db.query(q,[...values, postId, userInfo.id], (err, data)=>{
            if (err) return res.status(500).json(err)

            return res.status(200).json('Post has been updated!')
        })
    })
}