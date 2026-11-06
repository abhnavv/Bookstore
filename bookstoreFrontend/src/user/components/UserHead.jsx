import React, { useContext, useEffect } from 'react'
import { FaInstagram ,FaTwitter,FaFacebook,FaUserCircle } from "react-icons/fa";
import {Link,useNavigate} from 'react-router-dom'
import { IoMdMenu } from "react-icons/io";
import { useState } from 'react';
import logo from '../../assets/logo.png'
import axiosInstances from '../../api/axiosinstances';
import {routerContext} from '../../context/RouterGuardContext';

function UserHead() {
  const{setAuthorizedUser} = useContext(routerContext)
  const [menu,setMenu]=useState(false)
  const [token,setToken]=useState("")
  const [userDp,setUserDp]=useState("")
  const [profileMenu,setProfileMenu]=useState(false)
  const [userId,setUserId]=useState("")
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(sessionStorage.getItem("user") && sessionStorage.getItem("token")){
      const userToken=sessionStorage.getItem("token")
      const user=JSON.parse(sessionStorage.getItem("user"))
      setToken(userToken)
      setUserDp(user.picture)
      setUserId(user._id)
    }
  },[token])
  const menuClick=()=>{
      setMenu((prev)=>!prev)
  }

  const logout = () => {
    sessionStorage.clear()
    setAuthorizedUser(false)
    setToken("")
    setUserDp("")
    setUserId("")
    navigate('/login')   
  }
  return (
    
      <div className='w-full'>
          {/* main logo and text nav bar */}
          <div className='flex md:justify-between items-center gap-8 w-full'>
            <div className='ms-5'>
              <img src={logo} alt=""  width={'70px'} height={'20px'}/>
              </div>
            <h1 className='flex text-2xl font-bold text-center items-center'>Bookstore</h1>
            <div className='hidden md:flex md:gap-3 md:items-center me-4'>
              <FaInstagram/>
              <FaTwitter />
              <FaFacebook/>
              {token ?
                <div>
                  {/* profile image button logined */}
                  <button className='hover:transition-transform duration-300 hover:scale-110' onClick={()=>setProfileMenu(!profileMenu)}>
                    <img src={userDp=="" ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGk-piaMj-n2TkqRj0rDm179qigocTLVvndFtN0cNxlzNUMWgk6Gfz6O0&s=10' :  userDp?.startsWith('https://lh3.googleusercontent.com/')?userDp:`${axiosInstances.defaults.baseURL}/uploads/${userDp}` } alt="" style={{height:'40px',width:'40px',borderRadius:'50%'}}/>
                  </button>
                  {/* dropdown */}
                  {profileMenu &&
                    <div className='z-20 p-2 shadow  rounded absolute top-15 right-0 bg-white ring ring-black/40 w-30'>
                    <Link to={`/profile/${userId}`}className='ms-1'>Profile</Link>
                    <button className='p-2 block' onClick={logout}>Logout</button>
                    
                  </div>
                  }
                </div>
                :
                <Link to={'/login'} className='hidden md:flex bg-blue-500 p-2 border-gray-200 shadow rounded-xl text-black font-black hover:transition-transform duration-300 hover:scale-105 '>Login</Link>
            
            }
            </div>
          
          </div>
          {/* menu navbar and desktop menus */}
          <div className='bg-blue-950 w-full h-15 flex gap-6 items-center justify-between px-9 md:justify-center text-white'>
            <IoMdMenu className='md:hidden float-left text-2xl shadow-amber-50' onClick={menuClick}/>
              
                <Link to={'/'} className='hidden md:flex hover:text-blue-400  hover:transition-transform duration-300 hover:scale-110'>Home</Link>
                <Link to={'/all-books'} className= 'hidden md:flex hover:text-blue-400  hover:transition-transform duration-300 hover:scale-110'>Books</Link>
                <Link to={'/contact'} className='hidden md:flex hover:text-blue-400 hover:transition-transform duration-300 hover:scale-110'>Contact</Link>
            {token ?
              
              <div className='md:hidden'>
                <button className='hover:transition-transform duration-300 hover:scale-110' onClick={()=>setProfileMenu(!profileMenu)}>
                  <img src={userDp=="" ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGk-piaMj-n2TkqRj0rDm179qigocTLVvndFtN0cNxlzNUMWgk6Gfz6O0&s=10' : userDp?.startsWith('https://lh3.googleusercontent.com/')?userDp : `${axiosInstances.defaults.baseURL}/uploads/${userDp}` } alt="" style={{height:'40px',width:'40px',borderRadius:'50%'}}/>
                </button>
                {/* dropdown */}
                {profileMenu &&
                  <div className='text-black z-20 p-2 shadow  rounded absolute top-30 right-0 bg-white ring ring-black/40 w-30'>
                  <Link to={`/profile/${userId}`} className='ms-1'>Profile</Link>
                  <button className='p-2 block' onClick={logout}>Logout</button>
                  
                </div>
                }
              </div>
              :
              <Link to={'/login'} className='bg-blue-500 p-2 border-gray-200 shadow rounded-xl text-black font-black hover:transition-transform duration-300 hover:scale-105 md:hidden'>Login</Link>
            }
        </div>
       <div className={menu ?'md:hidden max-h-50 w-full flex flex-col bg-blue-950 text-white font-mono transition-all duration-300 ease-out overflow-hidden opacity-100 translate-y-0 pointer-events-auto':'md:hidden max-h-0 opacity-80 translate-y-0 pointer-events-none overflow-hidden transition-all duration-300 flex flex-col bg-blue-950 text-white font-mono'}>
          <Link to={'/'} className='ps-10 mt-3 text-xl'>
          <label className='hover:text-blue-400 hover:transition-transform duration-300 hover:text-lg'>Home</label>
          </Link>
          <Link to={'/all-books'} className='ps-10 text-xl mt-3 hover:text-blue-400 hover:text-lg'>
          <label className='hover:text-blue-400 hover:transition-transform duration-300 hover:text-lg'>Books</label>
          </Link>
          <Link to={'/contact'} className='ps-10 text-xl mt-3 mb-8 '><label className='hover:text-blue-400 hover:transition-transform duration-300 hover:text-lg'>Contact</label></Link>   
        </div>
          
      </div>
      
    
  )
}

export default UserHead
