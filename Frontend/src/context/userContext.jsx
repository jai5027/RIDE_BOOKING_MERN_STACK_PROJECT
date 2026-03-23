import { useContext, createContext, useState,  } from "react";

const userContext = createContext()

export const UserProvider  = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        fullname:{
            firstName: '',
            lastName: ''
        }
    })
    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    return useContext(userContext)
}
