import { createContext, useContext, useState } from "react";

const captainContext = createContext()

export const ProvideContext = ({children}) => {
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const value = { captain, setCaptain, isLoading, setIsLoading, error, setError }

    return (
        <captainContext.Provider value={value}>
            {children}
        </captainContext.Provider>
    )
}

export const useCaptain = () => {
    return useContext(captainContext)
}