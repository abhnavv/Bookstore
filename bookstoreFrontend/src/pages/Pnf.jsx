import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routerContext } from '../context/RouterGuardContext'

function Pnf() {
  const {role,authorizedUser} = useContext(routerContext)
  const navigate = useNavigate()
  const backToHome = () => {
    if(role == 'user'){
      navigate('/')
    }else{
      navigate('/admin-dashboard')
    }
  }
  return (
    <div className='min-h-screen flex bg-center relative justify-center'>
      <img src="https://assets-v2.lottiefiles.com/a/2da937c8-118c-11ee-845b-23301914de27/q3nrjk4eIs.gif" alt="" />
      {
        authorizedUser ?
        <button onClick={backToHome} className='absolute bottom-1/12 bg-blue-500 px-3 py-2 rounded-2xl font-bold hover:bg-blue-800 hover:text-white'>
          Back to Home
        </button>
        :
        <Link to={'/'} className='absolute bottom-1/12 bg-blue-500 px-3 py-2 rounded-2xl font-bold hover:bg-blue-800 hover:text-white'>
          Back to Home
        </Link>
      }
    </div>
  ) 
}

export default Pnf
