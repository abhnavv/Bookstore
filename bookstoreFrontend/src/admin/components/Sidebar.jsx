import React, { useEffect, useState } from 'react'
import {  AiOutlineHome } from 'react-icons/ai'
import { FaBook } from "react-icons/fa6";
import { IoIosMenu, IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import axiosInstances from '../../api/axiosinstances';
function Sidebar() {
  const [menu,setMenu]=useState(false)
  const [userName,setUsername] = useState("")
  const [dp,setDp] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      let user = JSON.parse(sessionStorage.getItem("user"))
      setUsername(user.username)
      setDp(user.picture)
    }
  })
  const menuToggle=()=>{
    setMenu(prev=>!prev)
  }
  return (
    <div className='bg-blue-200 p-5 flex flex-col items-center mb-15 h-full w-full'>
        <img src={dp=="" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFU1YTWZkfYbAKy7j4h5PnUwjlhhs4f2DW9OVL68NI4Q&s=10" : dp?.startsWith('https://lh3.googleusercontent.com/')?dp : `${axiosInstances.defaults.baseURL}/uploads/${dp}`} alt="" style={{height:'100px',width:'100px',borderRadius:'50%'}} className='mt-5'/>
        <h1 className='mt-3 font-bold'>{userName}</h1>
        <div className='mt-4 flex flex-col items-center justify-center'>
          <IoIosMenu className='flex md:hidden text-blue-700 text-4xl' onClick={()=>menuToggle()}/>
            {menu && <div className='md:hidden flex flex-col items-start  mt-7 mb-4 gap-6 font-bold font-serif'>
          <Link to={'/admin-dashboard'} className='flex items-center gap-4 hover:text-blue-500'><AiOutlineHome/>Home</Link>
          <Link to={'/admin-resources'} className='flex items-center gap-3 hover:text-blue-500'><FaBook/>All Books</Link>
          <Link to={'/admin-settings'} className='flex items-center gap-3 hover:text-blue-500'><IoMdSettings/> Settings</Link>
        </div>}
        </div>
       
        <div className='md:flex md:flex-col items-start  mt-13 gap-6 font-bold font-serif hidden '>
          <Link to={'/admin-dashboard'} className='flex items-center gap-4 hover:text-blue-500'><AiOutlineHome/>Home</Link>
          <Link to={'/admin-resources'} className='flex items-center gap-3 hover:text-blue-500'><FaBook/>All Books</Link>
          <Link to={'/admin-settings'} className='flex items-center gap-3 hover:text-blue-500'><IoMdSettings/> Settings</Link>
        </div>
    </div>
  )
}

export default Sidebar
