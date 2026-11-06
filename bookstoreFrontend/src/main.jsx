import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchContext from './context/SearchContext.jsx'
import RouterGuardContext from './context/RouterGuardContext.jsx'

createRoot(document.getElementById('root')).render(
  
 <BrowserRouter>
  <StrictMode>
    <GoogleOAuthProvider clientId='764928413991-78a84cq1odseo899q6ebbojquhlob2lg.apps.googleusercontent.com'>
      <SearchContext>
        <RouterGuardContext>
          <App />
        </RouterGuardContext>
      </SearchContext>
    </GoogleOAuthProvider>
    </StrictMode>
 </BrowserRouter>
)
