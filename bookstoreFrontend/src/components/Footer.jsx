import React from 'react'
import { FaInstagram,FaTwitter,FaFacebook,FaLinkedin } from 'react-icons/fa'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer>

    
    <div className='md:grid grid-cols-3 md:gap-20 bg-gray-800 text-white p-10'>
      
      <div className='min-w-0'>
        <h5 className='mb-2'>ABOUT US</h5>
        <p className='text-justify leading-relaxed'>Welcome to our Bookstore, your destination for discovering great books and exploring new ideas. We offer a wide range of books across different genres to inspire, educate, and entertain readers. 
        </p>
      </div>
      <div className='mt-5 md:mt-0'>
        <h5>NEWSLETTER</h5>
        <p style={{marginBottom:'10px',marginTop:'7px'}}>Stay updated with our latest trends</p>
       <div className='flex mt-4'> 
        <input type="text" className='text-black bg-white p-2' placeholder='email Id'/>
        <button className='bg-yellow-300 p-2'><FaArrowRight/></button>
        </div>
        {/* Links */}
        {/* <div className='mt-4 flex flex-col'>
          <h1>Links</h1>
          <Link to={'/'} className='text-gray-400 hover:text-gray-500'>Home</Link>
          <Link to={'/all-books'} className='text-gray-400 hover:text-gray-500'>Books</Link>
          <Link to={'/contact'} className='text-gray-400 hover:text-gray-500'>Contact</Link>

        </div> */}
      </div>
      <div className='mt-5 md:mt-0'>
        <h5 className='mb-1'>FOLLOW US</h5>
        <p className='mb-2'>Let us be social</p>
        <div className='flex gap-3'>
          <FaInstagram/>
          <FaTwitter/>
          <FaFacebook/>
          <FaLinkedin/>
        </div>
      </div>
    </div>
    <div className='flex items-center justify-center w-full h-16 bg-black text-white'>
      <p>Copyright © 2023 All rights reserved | This website is made with by Creator</p>
    </div>
    </footer>
  )
}

export default Footer
