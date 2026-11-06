import React from 'react'
import Header from '../components/UserHead'
import {  FaLocationDot,  FaPhone} from 'react-icons/fa6'
import { IoMdMailOpen, IoMdSend } from 'react-icons/io'
import emailjs, { send } from '@emailjs/browser'
import { useRef } from 'react'
import {  toast } from 'react-toastify';

function Contact() {
  const form =useRef()
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);
    const {name,email,title} = form.current
    if(name.value && email.value && title.value){
      emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Thank you for contacting with us...Our team will get back to you!!!")
          setTimeout(()=>{
            form.current.reset()
          },3000)
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error("Message could not be sent. Please try again.");
        },
      );
      
    }else{
      toast.warning("Please fill the form properly")
    }
    
  };

  return (
    <div>
        <Header/>
        <div className='p-9'>
          <h1 className='text-3xl font-serif text-center'>Contacts</h1>
          <p className='text-justify mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio incidunt libero illo, cumque dignissimos eum dolores provident eius exercitationem magnam aliquid nisi. Minus culpa doloremque voluptatibus totam ex temporibus?
          Eaque aliquam perspiciatis quos asperiores facere totam reprehenderit sapiente molestias quasi fuga.</p>
          <div className='grid md:grid-cols-3 mt-8 md:gap-8 gap-6 justify-center'>
            <div className='flex items-center gap-2'>
              <FaLocationDot className='bg-gray-400 p-2' style={{width:'40px',height:'40px',borderRadius:'50%'}}/>
              <h1>123 Main Street, Apt 4B,Anytown, CA 91234</h1>
            </div>
            <div className='flex items-center gap-2'>
              <FaPhone className='bg-gray-400 p-2' style={{width:'40px',height:'40px',borderRadius:'50%'}}/>
              <h1>+91 9874561230</h1>
            </div>
            <div className='flex items-center gap-2'>
              <IoMdMailOpen className='bg-gray-400 p-2' style={{width:'40px',height:'40px',borderRadius:'50%'}}/>
              <h1>Bookstore@gmail.com</h1>
            </div>
          </div>
          
          <div className='mt-5 grid md:grid-cols-2 gap-6 h-full'>
            {/* message form */}
            <div className='rounded bg-sky-200 p-5 mt-5 w-full flex flex-col md:justify-center gap-4'>
                <h1 className='text-center text-2xl font-bold'>Send Me Message</h1>
                <form ref={form} onSubmit={sendEmail}>
                  <input type="text" className='rounded bg-white px-4 py-2 w-full mt-5' name='name' placeholder='Name'/>
                  <input name='email' type="email" className='rounded bg-white px-4 py-2 w-full mt-3' placeholder='Email ID'/>
                  <textarea name='title'  className='rounded bg-white px-4 py-2 w-full mt-3' placeholder='Message'/>
                  <button type='submit' className='flex items-center  justify-center w-full bg-blue-800 text-white font-medium gap-2 py-1 rounded-lg mt-5'>Send <IoMdSend/></button>
                </form>
            </div>
            {/* google map */}
            <div className='mt-5'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d251496.17336713232!2d76.31894301494138!3d9.964900042984423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1792733449287!5m2!1sen!2sin" width="600" height="450" className='rounded border-0 w-full' allowfullScreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
          </div>
        </div>
       
    </div>
  )
}

export default Contact
