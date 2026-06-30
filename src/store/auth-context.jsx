import React from "react";
import { useState,useEffect } from "react";
const AuthContext=React.createContext({
    isLoading:false,
    onLogout:()=>{},
    onLogin:(email,password)=>{}
}
)

export const AuthContextProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    
    useEffect(()=>{
      const timer=setTimeout(()=>{
        const storedUserLoggedInStatus=localStorage.getItem("isLoggedIn");
      if(storedUserLoggedInStatus=="1"){
        setIsLoggedIn(true);
      }
      },500);
      return ()=>{
        console.log("Clean Up function ");
        clearTimeout(timer);
      }
    },[])
      
    
      const loginHandler = (email, password) => {
    
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn','1');
      };
    
      const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn","0");
      };

    
return <AuthContext.Provider value={{
isLoggedIn:isLoggedIn,
onLogout:logoutHandler,
onLogin:loginHandler
}
}>{props.children}</AuthContext.Provider>
}
export default AuthContext;
