import React, { useEffect, useState } from 'react'
import Header from '../components/UserHead'
import Edit from '../components/Edit'
import axiosInstances from '../../api/axiosinstances'
import { FaPlus } from 'react-icons/fa'
import {toast } from 'react-toastify';
import { addBookAPI,userBookAPI,removeBookAPI, userBoughtBookAPI } from '../../services/allApi'
import { FaIndianRupeeSign } from "react-icons/fa6";
import approved from "../../assets/approved.png"
import pending from "../../assets/pending.png"
import soldout from "../../assets/soldout.png"
import useDebounce from '../../hooks/useDebounce'
import { getBookAbstractAPI } from '../../services/allApi'

function Profile() {
  const [sellBooksStatus,setSellBooksStatus]=useState(true)
  const [booksStatus,setBooksStatus]=useState(false)
  const [purchaseStatus,setPurchaseStatus]=useState(false)
  const [username,setUsername]=useState("")
  const [dp,setDp]=useState("")
  const [bio,setBio]=useState("")
  const [bookDetails,setBookDetails]=useState({
    title:"",author:"",pages:"",imageUrl:"",price:"",discountPrice:"",abstract:"",publisher:"",isbn:"",language:"",category:"",uploadImages:[]
  })
  const [preview,setPreview] = useState("")
  const [previewList,setPreviewList] = useState([])
  const [userUploadBooks,setUserUploadBooks] = useState([])
  const [purchaseBooks,setPurchaseBooks] = useState([])
  const debouncedTitleSearch = useDebounce(bookDetails.title,500)


  // console.log("bookstatus",booksStatus)
 
  console.log(userUploadBooks)
  // session stottrage get itme
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      let user=JSON.parse(sessionStorage.getItem("user"))
    setUsername(user.username)
    setDp(user.picture)
    setBio(user.bio)
    
    }
    
  },[])
