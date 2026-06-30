import React from "react";

const AuthContext=React.createContext({
    isLoading:false,
    onLogout:()=>{}
}
)
export default AuthContext;
