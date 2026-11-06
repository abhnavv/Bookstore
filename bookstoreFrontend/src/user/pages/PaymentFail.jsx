import React from 'react'
import Header from '../../user/components/UserHead'
import { Link } from 'react-router-dom'

function PaymentFail() {
  return (
    <div className='w-full min-h-screen overflow-x-hidden'>
      <Header/>
      <div className='container flex items-center justify-center min-h-screen w-full'>
        <div className='md:grid grid-cols-2 gap-8 w-full justify-center items-center px-3 md:px-20 overflow-hidden flex-wrap'>
            <div className='mt-3 flex flex-col gap-7 w-full'>
                <h1 className='text-3xl md:text-4xl font-extrabold font-serif text-red-600'>Sorry! Your Payment is Declined</h1>
                <p className='text-md md:text-xl font-bold '>We Apologise for the inconvenience caused and appreciate your visit to bookstore.</p>
                <Link to={'/all-books'} className='bg-blue-600 text-white rounded shadow px-4 py-3 w-50'>Explore More Books</Link>
            </div>
            <div className='flex items-center justify-center'>
                <img src="https://i0.wp.com/nrifuture.com/wp-content/uploads/2022/05/comp_3.gif?fit=800%2C600&ssl=1" alt="" className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto object-contain"/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentFail
