import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../../assets/logo.png'
import { AiOutlinePoweroff } from "react-icons/ai";
import { routerContext } from '../../context/RouterGuardContext';

function AdminHeader() {
  const {setAuthorizedUser} = useContext(routerContext)
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.clear()
    setAuthorizedUser(false)
    navigate('/login')   
  }
  return (
    
      <div>
          {/* main logo and text nav bar */}
          <div className='flex  items-center gap-3 justify-between'>
            <div className='flex  items-center md:gap-3'>
              <div className='ms-5'>
                <img src={logo} alt=""  width={'70px'} height={'20px'} className='h-13 w-14'/>
                </div>
              <h1 className='flex text-2xl font-bold text-center items-center'>Bookstore</h1>
            </div>
            <div className='flex gap-4 items-center me-4 relative inset-0 bg-blue-300 p-2 px-6 border-gray-200 shadow rounded-xl text-sm md:text-md text-black font-black hover:transition-transform duration-300 hover:scale-105 hover:bg-blue-400 '>
              <AiOutlinePoweroff className='absolute left-2'/>
              <button onClick={logout}
              >Logout</button>
              
            </div>
          
          </div>
          {/* marquee */}
          <div className='bg-blue-950 w-full h-12 flex gap-6 items-center justify-between px-9 md:justify-center text-white'>
            <marquee behavior="" direction="">Welcome, Admin! You're all set to manage and monitor the system. Let's get to work!</marquee>
          </div>
       
          
      </div>
      
    
  )
}

export default AdminHeader
