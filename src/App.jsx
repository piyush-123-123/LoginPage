// Write your code at relevant places in the code below:

import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
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

  return (
    <AuthContext.Provider value={{
      isLoggedIn:isLoggedIn,
      onLogout:logoutHandler
    }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;