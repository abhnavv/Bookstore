import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Header from '../../user/components/UserHead'
import { Link } from 'react-router-dom'
import { IoFilter } from "react-icons/io5";
import { allBooksAPI } from '../../services/allApi'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { searchContext } from '../../context/SearchContext';
import { makePaymentAPI } from '../../services/allApi';
function AllBooks() {
  const [listStatus, setListStatus] = useState(false)
  const [token, setToken] = useState("")
  const [allbooks,setAllbooks] = useState([])
  const [dummyAllbooks,setDummyAllbooks] = useState([])

  const [categoryList,setCategoryList] = useState([])
  
  const {searchKey,setSearchKey} = useContext(searchContext)
  // console.log("dummy",dummyAllbooks);
  console.log("all",allbooks);

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
    getBooks()
  },[searchKey])

  const getBooks = async() => {
      const res = await allBooksAPI(searchKey)
      // console.log(res)   
      setAllbooks(res.data)
      setDummyAllbooks(res.data)
      const tempCategoryList = res.data.map(bk => bk.category)
      setCategoryList([...new Set(tempCategoryList)])

  }

  const filterBook = (category) => {
      // console.log("inside cateogry function");
      // console.log(category);
      if(category!='all'){
        setAllbooks(dummyAllbooks?.filter(book => book.category == category))
  
      }else{
      
        setAllbooks(dummyAllbooks)
      }
      
      
  }
  const makePayment = async(id) => {
    console.log(id)
    const res = await makePaymentAPI(id)
    console.log(res);
    if(res.status==200){
      const {checkoutURL} = res.data
      window.location.href=checkoutURL
    }
  }
  return (
    <>
      <Header />
      {
        token ? 
        
      <>

      {/* search button area */}
      <div className='flex flex-col items-center justify-center my-7'>
        <h1 className='text-2xl font-black'>Collections</h1>
        <div className='flex mt-6'>
          <input type="text" className='bg-white px-5  border border-gray-400 rounded-e-none shadow-2xl w-full md:w-90 rounded h-8' placeholder='Search by Title' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)}/>
          <button className='bg-green-800 rounded rounded-s-none px-3 text-white font-bold'>Search</button>
        </div>
      </div>

      {/* filter and cards grid */}
      <div className='flex flex-col md:flex-row '>
        {/* filter section */}
        
        
          <div className='flex flex-col px-9 '>
            <div className='flex items-center  gap-3  md:justify-start mb-3'>
              
                <h1 className='text-xl font-bold ' >Filter</h1>
                  <button onClick={() => setListStatus(!listStatus)} className='md:hidden cursor-pointer hover:text-blue-600' >
                  <IoFilter /></button>
           
            </div>
          
            
            <div className={`${listStatus ? 'block' : 'hidden'} md:block`}>
              { 
                categoryList ?.map(cat => (
                <div key={cat} className='flex gap-3 my-2 text-black'>
                <input name='filter' type="radio" onClick={()=>filterBook(cat)} />
                <label >{cat}</label>  
                </div>
                ))
              }
              <div className='flex gap-3'>
                <input name='filter' type="radio" id='NoFilter' onClick={()=>filterBook('all')}/>
                <label htmlFor="NoFilter">No Filter</label>
              </div>
            </div>
          
          </div>
        {/* cards section */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6  md:justify-items-center justify-items-center items-center text-center w-full mb-8'>
          {
           allbooks?.length > 0 ?
            allbooks?.map(book => (
              <div hidden={book?.status == 'Pending' || book?.status =='Sold'} key={book._id} className='shadow-xl hover:shadow-2xl transition-shadow duration-300 p-5 w-full max-w-64 rounded-lg'>
              <Link to={`/view/${book?._id}/book`}><img src={book?.imageUrl} alt="" className='w-full h-64 object-contain hover:transition-transform duration-300 hover:scale-105' /></Link>
              <div className='mt-3 text-center'>
                <h1 className='text-blue-500'>{book?.author}</h1>
                <h2>{book?.title}</h2>
                <h2 className='bg-red-500 rounded mt-3 py-1 hover:transition-transform duration-300 hover:scale-105 text-white font-extralight flex items-center justify-center cursor-pointer' onClick={()=>makePayment(book._id)}>Buy now <FaIndianRupeeSign className='ms-2'/>
                {book?.price}</h2>
              </div>
            </div>
            ))
         
          :
          <p className='text-center'>Loading...</p>
          }
        </div>
      </div>
      </>
      :
      <div className='min-h-screen flex flex-col md:flex-row items-center justify-center px-3'>
        <img src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif" alt="" className='h-100 mt-0'/>
        <h3 className='text-2xl'>Please <Link to={'/login'} className='font-black text-blue-900 hover:text-blue-600'>Login</Link> to Explore more...</h3>
      </div>
      }
    </>
  )
}

export default AllBooks
