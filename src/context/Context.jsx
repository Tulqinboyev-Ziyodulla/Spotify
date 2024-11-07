import { createContext, useState } from "react";

export const Context = createContext()

export const CodeConext = ({children}) => {
    const [token , setToken] = useState(null)
    const [play, setPlay] = useState([])
    const [playing, setPlaying] = useState(false)
    
    return (
        <Context.Provider value={{token,setToken, play, setPlay, playing, setPlaying}}>
            {children}
        </Context.Provider>
    )
}