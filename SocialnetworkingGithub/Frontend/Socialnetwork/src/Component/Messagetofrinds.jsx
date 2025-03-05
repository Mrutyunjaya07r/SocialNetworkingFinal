import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Messagetofrinds() {
    let [data,setData]=useState([])
    let alluser=async()=>{
        let result=await fetch('http://localhost:8080/getalluser',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')  
            },          
        })
        result=await result.json();
        console.log(result);
        setData(result);
    }
    useEffect(()=>{
        alluser();
    },[])
  return (
    <div>
        <div className="container">
            {
                data.map((item,index)=>(
                    <div key={index} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <div className="page" style={{display:"flex",alignItems:"center",width:"500px",borderBottom:"0.5px solid black"}} >
                            <img src="https://tse2.mm.bing.net/th/id/OIP.zSt1egbeKkPr-NskAb0qmgAAAA?pid=ImgDet&w=300&h=332&rs=1" style={{height:"50px",width:"50px",borderRadius:"50%"}} alt="" />
                            <div style={{marginLeft:"10px"}}>
                            <h4 style={{fontFamily:"fantasy"}}><Link style={{textDecoration:"none"}} to={`/messageroom/${item._id}`}>{item.name}</Link></h4>
                            <p style={{opacity:"0.8"}}>@{item.username}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Messagetofrinds