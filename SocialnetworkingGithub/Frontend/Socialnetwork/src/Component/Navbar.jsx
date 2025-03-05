import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Navbar() {
    let navigate=useNavigate()
    let logout=()=>{
        localStorage.removeItem('socialNetworkapp2')
        navigate('/signin')
    }
  return (
    <div>
       <div className="container">
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <span className="fs-4">Social Network</span>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item"><Link to='/' className="nav-link" aria-current="page">Home</Link></li>
        <li className="nav-item"><Link to="/myprofile" className="nav-link">Your Profile</Link></li>
        <li className="nav-item"><Link to="/messagelobby" className="nav-link">Message</Link></li>
        <li className="nav-item"><Link to="/addpost" className="nav-link">Add post</Link></li>
        <li className="nav-item"><Link to="/savedpostlist" className="nav-link">Saved List</Link></li>

        {
            localStorage.getItem('socialNetworkapp2') ?        <button className='btn btn-danger' onClick={logout}>Logout</button>
            : <div style={{display:"flex",alignItems:"center"}}>
 <li className="nav-item"><Link to='/signup' className="nav-link">Register</Link></li>
 <li className="nav-item"><Link to='/signin' className="nav-link">Login</Link></li>
            </div>
        }
       
      </ul>
    </header>
  </div>
    </div>
  )
}

export default Navbar