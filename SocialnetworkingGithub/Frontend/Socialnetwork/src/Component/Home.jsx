import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
  let [data,setData]=useState([])
  let [commentmsg,setCommentmsg]=useState("")

  let fetchdata=async()=>{
    let result=await fetch('http://localhost:8080/allpost');
    result=await result.json();
    console.log(result);
    setData(result)
  }
  let like=async(postId)=>{
    let result=await fetch('http://localhost:8080/like',{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')  
      },
      body:JSON.stringify({
        postId:postId
      })
    })
    result=await result.json();
    console.log(result);
    fetchdata();
  }
  let unlike=async(postId)=>{
    let result=await fetch('http://localhost:8080/unlike',{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
      },
      body:JSON.stringify({
        postId:postId
      })
    })
    result=await result.json();
    console.log(result);
    fetchdata();
  }
  let comments=async(postId)=>{
    let result=await fetch('http://localhost:8080/comment',{
      method:"PUT",
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
      },
      body:JSON.stringify({
          text:commentmsg,
          postId:postId
      })
    })
    result=await result.json();
    console.log(result);
    alert('comment sented')
    setCommentmsg('')
  }
  useEffect(()=>{
    fetchdata()
  },[])
  return (
    <div className='container'>
      <div className="container">
        {
          data.map((item,index)=>(
            <div key={index} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div className="card" style={{width: "28rem",margin:"10px"}}>
            <div className="header" style={{borderBottom:"0.5px solid black",display:"flex",alignItems:"center"}}>
              <img src="https://tse2.mm.bing.net/th/id/OIP.zSt1egbeKkPr-NskAb0qmgAAAA?pid=ImgDet&w=300&h=332&rs=1" style={{height:"50px",width:"50px",borderRadius:"50%"}} alt="" />
              <div style={{marginLeft:"10px"}}>
              <span><Link to={`/otherprofile/${item.postedBy._id}`}>{item.postedBy.name}</Link> <br/>
              {item.postedBy.username}</span>
              </div>
            </div>
      <img src={item.image} style={{height:"200px"}} className="card-img-top" alt="..."/>
      <div className="card-body">
        <p className="card-text">{item.like.length>0 ? item.like.length : 0} Likes</p>
        <p className="card-text">{item.caption}</p>
        <button className='btn btn-primary' onClick={()=>{like(item._id)}}>Like</button>
        <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={()=>{unlike(item._id)}}>Unlike</button>
        <button className='btn btn-primary' style={{marginLeft:"10px"}}><Link style={{color:"white",textDecoration:"none"}} to={`/savepost/${item._id}`}>Save post</Link></button>
      </div>
      <div className="comtainer">
      <div className="comment" style={{margin:"10px"}}>
      <div className="mb-3">
       <input type="text" className="form-control" value={commentmsg} onChange={(e)=>{setCommentmsg(e.target.value)}} placeholder='Comments....' style={{width:"80%"}} id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <button className='btn btn-primary' onClick={()=>{comments(item._id)}}>Comment</button>
      <button className='btn btn-primary' style={{marginLeft:"10px"}}><Link to={`/comments/${item._id}`} style={{color:"white",textDecoration:"none"}}>Show comments</Link></button>
      </div>
      </div>
     
    </div>
            </div>
            
          ))
        }

      </div>
    </div>
  )
}

export default Home