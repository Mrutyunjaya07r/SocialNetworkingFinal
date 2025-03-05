import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Otherprofile() {
    let {id}=useParams();
    let [userdata,setUserdata]=useState([])
    let [postdata,setPostdata]=useState([])
    let otherprofile=async()=>{
        let result=await fetch(`http://localhost:8080/otherprofile/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
            }
        })
        result=await result.json();
        console.log(result)
        setUserdata(result.user)
        setPostdata(result.post)
    }

    let follow=async()=>{
        let result=await fetch(`http://localhost:8080/follow/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
            }
        })
        result=await result.json();
        console.log(result)
        alert('follow successfully')
    }
    let unfollow=async()=>{
        let result=await fetch(`http://localhost:8080/unfollow/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
            }
    })
    result=await result.json();
    console.log(result)
    alert('unfollow successfully')
}
    useEffect(()=>{
        otherprofile()
    },[])
  return (
    <div>
        <div className="container">
        {
            userdata.map((item,index)=>(
<div className="container" key={index}>
            <div className='header' style={{display:"flex",alignItems:"center",borderBottom:"0.5px solid black"}}>
            <img src="https://tse2.mm.bing.net/th/id/OIP.zSt1egbeKkPr-NskAb0qmgAAAA?pid=ImgDet&w=300&h=332&rs=1" style={{height:"200px",width:"200px",borderRadius:"50%",border:"1px solid white"}} alt="" />
            <div style={{margin:"20px"}}>
                <h2>{item.name}</h2>
                <h5>{item.username}</h5>
                <button className='btn btn-primary' style={{marginRight:"20px"}} onClick={follow}>Follow</button>
                <button className='btn btn-danger'  style={{marginRight:"20px"}} onClick={unfollow}>Unfollow</button>


            </div>
            </div>
        </div>
            ))
        }
        <h1>Posts</h1>
        {
    postdata.map((item, index) => (
            <div className="container" key={index}>
                <div>
                    <img src={item.image} alt="" style={{height:"200px",width:"200px",borderRadius:"10px"}} />
                    <p>{item.caption}</p>
                </div>
            </div>
        
    ))
}

        </div>

    </div>
  )
}

export default Otherprofile