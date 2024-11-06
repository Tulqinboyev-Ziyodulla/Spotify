import { createContext, useState } from "react";

// Global state yaratish uchun Context
export const Context = createContext();

export const CodeContext = ({ children }) => {
  // Token: foydalanuvchining autentifikatsiyasi uchun ishlatiladigan qiymat
  const [token, setToken] = useState(null);  // Token boshida null bo'lishi mumkin

  // Play: musiqaning URI (manzili), o'ynatilayotgan track
  const [play, setPlay] = useState(null);  // Musiqa o'ynatishni boshlash uchun

  // Playing: musiqaning hozirgi holati (ijro etilmoqda yoki yo'q)
  const [playing, setPlaying] = useState(false);  // Dastlab musiqaning o'ynatilayotganligi 'false' deb o'rnatiladi

  return (
    <Context.Provider value={{ token, setToken, play, setPlay, playing, setPlaying }}>
      {children}
    </Context.Provider>
  );
};
