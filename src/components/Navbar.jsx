import React from 'react'
import NavbarItem from './NavbarItem'
import { HomeIcon, LibraryIcon, PlayListIcon, SearchIcon, LikedIcon } from '../assets/Icons'

function Navbar() {
  return (
    <div className='w-[20%] bg-black overflow-y-auto h-[100vh]'>
      <div className="pt-[70px] flex flex-col pl-[30px]">
        <NavbarItem extraStyle={"mb-6 opacity-60"} to={"/"} icon={<HomeIcon />} title={"Home"} />
        <NavbarItem extraStyle={"mb-6 opacity-60"} to={"/search"} icon={<SearchIcon />} title={"Search"} />
        <NavbarItem extraStyle={"mb-[49px] opacity-60"} to={"#"} icon={<LibraryIcon />} title={"Your Library"} />
        <NavbarItem extraStyle={"mb-5 opacity-60"} to={"#"} icon={<PlayListIcon />} title={"Create Plalist"} />
        <NavbarItem spanStyle={"opacity-[60%]"} to={"/liked"} icon={<LikedIcon />} title={"Liked Songs"} />
      </div>
    </div>
  )
}

export default Navbar
