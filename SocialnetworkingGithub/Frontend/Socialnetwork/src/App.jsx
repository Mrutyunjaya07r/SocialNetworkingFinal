import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Component/Navbar'
import Signup from './Component/Signup'
import Signin from './Component/Signin'
import Home from './Component/Home'
import Addpost from './Component/Addpost'
import Userprofile from './Component/Userprofile'
import Otherprofile from './Component/Otherprofile'
import Updatepost from './Component/Updatepost'
import Deletepost from './Component/Deletepost'
import Savepost from './Component/Savepost'
import Savedpostlist from './Component/Savedpostlist'
import Comments from './Component/Comments'
import Messagetofrinds from './Component/Messagetofrinds'
import Messageroom from './Component/Messageroom'

function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/addpost' element={<Addpost/>}/>
        <Route path='/myprofile' element={<Userprofile/>}/>
        <Route path='/otherprofile/:id' element={<Otherprofile/>}/>
        <Route path='/updatepost/:id' element={<Updatepost/>}/>
        <Route path='/deletepost/:id' element={<Deletepost/>}/>
        <Route path='/savepost/:postId' element={<Savepost/>}/>
        <Route path='/savedpostlist' element={<Savedpostlist/>}/>
        <Route path='/comments/:postId' element={<Comments/>}/>
        <Route path='/messagelobby'  element={<Messagetofrinds/>}/>
        <Route path='/messageroom/:id' element={<Messageroom/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
