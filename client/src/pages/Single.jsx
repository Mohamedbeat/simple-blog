import React, { useContext, useEffect, useRef, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png' 
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import { POSTS_URL } from '../../configs'
import moment from 'moment/moment'
import { AuthContext } from '../context/authContext'



export default function Single() {
  const {currentUser} = useContext(AuthContext);
  const imagee = useRef()

  const [post, setPost] = useState({})

  const navigate= useNavigate()
  const location = useLocation()
  const postid = useLocation().pathname.split("/")[2];
console.log(postid);
console.log(post);
var imglink ="1";

  useEffect(()=>{
    const fetchdata =  async ()=>{
      try {
        
        // const res = await axios.get(POSTS_URL+"/"+postid);
        // setPost(res.data);
        // console.log("data:"+post.img);
        const res = await axios.get(`${POSTS_URL}/${postid}`,{withCredentials:true})
        console.log(POSTS_URL+"/"+postid);
        setPost(res.data);
        imagee.current.src='/public/uploads/'+res.data.img;
        imagee.current.sc
        console.log(imagee.current.src);
        // imglink = "./public/uploads/"+res.data.img;
        // console.log(imglink);
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata();
  },[postid])

  const handleDelete = async ()=>{
    try {
      // console.log("cookies: "+document.cookie);
      // console.log("post id"+postid);
      // console.log(POSTS_URL+"/"+postid,cooki,{ withCredentials: true });
    await axios.delete(POSTS_URL+"/"+postid,{withCredentials:true,});
    navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  const getText = (htmltext)=>{
    const doc = new DOMParser().parseFromString(htmltext, "text/html")

    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className="content">
        {/* <img id='immmg'  src={`public/uploads/${post.img}`} alt="img" /> */}
        <img id='immmg' ref={imagee} alt="img" />
        <div className="user">
          <img src={post.userimg} alt="" /> 
          <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && <div className="edit">
            <Link to="/write?edit=2" state={post}>
            <img src={Edit} alt="" />
            </Link>
            <img  src={Delete} alt="" onClick={handleDelete}/>
          </div>}
        </div>
        <h1>{post.title}</h1>
          
        {getText(post.desc)}
          
      </div>
      
        <Menu cat={post.cat} />
      
    </div>
  )
}
