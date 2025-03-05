import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Userprofile() {
    let [userdata,setUserdata]=useState([])
    let [postdata,setPostdata]=useState([])

    let mydata=async()=>{
        let result=await fetch('http://localhost:8080/userprofile',{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
            }
        })
        result=await result.json();
        console.log(result)
        setUserdata(result.myuserdetail);
        setPostdata(result.mypost)
    }
   
    useEffect(()=>{
        mydata()
    },[])
  return (
    <div className='container'>
        {
            userdata.map((item,index)=>(
<div className="container" key={index}>
            <div className='header' style={{display:"flex",alignItems:"center",borderBottom:"0.5px solid black"}}>
            <img src="https://tse2.mm.bing.net/th/id/OIP.zSt1egbeKkPr-NskAb0qmgAAAA?pid=ImgDet&w=300&h=332&rs=1" style={{height:"200px",width:"200px",borderRadius:"50%",border:"1px solid white"}} alt="" />
            <div style={{margin:"20px"}}>
                <h2>{item.name}</h2>
                <h5>{item.username}</h5>
                <div className="details" style={{display:"flex"}}>
                <h6 style={{margin:"10px"}}>{postdata.length >0 ? postdata.length : 0} Posts</h6>
                <h6 style={{margin:"10px"}}>{userdata[0].followers.length >0 ? userdata[0].followers.length : 0} Followers</h6>
                <h6 style={{margin:"10px"}}>{userdata[0].following.length >0 ? userdata[0].following.length   : 0} Following</h6>
                </div>
            </div>

            </div>
        </div>
            ))
        }
        <h1>Posts</h1>
        {
    postdata.map((item, index) => (
            <div className="container" key={index} style={{margin:"20px"}}>
                <div>
                    <img src={item.image} alt="" style={{height:"200px",width:"200px",borderRadius:"10px"}} />
                    <p>{item.caption}</p>
                    <button className='btn btn-primary'><Link style={{color:"white",textDecoration:"none"}} to={`/updatepost/${item._id}`}>Update post</Link></button>
                    <button className='btn btn-danger' style={{marginLeft:"10px"}}><Link style={{color:"white",textDecoration:"none"}} to={`/deletepost/${item._id}`}>Delete Post</Link></button>
                </div>
            </div>
        
    ))
}

        
    </div>
  )
}

export default Userprofile