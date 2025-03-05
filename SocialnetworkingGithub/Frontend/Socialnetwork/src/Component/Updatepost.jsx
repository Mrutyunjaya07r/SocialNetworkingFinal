import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

function Updatepost() {
    let navigate=useNavigate()
    let {id}=useParams();
    let [caption,setCaption]=useState("")
    let updatepost=async()=>{
        let result=await fetch(`http://localhost:8080/updatepost/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')
            },
            body:JSON.stringify({
                caption:caption
            })
        })
        result=await result.json();
        console.log(result);
        setCaption(result);
        alert('updated successfully')
        navigate('/')

    }
  return (
    <div className='container'>
         <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Caption</label>
    <input type="text" placeholder='Enter the caption' className="form-control" value={caption} onChange={(e)=>{setCaption(e.target.value)}} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <button className='btn btn-primary' onClick={updatepost}>Update</button>
  </div>
    </div>
  )
}

export default Updatepost