import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signin() {
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let navigate=useNavigate()

    let postData=async()=>{
     fetch("http://localhost:8080/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            console.log(data.token)
            console.log(data.userid)
            localStorage.setItem("socialNetworkapp2",data.token)
            localStorage.setItem("userIdsocialnetwork",data.userid)
            navigate('/')
            alert(`${email} signin successfully`)
        })
        .catch((err)=>console.log(err))
    }
  return (
    <div className='container'>
        
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="floatingInput" placeholder="name@example.com" fdprocessedid="kg9gwi"/>
      <label htmlFor="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="floatingPassword" placeholder="Password" fdprocessedid="cmfzp"/>
      <label htmlFor="floatingPassword">Password</label>
    </div>

    <button className="btn btn-primary w-100 py-2" onClick={postData} type="submit" fdprocessedid="2wjgpx">Sign in</button>
    <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>

    </div>
  )
}

export default Signin