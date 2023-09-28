import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { POSTS_URL, UPLOADS_URL } from '../../configs';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Write() {

  const state = useLocation().state;
  

  const [value, setValue]=useState(state?.desc || '');
  const [title, setTitle]=useState(state?.title || '');
  const [file, setFile]=useState(null);
  const [cat, setCat]=useState(state?.cat || '');
console.log(title);
console.log(value);
console.log(file);
console.log(cat);
  const [immg, setImmg]=useState('');
// console.log(cat);
const navigate = useNavigate()

const upload = async ()=>{
  try {
    const formdata = new FormData();
     formdata.append('file', file);
    const res = await axios.post(UPLOADS_URL, formdata);
    // console.log('img');
    // console.log(res.data);
    // setImmg(res.data);
    return res.data
  } catch (error) {
    console.log(error);
  }

}
// console.log(immg);
// console.log({
//   title, 
//   desc: value, 
//   cat,
//   file, 
//   // img:file? imgUrl : "", 
//   date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
// })

const handleClick =async e=>{
e.preventDefault();
  const imgUrl = await upload();
  // console.log(imgUrl);

  try {
    // console.log(POSTS_URL+"/"+state.id);
    // console.log(state.id);
    state ? 
    await axios.put(POSTS_URL+"/"+state.id, {
      title,
       desc: value, 
       cat, 
       img: file ? imgUrl : "",
  
    },
    {withCredentials:true}) 
    : 
    await axios.post(POSTS_URL, {
      title, 
      desc: value, 
      cat, 
      // img: file ? file.name : "",
      img: file ? imgUrl : "",  
      date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    },
    {withCredentials:true})

    navigate("/");
  } catch (err) {
    console.log(err);
  }
}
  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          {/* <span><b>Status:</b> Draft</span>
          <span><b>Visibility:</b> Public</span> */}
          <input style={{display:"none"}} type="file" name="" id="file" onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">{file? file.name : 'Upload file'}</label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
          </div>
        <div className="item">
          <h1>Category</h1>

          <div className="cat">
          <input type="radio" checked={cat === "islamic"} name="cat" id="islamic" value="islamic" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="art">ISLAMIC</label>
          </div>

          <div className="cat">
          <input type="radio" checked={cat === "science"} name="cat" id="science" value="science" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="science">SCIENCE</label>
          </div>

          <div className="cat">
          <input type="radio" checked={cat === "technology"} name="cat" id="technology" value="technology" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="technology">TECHNOLOGY</label>
          </div>

          <div className="cat">
          <input type="radio" checked={cat === "cenima"} name="cat" id="cenima" value="cenima" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="cenima">CENIMA</label>
          </div>

          <div className="cat">
          <input type="radio" checked={cat === "design"} name="cat" id="design" value="design" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="design">DESIGN</label>
          </div>

          <div className="cat">
          <input type="radio" checked={cat === "food"} name="cat" id="food" value="food" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="food">FOOD</label>
          </div>
        </div>
      </div>
    </div>
  )
}
