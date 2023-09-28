import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { POSTS_URL } from '../../configs'
import { AuthContext } from '../context/authContext'

export default function Home() {
  const [posts, setPosts] = useState([])

  
  const cat = useLocation().search;
  console.log(cat);


console.log(posts);
  useEffect(()=>{
    const fetchdata =  async()=>{
      try {
        const res = await axios.get(POSTS_URL+`${cat}`);
        setPosts(res.data);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata();
  },[cat])



  const getText = (htmltext)=>{
    const doc = new DOMParser().parseFromString(htmltext, "text/html")

    return doc.body.textContent
  }
 
  return (
    <div className='home'>
    <div className="posts">
      {
        posts.map((post)=>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`./public/uploads/${post.img}`} alt={post.title} />
            </div>
            <div className="content">
              <h1>{post.title}</h1>
              <p>{getText(post.desc).length > 300 ? getText(post.desc).substring(0,300).concat('...') : getText(post.desc)}</p>
              <Link className='link' to={`/post/${post.id}`}><button>Read More</button></Link>
            </div>
          </div>
        ))
      }
    </div>
    </div>
  )
}
