import { useState,useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'
import { Route,Routes } from 'react-router-dom'
import Home from './user/pages/Home'
import Preloader from './components/Preloader'
import Auth from './pages/Auth'
import AllBooks from './user/pages/AllBooks'
import Contact from './user/pages/Contact'
import Profile from './user/pages/Profile'
import ViewBook from './user/pages/ViewBook'
import Dashboard from './admin/pages/Dashboard'
import Settings from './admin/pages/Settings'
import Resource from './admin/pages/Resource'
import Pnf from './pages/Pnf'
import { ToastContainer } from 'react-toastify'
import PaymentSuccess from './user/pages/PaymentSuccess'
import PaymentFail from './user/pages/PaymentFail'
import {routerContext} from './context/RouterGuardContext'
import { useContext } from 'react'

function App() {
  const {role} = useContext(routerContext)
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  })
  return (
    <>
    {/* toast container */}
    <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      <Routes>
        <Route path='/' element={loading? <Preloader/> : <Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/signup' element={<Auth register/>}/>
        <Route path='/all-books' element={<AllBooks/>}/>
        <Route path='/contact' element={<Contact/>}/>
        
        { role == 'user' &&
          <>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/view/:id/book' element={<ViewBook/>}/>
          <Route path='/success' element={<PaymentSuccess/>}/>
          <Route path='/cancel' element={<PaymentFail/>}/>
        </>
        }

        { role == 'admin' &&
          <>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/admin-settings' element={<Settings/>}/>
          <Route path='/admin-resources' element={<Resource/>}/>
        </>
        }

        <Route path='/*' element={<Pnf/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
