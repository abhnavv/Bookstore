import React, { createContext, useContext, useEffect, useState } from 'react'

export const routerContext = createContext()
function RouterGuardContext({children}) {
    const [role,setRole] = useState("")
    const [authorizedUser,setAuthorizedUser] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("user") && sessionStorage.getItem("token")){
            const user = JSON.parse(sessionStorage.getItem("user"))
            setAuthorizedUser(true)
            setRole(user.role)
            
        }
    },[role,authorizedUser])
  return (
    <div>
        <routerContext.Provider value={{role,setRole,authorizedUser,setAuthorizedUser}}>
            {children}
        </routerContext.Provider>
    </div>
  )
}

export default RouterGuardContext
