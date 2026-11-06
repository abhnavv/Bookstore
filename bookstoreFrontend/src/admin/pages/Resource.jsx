import React, { useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BooksAPI, editBookStatusAPI, getAllUsersAPI } from '../../services/allApi'
import axiosInstances from '../../api/axiosinstances'
import { FaIndianRupeeSign } from 'react-icons/fa6'
function Resource() {
  const [bookList,setBookList]=useState(true)
  const [userList,setUserList]=useState(false)
  const [allbooks,setAllbooks] = useState([])
  const [allUsers,setAllUsers] = useState([])
  console.log(allUsers)
  useEffect(()=>{
    if(bookList){
      getBooks()
    }else if(userList){
      getAllUsers()
    } 
   
  },[bookList,userList])
  const getBooks = async () => {
    const res = await BooksAPI()
    console.log(res)
    setAllbooks(res.data)
  }
  const updateBookStatus = async(id) => {
    const res = await editBookStatusAPI(id)
    console.log(res)
    if(res.status == 200){
      getBooks()
    }
  }
  const getAllUsers = async() => {
    const res = await getAllUsersAPI()
    console.log("res",res)
    setAllUsers(res.data)
  }
  return (
    <>
      <AdminHeader/>
        <div className='md:grid grid-cols-5 gap-10'>
          <div className='col-span-1'>
            <Sidebar/>
          </div>
          <div className='col-span-4 text-center py-6'>
            <div >
              <div >
                <h1 className='text-2xl font-bold'>All Books</h1>
              </div>
              <div>
                {/* menu selection */}
                <div className='flex items-center justify-center my-10'>
                    <p onClick={()=>{
                      setBookList(true);
                      setUserList(false);
                     
                    }
                    } className={bookList ? 'text-blue-600 p-3 border-t border-l border-r rounded cursor-pointer border-gray-200':"text-black p-3 cursor-pointer"}>Book List</p>
                    <p onClick={()=>{
                      setBookList(false);
                      setUserList(true);
                      
                    }
                    } className={userList ? 'text-blue-600 p-3 border-t border-l border-r rounded cursor-pointer border-gray-200':"text-black p-3 cursor-pointer"}>User List</p>
                    </div>
              </div>
              {/* all book Ui */}
              {bookList &&
                     <div className='grid grid-cols-1 md:grid-cols-2   lg:grid-cols-4  gap-9 md:gap-13 justify-items-center mx-6'>
                         {allbooks?.length>0 ? 
                         allbooks?.map(book => (
                          <div className='flex flex-col border border-gray-200 shadow p-3 rounded-xl justify-center items-center w-50 mb-6'>
                          <Link 
                          // to={`/view/${book?._id}/book`}
                          ><img src={book?.imageUrl}alt="" height={'300px'} width={'150px'} className='h-40 w-full '/></Link>
                          <h1 className='text-2xl mt-2 font-semibold'>{book?.author}</h1>
                          <h3 className='text-xl mt-1 font-semibold'>{book?.title}</h3>
                          <p className='text-blue-500 mt-1 font-semibold flex items-center'><FaIndianRupeeSign/>{book?.price}</p>
                          {book?.status != 'Approved' ?<button className='bg-blue-800 px-3 rounded-xl py-1 text-white font-serif mt-2 hover:transition-transform duration-300 hover:scale-105 hover:bg-blue-600' onClick={()=>updateBookStatus(book?._id)}>Approve</button>
                          :
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbww--i0P8Ufh8wb7pYiRkrtgK5WDMK9GVCcwLwbmwpQ&s=10" alt="" width={'50px'} className='m-3'/>
                          }
                        </div>
                         ))
                        :
                        <p>Loading...</p>
                      }
                        
                          
                        
                       
                    </div>}
                    {/* Users List UI */}
                    {userList && 
                      <div className='md:grid grid-cols-2 gap-5 mx-2  overflow-hidden'>
                        {allUsers?.length>0 ?
                        allUsers?.map(user=>(
                          <div className='rounded bg-gray-300 text-start p-3 mb-3'>
                          <h4 className='text-red-500 font-bold'>ID : {user?._id}</h4>
                          <div className='flex mt-3 gap-4'>
                          <img src={user?.picture=="" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFU1YTWZkfYbAKy7j4h5PnUwjlhhs4f2DW9OVL68NI4Q&s=10" : user?.picture?.startsWith('https://lh3.googleusercontent.com/')?user.picture : `${axiosInstances.defaults.baseURL}/uploads/${user?.picture}` } alt="user Dp" style={{height:'100px',width:'100px',borderRadius:'50%'}}/>
                          
                          <div>
                            <h2 className='text-xl font-bold'>{user?.username}</h2>
                            <h3 className='font-bold text-blue-500'>{user?.email}</h3>
                          </div>
                          </div>

                        </div>
                        ))
                        :
                        <p className='text-center text-red-600'>No users Found !</p>
                          }
                        
                      </div>
                    }
            </div>
          </div>

        </div>
    </>  
  )
}

export default Resource
