import React, { useEffect } from 'react'
import Header from '../../user/components/UserHead'
import { Link } from 'react-router-dom'
import { verifyPaymentAPI } from '../../services/allApi'

function PaymentSuccess() {
  useEffect(()=>{
    verifyPayment()
  },[])
  const verifyPayment = async() => {
    const sessionID = new URLSearchParams(window.location.search).get("session_id")
    const res = await verifyPaymentAPI({sessionID})
    console.log(res);
    
  }
  return (
    <div className='w-full min-h-screen overflow-x-hidden'>
      <Header/>
      <div className='container flex items-center justify-center min-h-screen w-full'>
        <div className='md:grid grid-cols-2 gap-8 w-full justify-center items-center px-3 md:px-20 overflow-hidden flex-wrap'>
            <div className='mt-3 flex flex-col items-center justify-center gap-7 w-full mb-4'>
                <h1 className='text-3xl md:text-4xl font-extrabold font-serif text-blue-600 flex items-center justify-center text-center'>Congratulations !!</h1>
                <p className='text-sm md:text-2xl font-bold '>Thankyou for shopping with Bookstore.Hope you have a good time with us</p>
                <Link to={'/all-books'} className='bg-blue-600 text-white rounded shadow px-4 py-3 w-50'>Explore More Books</Link>
            </div>
            <div className='flex items-center justify-center'>
                <img src="https://cdn.dribbble.com/userupload/25727579/file/original-9c6d8b3d1984842c178e2f0c9904912e.gif" alt="" className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto object-contain"/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
