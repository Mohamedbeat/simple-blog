import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { AUTH_URL } from "../../configs";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)


    const login =async (inputs)=>{
        const res = await axios.post(AUTH_URL+"/login",inputs,{withCredentials:true,})  
        setCurrentUser(res.data)
        console.log(res.headers);
        
    }

    const logout = async ()=>{
        await axios.post(AUTH_URL+"/logout")  
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser])

    return (<AuthContext.Provider value={{currentUser, login, logout}}> {children} </AuthContext.Provider>);
        
            
        
    
}
