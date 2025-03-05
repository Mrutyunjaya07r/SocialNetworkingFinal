import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    let navigate=useNavigate()
    let [name,setName]=useState("")
    let [username,setUsername]=useState("")
    let [password,setPassword]=useState("")
    let [email,setEmail]=useState("")

    let userDetail=async()=>{
        let result=await fetch('http://localhost:8080/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:name,
                username:username,
                email:email,
                password:password
            })
        })
        result=await result.json();
        console.log(result);
        navigate('/signin')
        alert(`${name} registered successfully`)
    }

  return (
    <div>
        <div className="container">
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" value={name} onChange={(e)=>{setName(e.target.value)}} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
    <input type="text" className="form-control" id="exampleInputEmail2" value={username} onChange={(e)=>{setUsername(e.target.value)}} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail3" value={email} onChange={(e)=>{setEmail(e.target.value)}} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="exampleInputPassword4"/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={userDetail}>Submit</button>
    </div>
        </div>
      
  )
}

export default Signup