import React, { useContext, useState } from 'react'
import background from "../assets/bk3.jpeg"
import { FaUserTie } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IoEyeOffOutline } from "react-icons/io5";
import { loginAPI, registerAPI } from '../services/allApi';
import {  toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { googleLoginAPI } from '../services/allApi';
import { routerContext } from '../context/RouterGuardContext';

function Auth({ register }) {
  const {setAuthorizedUser,setRole} = useContext(routerContext)
  const [togglePassword, setTogglePassword] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: 'username',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Must be atleast three characters").required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string().required("Required")

    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (register) {
        console.log("Register Api");
        handleRegister(values)
      } else {
        console.log("Login Api");
        handleLogin(values)
      }
      resetForm()
    }

  })

  const handleRegister = async (userData) => {
    const result = await registerAPI(userData)
    console.log(result);
    if (result.status === 200) {
      toast.success("Registration successfull...Please Login")
    }
    else if (result.status === 409) {
      toast.error(result.response)
    }
    navigate('/login')

  }

  const handleLogin = async (userData) => {
    const result = await loginAPI(userData)
    console.log(result);
    if (result.status == 200) {
      toast.success("Login successfull..!!")
      sessionStorage.setItem("user", JSON.stringify(result.data.user))
      sessionStorage.setItem("token", result.data.token)
      setAuthorizedUser(true)
      setTimeout(()=>{
        if (result.data.user.role == 'admin') {
          setRole('admin')
          navigate('/admin-dashboard')
          
        } else {
          setRole('user')
          navigate('/')
          
        }
      },1000)
    } else {
      toast.error(result.response)
    }

  }

  const handleGoogleLogin=async(credentialResponse)=>{
    console.log("inside google login");
    console.log(credentialResponse);

    const {name,email,picture} = jwtDecode(credentialResponse.credential)
    console.log({name,email,picture});

    const res=await googleLoginAPI({username:name,email,password:"googelpassword",picture})
    console.log(res);
    if(res.status===200){
      toast.success("Login successfull..")
      sessionStorage.setItem("user",JSON.stringify(res.data.user))
      sessionStorage.setItem("token",res.data.token)
      setAuthorizedUser(true)
      setTimeout(() => {
        setRole('user')
        navigate('/')
      }, 1000);
      
    }else{

    }

    
    
  }

  return (
    <>
      <div style={{ backgroundImage: `url(${background})` }} className='min-h-screen overflow-hidden w-full bg-cover bg-center bg-no-rpeat flex flex-col items-center justify-center p-3'>
        <h1 className='text-3xl mb-5 text-white font-black'>BOOK STORE</h1>
        {/* register/login page */}
        <div className='z-10 text-white  md:h-130 w-full md:w-120 bg-black shadow-lg rounded-4xl border-gray-300 shadow-gray-900 flex flex-col items-center justify-center px-3 py-3'>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%' }} className='flex items-center justify-center border'>
            <FaUserTie className='text-6xl' />
          </div>

          {register ? <h1 className='text-2xl my-3 font-bold'>Register</h1> : <h1 className='text-2xl my-3 font-bold'>Login</h1>}
          <form className='w-full' onSubmit={formik.handleSubmit}>
            {/* enter user name */}

            {register && <div className='w-full md:px-13 px-5'>
              <input type="text" onChange={formik.handleChange} value={formik.values.username} className='rounded bg-white mt-3 ps-4 text-black py-1 w-full' placeholder='User-Name' name='username' />
              <div className='text-yellow-500'>
                {formik.errors.username}
              </div>
            </div>}

            {/*  enter user email*/}
            <div className='flex items-center justify-center text-black w-full md:px-13 px-5'>
              <input type="email" onChange={formik.handleChange} value={formik.values.email} className='rounded bg-white mt-3 ps-4 py-1 w-full pe-10' placeholder='Email-id' name='email' />

            </div>
            <div className='text-yellow-500 md:px-13 px-5'>
              {formik.errors.email}
            </div>

            {/* Enter password */}
            <div className='w-full md:px-13 px-5 relative items-center justify-center'>
              <input type={togglePassword ? 'text' : 'password'} onChange={formik.handleChange} value={formik.values.password} className='rounded bg-white mt-3 ps-4 text-black py-1 w-full' placeholder='Password' name='password' />
              {togglePassword ?
                <IoEyeOffOutline className='absolute text-gray-700 md:right-14 right-8 top-1/2' onClick={() => setTogglePassword(false)} />
                :
                <FaEye className='absolute text-gray-500 md:right-14 right-8 top-1/2' onClick={() => setTogglePassword(true)} />
              }

            </div>
            <div className='text-yellow-500 md:px-13 px-5'>
              {formik.errors.password}
            </div>

            {/* never share pwd */}
            <div className='flex gap-13 mt-3 justify-center w-full'>
              <p className='text-yellow-700 text-xs'>* Never share the password with others</p>
              {!register && <Link className='underline underline-offset-8 text-xs text-gray-300 hover:text-blue-500'>Forget Password?</Link>}
            </div>
            {/* register button  */}
            <div className='w-full md:px-13 px-5'>
              {register ? <button className='w-full mt-5 bg-green-500 py-1 rounded' type='submit'>Signup</button>
                : <button className='w-full mt-5 bg-green-500 py-1 rounded' type='submit'>Login</button>}
            </div>

            {!register && <div className='flex flex-col items-center w-full '>
              <p className='hidden md:flex mb-3 mt-3'> ---------------------------or-----------------------------</p>
              <p className='flex md:hidden mb-3 mt-3'> -------------or--------------</p>
              {/* signup in with google */}
              <GoogleLogin theme="outline"
                size="medium"
                shape="pill"
                logo_alignment="center"
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>}
          </form>
          {/* already user login or register */}
          <div className='mt-4 text-xs mb-4'>
            {!register ? <h1>Don't have an account yet? <Link to={'/signup'} className='underline underline-offset-2 hover:text-blue-600' >SIGNUP</Link></h1> :
              <h1>Already have an account? <Link to={'/login'} className='underline underline-offset-2 hover:text-blue-600'>LOGIN</Link></h1>}
          </div>
        </div>


      </div>
      
    </>
  )
}

export default Auth
