import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

function Deletepost() {
    let {id}=useParams();
    let navigate=useNavigate();
    let deletepost=async()=>{
        let result=await fetch(`http://localhost:8080/deletepost/${id}`,{
            method:"DELETE",
            headers:{
              'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')  
            }
        })
        result=await result.json();
        console.log(result);
        alert('delete successfully')
        navigate('/')
    }
    useEffect(()=>{
        deletepost();
    },[])

  return (
    <div>Deletepost</div>
  )
}

export default Deletepost