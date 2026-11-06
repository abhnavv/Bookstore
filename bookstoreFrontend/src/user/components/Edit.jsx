import React from 'react'
import { useState,useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faXmark} from "@fortawesome/free-solid-svg-icons"
import { FaEdit } from 'react-icons/fa'
import axiosInstances  from '../../api/axiosinstances'
import { userUpdateAPI } from '../../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
function Edit() {
    const [modalStatus,setModalStatus]=useState(false)
    const [userDetails,setUserDetails]=useState({
      _id:"",
      username:"",
      password:"",
      cpassword:"",
      picture:"",
      bio:""
    })
    const [existingPicture,setExistingPicture]=useState("")
    const [preview,setPreview]=useState("")
    const [imageFile,setImageFile]=useState(false)
    const [passwordMatch,setPasswordMatch]=useState(false)
    
    const navigate=useNavigate()
    
    useEffect(()=>{
      if(sessionStorage.getItem("user")){
        let user=JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({...userDetails,_id:user._id,username:user.username,bio:user.bio})
        setExistingPicture(user.picture)    
      }
      
      
    },[])
    // console.log(userDetails);
    // console.log(existingPicture);
    const handleFileUpload = (e) => {
      const imageFile=e.target.files[0]
      if(imageFile.type.startsWith("image/")){
        setUserDetails({...userDetails,picture:e.target.files[0]})
        setPreview(URL.createObjectURL(e.target.files[0]))
        setImageFile(true)  
    }else{
      setImageFile(false)
    }
  }

  const checkPasswordMatch=(data)=>{
    setUserDetails({...userDetails,cpassword:data})
    userDetails.password==data ? setPasswordMatch(true) : setPasswordMatch(false)
  }

  const resetProfileForm=()=>{
    let user=JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({...userDetails,_id:user._id,username:user.username,password:"",cpassword:"",picture:"",bio:user.bio})
    setExistingPicture(user.picture)   
    setPreview("")
    setImageFile(false)
    setPasswordMatch(true)
  }

  const updateProfile=async()=>{
      const {username,password,cpassword,bio} = userDetails
      if(!username,!password,!cpassword,!bio){
        toast.warning("Fill the fields completely")
      }else if(password && cpassword){
        if(passwordMatch){
          // making the datas to pass in formdata
          const reqbody=new FormData()
          for(let key in userDetails){
            if(key!="picture"){
              reqbody.append(key,userDetails[key])
            }else{
              preview ? reqbody.append(key,userDetails[key]) : reqbody.append(key,existingPicture)
            }
            
  
          }
          const result = await userUpdateAPI(userDetails._id,reqbody)
          // console.log(result);
          if(result.status===200){
            toast.success("Profile Updated Successfully..")
        
              setModalStatus(false)
           
            navigate('/login')
            sessionStorage.clear()
          }
        }
      }else{
        const reqbody=new FormData()
          for(let key in userDetails){
            if(key!="picture"){
              reqbody.append(key,userDetails[key])
            }else{
              preview ? reqbody.append(key,userDetails[key]) : reqbody.append(key,existingPicture)
            }
            
  
          }
          const result = await userUpdateAPI(userDetails._id,reqbody)
          console.log(result);
          if(result.status===200){
            toast.success("Profile Updated Successfully..")
            
              setModalStatus(false)
            
            navigate('/login')
            sessionStorage.clear()
          }
      }
       
  }
  return (
    <>
        {/* edit button */}
      <div >
        <div>
          <button className=' bg-yellow-500 text-black rounded px-2 py-1' onClick={()=>setModalStatus(true)}>Edit</button>
        </div>
        {/* modal */}
        {modalStatus && <div className='relative z-10'>
          <div className='bg-gray-800/75 inset-0 fixed overflow-auto flex items-center justify-center'>
            <div className='flex items-center justify-center min-h-screen md:px-10 px-4 w-200'>
              <div className='bg-white w-full mb-15 rounded-t-2xl' style={{height:'500px'}}>
                {/* modal header */}
                  <div className='flex text-white p-3 bg-black items-center justify-between rounded-t'>
                      <h3>Update Profile</h3>
                      <FontAwesomeIcon icon={faXmark} onClick={()=>setModalStatus(false)} className='bg-white text-black rounded p-1 hover:bg-red-500'/>
                    
                  </div>
                  {/* modal body */}
                  <div className='md:p-10 py-6 bg-blue-100 h-full'>
                       <div className='flex flex-col items-center justify-center'>
                          <div className='bg-white relative' style={{height:'100px',width:'100px',borderRadius:'50%'}}>
                            {/* profile image portion */}
                              <input type="file" className='hidden' id='userpic' onChange={e=>handleFileUpload(e)}/>
                              <label htmlFor='userpic'>
                                {
                                  
                                existingPicture==""?
                                <img src= {preview ? preview 
                                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGk-piaMj-n2TkqRj0rDm179qigocTLVvndFtN0cNxlzNUMWgk6Gfz6O0&s=10'} style={{height:'100px',width:'100px',borderRadius:'50%'}}/>
                                :
                                existingPicture.startsWith('https://lh3.googleusercontent.com/')?
                                <img src= {preview ? preview 
                                  : existingPicture} style={{height:'100px',width:'100px',borderRadius:'50%'}}/>
                                :
                                <img src= {preview ? preview : `${axiosInstances.defaults.baseURL}/uploads/${existingPicture}`} style={{height:'100px',width:'100px',borderRadius:'50%'}}/>
                                }
                              </label>
                              <FaEdit className='absolute inset-0 top-21 left-16 text-yellow-600'/>
                          </div>
                          {!imageFile && <div className='text-red-600 mt-2'>
                            <label htmlFor="" className='text-xs'>*Only Upload Image File</label>
                          </div>}
                        </div>
                      <div className='flex flex-col items-center justify-center w-full px-6 mt-12 gap-6'>
                          <input type="text" className='bg-white w-full rounded py-1 px-3' placeholder='UserName' value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})}/>
                          <input type="password" className='bg-white w-full rounded py-1 px-3' placeholder='password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})}/>
                          <input type="password" className='bg-white w-full rounded py-1 px-3' placeholder='Re-Enter your password' value={userDetails.cpassword} onChange={(e)=>checkPasswordMatch(e.target.value)}/>
                          {!passwordMatch && <div className='text-red-600'>
                            <label htmlFor="" className='text-xs'>*Password and Confirm password must be same</label>
                          </div>}
                          <textarea name="" id="" className='bg-white w-full rounded py-1 px-3' placeholder='Bio' value={userDetails.bio} onChange={e=>setUserDetails({...userDetails,bio:e.target.value})}/>
                      </div>
                  </div>
                  {/* modal footer */}
                  <div className='bg-white flex relative justify-end p-3 gap-4 rounded-b'>
                      <button className='bg-gray-700 px-3 rounded py-1 text-white' onClick={resetProfileForm}>Reset</button>
                      <button className='bg-blue-700 px-3 rounded py-1 text-white' onClick={updateProfile}>Update</button>
                  </div>
              </div>
            </div>
          </div>
        </div>}
        <ToastContainer position='top-center' theme='colored' autoClose={1000} />
      </div>
      
    </>
  )
}

export default Edit
