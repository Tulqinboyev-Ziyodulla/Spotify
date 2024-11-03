import React from 'react'
import { NavLink } from 'react-router-dom'

function NavbarItem({ to, icon, title, extraStyle, spanStyle }) {
  return (
    <NavLink className={`text-white ${extraStyle} flex items-center space-x-5 text-[18px] font-bold`} to={to}>
      {icon}
      <span className={`${spanStyle}`}>{title}</span>
    </NavLink>
  )
}

export default NavbarItem