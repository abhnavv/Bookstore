import React from 'react'
import { useState,useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { adminUpdateAPI } from '../../services/allApi'
function Settings() {
  const [userDetails,setUserDetails]=useState({
    _id:"",
    username:"",
    password:"",
    cpassword:"",
    picture:"",

  })
  const [existingPicture,setExistingPicture]=useState("")
  const [preview,setPreview]=useState("")
  const [imageFile,setImageFile]=useState(false)
  const [passwordMatch,setPasswordMatch]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      let user=JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({...userDetails,_id:user._id,username:user.username})
      setExistingPicture(user.picture)    
    }
  },[])
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
  setUserDetails({...userDetails,_id:user._id,username:user.username,password:"",cpassword:"",picture:""})
  setExistingPicture(user.picture)   
  setPreview("")
  setImageFile(false)
  setPasswordMatch(true)
}
const updateProfile=async()=>{
  const {username,password,cpassword} = userDetails
  if(!username,!password,!cpassword){
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
      const result = await adminUpdateAPI(userDetails._id,reqbody)
      // console.log(result);
      if(result.status===200){
        toast.success("Profile Updated Successfully..")
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
        navigate('/login')
        sessionStorage.clear()
      }
  }
   
}
  return (
    <>
      <AdminHeader/>
        <div className='md:grid grid-cols-5'>
          <div className='col-span-1'>
            <Sidebar/>
          </div>
          <div className='col-span-4 p-6 justify-items-center px-3 w-full overflow-hidden'>
             <div>
                <h1 className='text-center text-2xl font-bold font-serif'>Settings</h1>
              </div>
                <div className='grid md:grid-cols-2 mt-8 gap-5 w-full'>
                  <div className='mt-9 col-span-1 w-full'>
                    <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis?</p>
                    <p className='mt-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis, consequatur quos eveniet inventore ipsam beatae iure fugiat eligendi quae laborum incidunt eum quis, est blanditiis exercitationem velit excepturi?</p>
                  </div>
                  <div className='col-span-1 w-full overflow-hidden'>
                    <div className='bg-blue-400 rounded-2xl flex flex-col items-center justify-center p-7 h-full'>
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
                      
                        <input type="text" name="" id="" className='bg-white rounded h-7 w-full mt-7 shadow px-4 placeholder:text-gray-300' placeholder='Username' value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})}/>
                        <input type="password" name="" id="" className='bg-white rounded h-7 w-full mt-4 shadow px-4 placeholder:text-gray-300'placeholder='Password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})}/>
                        <input type="password" name="" id="" className='bg-white rounded h-7 w-full mt-4 shadow px-4 placeholder:text-gray-300' placeholder='Confirm Password' value={userDetails.cpassword} onChange={(e)=>checkPasswordMatch(e.target.value)}/>
                        {!passwordMatch && <div className='text-red-600'>
                            <label htmlFor="" className='text-xs'>*Password and Confirm password must be same</label>
                          </div>}
                        <div className='flex justify-center items-center mt-8 gap-2 md:gap-5'>
                          <button className='bg-yellow-600 md:px-8 px-4 py-1 rounded-lg shadow' onClick={resetProfileForm}>Reset</button>
                          <button className='bg-green-600  md:px-6 px-3 py-1 rounded-lg shadow' onClick={updateProfile}>Update</button>
                        </div>
                      
                    </div>
                  </div>
                </div>
             
          </div>

        </div>
    </>
  )
}

export default Settings
