import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { POSTS_URL } from '../../configs';

export default function Menu({cat}) {
  const [posts, setPosts] = useState([])



  useEffect(()=>{
    const fetchdata =  async()=>{
      try {
        const res = await axios.get(POSTS_URL+`/?cat=${cat}`);
        setPosts(res.data);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata();
  },[cat])
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post)=>(
            <div className="post" key={post.id}>
                <img src={'/public/uploads/'+post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}
