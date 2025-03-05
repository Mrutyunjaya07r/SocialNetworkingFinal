import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Savedpostlist() {
    let [data,setData]=useState([]);
    let showlist=async()=>{
        let result=await fetch(`http://localhost:8080/savedpostlist`,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
            }
        })
        result=await result.json();
        console.log(result);
        setData(result)
    }
    useEffect(()=>{
        showlist()
    },[])
  return (
    <div>
        <div className="container">
        {
          data.map((item,index)=>(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
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
        <p className="card-text">{item.caption}</p>
      </div>
    </div>
            </div>
            
          ))
        }
        </div>
    </div>
  )
}

export default Savedpostlist