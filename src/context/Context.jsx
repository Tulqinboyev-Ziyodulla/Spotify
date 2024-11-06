import { createContext, useState } from "react";

export const Context = createContext();

export const CodeContext = ({ children }) => {

  const [token, setToken] = useState(null); 

  const [play, setPlay] = useState(null)

  const [playing, setPlaying] = useState(false); 

  return (
    <Context.Provider value={{ token, setToken, play, setPlay, playing, setPlaying }}>
      {children}
    </Context.Provider>
  );
};
