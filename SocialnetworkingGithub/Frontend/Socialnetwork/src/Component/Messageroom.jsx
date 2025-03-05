import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Messageroom() {
    let [text,setText]=useState("")
    let [msgdata,setMsgdata]=useState([])
    let {id}=useParams();
    let showallmessage=async()=>{
        let result=await fetch(`http://localhost:8080/getallmessages/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')  
            }
        })
        result=await result.json();
        console.log(result)
        setMsgdata(result)

    }
    let postamessage=async()=>{
        let result=await fetch(`http://localhost:8080/sendmessage/${id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('socialNetworkapp2')  
            },
            body:JSON.stringify({
                text:text
            })
        })
        result=await result.json();
        console.log(result);
        setText('')
        showallmessage()
    }
    useEffect(()=>{
        showallmessage();
    },[])
  return (
    <div className='container'>
        <h1>Chat Room</h1>
        <div className="messagebox">
            {
               msgdata.length > 0 ? msgdata.map((item,index)=>(
                <div key={index}>
                   {
                    localStorage.getItem('userIdsocialnetwork') === item.senderId ? 
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                    <p style={{backgroundColor:"lightgreen",width:"30%",padding:"10px",margin:"10px",borderRadius:"10px"}}>{item.text}</p>
                    </div>
                     : 
                     <div>
                     <p style={{backgroundColor:"whitesmoke",width:"30%",padding:"10px",margin:"10px",borderRadius:"10px"}}>{item.text}</p>
                     </div>
                   }
                </div>
               )) : <p>No message till</p>
            }
        </div>
        <div className="chatinput">
        <div className="mb-3" style={{display:"flex",alignItems:"center"}}>
    <input type="text" className="form-control" value={text} onChange={(e)=>{setText(e.target.value)}} placeholder='Enter your message' id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={postamessage}>Send</button>
  </div>
        </div>
    </div>
  )
}

export default Messageroom