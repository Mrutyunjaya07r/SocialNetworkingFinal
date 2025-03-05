import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Comments() {
    let [data,setData]=useState([])
    let {postId}=useParams();
    let comments=async()=>{
        let result=await fetch(`http://localhost:8080/getallcomment/${postId}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
            }
        })
        result=await result.json();
        console.log(result[0].comments);
        setData(result[0].comments);
    }
    useEffect(()=>{
        comments();
    },[])

  return (
    <div>
        <h1>Comments</h1>
        <div className="container">
            {
                data.map((item,index)=>(
                    <div key={index}>
                        <div style={{backgroundColor:"wheat",padding:"10px",margin:"10px",borderRadius:"10px"}}>
                        <p style={{fontFamily:"fantasy"}}>{item.text}</p>
                        <p >Commented by : {item.postedBy.name}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Comments