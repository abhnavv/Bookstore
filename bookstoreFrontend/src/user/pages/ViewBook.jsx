import React, { useState,useEffect } from 'react'
import Header from '../../user/components/UserHead'
import { FaBackward } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera, faXmark} from "@fortawesome/free-solid-svg-icons"
import { getSingleBookAPI } from '../../services/allApi';
import { Link, useParams } from 'react-router-dom';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import axiosInstances from '../../api/axiosinstances';
import { makePaymentAPI } from '../../services/allApi';

function ViewBook() {
  const [modalStatus,setModalStatus]=useState(false)
  const [bookDetails,setBookDetails] = useState({})
  const{id} = useParams()
  console.log(bookDetails);
  
  useEffect(()=> {
    getBook()
  },[])
  const getBook = async() => {
    const res = await getSingleBookAPI(id)
    console.log(res);
    if(res.status == 200){
      setBookDetails(res.data[0])
    }
  }

  const makePayment = async() => {
    const res = await makePaymentAPI(id)
    console.log(res);
    if(res.status==200){
      const {checkoutURL} = res.data
      window.location.href=checkoutURL
    }
    
  }
  return (
    <>
      <Header/>
      
        <div className='mx-4 my-10 border border-gray-300 shadow-2xl h-full grid grid-cols-1 md:grid-cols-5 items-center justify-center md:items-start md:justify-center gap-11 px-9 py-6 rounded-lg'>
          <div className='col-span-2 justify-items-center w-full'>
            <img src={bookDetails?.imageUrl} alt="book-image" className='w-60 md:h-70 md:w-70'/>
          </div>
         
          <div className='col-span-3'>
              <div className='flex flex-col items-center md:items-start w-full'>
                <div className='flex w-full relative justify-center md:justify-start'>
                  <h1 className='text-2xl font-bold'>{bookDetails?.title}</h1>
                  <BsEye  className='flex absolute right-0 text-gray-400 hover:text-black' onClick={()=>setModalStatus(true)}/>  
                </div>
               
                <p className='text-blue-500 mt-1'>- {bookDetails?.author}</p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-lg font-black mt-5 gap-9 justify-items-center md:justify-items-normal'>
                  <h1><label className='text-gray-600'>Publisher</label> : {bookDetails?.publisher}</h1>
                  <h1><label className='text-gray-600'>Language</label> : {bookDetails?.language}</h1>
                  <h1><label className='text-gray-600'>No. of pages</label> : {bookDetails?.pages}</h1>
                  <h1><label className='text-gray-600'>Category</label> : {bookDetails?.category}</h1>
                  <h1 className='flex items-center md:items-start'><label className='text-gray-600'>Real Price</label> : <label className='flex items-center ms-2'><FaIndianRupeeSign/>{bookDetails?.price}</label></h1>
                  <h1><label className='text-gray-600'>ISBN</label> : {bookDetails?.isbn}</h1>
              </div>
              <div className='mt-7 font-bold'>
                <p className='text-justify'>
                {bookDetails?.abstract}
                </p>
              </div>
              <div className='flex flex-col md:flex-row gap-8 mt-10 items-center justify-center md:justify-end text-white'>
                <Link to={'/all-books'} className='bg-blue-400 px-6 py-2  flex items-center justify-center gap-1 rounded-lg hover:transition-transform duration-600 hover:shadow-2xl hover:bg-blue-700 font-mono'><FaBackward/>Back</Link>
                <button className='bg-green-400 px-6 py-2  rounded-lg hover:transition-transform duration-600 hover:shadow-2xl hover:bg-green-700 font-mono flex items-center' onClick={makePayment}>Buy @ <FaIndianRupeeSign/>{bookDetails?.discountPrice}</button>
              </div>
          </div>
        </div>
        {/* modal */}
        {modalStatus && <div className='relative z-10'>
          <div className='bg-gray-800/75 inset-0 fixed overflow-auto'>
            <div className='flex items-center justify-center min-h-screen px-10'>
              <div className='bg-white w-full' style={{height:'500px'}}>
                {/* modal header */}
                  <div className='flex text-white p-3 bg-black items-center justify-between'>
                      <h3>Book Images</h3>
                      <FontAwesomeIcon icon={faXmark} onClick={()=>setModalStatus(false)} className='bg-white text-black rounded p-1 hover:bg-red-500'/>
                    
                  </div>
                  {/* modal body */}
                  <div className='p-5 bg-white'>
                    <p className='text-blue-700'>
                      <FontAwesomeIcon icon={faCamera}/>
                      camera clicks of the books in the seller hands
                    </p>
                    <div className='flex flex-col md:flex-row my-4 gap-3 items-center justify-center md:justify-start'>
                      {/* duplicate image */}
                      {
                        bookDetails.uploadImages?.map(file=>(
                          <img src={`${axiosInstances.defaults.baseURL}/uploads/${file}`} alt="" he ight={'200px'} width={'170'}/>
                        ))
                      }
                      
                      
                    </div>
              </div>
              </div>
            </div>
          </div>
        </div>}
      
      
      
    </>
  )
}

export default ViewBook