// menu slection calls when bookstatus and iserbought
  useEffect(() => {
    if(booksStatus){
      getUserBooks()
    }else if(purchaseStatus){
      userBoughtBook()
    }
  })
  // for getting abstract data through ai api 
  useEffect(()=>{
    if(debouncedTitleSearch){
      console.log("gemini api call")
      generateBookAbstract()
    }
  },[debouncedTitleSearch])

  // functon for getin title book abstract 
  const generateBookAbstract = async() => {
    const res = await getBookAbstractAPI(debouncedTitleSearch)
    console.log(res);
    if(res.status==200){
      setBookDetails({...bookDetails,abstract:res.data.content})
    }
    
  }

  const handleFileUpload = (e) => {
    const imageFile = e.target.files[0]
    setBookDetails({...bookDetails,uploadImages:[...bookDetails?.uploadImages,imageFile]})
    const url = URL.createObjectURL(imageFile)
    setPreview(url)
    setPreviewList([...previewList,url])
  }

  const resetForm =() => {
    setBookDetails({title:"",author:"",pages:"",imageUrl:"",price:"",discountPrice:"",abstract:"",publisher:"",isbn:"",language:"",category:"",uploadImages:[]})
    setPreview("")
    setPreviewList([])
  }
  
  const handleAddBook = async() => {
    const {title,author,pages,imageUrl,price,discountPrice,abstract,publisher,isbn,language,category,uploadImages}=bookDetails
    if(!title && !author && !pages && !imageUrl && !price &&!discountPrice && !abstract && !publisher && !isbn && !language && !category && !uploadImages.length==0){
      toast.warning("Fill the form completely!")
    }else{
      const reqbody = new FormData()
      for(let key in bookDetails){
        if(key !== "uploadImages"){
          reqbody.append(key,bookDetails[key])
        }else{
          bookDetails.uploadImages.forEach(file=>{
            reqbody.append("uploadImages",file)
          })
        }
      }
      const result = await addBookAPI(reqbody)
      // console.log(result);
      if(result?.status===200){
        toast.success("Book added Successfully")
      }else{
        toast.error(result.response)
      } 
      resetForm()
    }
  }

  const getUserBooks = async() => {
    const res = await userBookAPI()
    console.log(res);
    if(res.status==200){
      setUserUploadBooks(res.data)
    }
    
  }

  const removeBook = async(id) => {
    const res = await removeBookAPI(id)
    if(res.status === 200){
      getUserBooks()
    }
  }
  const userBoughtBook = async() => {
    const res = await userBoughtBookAPI()
    console.log(res)
    if(res.status == 200){
      setPurchaseBooks(res.data)
    }

  }
  return (
   
    <div>
      <Header/>
      <div className='bg-black w-full h-30'>
      </div>
          <div className='bg-white flex items-center justify-center' style={{height:'130px',width:'130px',borderRadius:'50%',marginTop:'-60px',marginLeft:'30px'}}>
            <img src={dp=="" ?  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGk-piaMj-n2TkqRj0rDm179qigocTLVvndFtN0cNxlzNUMWgk6Gfz6O0&s=10" : dp?.startsWith('https://lh3.googleusercontent.com/')?dp : `${axiosInstances.defaults.baseURL}/uploads/${dp}`} alt="" style={{height:'120px',width:'120px',borderRadius:'50%'}} />
            
          </div>
          <div className='bg-white w-full h-full mb-9'>
              {/* user bio */}
                <div className=' mt-3 px-9'>
                  <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-black'>{username}</h1>
                    <Edit/>
                    
                  </div>
                  <div className='mt-3'>
                  <p>{bio}</p>
                  </div>
                </div>
                {/* menu selection */}
                <div className='flex items-center justify-center my-13 mx-5'>
                  <p onClick={()=>{
                    setSellBooksStatus(true);setBooksStatus(false);
                    setPurchaseStatus(false)
                  }
                  } className={sellBooksStatus ? 'text-blue-600 p-3 border-t border-l border-r rounded cursor-pointer border-gray-200':"text-black p-3 cursor-pointer"}>Sell Book</p>
                  <p onClick={()=>{
                    setSellBooksStatus(false);setBooksStatus(true);
                    setPurchaseStatus(false)
                  }
                  } className={booksStatus ? 'text-blue-600 p-3 border-t border-l border-r rounded cursor-pointer border-gray-200':"text-black p-2 cursor-pointer"}>Book Status</p>
                  <p onClick={()=>{
                    setSellBooksStatus(false);setBooksStatus(false);
                    setPurchaseStatus(true)
                  }
                  } className={purchaseStatus ? 'text-blue-600 p-3 border-t border-l border-r rounded cursor-pointer border-gray-200':"text-black p-2 cursor-pointer"}>Purchase History</p>
                </div>
                {/* contents */}
                
                  {/* sell book Ui */}
                  {sellBooksStatus &&
                   <div className=' bg-gray-300 mx-6 md:mx-12 p-6 rounded-lg shadow min-w-50 flex flex-col'>
                        <h1 className='text-center font-black mb-5 text-2xl'>Book Details</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden'>
                          <input type="text" name="" id="" placeholder='Title' className='bg-white rounded shadow px-3 py-2' value={bookDetails.title} onChange={e=>setBookDetails({...bookDetails,title:e.target.value})}/>
                          <input type="text" placeholder='Publisher' className='bg-white rounded shadow px-3 py-2' value={bookDetails.publisher} onChange={e=>setBookDetails({...bookDetails,publisher:e.target.value})}/>
                          <input type="text" placeholder='Author' className='bg-white rounded shadow px-3 py-2' value={bookDetails.author} onChange={e=>setBookDetails({...bookDetails,author:e.target.value})}/>
                          <input type="text" placeholder='Language' className='bg-white rounded shadow px-3 py-2' value={bookDetails.language} onChange={e=>setBookDetails({...bookDetails,language:e.target.value})}/>
                          <input type="text" placeholder='No of Pages' className='bg-white rounded shadow px-3 py-2' value={bookDetails.pages} onChange={e=>setBookDetails({...bookDetails,pages:e.target.value})}/>
                          <input type="text" placeholder='ISBN' className='bg-white rounded shadow px-3 py-2' value={bookDetails.isbn} onChange={e=>setBookDetails({...bookDetails,isbn:e.target.value})}/>
                          <input type="text" placeholder='Image URL' className='bg-white rounded shadow px-3 py-2' value={bookDetails.imageUrl} onChange={e=>setBookDetails({...bookDetails,imageUrl:e.target.value})}/>
                          <input type="text" placeholder='Category' className='bg-white rounded shadow px-3 py-2' value={bookDetails.category} onChange={e=>setBookDetails({...bookDetails,category:e.target.value})}/>
                          <input type="text" placeholder='Price' className='bg-white rounded shadow px-3 py-2 h-11' value={bookDetails.price} onChange={e=>setBookDetails({...bookDetails,price:e.target.value})}/>
                          {/* abstract */}
                          <textarea type="text" placeholder='Abstract' className='bg-white rounded shadow px-3 py-2' value={bookDetails.abstract} onChange={e=>setBookDetails({...bookDetails,abstract:e.target.value})}/>
                          <input type="text" name="" id="" placeholder='Discount Price' className='bg-white rounded shadow px-3 py-2 h-11' value={bookDetails.discountPrice} onChange={e=>setBookDetails({...bookDetails,discountPrice:e.target.value})}/>

                         <div>
                            {/* upload book image */}
                            <div className='my-3 flex items-center justify-center'>
                            <label htmlFor='image'>
                              { preview==="" &&
                                <input type="file" className='hidden' id='image' onChange={e=>handleFileUpload(e)}/>}
                              <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfZw-bn-c44qZm2w_66PKPXyhJH212PgJyLnT6JDGm7OdzuW-4PMYSj1V&s=10" } alt="" style={{height:'100px',width:'100px',borderRadius:preview ? '0%' : '50%'}}/>
                              
                            </label>  
                            </div>
                            {/* display book image */}
                           {
                           preview && 
                            <div className='my-3 flex items-center justify-center pt-3'>
                              {
                              previewList?.map((url) => (
                              <img src={url} alt="" className='mx-2' style={{height:'70px',width:'70px'}} /> 
                              )
                                )}
                              { previewList?.length<3 &&
                                <label htmlFor='image'>
                              
                                <input type="file" className='hidden' id='image' onChange={e=>handleFileUpload(e)}/>
                                <FaPlus className='text-2xl'/>
                              </label>}
                              
                            </div>
                            }
                         </div>
                          
                        </div>
                        <div className='flex justify-end items-end me-3 gap-3 text-white mt-5'>
                            <button className='bg-gray-600 rounded px-3 py-2' onClick={resetForm}>Reset</button>
                            <button className='bg-red-600 rounded px-5 py-2' onClick={handleAddBook}>Add</button>
                          </div>
                  </div>}
                  
                  {/* book Status UI */}
                  {booksStatus && <div>
                    { userUploadBooks?.length>0 ?
                      userUploadBooks?.map(book =>(
                        <div className=' bg-gray-300 mx-12 mb-5 p-8 rounded-lg shadow md:grid grid-cols-[3fr_1fr] gap-6'>
                        <div>
                          <h1 className='text-2xl font-black text-red-500'>{book?.title}</h1>
                          <h1 className='text-lg font-serif text-gray-700'>- {book?.author}</h1>
                          <h1 className='text-md text-blue-500 font-bold flex items-center'><FaIndianRupeeSign/>{book?.price}</h1>
                          <p className='text-justify'>{book?.abstract}</p>
                          <div className='flex mt-9'>
                            {
                              book?.status=='Pending' ?
                              <img src={pending} alt="pending icon" className='w-40'/>
                              :
                              book?.status == 'Approved' ?
                              <img src={approved} alt="approved icon" className='w-40'/>
                              :
                              <img src={soldout} alt="soldout icon" className='w-40'/>
                            
                            }
                          </div>
                        </div>
                        <div>
                        <div className='flex flex-col items-center justify-center'>
                          <img src={book.imageUrl} alt="" className='w-50 mt-6 h-60'/>
                          </div>
                          <div className='flex  justify-end mt-7'>
                            <button className='bg-red-600 px-3 rounded py-1 hover:bg-red-800 hover:text-white' onClick={() => removeBook(book?._id)}>Delete</button>
                          </div>
                        </div>
                    </div>
                      ))
                      
                    :
                    <p className='text-red-600 font-bold my-5 text-center'>No Books Uploaded !!</p>}
                  </div>}
                  {/* purchase status UI */}
                  {purchaseStatus && <div>
                  {purchaseBooks?.length>0 ?
                    purchaseBooks?.map(bk=>(
                      <div className=' bg-gray-300 mx-12 p-8 rounded-lg shadow md:grid grid-cols-[3fr_1fr] gap-6'>
                        <div>
                          <h1 className='text-2xl font-bold'>{bk?.title}</h1>
                          <h1 className='text-lg font-bold'>{bk?.author}</h1>
                          <h1 className='text-md text-blue-500 font-bold flex items-center'><FaIndianRupeeSign/>{bk?.discountPrice}</h1>
                          <div className='mt-1'>
                              <img src={soldout} alt="" className='w-40 '/>
                              
                            </div>
                        </div>
                        <div >
                          <img src={bk?.imageUrl} alt="" className='w-50 mt-6 '/>
                        </div>
                    </div>
                    ))
                    :
                    <p className='text-center text-red-500'>No Purchased Books !</p>
                    }
                  </div>}
            </div>
      

    </div>
  )
}

export default Profile
